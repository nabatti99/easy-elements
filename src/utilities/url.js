import firebaseAxios from "../axios/firebase.axios";
import artlistAxios from "../axios/artlist_io.axios";
import axios from "axios";

export const status = {
  PUT_TO_FIREBASE_OK: "PUT_TO_FIREBASE_OK",
  EXIST_IN_FIREBASE: "EXIST_IN_FIREBASE"
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

export const checkMusicExistFirebase = async newId => {
  const response = await firebaseAxios.get(`/history/${newId}/songId.json?shallow=true`);
  return Number(response.data) === Number(newId);
}

export const putNewMusicToFirebase = async newId => {
  const response = await artlistAxios.get(`/history/${newId}.json`) // Fake
  console.log(response);
  return firebaseAxios.put(`/historyTest/${newId}.json`, response.data); // Put that new data to Firebase
}

export const generateDownloadMusicFromURL = async (url, fileName = "download") => {
  const response = axios.get(url, { responseType: "blob" })
  const blob = new Blob([response.data]);

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