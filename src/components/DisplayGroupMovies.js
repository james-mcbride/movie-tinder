import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class DisplayGroupMovies extends React.Component {
    state={
        pageRefresh: false,
        refreshedMovies: []
    }

    onPageRefresh= (event) =>{
        event.preventDefault()
        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(reviewObj),
        };
        fetch(`https://private-atlantic-hosta.glitch.me/groups/${this.props.groupId}`, getOptions)
            .then (response => response.json())
            .then(data=>{
                this.setState({
                    pageRefresh: true,
                    refreshedMovies: data[this.props.groupName].movieSubmissions
                })
            })
    }

    renderContent = () => {
        let groupMovies=[];
        if (!this.state.pageRefresh){
            groupMovies=JSON.parse(JSON.stringify(this.props.groupMovies));
        } else{
            groupMovies=JSON.parse(JSON.stringify(this.state.refreshedMovies))
        }

        const renderedList = groupMovies.map((movie => {
            return (<div className="ui card votedMovie">
                    <div className="image">
                        <img src={movie[0].poster}/>
                    </div>
                    <div className="content">
                        <a className="header">{movie[0].title}</a>
                        <div className="meta">
                            <span className="date">Rotten tomatoes rating: {movie[0].rating.Value} </span>
                        </div>
                        <div className="description">
                            <em>Votes: {movie[1]}</em>
                        </div>
                    </div>

                </div>
            )
        }))
        return (
            <div id='renderedList'>
                <button id='refreshButton' onClick={this.onPageRefresh}>Refresh</button>
                <HomeButton returnHome={this.props.returnHome} userInfo={{}} username={"null"} saveInfoBoolean={false}/>
                {renderedList}
            </div>
        )
    }
    render(){
        return <div>{this.renderContent()}</div>
    }

}

export default DisplayGroupMovies