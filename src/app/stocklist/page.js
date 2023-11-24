import React from 'react'
import Navbar from '../navbar/page.js'
import Stocklist from './stocklist.js'


const mainPage = () => {
  return (
    <div>
     <Navbar/>
     
     <Stocklist/> 
    </div>
  )
}

export default mainPage

