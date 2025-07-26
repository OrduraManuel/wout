
import { db } from '@/services/config';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    limit,
    query,
    orderBy,
    startAfter,
    endBefore
  } from "firebase/firestore";
  // Follow this pattern to import other Firebase services

//POST
/**
 * @author dd
 * @description post
 * @param {*} collectionRef 
 * @param {string} obj 
 * @returns array of string
 */
//CREATE
export const create = async (collectionRef, obj) => {
  return  addDoc(collection(db, collectionRef), obj);
};

//GET
export const get = async (collectionRef, id) => {
  const docRef = doc(db, collectionRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

//PUT
export const update = (collectionRef, id, item) => {
  console.log('sono dentro update, questo è id e item: ', id, item)
  const itemRef = doc(db, collectionRef, id);
  return updateDoc(itemRef, item);
};

//DELETE
export const remove = (collectionRef, id) => {
  return deleteDoc(doc(db, collectionRef, id));
};

//GET
export const search = async (collectionRef,order) => {
  let arr = [];
  const thisRef = query(collection(db, collectionRef), orderBy(order))
  const querySnapshot = await getDocs(thisRef);
  querySnapshot.docs.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });
  console.log(arr,'questo è ARR in SEARCH')
  return arr;
};

//GET with order and limit for dashboard
export const getLimited = async (collectionRef, page, order) =>{
  const arrLimited = [];
  // Query the first page of docs
  const querySnapshot = query(collection(db, collectionRef),limit(page),orderBy(order));
  const docSnapshots =  await getDocs(querySnapshot)
  docSnapshots.docs.forEach((doc) => {
    arrLimited.push({ id: doc.id, ...doc.data() });
  });
  // test last item
  const lastVisible = docSnapshots.docs[docSnapshots.docs.length-1];
  const firstVisible = docSnapshots.docs[0];
  console.log('this is first: GET ', firstVisible)
  return {arrLimited, firstVisible, lastVisible}
 };
//GET with order and limit for dashboard
export const getNext = async (collectionRef, page, order, last) =>{
  const arrLimited = [];
  const next = query(collection(db, collectionRef),
  orderBy(order),startAfter(last),limit(page));
  const docSnapshots =  await getDocs(next)
  docSnapshots.docs.forEach((doc) => {
    arrLimited.push({ id: doc.id, ...doc.data() });
  });
  const lastVisible = docSnapshots.docs[docSnapshots.docs.length-1];
  const firstVisible = docSnapshots.docs[0];
  console.log('this is first NEXT: ', firstVisible)
  return {arrLimited, firstVisible, lastVisible}
 };
 //GET with order and limit for dashboard
export const getPrev = async (collectionRef, page, order, first) =>{
  const arrLimited = [];
  const prev = query(collection(db, collectionRef),
  orderBy(order),endBefore(first),limit(page));
  const docSnapshots =  await getDocs(prev)
  docSnapshots.docs.forEach((doc) => {
    arrLimited.push({ id: doc.id, ...doc.data() });
  });
  const lastVisible = docSnapshots.docs[docSnapshots.docs.length-1];
  const firstVisible = docSnapshots.docs[0];
  console.log('this is first PREV: ', firstVisible)

  return {arrLimited, firstVisible, lastVisible}
 };



