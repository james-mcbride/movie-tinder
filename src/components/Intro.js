import React from 'react'
import MovieCard from "./MovieCard";
import './Intro.css'
import MovieCardRating from "./MovieCardRating";

const Intro = (props) => {
    console.log(props);
    console.log(props.userInfo)
    console.log(props.username)
    console.log(props.userInfo[props.username])
    if (props.userInfo[props.username].lastWatchedMovie) {
        return (
            <div className='container'>
                <h1>Welcome to Movie Tinder!</h1>
                <div className='ui grid' id='poster'>
                    <div className='seven wide column'>
                        <h3>Review Saved Movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
                        </div>

                        <h3>Rate your watched movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('watchedMovies')}>Watched Movies</button>
                        </div>
                    </div>
                    <div className='nine wide column'>
                        <div className='introMovie'>
                            <div className="introPoster">
                                <img src={props.userInfo[props.username].lastWatchedMovie.poster} />
                                <div className='introTitle'>
                                    {props.userInfo[props.username].lastWatchedMovie.title}
                                </div>
                            </div>
                            <div className='introMovieRating'>
                                <MovieCardRating currentMovie={props.userInfo[props.username].lastWatchedMovie}  onRatedMovie={props.onRatedMovie} userInfo={props.userInfo} username={props.username} watchedMovies={props.watchedMovies}/>
                            </div>
                            </div>
                    </div>
                </div>
                <h3>Pick an available movie!!</h3>
                <div className=' ui grid'>
                    <div className='ui row'>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('single')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Single Viewing</button>
                            <div>Review all of the movies available on your subscribed streaming services. You can
                                track/rate the movies you've watched, choose movies to watch later, and receive updates
                                when new movies are posted!
                            </div>
                        </div>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('group')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Group Viewing</button>
                            <div>When trying to decide on a movie to watch with a group of friends, each of you can
                                review all the options available on your subscribed streaming services, and add any
                                movies you are down to watch! The movies that the most people in your group agreed on
                                will then be displayed and can be voted on!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if(props.userInfo[props.username].savedMovies.length>0){
        return (
            <div>
                <h1>Welcome to Movie Tinder!</h1>
                <div className='ui grid'>
                    <div className='eight wide column'>
                        <h3>Review Saved Movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
                        </div>

                        <h3>Rate your watched movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('watchedMovies')}>Watched Movies</button>
                        </div>
                    </div>
                    <div className='eight wide column'>
                        <div>Your last saved Movie</div>
                        <MovieCard movie={props.userInfo[props.username].savedMovies[0]}
                                   username={props.username} userInfo={props.userInfo}
                                   onRatedMovie={props.onRatedMovie} watchedMovies={props.watchedMovies}/>
                    </div>
                </div>
                <h3>Pick an available movie!!</h3>
                <div className=' ui grid'>
                    <div className='ui row'>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('single')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Single Viewing</button>
                            <div>Review all of the movies available on your subscribed streaming services. You can
                                track/rate the movies you've watched, choose movies to watch later, and receive updates
                                when new movies are posted!
                            </div>
                        </div>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('group')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Group Viewing</button>
                            <div>When trying to decide on a movie to watch with a group of friends, each of you can
                                review all the options available on your subscribed streaming services, and add any
                                movies you are down to watch! The movies that the most people in your group agreed on
                                will then be displayed and can be voted on!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else{
        return (
            <div>
                <h1>Welcome to Movie Tinder!</h1>
                <div className='ui grid'>
                    <div className='eight wide column'>
                        <h3>Review Saved Movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
                        </div>

                        <h3>Rate your watched movies!</h3>
                        <div>
                            <button onClick={() => props.onViewingOptionSelect('watchedMovies')}>Watched Movies</button>
                        </div>
                    </div>
                    <div className='eight wide column'>

                    </div>
                </div>
                <h3>Pick an available movie!!</h3>
                <div className=' ui grid'>
                    <div className='ui row'>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('single')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Single Viewing</button>
                            <div>Review all of the movies available on your subscribed streaming services. You can
                                track/rate the movies you've watched, choose movies to watch later, and receive updates
                                when new movies are posted!
                            </div>
                        </div>
                        <div className='eight wide column' onClick={() => props.onViewingOptionSelect('group')}>
                            <button onClick={() => props.onViewingOptionSelect('single')}>Group Viewing</button>
                            <div>When trying to decide on a movie to watch with a group of friends, each of you can
                                review all the options available on your subscribed streaming services, and add any
                                movies you are down to watch! The movies that the most people in your group agreed on
                                will then be displayed and can be voted on!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Intro;