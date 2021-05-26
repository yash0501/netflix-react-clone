import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
  }, [props.fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          // URLSearchParams searches for all the parameters in the url query string
          //URL(url).search returns the string after query in any url.
          // https://www.youtube.com/watch?v=-cMqr9HpZ-Y&t=3739s here it will return v=-cMqr9HpZ-Y&t=3739s
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
              onClick={() => handleClick(movie)}
              key={movie.id}
              alt={movie?.title || movie?.name || movie?.original_name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
