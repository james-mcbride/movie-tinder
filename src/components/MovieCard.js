import React from 'react';
import './MovieCard.css'

const MovieCard = (props) => {
    return (
        <div className="ui centered card movieCard">
            <div className="image">
                <img src={props.movie.poster} />
            </div>
            <div className="content">
                <a className="header">{props.movie.title}</a>
            </div>
        </div>
    )
}

export default MovieCard;