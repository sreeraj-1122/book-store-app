import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from './BackButton'
import Spinner from './Spinner'

const ShowBooks = () => {
  const [book,setBook]=useState({})
  const [loading,setLoading]=useState(false)
  const {id}=useParams();
  useEffect(()=>{
      setLoading(true)
      axios.get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        console.log(response.data);
        setBook(response.data)
        setLoading(false)

      })
      .catch((err)=>{
        console.log(err);
      })
  },[])
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show book</h1> 
      {loading?(
          <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishyear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
          
        </div>
      )}     
    </div>
  )
}

export default ShowBooks