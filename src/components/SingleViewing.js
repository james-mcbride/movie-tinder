import React from 'react'
import MovieCard from "./MovieCard";
import './Intro.css'
import MovieCardRating from "./MovieCardRating";
import DisplayGroupMovies from "./DisplayGroupMovies";
import './MovieCard.css'
import Search from "./Search";
import NavBar from "./NavBar";

class SingleViewing extends React.Component{
    state={
        displayGroupMovies: false,
    }



    renderContent() {
        if (this.props.userInfo[this.props.username].lastWatchedMovie) {
            return (
                <div className="introPoster" id="lastWatchedMovie">
                    <img src={this.props.userInfo[this.props.username].lastWatchedMovie.Poster}/>
                    <div className='introTitle'>
                        Your last watched movie: <br/>
                        {this.props.userInfo[this.props.username].lastWatchedMovie.Title}
                    </div>
                    <div className='introMovieRating'>
                        <MovieCardRating currentMovie={this.props.userInfo[this.props.username].lastWatchedMovie}
                                         onRatedMovie={this.props.onRatedMovie} userInfo={this.props.userInfo}
                                         username={this.props.username} watchedMovies={this.props.watchedMovies}/>
                    </div>
                </div>

            )
        } else if (this.props.userInfo[this.props.username].savedMovies.length > 0) {
            return (
                <div className='introPoster' id="lastSavedMovie">
                    <img src={this.props.userInfo[this.props.username].savedMovies[0].Poster}/>
                    <div className='introTitle'>
                        Your last saved Movie: <br/>
                        {this.props.userInfo[this.props.username].savedMovies[0].Title}
                    </div>
                    <div className='introMovieRating'>
                        <MovieCardRating currentMovie={this.props.userInfo[this.props.username].savedMovies[0]}
                                         onRatedMovie={this.props.onRatedMovie} userInfo={this.props.userInfo}
                                         username={this.props.username} watchedMovies={this.props.watchedMovies}/>
                    </div>
                </div>

            )
        } else {
            return (<div></div>)
        }
    }

    render(){
        return <div id="outerContainer">
            <NavBar tabSelect={this.props.tabSelect} activeTab="single" returnHome={this.onReturnHome}/>
            <div className='container'>
                <h1>Welcome to Movie Tinder!</h1>
                <div className='ui grid' id='poster'>
                    <div className='seven wide column'>
                        <div className='' onClick={() => this.props.onViewingOptionSelect('single')}>
                            <button onClick={() => this.props.onViewingOptionSelect('single')}>Single Viewing</button>
                            <div>Review all of the movies available on your subscribed streaming services. You can
                                track/rate the movies you've watched, choose movies to watch later, and receive
                                updates
                                when new movies are posted!
                            </div>
                        </div>

                        <br/>
                    </div>
                    <div className='nine wide column'>
                        <div className='introMovie'>
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
                <h3>Review your saved / Watched Movies</h3>
                <div className=' ui grid'>
                    <div className='ui row'>
                        <div className="eight wide column">
                            <h3>Review Saved Movies!</h3>
                            <div>
                                <button onClick={() => this.props.onViewingOptionSelect('savedMovies')}>Saved
                                    Movies
                                </button>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <h3>Rate your watched movies!</h3>
                            <div>
                                <button onClick={() => this.props.onViewingOptionSelect('watchedMovies')}>Watched
                                    Movies
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SingleViewing;