import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import "bootstrap/dist/css/bootstrap.min.css"
import AddFavourites from "./AddFavourites";
import removeFavourites from "./removeFavourites"

const Home = () => {
    const [movies,setMovies] = useState([])
    const [favourites,setFavourites] = useState([]);
    const [searchValue,setSearch]= useState('')

    const getMovieRequest = async(searchValue)=>{
        const url =`http://www.omdbapi.com/?s=${searchValue}&apikey=51158ed0`;

        const response = await fetch(url);
        const responseJson = await response.json();
        if(responseJson.Search)
        {
            setMovies(responseJson.Search)
        }
        
    }

    const AddFavouriteMovie=(movie)=>{
        const newFavouriteList= [...favourites,movie]
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    }
    const RemoveFavouriteMovie=(movie)=>{
        const newFavouriteList= favourites.filter((favourite)=>favourite.imdbID!==movie.imdbID);
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    }

    useEffect(()=>{
        getMovieRequest(searchValue);
    },[searchValue])

    useEffect(()=>{
        const movieFavourites = JSON.parse(localStorage.getItem('movie-favourites'));
        setFavourites(movieFavourites);
    },[])

    const saveToLocalStorage = (items)=>{
        localStorage.setItem('movie-favourites',JSON.stringify(items));
    }

    return (
    <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
            <div className="col col-sm">
            <h1>Paytm Movies</h1>
            </div>
            <div className="col col-sm-5">
                <input 
                value = {searchValue} 
                onChange={(event)=> setSearch(event.target.value)}
                placeholder="Type to search..."
                />
            </div>
        </div>
        <div className="row">
            <MovieList movies={movies} handleFavouritesClick={AddFavouriteMovie} favouriteCoponent = {AddFavourites}/>
        </div>
        <div>
            <h1>Favourites</h1>
        </div>
        <div className="row">
            <MovieList movies={favourites}  handleFavouritesClick={RemoveFavouriteMovie} favouriteCoponent = {removeFavourites}/>
        </div>
    </div>);
  };
  
  export default Home;