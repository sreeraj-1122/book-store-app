import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import CreateBooks from './Components/CreateBooks'
import ShowBooks from './Components/ShowBooks'
import EditBook from './Components/EditBook'
import DeleteBooks from './Components/DeleteBooks'

const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
    </Routes>
  )
}

export default App