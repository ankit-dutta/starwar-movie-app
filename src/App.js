import React, { useState,useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

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



  // FETCHING DATA USING ASYNC AWAIT 

  const fetchMovieHandler = useCallback(async () => {
    setLoading(true);
    setError(null)
    
    try{
      
      const response = await fetch('https://react-app-4b59a-default-rtdb.firebaseio.com/movies.json')

      if(!response.ok){
        throw new Error('something went wrong!....Retrying')
          // timer = setInterval(fetchMovieHandler,5000)
    
    }

      const data = await response.json();
    
      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
       
        setMovies(loadedMovies);
         
    }
    catch(error){
      setError(error.message);
    }
    setLoading(false);
    },[])

    useEffect(()=>{
      fetchMovieHandler()
    },[fetchMovieHandler]) 
 
    async function addMovieHandler(movie) {
      const response = await fetch('https://react-app-4b59a-default-rtdb.firebaseio.com/movies.json', {
        method:'POST',
        body: JSON.stringify(movie),
        headers:{
          'content-Type': 'application/json'
        }
      })
      const data = await response.json();
      // console.log(data);
      fetchMovieHandler();
    }

    const deleteMovieHandler = async (id) => {
      console.log({id} , 'id');
      await fetch(
        'https://react-app-4b59a-default-rtdb.firebaseio.com/movies${id}',
        {
          method: "DELETE",
          body: JSON.stringify(movies),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(movies);
      fetchMovieHandler();
    };
   
  let content = <p>Found no movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} deleteRequest={deleteMovieHandler} />
  }

  if(error){
    content = (
      <div>
        <p> {error} </p>
        {/* <button onClick={cancelRetryingHandler}> Cancel Retry </button> */}
      </div>
    );
  }

  if(isLoading){
    content = <p>Loading...</p>
  }
  
  // const cancelRetryingHandler = ()=>{
  //   // clearInterval(timer)
  //   setError(error.message);
    
  // }

  return (
    <React.Fragment>

      <section>
        <AddMovie onAddMovie = {addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        {/* <button onClick={cancelRetryingHandler}>Cancel Retrying</button> */}
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
