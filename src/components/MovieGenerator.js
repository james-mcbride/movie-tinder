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
        watchNow: false,
        swiping:"waiting for swipe",
        touchStart: 0,
        touchEnd: 0,
        getStarted: true
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

    // handleTouchStart = () =>{
    //     this.setState({swiping:"true"})
    // }
    //
    // handleTouchMove = () =>{
    //     console.log({swiping:"currently swiping"})
    // }
    //
    // handleTouchEnd = () =>{
    //     this.setState({swiping:"finished swiping"})
    // }



     handleTouchStart =(e) => {
         e.preventDefault();

         if (this.state.getStarted){
            this.setState({getStarted: setTimeout(function(){return false}, 100)})
        }

        this.setState({
            touchStart: e.targetTouches[0].clientX,
            touchEnd: e.targetTouches[0].clientX
        })
    }

    handleTouchMove =(e) => {
        e.preventDefault();
        this.setState( {touchEnd :e.targetTouches[0].clientX})
    }

 handleTouchEnd =() =>{
        if (this.state.touchStart - this.state.touchEnd > 40) {
            // do your stuff here for left swipe
            this.onNextMovie();

            this.setState({swiping:"swiped left"})

        }

        if (this.state.touchStart - this.state.touchEnd < -40) {
            // do your stuff here for right swipe
            this.onWatchLater();
            this.setState({swiping:"swiped right"})
        }
    }

    onGetStarted = () =>{
        this.setState({getStarted: false})
    }

    renderContent(){
        let hideButtons="";
        if (window.innerWidth<600){
            hideButtons= "hideButton"
        }

        if (this.state.outOfMoviesBoolean||this.props.allMovies.length===0){
            return <div>You have run out of movies!</div>
        }
        if (this.state.watchNow){
            return <div>
                <div>Enjoy watching {this.props.allMovies[this.state.movieNumber].title}! </div>
            </div>
        }
        if (this.state.getStarted){
            return (<div className="movieContainer"  onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}  onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}  onTouchEnd={() => this.handleTouchEnd()}>
                {/*<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username} saveInfoBoolean={true}/>*/}
                <MovieCard flipCard="false" movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
                <div className={'nextMovieButton '} id="saveMovieDirections" onClick={this.onNextMovie}>
                    Swipe Right to add to Saved Movies <br/>
                    <i className="large angle double right icon" />



                </div>
                <div className={'watchLaterButton'} id="skipMovieDirections" onClick={this.onGetStarted}>
                    Swipe left to skip movie. <br />
                    <i className="large angle double left icon" />


                </div>
                    <div className={'watchLaterButton'} id="begin" onClick={this.onGetStarted}>
                        <strong>Tap anywhere to begin!!</strong><br />
                        <i className="large icon dot circle" />

                    </div>
                    <div className={'watchLaterButton'} id="tapDirections" onClick={this.onGetStarted}>
                        Tap on movie to view additional information
                        <i className="large icon dot circle" />


                    </div>
                <div className='watchMovie' id="watchMovieDirections" onClick={this.onGetStarted}>
                    Click watch now to add movie to watched list and finish swiping.
                </div>
                <div className='deleteMovie' id="deleteMovieDirections" onClick={this.onGetStarted} >
                    Click delete movie to never see again on single viewing.
                </div>
            </div>
            )
        }
        return (<div className="movieContainer"  onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}  onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}  onTouchEnd={() => this.handleTouchEnd()}>
            {/*<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username} saveInfoBoolean={true}/>*/}
            <MovieCard flipCard="true" movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
            <div className={'nextMovieButton '+ hideButtons} onClick={this.onNextMovie}>
                Skip <br/> Movie
            </div>
            <div className={'watchLaterButton '+hideButtons} onClick={this.onWatchLater}>
                Watch <br/>Later
            </div>
            <div className='watchMovie' onClick={this.onWatchNow}>
                Watch Now!
            </div>
            <div className='deleteMovie' onClick={this.onDeleteMovie} >
                Delete Movie
            </div>
        </div>
        )

    }




    render() {
        console.log(window.innerWidth);
        return (
            <div className="outerContainer">
            <NavBar tabSelect={this.props.tabSelect} activeTab="movieGenerator" returnHome={this.props.returnHome}  userInfo={this.state.updatedUserInfo} username={this.props.username} saveInfoBoolean={true}/>
                {this.renderContent()}
            </div>
        )
    }



}
export default MovieGenerator;
