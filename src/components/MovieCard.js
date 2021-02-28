import React from 'react';
import './MovieCard.css'
import youtube from '../apis/youtube';
import VideoDetail from "./VideoDetail";



class MovieCard extends React.Component {
    state={
        selectedVideo: null
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
        this.onTermSubmit(this.props.movie.title + 'trailer');
    }
    componentDidUpdate() {
        this.onTermSubmit(this.props.movie.title + 'trailer');

    }

    render() {
        return (
            <div className='flip-card'>
                <div className='flip-card-inner'>
                    <div className="movieCard flip-card-front">
                        <div className="image">
                            <img src={this.props.movie.poster}/>
                        </div>
                        <div className="content">
                            <h2>{this.props.movie.title}</h2>
                        </div>
                    </div>
                    <div className="movieCard flip-card-back">
                        <h2>{this.props.movie.title} {this.props.movie.year}</h2>
                        <h3>Rotten tomatoes rating: {this.props.movie.rating.Value}</h3>
                        <VideoDetail video={this.state.selectedVideo} />
                        <h3>Plot</h3>
                        <div>{this.props.movie.plot}</div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MovieCard;