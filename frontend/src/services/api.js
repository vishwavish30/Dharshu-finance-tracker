import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dharshu-finance-tracker.onrender.com/api',
})

export default api