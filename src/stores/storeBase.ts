import { defineStore } from 'pinia';
//import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";

import { create, search, remove, update, get, getLimited, getNext, getPrev } from "@/services/crud";


export const useTrackStore = defineStore('trackStore', () => {
    const router = useRouter();
    const Track = ref({
      Number: 1,
      Organizer: {
        id: '666',
      },
      Author: '',
      Title: '',
      isFav: false,
      Src: {
        Href: '',
        Option: '',
      },
      Img: {
        Name: '',
        Path: null
      },
    });

    const Tracks = ref([]);
    const TracksLimit = ref(); // we'll use for create a call with pagination in dashboard: Number element in page / Tracks.length = Number of page to scroll
    const nextTracks = ref();
    const prevTracks = ref();

    const numberOfTracks = () =>{ 
      return Tracks.value.length
    }
    const createTrack = async (newTrack) => {
      return await create('Tracks', newTrack)
      .then(() =>{
        Tracks.value.push(newTrack);
        alert('Well done! You have create this Track!')
        router.push('/dashboard');
      })
      .catch(error =>{
        throw error;
      }); 
    }
    const deleteTrack = async (thisTrack) =>{
      return await remove('Tracks', thisTrack)
      .then(async () =>{
        console.log(Tracks.value,'this is tracks value PRIMA FILTER')
        const updateTracks = await Tracks.value.filter((x) => {
          console.log(Tracks.value,'this is tracks value DURANTE FILTER')
          return x.thisTrack !== thisTrack
        })
        console.log(updateTracks,'this is updateTracks')
        Tracks.value = updateTracks
        alert('Well done! You have delete this Track!')
      })
      .catch(error =>{
        throw error;
      }); 
    }
    //update = (collectionRef, id, item)
    const updateTrack = async (id, editTrack) =>{
      return await update('Tracks', id, editTrack)
      .then(response => {
        console.log('questo è editTrack: ',editTrack)
        alert('Well done! You have edit this Track!')
      })
      .catch((error) => {
        throw error;
      })
    }
    const getTrack = async (id) =>{
      const getId = await Tracks.value.filter((x) => {
        return x.id === id 
      })
      let item = JSON.parse(JSON.stringify(getId))
      return item[0]
    }
    const getAllTracks = async (attr) =>{
      return await search("Tracks", attr) 
      .then(response => {
        Tracks.value = response
        console.log(Tracks.value, 'dati-TRACKS storati')
      })
      .catch((error) => {
        throw error;
      })
    }
    const getLimitedTracks = async (perPage, attr) =>{
      return await getLimited('Tracks',perPage, attr) 
      .then(response => {
        nextTracks.value = response.lastVisible
        prevTracks.value = response.firstVisible
        TracksLimit.value = response.arrLimited
      })
      .catch((error) => {
        throw error;
      })
    }
    const getNextTracks = async (perPage,attr,lastTrack) =>{
      return await getNext('Tracks',perPage,attr,lastTrack)
      .then(response => {
        nextTracks.value = response.lastVisible
        console.log('questo è next PINIA: ',nextTracks.value)
        prevTracks.value = response.firstVisible
        TracksLimit.value = response.arrLimited
      })
      .catch((error) => {
        throw error;
      })
    }
    const getPrevTracks = async (perPage,attr,prevTrack) =>{
      return await getPrev('Tracks',perPage,attr,prevTrack)
      .then(response => {
        nextTracks.value = response.lastVisible
        prevTracks.value = response.firstVisible
        TracksLimit.value = response.arrLimited
      })
      .catch((error) => {
        throw error;
      })
    }
  return {
    Tracks,
    Track,
    TracksLimit,
    nextTracks,
    prevTracks,
    numberOfTracks,
    createTrack,
    deleteTrack,
    updateTrack,
    getTrack,
    getAllTracks,
    getLimitedTracks,
    getNextTracks,
    getPrevTracks,
    
  }
});

