import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";
import NavBar from "./NavBar";

class MovieGenerator extends React.Component {
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
        let updatedUserInfo=JSON.parse(JSON.stringify(this.state.updatedUserInfo));
        let currentMovie=this.props.allMovies[this.state.movieNumber]
        let currentSavedMovies=updatedUserInfo[this.props.username].savedMovies;
        currentSavedMovies.unshift(currentMovie)
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

    onWatchNow = () =>{
        let updatedUserInfo = JSON.parse(JSON.stringify(this.state.updatedUserInfo));
        let currentMovie = this.props.allMovies[this.state.movieNumber]
        updatedUserInfo[this.props.username].lastWatchedMovie=currentMovie
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

        this.setState({
            updatedUserInfo: updatedUserInfo,
            watchNow: true
        })
    }

    renderContent(){
        if (this.state.outOfMoviesBoolean||this.props.allMovies.length===0){
            return <div>You have run out of movies!</div>
        }
        if (this.state.watchNow){
            return <div>
                <div>Enjoy watching {this.props.allMovies[this.state.movieNumber].title}! </div>
            </div>
        }
        return (<div className="movieContainer">
            {/*<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username} saveInfoBoolean={true}/>*/}
            <MovieCard movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
            <div className='nextMovieButton' onClick={this.onNextMovie}>
                Skip <br/> Movie
            </div>
            <div className='watchLaterButton' onClick={this.onWatchLater}>
                Watch <br/>Later
            </div>
            <div className='watchMovie' onClick={this.onWatchNow}>
                Watch <br/>Now!
            </div>
            <div className='deleteMovie' onClick={this.onDeleteMovie} >
                Delete <br />Movie
            </div>
        </div>
        )

    }


    render() {
        return (
            <div className="outerContainer">
            <NavBar tabSelect={this.props.tabSelect} activeTab="movieGenerator" returnHome={this.props.returnHome}  userInfo={this.state.updatedUserInfo} username={this.props.username} saveInfoBoolean={true}/>
                {this.renderContent()}
            </div>
        )
    }



}
export default MovieGenerator;
