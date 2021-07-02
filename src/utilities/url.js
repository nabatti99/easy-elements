import firebaseAxios from "../axios/firebase.axios";
import artlistAxios from "../axios/artlist_io.axios";
import axios from "axios";

export const status = {
  PUT_TO_FIREBASE_OK: "PUT_TO_FIREBASE_OK",
  EXIST_IN_FIREBASE: "EXIST_IN_FIREBASE",
  NOT_EXIST_IN_FIREBASE: "NOT_EXIST_IN_FIREBASE",
  GET_FROM_FIREBASE_OK: "GET_FROM_FIREBASE_OK",
  CREATED_TIMESTAMP: "CREATED_TIMESTAMP"
}

export const getTopNewMusics = (numberMusics) => {
  return firebaseAxios.get(`/timestamp.json?&orderBy="createdAt"&limitToLast=${numberMusics}`)
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

    return result
  })
}

export const getIdFromUrl = urlString => {
  try {
    const url = new URL(urlString);
    const pathNames = url.pathname.split("/");

    if (url.origin !== "https://artlist.io" || pathNames[1] !== "song")
      throw new Error("That URL is not supported!");
  
    const id = Number(pathNames[2]);
  
    if (isNaN(id))
      throw new Error("Can't find the music id in that URL!");
  
    return id;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getMusicFromFirebase = async musicId => {
  const musicResponse = await firebaseAxios.get(`https://learning-easy-661d1.firebaseio.com/history/${musicId}.json`);
  const peaksResponse = await axios.get(musicResponse.data.waveSurferFilePath); 
  
  musicResponse.data.peaks = peaksResponse.data;

  const result = {
    ...musicResponse,
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

export const putNewMusicToFirebase = async newId => {
  const getResponse = await artlistAxios.get(`/Song/Details?ID=${newId}`) // Get data from Artlist.io
  const putResponse = await firebaseAxios.put(`/history/${newId}.json`, getResponse.data) // Put that new data to Firebase

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