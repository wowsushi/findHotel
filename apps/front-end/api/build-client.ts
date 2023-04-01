import axios from 'axios'

const buildClient = ({ req }) => {
  delete process.env['http_proxy']
  delete process.env['HTTP_PROXY']

  delete process.env['https_proxy']

  delete process.env['HTTPS_PROXY']
  console.log('host', process.env.NX_BASE_URL_SERVER)
  if (typeof window === 'undefined') {
    // We are on the server
    console.log(req.headers)
    return axios.create({
      baseURL: process.env.NX_BASE_URL_SERVER,
      // headers: req.headers,
      withCredentials: true,
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: process.env.NX_BASE_URL_CLIENT,
      withCredentials: true,
    })
  }
}

export default buildClient
