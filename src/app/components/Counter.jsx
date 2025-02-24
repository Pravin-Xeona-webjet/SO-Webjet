import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCount, increaseCount } from 'redux/counter/slice'

const Counter = () => {
  const { count } = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const handleIncreaseCount = () => {
    dispatch(increaseCount())
  }

  const handleDecreaseCount = () => {
    dispatch(decreaseCount())
  }

  return (
    <>
      <h2>Example of Counter with Redux Store</h2>
      <div>Counter: {count}</div>

      <button onClick={handleDecreaseCount}>-</button>
      <button onClick={handleIncreaseCount}>+</button>
    </>
  )
}

export default Counter
