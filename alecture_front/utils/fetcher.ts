import axios from 'axios'

const fechter = (url: string) => axios.get(url, {
    withCredentials: true
}).then((response) => response.data)

export default fechter