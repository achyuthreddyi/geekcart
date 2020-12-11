import React, { useEffect } from 'react'
import axios from 'axios'
import '../styles.css'
import { API } from '../backend'
import ScreenContainer from '../components/ScreenContainer'

const Home = () => {
  return (
    <ScreenContainer>
      <h1 className='text-white'>hellow front end</h1>
    </ScreenContainer>
  )
}

export default Home
