import axios from 'axios'

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  if(options.method === 'GET') {
    const response = axios.get(url)
    return response
  }
  if(options.method === 'POST') {
    const response = axios.post(url, options.body)
    return response
  }
}
