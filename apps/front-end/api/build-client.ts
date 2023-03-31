import axios from 'axios'

const buildClient = ({ req }) => {
  console.log('host', process.env.NX_BASE_URL)
  if (typeof window === 'undefined') {
    // We are on the server
    console.log(req.headers)
    return axios.create({
      baseURL: 'http://www.find-hotel.online/api',
      headers: req.headers,
      withCredentials: true,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: process.env.NX_BASE_URL,
      withCredentials: true,
    })
  }
}

export default buildClient
