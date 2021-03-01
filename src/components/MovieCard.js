import React from 'react';
import './MovieCard.css'
import youtube from '../apis/youtube';
import VideoDetail from "./VideoDetail";



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
    }

    loadYoutube = () => {
        this.setState({loadYoutube: this.props.movie.title})
        this.onTermSubmit(this.props.movie.title + ' trailer');

    }

    renderContent(){
        if (this.state.loadYoutube===this.props.movie.title) {
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
                            <img src={this.props.movie.poster}/>
                        </div>
                        <div className="content">
                            <h2>{this.props.movie.title}</h2>
                        </div>
                    </div>
                    <div className="movieCard flip-card-back">
                        <h2>{this.props.movie.title} {this.props.movie.year}</h2>
                        <h3>Rotten tomatoes rating: {this.props.movie.rating.Value}</h3>
                        <div>{this.renderContent()}</div>
                        <h3>Plot</h3>
                        <div>{this.props.movie.plot}</div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MovieCard;