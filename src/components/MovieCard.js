import React from 'react';
import './MovieCard.css'
import youtube from '../apis/youtube';
import VideoDetail from "./VideoDetail";
import MovieCardRating from "./MovieCardRating";



class MovieCard extends React.Component {
    state={
        selectedVideo: null,
        loadYoutube: false
    }
    onTermSubmit = async (term) =>{
        console.log(term);
        const response= await youtube.get('/search', {
            params: {
                q: term,
                type: 'video'
            }
        })
        this.setState({
            selectedVideo: response.data.items[0]
        });
    }


    componentDidMount() {
        this.setState({loadYoutube: false})
        console.log(this.props.userInfo)
        console.log(this.props.username)
    }

    loadYoutube = () => {
        this.setState({loadYoutube: this.props.movie.Title})
        this.onTermSubmit(this.props.movie.Title + ' trailer');

    }

    renderContent(){
        if (this.state.loadYoutube===this.props.movie.Title) {
            return <VideoDetail video={this.state.selectedVideo}/>
        }

        return <button onClick={this.loadYoutube}>Load Youtube Trailer</button>
    }

    render() {
        return (
            <div className='flip-card'>
                <div className='flip-card-inner'>
                    <div className="movieCard flip-card-front">
                        <div className="image">
                            <img src={this.props.movie.Poster}/>
                        </div>
                        <div className="content">
                            <h2>{this.props.movie.Title}</h2>
                        </div>
                    </div>
                    <div className="movieCard flip-card-back">
                        <h2>{this.props.movie.Title} {this.props.movie.Year}</h2>
                        <h3>IMDB rating: {this.props.movie.imdbRating}</h3>
                        <div>{this.renderContent()}</div>
                        <h3>Plot</h3>
                        <div>{this.props.movie.Plot}</div>

                    </div>
                </div>
                <MovieCardRating currentMovie={this.props.movie}  onRatedMovie={this.props.onRatedMovie} userInfo={this.props.userInfo} username={this.props.username} watchedMovies={this.props.watchedMovies}/>
            </div>
        )
    }
}

export default MovieCard;