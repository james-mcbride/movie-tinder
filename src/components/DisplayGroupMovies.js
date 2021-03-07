import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class DisplayGroupMovies extends React.Component {
    state={
        pageRefresh: false,
        refreshedMovies: [],
        groupMembers: JSON.parse(JSON.stringify(this.props.groupMembers)),
        topMovie: {title: ""}
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
            // console.log(movie)
            // console.log(movie[0].rating.Value)
            // console.log(parseInt(movie[0].rating.value))
            // console.log(topMovie[0].rating.value)
            if (parseInt(movie[0].rating.Value)>parseInt(topMovie[0].rating.Value)&&movie[1]>=topMovie[1]){
                topMovie=movie;
            }
            console.log(topMovie)
            return topMovie
        }, [{rating: {Value: '1%'}},1])
        if (this.state.topMovie.title!==topMovie.title){
            this.setState({topMovie: topMovie})
        }

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
            <div id='groupMoviesPage'>
                <div id='submissionSummary'>{this.returnGroupMembers(this.state.groupMembers)}</div>
                <button id='refreshButton' onClick={this.onPageRefresh}>Refresh</button>
                <HomeButton returnHome={this.props.returnHome} groupInfo={groupInfo} username={"null"} saveInfoBoolean={false}/>
                <h2>Your groups top Movie so far!</h2>
                <div className="ui card topMovie">
                    <div className="image">
                        <img src={topMovie[0].poster}/>
                    </div>
                    <div className="content">
                        <a className="header">{topMovie[0].title}</a>
                        <div className="meta">
                            <span className="date">Rotten tomatoes rating: {topMovie[0].rating.Value} </span>
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