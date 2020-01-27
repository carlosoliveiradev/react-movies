import React, { Component } from "react";
import { API_KEY, API_URL } from "../../config";
import Actor from "../elements/Actor/Actor";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import Navigation from "../elements/Navigation/Navigation";
import Spinner from "../elements/Spinner/Spinner";

import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });

    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { movieId } = this.props.match.params;

    try {
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        this.setState({ loading: false });
      }

      this.setState({ movie: result });
      const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
      const creditsResult = await (await fetch(creditsEndpoint)).json();

      const directors = creditsResult.crew.filter(
        member => member.job === "Director"
      );

      this.setState({
        actors: creditsResult.cast,
        directors,
        loading: false
      });
    } catch (e) {
      console.log("There was an error.");
    }
  };

  render() {
    const { movieName } = this.props.location;

    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation movie={movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}

        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => (
                <Actor key={i} actor={element} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No movie found</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
