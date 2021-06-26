import firebaseAxios from "../axios/firebase.axios";
import artlistAxios from "../axios/artlist_io.axios";

export const status = {
  OK: "OK",
  EXIST_IN_FIREBASE: "EXIST_IN_FIREBASE"
}

export const getIdFromUrl = urlString => {
  try {
    const url = new URL(urlString);
    if (url.origin !== "https://artlist.io")
      throw new Error("That URL is not supported!");
  
    const pathNames = url.pathname.split("/");
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
  const response = await firebaseAxios.get(`/historyTest/${newId}/songId.json?shallow=true`);
  return Number(response.data) === Number(newId);
}

export const putNewMusicToFirebase = async newId => {
  const response = await artlistAxios.get(`/history/${newId}.json`) // Fake
  console.log(response);
  return firebaseAxios.put(`/historyTest/${newId}.json`, response.data); // Put that new data to Firebase
}