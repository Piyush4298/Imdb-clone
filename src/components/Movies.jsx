import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Pagination from '../components/Pagination';

function Movies() {
    const [movies, setmovies] = useState([]);
    const [pageNumber, setpageNumber] = useState(1);
    const [hover, sethover] = useState('');
    const [favourites, setFavourites] = useState([]);

    const prevPage = () => {
        if (pageNumber > 1)
            setpageNumber(pageNumber - 1);
    }

    const nextPage = () => {
        setpageNumber(pageNumber + 1);
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=333355be4422cc36b586b196146051d7&page=${pageNumber}`)
            .then((res) => {
                setmovies(res.data.results)
                let oldFav = JSON.parse(localStorage.getItem("imdb") || "[]");
                setFavourites([...oldFav]);
            })
    }, [pageNumber]);

    const addToFavourites = (movie) => {
        let newArray = [...favourites, movie]
        setFavourites([...newArray]);
        localStorage.setItem("imdb", JSON.stringify(newArray));
    }

    const removeFromFavourites = (movie) => {
        const idx = favourites.indexOf(movie);
        let newArray = [...favourites]
        newArray.splice(idx, 1);
        setFavourites([...newArray]);
        localStorage.setItem("imdb", JSON.stringify(newArray));
    }

    return (
        <div>
            <div className='mt-8 mb-5 font-bold text-2xl text-center'>
                Trending Movies
            </div>
            {
                movies.length === 0 ?
                    <div className='flex justify-center'>
                        <Oval color="#bbbbbb" secondaryColor='#bbbbbb' height={80} width={80} />
                    </div>
                    :
                    <div className='flex flex-wrap justify-center'>
                        {
                            movies.map((movie) => {
                                return <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[30vh] md:w-[250px] w-[150px] h-[25vh]
                                bg-center bg-cover
                                rounded-xl flex items-end m-4 
                                hover:scale-110 ease-out duration-300 relative
                                ` }
                                    onMouseEnter={() => { sethover(movie.id) }}
                                    
                                    onMouseLeave={()=>sethover('')}
                                    >
                                    {
                                        hover === movie.id && <>{
                                            favourites.find((m)=>m.id === movie.id) ? <div className='absolute top-2 right-2 p-1 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>removeFromFavourites(movie)}>❌</div>
                                            :
                                            <div className='absolute top-2 right-2 p-1 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>addToFavourites(movie)}>❤️</div>
                                        }
                                        </>
                                    }


                                    <div className='w-full bg-gray-900 text-white text-center font-bold rounded-b-xl'>
                                        {movie.title}
                                    </div>
                                </div>
                            })
                        }

                    </div>
            }
            <Pagination pageNum={pageNumber} nxtPage={nextPage} prvPage={prevPage} />
        </div>
    );
}

export default Movies;