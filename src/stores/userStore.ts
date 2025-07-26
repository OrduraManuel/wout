import { defineStore } from 'pinia';
//import axios from 'axios';
import { ref } from 'vue';

import getUser from '@/auth/getUser';
 

interface UserType {
  // adatta questi campi in base alla struttura del tuo oggetto user
  id?: number;
  name?: string;
  email?: string;
  // ... altri campi
}

export const useUserStore = defineStore('userStore', () => {
  const User = ref<UserType | null>(null); // se vuoi gestire anche il caso "nessun utente"

  const currentUser = async () => {
    try {
      const response = await getUser();
      User.value = response.data; // assegna direttamente l'oggetto
    } catch (error) {
      throw error;
    }
  };

  return {
    User,
    currentUser
  };
});

