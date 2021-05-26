import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
  }, [props.fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h3>{props.title}</h3>

      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
              src={`${baseUrl}${
                props.isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              key={movie.id}
              alt={movie?.title || movie?.name || movie?.original_name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
