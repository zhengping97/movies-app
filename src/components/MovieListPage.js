
import { useState, useLayoutEffect, useEffect } from 'react'
import { findRenderedComponentWithType } from 'react-dom/test-utils'
import { NavLink } from 'react-router-dom'

function MovieListPage() {

    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [noMoviesFound, setNoMoviesFound] = useState(false)

    useEffect(() => {
        //get movie name from local storage
        let term = localStorage.getItem("searchTerm")
        if (term) {
            fetchMovies(term)
        }
    }, [])

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const clearResults = () => {
        setMovies([])
        setSearchTerm('')
        localStorage.removeItem("searchTerm")
    }

    const fetchMovies = (movieName) => {
        const searchURL = `https://www.omdbapi.com/?s=${movieName}&apikey=376544e9`

        //put movie name in local storage
        localStorage.setItem("searchTerm", movieName)

        fetch(searchURL)
            .then(response => response.json())
            .then(result => {

                if (result.Error) {
                    setMovies([])
                    setNoMoviesFound(true)
                }
                else {
                    setMovies(result.Search)
                    setNoMoviesFound(false)
                }
            })
    }

    const movieItems = movies.map(movie => {
        return (
            <div key={movie.imdbID}>
                <div class="col">
                    <div class="card shadow-sm">
                        <img src={movie.Poster == "N/A" ? "/missingMovie.jpg" : movie.Poster} class="bd-placeholder-img card-img-top" />
                        <div class="card-body">
                            <h4>{movie.Title}</h4>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <NavLink to={`/${movie.imdbID}`}>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Details</button>
                                    </NavLink>
                                </div>
                                <small class="text-muted">{movie.Year}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Movie Search</h1>
                        <h5 class="lead text-muted">Search the titles of your favourite movie! We will find the movies for you!</h5>
                        <p>
                            <input type="text" class="form-control" onChange={handleSearchTermChange} placeholder="Enter your title..." />
                        </p>
                        <p>
                            <button onClick={() => fetchMovies(searchTerm)} class="btn btn-primary my-2 me-2">Search</button>
                            <button onClick={clearResults} class="btn btn-secondary my-2">Clear Results</button>
                        </p>
                    </div>
                </div>
            </section>

            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {movieItems}
                    </div>
                </div>
            </div>
            {noMoviesFound ? <h1>No movies found</h1> : null}
        </div>
    )
}

export default MovieListPage