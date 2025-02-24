import logger from 'services/logService'

const originalFetch = require('isomorphic-fetch')
const fetch = require('fetch-retry')(originalFetch)

export const callApi = (endpoint, method = 'GET', data = null, withCredentials = false) => {
  if (endpoint.startsWith('/')) {
    endpoint = `//${window.location.host}${endpoint}`
  }

  const options = {
    retryDelay: 1000,
    retryOn: (attempt, error, response) => {
      // retry on any network error, or 5xx status codes
      if (attempt < 3 && (error !== null || response.status >= 500)) {
        logger.warning({ message: `fetch retry, attempt number ${attempt + 1}.`, source: 'apiRetryInfo', data: endpoint })
        return true
      }
      return false
    },
    credentials: withCredentials ? 'include' : 'same-origin',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: data && method !== 'GET' ? JSON.stringify(data) : undefined
  }

  return fetch(endpoint, options)
    .then(response => {
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
