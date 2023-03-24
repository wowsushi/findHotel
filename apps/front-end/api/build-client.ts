import axios from 'axios'

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://localhost:3333/api',
      headers: req.headers,
      withCredentials: true,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: 'http://localhost:3333/api',
      withCredentials: true,
    })
  }
}

export default buildClient
