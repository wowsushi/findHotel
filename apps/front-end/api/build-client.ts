import axios from 'axios'

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    return axios.create({
      baseURL: process.env.NX_BASE_URL_SERVER,
      headers: req.headers,
      withCredentials: true,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: process.env.NX_BASE_URL_CLIENT + '/api',
      withCredentials: true,
    })
  }
}

export default buildClient
