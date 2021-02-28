import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';

class MovieGenerator extends React.Component {
    state={
        username: this.props.username,
        userInfo: this.props.userInfo,
        movieNumber: 0,
        movieType: this.props.movieType,
        updatedMovies: null,
        allMovies: this.props.allMovies
    }

    onNextMovie = () => {
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({movieNumber: newMovieNumber})
    }

    onWatchLater = () => {
        let updatedUserInfo = this.state.userInfo;
        let currentMovie=this.state.allMovies[this.state.movieNumber]
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
        if (this.state.movieType==='allMovies') {
             updatedUserInfo = this.state.userInfo;
            let currentMovie = updatedUserInfo[this.state.username][this.state.movieType][this.state.movieNumber]
            let currentDeletedList = this.state.userInfo[this.state.username].deletedMovies;
            currentDeletedList.push(currentMovie)
            updatedUserInfo[this.state.username].deletedMovies = currentDeletedList;
        } else if (this.state.movieType==='savedMovies'){
             updatedUserInfo = JSON.parse(JSON.stringify(this.state.userInfo));
            let currentMovie = updatedUserInfo[this.state.username][this.state.movieType][this.state.movieNumber]
            let currentSavedList = updatedUserInfo[this.state.username].savedMovies;

            for (let i=0; i<currentSavedList.length; i++){
                if( currentSavedList[i].title===currentMovie.title){
                    currentSavedList.splice(i,1);
                }
            }
            updatedUserInfo[this.state.username].savedMovies=currentSavedList;
        }



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
            <MovieCard movie={this.state.allMovies[this.state.movieNumber]}  />
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
