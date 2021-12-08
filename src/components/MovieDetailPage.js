
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MovieDetailPage(props) {

    const [movieDetail, setMovieDetail] = useState({})
    const { imdbId } = useParams(); //load imdbId from  "/:imdb" from index.js

    useEffect(() => {

        fetchMovieDetailsById(imdbId)
    }, [])

    const fetchMovieDetailsById = (imdbId) => {

        const MovieDetailsURL = `https://www.omdbapi.com/?i=${imdbId}&apikey=376544e9`

        fetch(MovieDetailsURL)
            .then(response => response.json())
            .then(result => {
                setMovieDetail(result)
            })
    }

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col col-lg-10 mt-5">
                    <div class="text-center">
                        <img src={movieDetail.Poster} />
                        <h2 class="mt-3">{movieDetail.Title} ({movieDetail.Year})</h2>
                    </div>
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">Plot:</th>
                                <td>{movieDetail.Plot}</td>
                            </tr>
                            <tr>
                                <th scope="row">Released:</th>
                                <td>{movieDetail.Released}</td>
                            </tr>
                            <tr>
                                <th scope="row">Runtime:</th>
                                <td>{movieDetail.Runtime}</td>
                            </tr>
                            <tr>
                                <th scope="row">Genre:</th>
                                <td>{movieDetail.Genre}</td>
                            </tr>
                            <tr>
                                <th scope="row">Director:</th>
                                <td>{movieDetail.Director}</td>
                            </tr>
                            <tr>
                                <th scope="row">Writer:</th>
                                <td>{movieDetail.Writer}</td>
                            </tr>
                            <tr>
                                <th scope="row">Actors:</th>
                                <td>{movieDetail.Actors}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailPage