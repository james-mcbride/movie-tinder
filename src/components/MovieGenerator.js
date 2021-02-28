import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';

class MovieGenerator extends React.Component {
    state={
        movies: this.props.movies,
        movieNumber: 0
    }

    onNextMovie = () => {
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})
    }

    onWatchLater = () => {
        const postOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.movies[this.state.movieNumber])
        }
        fetch("https://private-atlantic-hosta.glitch.me/savedMovies",postOpt)
            .then(response =>console.log(this.state.movies[this.state.movieNumber]))
            .catch(error=>console.log(error))

        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})
    }

    onDeleteMovie = () =>{
        let id=this.state.movies[this.state.movieNumber].id
        const deleteMethod = {
            method: 'DELETE'
        }

        fetch(`https://private-atlantic-hosta.glitch.me/allMovies/${id}`, deleteMethod)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})

    }



    render(){
        return <div className='movieContainer'>
            <MovieCard movie={this.state.movies[this.state.movieNumber]}  />
            <div className='nextMovieButton' onClick={this.onNextMovie}>
                <i className="caret square right outline icon" />
            </div>
            <div className='watchLaterButton' onClick={this.onWatchLater}>
                Watch <br/>Later
            </div>
            <div className='watchMovie'>
                Watch <br/>Now!
            </div>
            <div className='deleteMovie' onClick={this.onDeleteMovie} >
                Delete <br />Movie
            </div>
        </div>
    }



}
export default MovieGenerator;
