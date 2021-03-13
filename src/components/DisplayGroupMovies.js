import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class DisplayGroupMovies extends React.Component {
    state={
        pageRefresh: false,
        refreshedMovies: [],
        groupMembers: JSON.parse(JSON.stringify(this.props.groupMembers)),
        topMovie: [{title: ""},0]
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
                    refreshedMovies: data[this.props.groupName].movieSubmissions,
                    groupMembers: data[this.props.groupName].groupMembers
                })
            })
    }

    returnGroupMembers(groupMembers){
        let submitSummary= `${groupMembers.length} submissions: `
        if (groupMembers.length>=1){
            submitSummary+=groupMembers[0]
            for (let i=1; i<groupMembers.length; i++){
                submitSummary+=`, ${groupMembers[i]}`
            }
        }
        return submitSummary;
    }

    renderContent = () => {
        let groupMovies=[];


        if (!this.state.pageRefresh){
            groupMovies=JSON.parse(JSON.stringify(this.props.groupMovies));
        } else{
            groupMovies=JSON.parse(JSON.stringify(this.state.refreshedMovies))
        }
        let topMovie=groupMovies.reduce((topMovie,movie)=>{
            console.log("topMovie "+topMovie[0].Title+" IMDBRating"+topMovie[0].imdbRating+" votes"+ topMovie[1])
             console.log("movie "+ movie[0].Title+" IMDBRating"+movie[0].imdbRating+" votes"+ movie[1])
            if (movie[1]>topMovie[1]||(Number(movie[0].imdbRating)>=Number(topMovie[0].imdbRating)&&movie[1]>=topMovie[1])){
                // console.log(movie[0],movie[1],topMovie[0],topMovie[1])
                topMovie=JSON.parse(JSON.stringify(movie));
            }
            return topMovie
        }, [{imdbRating: ".1"},0])
        console.log(topMovie)
        if (this.state.topMovie.Title!==topMovie.Title){
            this.setState({topMovie: topMovie})
        }
        console.log(topMovie)

        let groupInfo = {
            groupMovies: groupMovies,
            groupId: this.props.groupId,
            groupName: this.props.groupName,
            groupMembers: this.state.groupMembers,
            topMovie: this.state.topMovie
        }

        const renderedList = groupMovies.map((movie => {
            return (<div className="ui card votedMovie">
                    <div className="image">
                        <img src={movie[0].Poster}/>
                    </div>
                    <div className="content">
                        <a className="header">{movie[0].Title}</a>
                        <div className="meta">
                            <span className="date">IMDB rating: {movie[0].imdbRating} </span>
                        </div>
                        <div className="description">
                            <em>Votes: {movie[1]}</em>
                        </div>
                    </div>

                </div>
            )
        }))
        return (
            <div id='groupMoviesPage'>
                <div id='submissionSummary'>{this.returnGroupMembers(this.state.groupMembers)}</div>
                <button id='refreshButton' onClick={this.onPageRefresh}>Refresh</button>
                <HomeButton returnHome={this.props.returnHome} groupInfo={groupInfo} username={"null"} saveInfoBoolean={false}/>
                <h2>Your groups top Movie so far!</h2>
                <div className="ui card topMovie">
                    <div className="image">
                        <img src={topMovie[0].Poster}/>
                    </div>
                    <div className="content">
                        <a className="header">{topMovie[0].Title}</a>
                        <div className="meta">
                            <span className="date">IMDB rating: {topMovie[0].imdbRating} </span>
                        </div>
                        <div className="description">
                            <em>Votes: {topMovie[1]}</em>
                        </div>
                    </div>

                </div>
                <h2>Top Voted Movies so far!</h2>
            <div id='renderedList'>
                {renderedList}
            </div>
            </div>
        )
    }
    render(){
        return <div>{this.renderContent()}</div>
    }

}

export default DisplayGroupMovies