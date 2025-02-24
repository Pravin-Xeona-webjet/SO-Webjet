import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Main from 'components/Main'
import Counter from 'components/Counter'
import Form from 'components/Form'

export default function App () {
  // use BroserRouter to replace HashRouter if you don't need # in the URL
  return (
    <HashRouter>
      <Routes>
        <Route path='/counter' element={<Counter />} />
        <Route path='/form' element={<Form />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </HashRouter>

  )
}
