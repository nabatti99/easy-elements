import firebaseAxios from "../axios/firebase.axios";
import artlistAxios from "../axios/artlist_io.axios";
import axios from "axios";

import * as historyStatusText from "../pages/History/statusText";

export const status = {
  PUT_TO_FIREBASE_OK: "PUT_TO_FIREBASE_OK",
  EXIST_IN_FIREBASE: "EXIST_IN_FIREBASE",
  NOT_EXIST_IN_FIREBASE: "NOT_EXIST_IN_FIREBASE",
  GET_FROM_FIREBASE_OK: "GET_FROM_FIREBASE_OK",
  UPDATE_FROM_FIREBASE_OK: "UPDATE_FROM_FIREBASE_OK",
  CREATED_TIMESTAMP: "CREATED_TIMESTAMP"
}

export const getTopNewMusics = (numberMusics) => {
  return firebaseAxios.get(`/timestamp.json`, {
    params: {
      orderBy: `"createdAt"`,
      limitToLast: numberMusics
    }
  })
  .then(response => {

    const orderedMusicIds = Object.keys(response.data)
      .map(key => { return { id: key, createdAt: response.data[key].createdAt } })
      .sort((prevItem, nextItem) => nextItem.createdAt - prevItem.createdAt)
      .map(item => item.id);

    const result = {
      ...response,
      data: orderedMusicIds,
      statusText: status.GET_FROM_FIREBASE_OK,
    }

    return result;
  })
}

export const getMoreMusics = (numberMusics, orderBy, lastPosition = null) => {

  switch (orderBy) {
    case historyStatusText.ORDER_BY_DATE:
      return firebaseAxios.get(`/timestamp.json`, {
        params: {
          orderBy: `"createdAt"`,
          limitToLast: numberMusics + 1,
          endAt: lastPosition || undefined
        }
      })
      .then(response => {
        const orderedMusics = Object.keys(response.data)
          .map(key => { return { id: key, createdAt: response.data[key].createdAt } })
          .sort((prevItem, nextItem) => nextItem.createdAt - prevItem.createdAt);

        lastPosition ? orderedMusics.shift() : orderedMusics.pop();
      
        const result = {
          ...response,
          data: orderedMusics.map(item => item.id),
          statusText: status.UPDATE_FROM_FIREBASE_OK,
          lastData: orderedMusics.length > 0 ? orderedMusics[orderedMusics.length - 1].createdAt : lastPosition,
          canContinued: orderedMusics.length === numberMusics
        }
      
        return result;
      });

    case historyStatusText.ORDER_BY_NAME:
      return firebaseAxios.get(`/history.json`, {
        params: {
          orderBy: `"songBaseName"`,
          limitToFirst: numberMusics + 1,
          startAt: lastPosition ? `"${lastPosition}"` : undefined
        }
      })
      .then(response => {
        const orderedMusics = Object.keys(response.data)
          .map(key => { return { id: key, name: response.data[key].songBaseName } })
          .sort((prevItem, nextItem) => nextItem.name < prevItem.name ? 1 : -1);

        lastPosition ? orderedMusics.shift() : orderedMusics.pop();
      
        const result = {
          ...response,
          data: orderedMusics.map(item => item.id),
          statusText: status.UPDATE_FROM_FIREBASE_OK,
          lastData: orderedMusics.length > 0 ? orderedMusics[orderedMusics.length - 1].name : lastPosition,
          canContinued: orderedMusics.length === numberMusics
        }
      
        return result;
      });

    default:
      throw new Error("Unknown how to order your musics");
  }

 
}

export const getIdFromUrl = urlString => {
  const url = new URL(urlString);
  const pathNames = url.pathname.split("/");

  if (url.origin !== "https://artlist.io")
    throw new Error("That URL is not supported!");

  let id = null;
  let isSFX = null;

  if (pathNames[1] === "song")
    id = Number(pathNames[2]);

  switch (pathNames[1]){
    case "song":
      id = Number(pathNames[2]);
      isSFX = false;
      break;

    case "sfx":
      id = Number(pathNames[3]);
      isSFX = true;
      break;

    default:
      throw new Error("Bad URL!");
  }
  
  if (isNaN(id))
    throw new Error("Can't find the music id in that URL!");

  return {
    id, isSFX
  };
}

