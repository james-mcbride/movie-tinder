import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class MovieGenerator extends React.Component {
    state={
        movieNumber: 0,
        updatedUserInfo: JSON.parse(JSON.stringify(this.props.userInfo)),
        savedMovies: [],
        watchedMovies: [],
        outOfMoviesBoolean: false
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
        let updatedUserInfo=JSON.parse(JSON.stringify(this.state.updatedUserInfo));
        let currentMovie=this.props.allMovies[this.state.movieNumber]
        let currentSavedMovies=updatedUserInfo[this.props.username].savedMovies;
        currentSavedMovies.push(currentMovie)
        updatedUserInfo[this.props.username].savedMovies=currentSavedMovies;
        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo)
        }
        fetch(`https://private-atlantic-hosta.glitch.me/users/${this.props.userInfo.id}`,putOpt)
            .then(response =>console.log(response))
            .catch(error=>console.log(error))
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({
            movieNumber: newMovieNumber,
            updatedUserInfo: updatedUserInfo
        })

    }

    onDeleteMovie = () => {
        let updatedUserInfo = JSON.parse(JSON.stringify(this.state.updatedUserInfo));
        if (this.props.movieType === 'allMovies') {
            let currentMovie = this.props.allMovies[this.state.movieNumber]
            let currentDeletedList = updatedUserInfo[this.props.username].deletedMovies;
            currentDeletedList.push(currentMovie)
            updatedUserInfo[this.props.username].deletedMovies = currentDeletedList;
        } else if (this.props.movieType === 'savedMovies') {
            let currentMovie = this.props.allMovies[this.state.movieNumber]
            let currentSavedList = updatedUserInfo[this.props.username].savedMovies;
            for (let i = 0; i < currentSavedList.length; i++) {
                if (currentSavedList[i].title === currentMovie.title) {
                    currentSavedList.splice(i, 1);
                }
            }
            updatedUserInfo[this.props.username].savedMovies = currentSavedList;
        }
        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo)
        }

        fetch(`https://private-atlantic-hosta.glitch.me/users/${this.props.userInfo.id}/`, putOpt)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        let newMovieNumber = this.state.movieNumber+1;
        this.setState({
            updatedUserInfo: updatedUserInfo,
            movieNumber: newMovieNumber
        })

    }




    render(){
        if (this.state.outOfMoviesBoolean){
            return <div>You have run out of movies!<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username}/></div>
        }
        return <div className='movieContainer'>
            <HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username} />
            <MovieCard movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
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
