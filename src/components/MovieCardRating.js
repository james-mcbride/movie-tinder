import React from 'react';
import './MovieCard.css'
class MovieCardRating extends React.Component{
    state={
        movieAlreadyRated: false,
        rating: null,
        currentMovie: null
    }
    componentDidMount() {
        let watchedMovies = JSON.parse(JSON.stringify(this.props.userInfo[this.props.username].watchedMovies));
        let counter = 0;
        let watchedMovieIndex = 0;
        for (let i = 0; i < watchedMovies.length; i++) {
            if (watchedMovies[i].Title === this.props.currentMovie.Title) {
                if (watchedMovies[i].userRating) {
                    watchedMovieIndex = i;
                }
                counter++
            }
        }
        if (counter > 0) {
            console.log(watchedMovies[watchedMovieIndex].Title+ ' = '+ this.props.currentMovie.Title)
            this.setState({
                rating: watchedMovies[watchedMovieIndex].userRating,
                movieAlreadyRated: true
            })
        }
        let currentWatchedMovie = JSON.parse(JSON.stringify(this.props.currentMovie));
        this.setState({currentMovie: currentWatchedMovie})

        console.log('Movie already rated ' + this.state.movieAlreadyRated)

    }

    componentDidUpdate() {

        let currentWatchedMovie = JSON.parse(JSON.stringify(this.props.currentMovie));
        if (currentWatchedMovie.Title!==this.state.currentMovie.Title){
            this.setState({
                currentMovie: currentWatchedMovie,
                movieAlreadyRated: false,
                rating: null
            })
            let watchedMovies = JSON.parse(JSON.stringify(this.props.userInfo[this.props.username].watchedMovies));
            let counter = 0;
            let watchedMovieIndex = 0;
            for (let i = 0; i < watchedMovies.length; i++) {
                if (watchedMovies[i].Title === this.props.currentMovie.Title) {
                    console.log(watchedMovies[i].Title+ ' = '+ this.props.currentMovie.Title)
                    if (watchedMovies[i].userRating) {
                        watchedMovieIndex = i;
                    }
                    counter++
                }this.setState({
                    currentMovie: currentWatchedMovie
                })
            }
            if (counter > 0) {
                console.log(watchedMovies[watchedMovieIndex].Title+ ' = '+ this.props.currentMovie.Title)
                this.setState({
                    rating: watchedMovies[watchedMovieIndex].userRating,
                    movieAlreadyRated: true
                })
            }

        }
    }

    rateMovie = (rating) =>{
        let watchedMovies = JSON.parse(JSON.stringify(this.props.watchedMovies));
        let updatedWatchedMovie = JSON.parse(JSON.stringify(this.props.currentMovie));
        updatedWatchedMovie.userRating = rating
        watchedMovies.unshift(updatedWatchedMovie);
        let updatedUserInfo = JSON.parse(JSON.stringify(this.props.userInfo));
        updatedUserInfo[this.props.username].watchedMovies = watchedMovies;
        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo)
        }
        fetch(`https://private-atlantic-hosta.glitch.me/users/${this.props.userInfo.id}`, putOpt)
            .then(response => console.log(response))
            .catch(error => console.log(error))
        this.setState({
            rating: rating,
        } )
        console.log('updated movie info on rating page')
        console.log(updatedUserInfo);
        this.props.onRatedMovie(watchedMovies);
    }

    renderContent() {
        if (this.state.movieAlreadyRated){
            if (this.state.rating === 1) {
                return (
                    <div>
                        <div className='stars'>
                            <div className='starDiv'>Your rating:</div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(1)}></i>
                            </div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(2)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(3)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(4)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(5)}></i></div>


                        </div>
                    </div>
                )
            } else if (this.state.rating === 2) {
                return (
                    <div>
                        <div className='stars'>
                            <div className='starDiv'>Your rating:</div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(1)}></i>
                            </div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(2)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(3)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(4)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(5)}></i></div>


                        </div>
                    </div>
                )
            } else if (this.state.rating === 3) {
                return (
                    <div>
                        <div className='stars'>
                            <div className='starDiv'>Your rating:</div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(1)}></i>
                            </div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(2)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(3)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(4)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(5)}></i></div>


                        </div>
                    </div>
                )
            } else if (this.state.rating === 4) {
                return (
                    <div>
                        <div className='stars'>
                            <div className='starDiv'>Your rating:</div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(1)}></i>
                            </div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(2)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(3)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(4)}></i></div>
                            <div className='starDiv'><i className='star outline icon'
                                                        onClick={() => this.rateMovie(5)}></i></div>


                        </div>
                    </div>
                )
            } else if (this.state.rating === 5) {
                return (
                    <div>
                        <div className='stars'>
                            <div className='starDiv'>Your rating:</div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(1)}></i>
                            </div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(2)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(3)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(4)}></i></div>
                            <div className='starDiv'><i className='star icon'
                                                        onClick={() => this.rateMovie(5)}></i></div>


                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Enter your rating:</div>
                        <div className='starDiv'><i className='star outline icon' onClick={() => this.rateMovie(1)}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={() => this.rateMovie(2)}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={() => this.rateMovie(3)}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={() => this.rateMovie(4)}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={() => this.rateMovie(5)}></i>
                        </div>
                    </div>
                </div>
            )

        } else {
            console.log(this.state.movieAlreadyRated)
            return <div>Already watched this movie? <button onClick={()=>this.setState({movieAlreadyRated: true})}>Rate</button>
            </div>
        }
    }

    render(){
        // console.log(this.props.watchedMovies)
        return <div className='movieCardRating'><br/>{this.renderContent()}</div>
    }

}
export default MovieCardRating;