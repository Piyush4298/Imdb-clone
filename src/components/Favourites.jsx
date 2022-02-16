import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';



function Favourites() {
    const genreids = {
        28: "Action", 12: "Adventure", 16: "Animation",
        35: "Comedy", 80: "Crime", 99: "Documentary",
        18: "Drama", 10751: "Family", 14: "Fantasy",
        36: "History", 27: "Horror", 10402: "Music",
        9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV",
        53: "Thriller", 10752: "War", 37: "Western"
    }
    const [currGenre, setcurrGenre] = useState("All Genres");
    const [favourites, setFavourites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [ratingOrder, setratingOrder] = useState(0);
    const [popularityOrder, setpopularityOrder] = useState(0);
    const [searchValue, setsearchValue] = useState("");
    const [rows, setrows] = useState(4);
    const [currPage, setcurrPage] = useState(1);

    // for getting movies
    useEffect(() => {
        let oldFav = JSON.parse(localStorage.getItem("imdb") || "[]");
        setFavourites([...oldFav]);
    }, []);

    // for building dynamic genre buttons
    useEffect(() => {
        let temp = favourites.map(movie => genreids[movie.genre_ids[0]]);
        setGenres(["All Genres", ...new Set(temp)]);
    }, [favourites]);

    const removeFromFavourites = (movie) => {
        const idx = favourites.indexOf(movie);
        let newArray = [...favourites]
        newArray.splice(idx, 1);
        setFavourites([...newArray]);
        localStorage.setItem("imdb", JSON.stringify(newArray));
    }


    // Filtering
    let filteredMovies = [];
    filteredMovies = currGenre === "All Genres" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] === currGenre);

    // Sorting
    if (ratingOrder === 1) {
        filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average; // ascending
        });
    } else if (ratingOrder === -1) {
        filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average; // descending
        });
    }

    if (popularityOrder === 1) {
        filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieA.popularity - movieB.popularity; // ascending
        });
    } else if (popularityOrder === -1) {
        filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieB.popularity - movieA.popularity; // descending
        });
    }

    // Searching

    filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(searchValue.toLowerCase()));

    // Pagination 
    let maxPages = Math.ceil(filteredMovies.length / Number(rows));
    let si = (currPage - 1) * Number(rows);
    let ei = si + Number(rows);
    filteredMovies = filteredMovies.slice(si, ei);

    const prevPage = () => {
        if (currPage > 1)
            setcurrPage(currPage - 1);
    }

    const nextPage = () => {
        if (currPage < maxPages)
            setcurrPage(currPage + 1);
    }

    return (
        <div>
            {/** Filtering Genres */}
            <div className='mt-4 px-4 flex justify-center flex-wrap space-x-2'>
                {
                    genres.map(genre => {
                        return <button className={currGenre === genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'} onClick={() => { setcurrPage(1)
                            setcurrGenre(genre)}}>
                            {genre}
                        </button>
                    })
                }
            </div>
            {/** Input */}
            <div className='text-center'>
                <input type="text" placeholder='Search' className='border border-2 text-center p-1 m-2' onChange={(e) => setsearchValue(e.target.value)} />
                <input type="number" placeholder='Number of rows' className='border border-2 text-center p-1 m-2' value={rows} onChange={(e) => setrows(e.target.value)} />
            </div>
            {/** Table */}
            <div>
                <div className="flex flex-col m-4">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div>
                                                    <img src="https://img.icons8.com/ios/50/000000/circled-chevron-up.png" alt="up-arrow-icon" className='mr-2 cursor-pointer' onClick={() => {
                                                        setratingOrder(1)
                                                        setpopularityOrder(0)
                                                    }} />
                                                    Rating
                                                    <img src="https://img.icons8.com/ios/50/000000/circled-chevron-down.png" alt="down-arrow-icon" className='mr-2 cursor-pointer' onClick={() => {
                                                        setratingOrder(-1)
                                                        setpopularityOrder(0)
                                                    }} />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <div>
                                                    <img src="https://img.icons8.com/ios/50/000000/circled-chevron-up.png" alt="up-arrow-icon" className='mr-2 cursor-pointer' onClick={() => {
                                                        setpopularityOrder(1)
                                                        setratingOrder(0)
                                                    }} />
                                                    Popularity
                                                    <img src="https://img.icons8.com/ios/50/000000/circled-chevron-down.png" alt="down-arrow-icon" className='mr-2 cursor-pointer' onClick={() => {
                                                        setpopularityOrder(-1)
                                                        setratingOrder(0)
                                                    }} />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Genre
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredMovies.map((movie) => (
                                            <tr key={movie.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                                                            <img className="hidden md:block md:h-[100px] md:w-[180px] rounded" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {movie.popularity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {genreids[movie.genre_ids[0]]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <span className="cursor-pointer text-red-600 hover:text-red-900" onClick={() => removeFromFavourites(movie)}>Delete</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/** Pagination */}
            <div>
                <Pagination pageNum={currPage} nxtPage={nextPage} prvPage={prevPage} />
            </div>

        </div>
    );
}

export default Favourites;
