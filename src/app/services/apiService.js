import logger from 'services/logService'

const originalFetch = require('isomorphic-fetch')
const fetch = require('fetch-retry')(originalFetch)

export const callApi = (endpoint, method = 'GET', data = null, withCredentials = false) => {
  if (endpoint.startsWith('/')) {
    endpoint = `//${window.location.host}${endpoint}`
  }

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: data && method !== 'GET' ? JSON.stringify(data) : undefined
  }

  return fetch(endpoint, options)
    .then(response => {
      console.log(response)

      const contentType = response.headers.get('content-type')
      return contentType && contentType.indexOf('application/json') !== -1
        ? response.json().then(json => {
          return { json, response }
        })
        : { json: null, response }
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        logger.error(`Api Response Error url:${response.url}, status:${response.status}`, { response, content: json }, 'apiService')
        return Promise.reject(json)
      }

      return json
    })
}

export const postApi = (endpoint, data) => callApi(endpoint, 'POST', data)
export const fetchApi = (endpoint) => callApi(endpoint, 'GET')
