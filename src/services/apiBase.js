import axios from 'axios'

const thisProtocol = `${window.location.protocol}//`
const thisPoint = `${window.location.hostname}:`
const baseUrl = `${thisProtocol}${thisPoint}${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_STATUS_URL}`;

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export default {
    getStatus(){
        return apiClient.get()
    },
    getLottos(perPage, page) {
      return apiClient.get('/lottos' + '?_limit=' + perPage + '&_page=' + page)
    },
    getAllLottos() {
      return apiClient.get('/lottos')
    },
    getLotto(id) {
      return apiClient.get('/lottos/' + id)
    },
    deleteLotto(id) {
      return apiClient.delete('/lottos/' + id)
    },
    editLotto(id, obj) {
      return apiClient.put('/lottos/' + id, {
        id: obj.id,
        category: obj.category,
        title: obj.title,
        description: obj.description,
        location: obj.location,
        date: obj.date,
        time: obj.time,
        petsAllowed: obj.petsAllowed,
        organizer: obj.organizer
      })
    },
    postLotto(lotto) { 
      return apiClient.post('/lottos' ,{
        id: lotto.id,
        category: lotto.category,
        title: lotto.title,
        description: lotto.description,
        location: lotto.location,
        date: lotto.date,
        time: lotto.time,
        petsAllowed: lotto.petsAllowed,
        organizer: lotto.organizer
      })
    }
  }