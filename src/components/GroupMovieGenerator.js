import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";

class GroupMovieGenerator extends React.Component {
    state={
        movieNumber: 0,
        updatedUserInfo: JSON.parse(JSON.stringify(this.props.userInfo)),
        savedMovies: [],
        watchedMovies: [],
        outOfMoviesBoolean: false,
        watchNow: false,
        showVotedMovies: false,
        groupMovies: []
    }

    // componentDidMount(){
    //     this.setState({
    //
    //     })
    // }

    onNextMovie = () => {
        let newMovieNumber = this.state.movieNumber+1;
        if (newMovieNumber===this.props.allMovies.length){
            this.setState({outOfMoviesBoolean: true})
        }
        this.setState({movieNumber: newMovieNumber})
    }

    onWatchLater = () => {
        let currentMovie=this.props.allMovies[this.state.movieNumber]
        let currentSavedMovies=JSON.parse(JSON.stringify(this.state.savedMovies));
        currentSavedMovies.unshift(currentMovie);
        let newMovieNumber = this.state.movieNumber+1;
        this.setState({
            movieNumber: newMovieNumber,
            savedMovies: currentSavedMovies
        })
        console.log(currentSavedMovies)
    }
    onSubmit= () =>{
        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(reviewObj),
        };
        fetch("https://private-atlantic-hosta.glitch.me/groups", getOptions)
            .then (response => response.json())
            .then(data=>{
                let currentSubmittedMovies=[];
                let myMovieSubmissions=this.state.savedMovies;
                let updatedSubmittedMovies=[]
                let updatedGroupInfo={};
                console.log(data)
                console.log(this.props.groupId)
                for (let i=0; i<data.length; i++){
                    console.log(data[i].id)
                    if (data[i].id==[this.props.groupId]){
                        console.log('found a match!')
                        updatedGroupInfo=JSON.parse(JSON.stringify(data[i]))
                        currentSubmittedMovies=JSON.parse(JSON.stringify(data[i][this.props.groupName].movieSubmissions))
                        updatedSubmittedMovies=JSON.parse(JSON.stringify(data[i][this.props.groupName].movieSubmissions))
                    }
                }
                console.log('data i grabbed from server')
                console.log(updatedGroupInfo)
                console.log(currentSubmittedMovies)
                for (let i=0; i<myMovieSubmissions.length; i++){
                    let counter=0;
                    for (let j=0; j<currentSubmittedMovies.length; j++){
                        if (myMovieSubmissions[i].title===currentSubmittedMovies[j][0].title){
                            counter++;
                            updatedSubmittedMovies[j][1]++;
                        }
                    }
                    if (counter===0){
                        updatedSubmittedMovies.push([myMovieSubmissions[i],1]);
                    }
                }
                updatedGroupInfo[this.props.groupName].movieSubmissions=updatedSubmittedMovies;
                this.setState({
                    groupMovies: updatedSubmittedMovies,
                    showVotedMovies: true
                })
                console.log('Info I just submitted below')
                console.log(updatedGroupInfo)
                console.log(updatedSubmittedMovies)
        const putOpt = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGroupInfo)
        }

        fetch(`https://private-atlantic-hosta.glitch.me/groups/${this.props.groupId}/`, putOpt)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            })

    }


    render(){
        if (this.state.outOfMoviesBoolean||this.props.allMovies.length===0){
            return <div>You have run out of movies!<HomeButton returnHome={this.props.returnHome} userInfo={this.state.updatedUserInfo} username={this.props.username}/></div>
        }
        if (this.state.showVotedMovies){
            console.log(this.state.groupMovies)
            const renderedList = this.state.groupMovies.map((movie=>{
                return <div className='votedMovie'>
                    <div><img src={movie[0].poster}/></div>
                    <div>
                        <div>{movie[0].title }</div>
                        <div>Votes: {movie[1]}</div>
                    </div>
                </div>
            }))
            return (
                <div className='renderedList'>{renderedList}</div>
            )
        }
        return <div className='movieContainer'>
            <div className='submitButton'><button onClick={this.onSubmit}>Submit1</button></div>
            <MovieCard movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
            <div className='nextMovieButton' onClick={this.onNextMovie}>
                <i className="caret square right outline icon" />
            </div>
            <div className='watchLaterButton' onClick={this.onWatchLater}>
                Watch <br/>Later
            </div>
        </div>
    }



}
export default GroupMovieGenerator;