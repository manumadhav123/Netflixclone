import React, { useEffect, useState } from 'react'
import { API_KEY ,imgUrl} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'

function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[10])
      setMovie(response.data.results[Math.floor(Math.random()*response.data.results.length)])
  

    })
  }, [])

  return (
    <div
    style={{backgroundImage:`url(${movie ? imgUrl+movie.backdrop_path : ""})`}}
     className='banner'>
      <div className='content'>
        <h1 className='title'>{movie?.title || movie?.name || movie?.original_name }</h1>
        <div className='banner-buttons'>
          <button className='button'>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='discription'>{movie ? movie.overview : ""}</h1>
      </div>
      <div className='fade-bottom'></div>
    </div>
  )
}

export default Banner