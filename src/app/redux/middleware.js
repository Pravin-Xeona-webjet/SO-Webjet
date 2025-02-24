const logger = (store) => (next) => (action) => {
  // info debugger
  console.info(action)
  console.info(store.getState())

  // log to log system when error happen
  if (action && action.error) {
    // TODO : log error
    console.error(action.error)
  }

  return next(action)
}

export default logger
