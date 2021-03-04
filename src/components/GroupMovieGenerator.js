import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class GroupMovieGenerator extends React.Component {
    state={
        movieNumber: 0,
        updatedUserInfo: JSON.parse(JSON.stringify(this.props.userInfo)),
        savedMovies: [],
        watchedMovies: [],
        outOfMoviesBoolean: false,
        watchNow: false
    }

    // componentDidMount(){
    //     this.setState({
    //
    //     })
    // }

    onNextMovie = () => {
        let newMovieNumber = this.state.movieNumber+1;
        if (newMovieNumber===this.props.allMovies.length){
            this.setState({outOfMoviesBoolean: true})
        }
        this.setState({movieNumber: newMovieNumber})
    }

    onWatchLater = () => {
        let currentMovie=this.props.allMovies[this.state.movieNumber]
        let currentSavedMovies=JSON.parse(JSON.stringify(this.state.savedMovies));
        currentSavedMovies.unshift(currentMovie.title);
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({
            movieNumber: newMovieNumber,
            savedMovies: currentSavedMovies
        })
        console.log(currentSavedMovies)
    }


    render(){
        if (this.state.outOfMoviesBoolean||this.props.allMovies.length===0){
            return <div>You have run out of movies!<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username}/></div>
        }
        return <div className='movieContainer'>
            <div className='submitButton'><button>Submit1</button></div>
            <MovieCard movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
            <div className='nextMovieButton' onClick={this.onNextMovie}>
                <i className="caret square right outline icon" />
            </div>
            <div className='watchLaterButton' onClick={this.onWatchLater}>
                Watch <br/>Later
            </div>
        </div>
    }



}
export default GroupMovieGenerator;