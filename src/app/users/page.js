import React from 'react'
import Navbar from '../navbar/page.js'
import Example from './users.js'
import useSWR from 'swr'

const fetcher = async() =>{
  const response = await fetch ('http://localhost:4000/users')
  const data = await response.json()
  return data
}
const mainPage = () => {
  const {data, error} = useSWR('users',fetcher)

  if (error) return 'An error has occured'
  if (!data) return 'Loading'
  return (
    <div>
     <Navbar/>
     <Example/> 
     <div>firstName - {data.firstName }!</div>
    </div>
  )
}

export default mainPage

