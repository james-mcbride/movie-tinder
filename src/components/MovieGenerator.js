import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';

class MovieGenerator extends React.Component {
    state={
        username: this.props.username,
        userInfo: this.props.userInfo,
        movieNumber: 0,
        movieType: this.props.movieType,
        updatedMovies: null
    }

    onNextMovie = () => {
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})
    }

    onWatchLater = () => {
        let updatedUserInfo = this.state.userInfo;
        let currentMovie=this.state.userInfo[this.state.username][this.state.movieType][this.state.movieNumber]
        let currentSavedMovies=this.state.userInfo[this.state.username].savedMovies;
        currentSavedMovies.push(currentMovie)
        updatedUserInfo[this.state.username].savedMovies=currentSavedMovies;
        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo)
        }
        fetch(`https://private-atlantic-hosta.glitch.me/users/${this.state.userInfo.id}`,putOpt)
            .then(response =>console.log(response))
            .catch(error=>console.log(error))

        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})
    }

    onDeleteMovie = () =>{
        let updatedUserInfo={}
        let currentMovie=this.state.userInfo[this.state.username][this.state.movieType][this.state.movieNumber]
        if (this.state.updatedMovies===null) {
            updatedUserInfo = JSON.parse(JSON.stringify(this.state.userInfo));
            this.setState({updatedMovies: updatedUserInfo})
        } else{
            updatedUserInfo=this.state.updatedMovies
        }
        let currentAllMovies = updatedUserInfo[this.state.username][this.state.movieType];
        console.log('current movie' + currentMovie.title
        )
        console.log(currentAllMovies)
        let updatedAllMovies = currentAllMovies.filter(movie => movie.title!==currentMovie.title)
        console.log(updatedAllMovies)
        updatedUserInfo[this.state.username][this.state.movieType] = updatedAllMovies;


        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo)
        }

        fetch(`https://private-atlantic-hosta.glitch.me/users/${this.state.userInfo.id}/`, putOpt)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})

    }



    render(){

        return <div className='movieContainer'>
            <MovieCard movie={this.state.userInfo[this.state.username][this.state.movieType][this.state.movieNumber]}  />
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
