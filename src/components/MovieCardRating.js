import React from 'react';
import './MovieCard.css'
class MovieCardRating extends React.Component{
    state={
        currentMovie: this.props.currentMovie,
        watchedMovies: this.props.watchedMovies,
        rateMovie: false,
        rating: null
    }
    componentDidMount() {

    }

    rateMovie = () =>{
        this.setState({rateMovie: true})
    }

    returnRating = (rating) =>{
        this.setState({1:"star icon"})
        // if (rating>1){
        //     this.setState({2:"star icon"})
        // }
        // if (rating>2){
        //     this.setState({3:"star icon"})
        // }
        // if (rating>3){
        //     this.setState({4:"star icon"})
        // }
        // if (rating>4){
        //     this.setState({5:"star icon"})
        // }
    }


    renderContent(){
        if (!this.state.rateMovie) {
            let counter = 0;
            for (let i = 0; i < this.state.watchedMovies.length; i++) {
                if (this.state.watchedMovies[i].title === this.state.currentMovie.title) {
                    counter++
                }
            }
            if (counter > 0) {
                return <div>Watched! Rating: X.X/10</div>
            } else {
                return <div>Already watched this movie? <button onClick={this.rateMovie}>Rate</button></div>
            }
        }
        if (this.state.rating===1){
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Your rating:</div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>
            )
        } else if(this.state.rating===2){
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Your rating:</div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>
            )
        } else if(this.state.rating===3){
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Your rating:</div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>
            )
        } else if(this.state.rating===4){
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Your rating:</div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>
            )
        } else if(this.state.rating===5){
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Your rating:</div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>
            )
        }
            return (
                <div>
                    <div className='stars'>
                        <div className='starDiv'>Enter your rating:</div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 1})}></i>
                        </div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 2})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 3})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 4})}></i></div>
                        <div className='starDiv'><i className='star outline icon' onClick={()=>this.setState({rating: 5})}></i></div>


                    </div>
                </div>

            )

    }

    render(){
        return <div className='movieCardRating'><br/>{this.renderContent()}</div>
    }

}
export default MovieCardRating;