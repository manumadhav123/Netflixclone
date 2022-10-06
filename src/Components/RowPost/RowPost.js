import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import {imgUrl,API_KEY } from '../../constants/constants'
import axios from '../../axios'
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId] =useState('')
  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.result.length!=0){
        setUrlId(response.data.results[0])
      }else{
        console.log('array not available')
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
            <img  onClick ={()=>handleMovie(obj.id)}className={props.isSmall ? 'smallPoster' :'poster'} alt='poster' src={`${imgUrl+obj.backdrop_path}`}></img>



          )}
            
        </div>
       { urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost