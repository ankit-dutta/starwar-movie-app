import React, { useState,useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
   const [movies, setMovies] = useState([])
   const [isLoading, setLoading] = useState(false)
   const [error, setError] = useState(null)

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  // FETCHING DATA USING FETCH METHOD
  // function fetchMovieHandler(){
  //   fetch('https://swapi.py4e.com/api/films').then((response)=>{
  //     return response.json();
  //   }).then((data)=>{
  //     const transformMovies = data.results.map((movieData)=>{
  //       return {
  //         id:movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformMovies);
  //   })
  // }
 

  // useEffect(() => {
  // const timer = setInterval(fetchMovieHandler(), 5000);
  //      return () => clearInterval(timer);
  //   }, [error]);



    const cancelRetryingHandler = ()=>{
      // clearInterval(timer)
      setError(error.message);
      
    }

  // FETCHING DATA USING ASYNC AWAIT 

  async function fetchMovieHandler(){
    setLoading(true);
    setError(null)
    
    try{
      
      const res = await fetch('https://swapi.py4e.com/api/ilms/')

      if(!res.ok){
        throw new Error('something went wrong!....Retrying')
          // timer = setInterval(fetchMovieHandler,5000)
    
    }

      const data = await res.json();
    
     
        const transformMovies = data.results.map((movieData)=>{
          return {
            id:movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })
        setMovies(transformMovies);
         
    }
    catch(error){
      setError(error.message);
    }
    setLoading(false);
    }

  // console.log(timer)
    
 
  


   
  let content = <p>Found no movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error){
    content = (
      <div>
        <p> {error} </p>
        <button onClick={cancelRetryingHandler}> Cancel Retry </button>
      </div>
    );
  }

  if(isLoading){
    content = <p>Loading...</p>
  }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        <button onClick={cancelRetryingHandler}>Cancel Retrying</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
