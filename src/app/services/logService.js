function log ({ message, source, stacktrace, data, level = 'info' }) {
  if (window.wj_Logs) {
    window.wj_Logs.push({
      message,
      source,
      stacktrace,
      data,
      level
    })
  }
}

function error (message, details, source) {
  log({
    level: 'error',
    message,
    data: details,
    source
  })
}

function info (message, details, source) {
  log({
    level: 'info',
    message,
    data: details,
    source
  })
}

function warn (message, details, source) {
  log({
    level: 'warning',
    message,
    data: details,
    source
  })
}

export default {
  error,
  info,
  warn
}