export const getMusicFromFirebase = async musicId => {
  console.log(`/history/${musicId}.json`);
  const musicResponse = await firebaseAxios.get(`/history/${musicId}.json`);
  const peaksResponse = await axios.get(musicResponse.data.waveSurferFilePath); 
  
  musicResponse.data.peaks = peaksResponse.data;

  const result = {
    ...musicResponse,
    statusText: status.GET_FROM_FIREBASE_OK
  }

  return result;
}

export const getSFXFromFirebase = async sfxId => {
  const sfxResponse = await firebaseAxios.get(`/historySFX/${sfxId}.json`);
  const peaksResponse = await axios.get(sfxResponse.data.waveSurferFilePath); 
  
  sfxResponse.data.peaks = peaksResponse.data;

  const result = {
    ...sfxResponse,
    statusText: status.GET_FROM_FIREBASE_OK
  }

  return result;
}

export const checkMusicExistFirebase = newId => {
  return firebaseAxios.get(`/history/${newId}/songId.json?shallow=true`)
  .then(response => {
    return {
      ...response,
      statusText: Number(response.data) === Number(newId) 
        ? status.EXIST_IN_FIREBASE
        : status.NOT_EXIST_IN_FIREBASE
    }
  })
}

export const checkSFXExistFirebase = newId => {
  return firebaseAxios.get(`/historySFX/${newId}/songId.json?shallow=true`)
  .then(response => {
    return {
      ...response,
      statusText: Number(response.data) === Number(newId) 
        ? status.EXIST_IN_FIREBASE
        : status.NOT_EXIST_IN_FIREBASE
    }
  })
}

export const putNewMusicToFirebase = async newId => {
  const getResponse = await artlistAxios.get(`/Song/Details?ID=${newId}`) // Get data from Artlist.io
  const {
    songBaseName, songId, MP3FilePath, albumCoverFilePath, 
    albumThumbFilePath, albumName, artistName, 
    albumId, artistId, similarSongs, waveSurferFilePath,
    albumImageFilePath, categories, genreCategories
  } = getResponse.data;

  const putResponse = await firebaseAxios.put(`/history/${newId}.json`, {
    songBaseName, songId, MP3FilePath, albumCoverFilePath, 
    albumThumbFilePath, albumName, artistName, 
    albumId, artistId, similarSongs, waveSurferFilePath,
    albumImageFilePath, categories, genreCategories
  }) // Put that new data to Firebase

  const result = {
    ...putResponse,
    statusText: status.PUT_TO_FIREBASE_OK
  }

  return result;
}

export const putNewSFXToFirebase = async newId => {
  const getResponse = await artlistAxios.get(`/sfx/Details?ID=${newId}`) // Get data from Artlist.io
  const { 
    songName, sitePlayableFilePath, albumCoverFilePath, 
    albumThumbFilePath, albumName, artistName, 
    albumId, artistId, similarSongs, songId, waveSurferFilePath,
    albumImageFilePath, grandChildCategories 
  } = getResponse.data;

  const putResponse = await firebaseAxios.put(`/historySFX/${newId}.json`, { 
    songName, sitePlayableFilePath, albumCoverFilePath, 
    albumThumbFilePath, albumName, artistName, 
    albumId, artistId, similarSongs, songId, waveSurferFilePath,
    albumImageFilePath, grandChildCategories 
  }) // Put that new data to Firebase

  const result = {
    ...putResponse,
    statusText: status.PUT_TO_FIREBASE_OK
  }

  return result;
}

export const createTimestamp = musicId => {
  return firebaseAxios.put(`timestamp/${musicId}.json`, { 
    createdAt: {
      ".sv": "timestamp"
    }
  })
  .then(response => {
    const result = {
      ...response,
      statusText: status.CREATED_TIMESTAMP
    }

    console.log(result);

    return result;
  });
}

export const generateDownloadMusicFromURL = async (url, fileName = "download") => {
  const response = await axios.get(url, { responseType: "blob" })
  const blob = new Blob([response.data], { type: "audio/mp3" });

  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName;

  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 10 * 60000);

  return a;
}

export const generateDownloadSFXFromURL = async (url, fileName = "download") => {
  const response = await axios.get(url, { responseType: "blob" })
  const blob = new Blob([response.data], { type: "audio/aac" });

  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName;

  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 10 * 60000);

  return a;
}