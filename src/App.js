import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
   const [movies, setMovies] = useState([])
   const [isLoading, setLoading] = useState(false)

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


  // FETCHING DATA USING ASYNC AWAIT 
  async function fetchMovieHandler(){
    setLoading(true);
    const res = await fetch('https://swapi.py4e.com/api/films')
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
       setLoading(false);
  }



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && <MoviesList movies={movies} />}
       {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
       {isLoading && <h4>Loading...</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
