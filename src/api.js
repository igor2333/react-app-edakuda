import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
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

const pizzaCollection = 'pizza'

export const apiGetPizza = async () => {
  const dataBase = getFirestore()
  const querySnapshot = await getDocs(collection(dataBase, pizzaCollection))
  const pizza = []

  querySnapshot.forEach((doc) => {
    pizza.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return pizza
}

export const apiGetSinglePizza = async (id) => {
  const dataBase = getFirestore()

  try {
    const querySnapshot = await getDoc(doc(dataBase, pizzaCollection, id))

    if (querySnapshot.exists()) {
      const data = querySnapshot.data()

      return {
        id: querySnapshot.id,
        ...data,
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const apiUpdatePizza = async (id, data) => {
  const dataBase = getFirestore()

  try {
    await updateDoc(doc(dataBase, pizzaCollection, id), { ...data })
    const updatedDoc = apiGetSinglePizza(id)

    if (doc !== null) {
      return updatedDoc
    }
  } catch (error) {
    throw new Error(error)
  }

  return null
}

export const apiGetPizzaCount = async () => {
  const db = getFirestore()

  const coll = collection(db, pizzaCollection)
  const snapshot = await getCountFromServer(coll)
  console.log('count: ', snapshot.data().count)
}

export const apiDeletePizza = async (id) => {
  const dataBase = getFirestore()

  try {
    await deleteDoc(doc(dataBase, pizzaCollection, id))
  } catch (error) {
    throw new Error(error)
  }
}

export const apiCreatePizza = async (data) => {
  const dataBase = getFirestore()

  try {
    await addDoc(collection(dataBase, pizzaCollection), data)
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
