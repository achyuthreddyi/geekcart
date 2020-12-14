import React, { useEffect } from 'react'
import useStorage from '../config/useStorage'

const ProgressBar = ({ file, setFile, setImage }) => {
  const { url, progress } = useStorage(file)
  console.log('progress', progress, url)
  useEffect(() => {
    if (url) {
      setFile(null)
      setImage(url)
    }
  }, [url, setFile])
  return <div className='progress-bar' style={{ width: progress + '%' }} />
}

export default ProgressBar
