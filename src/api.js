import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  getCountFromServer,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const initializeAPI = () => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCZq5DRDyr8vjfra8uTXgf0faCHf97c0lI',
    authDomain: 'edakuda-773a1.firebaseapp.com',
    projectId: 'edakuda-773a1',
    storageBucket: 'edakuda-773a1.appspot.com',
    messagingSenderId: '851469460114',
    appId: '1:851469460114:web:c73fa6aa3d8301f6d87c4b',
  })

  getAuth(firebaseApp)
  getFirestore(firebaseApp)
  getStorage(firebaseApp)

  return firebaseApp
}

export const apiGetAll = async (collectionName) => {
  const dataBase = getFirestore()
  const querySnapshot = await getDocs(collection(dataBase, collectionName))
  const pizza = []

  querySnapshot.forEach((doc) => {
    pizza.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return pizza
}

export const apiGetSingle = async (id, collectionName) => {
  const dataBase = getFirestore()

  try {
    const querySnapshot = await getDoc(doc(dataBase, collectionName, id))

    if (querySnapshot.exists()) {
      const data = querySnapshot.data()

      return {
        ...data,
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const apiUpdate = async (id, data, collectionName) => {
  const dataBase = getFirestore()

  try {
    await updateDoc(doc(dataBase, collectionName, id), { ...data })
    const updatedDoc = apiGetSingle(id, collectionName)

    if (doc !== null) {
      return updatedDoc
    }
  } catch (error) {
    throw new Error(error)
  }

  return null
}

export const apiDelete = async (id, collectionName) => {
  const dataBase = getFirestore()

  try {
    await deleteDoc(doc(dataBase, collectionName, id))
  } catch (error) {
    throw new Error(error)
  }
}

export const apiCreate = async (data, collectionName, id) => {
  const dataBase = getFirestore()
  const docRef = doc(dataBase, collectionName, id)

  try {
    await setDoc(docRef, data)
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadFile = async (file) => {
  const storage = getStorage()
  const storageRef = ref(storage, file.name)

  try {
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    return url
  } catch (error) {
    return Promise.reject(error)
  }
}

export const apiGetCount = async (collectionName) => {
  const db = getFirestore()

  const coll = collection(db, collectionName)
  const snapshot = await getCountFromServer(coll)
  return snapshot.data().count
}
