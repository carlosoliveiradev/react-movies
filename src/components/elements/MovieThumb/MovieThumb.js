import React from "react";
import "./MovieThumb.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieThumb = ({ image, movieId, movieName, clickable }) => {
  return (
    <div className="rmdb-moviethumb">
      {clickable ? (
        <Link
          to={{
            pathname: `/${movieId}`,
            movieName: `${movieName}`
          }}
        >
          <img src={image} alt="moviethumb" />
        </Link>
      ) : (
        <img src={image} alt="moviethumb" />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.number,
  movieId: PropTypes.number,
  movieName: PropTypes.string
};

export default MovieThumb;
