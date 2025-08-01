import { ref } from 'vue'

// firebase imports
import { auth } from '../services/config'
import { onAuthStateChanged } from 'firebase/auth'

// refs
const user = ref(auth.currentUser)

// auth changes
onAuthStateChanged(auth, _user => {
  user.value = _user
})

const getUser = () => {
  return { user } 
}

export default getUser