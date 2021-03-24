import React from 'react';
import MovieCard from "./MovieCard";
import './MovieCard.css';
import HomeButton from "./HomeButton";
import DisplayGroupMovies from "./DisplayGroupMovies";
import NavBar from "./NavBar";

class GroupMovieGenerator extends React.Component {
    state={
        movieNumber: 0,
        updatedUserInfo: JSON.parse(JSON.stringify(this.props.userInfo)),
        savedMovies: [],
        watchedMovies: [],
        outOfMoviesBoolean: false,
        watchNow: false,
        showVotedMovies: false,
        groupMovies: [],
        groupMembers: []
    }

    // componentDidMount(){
    //     this.setState({
    //
    //     })
    // }

    sortSubmittedMovies(movieSubmissions, groupMembers){
        let movieCounts=movieSubmissions.reduce((movieCount, movieSubmission) =>{
            if (movieCount.indexOf(movieSubmission[1])===-1){
                movieCount.push(movieSubmission[1])
            }
            return movieCount
        }, [])
        movieCounts.sort((a,b)=> b-a);
        console.log(movieSubmissions)
        console.log('after sorting')
        if (movieSubmissions.length===1){
            return movieSubmissions
        }  else if(groupMembers.length===2){
            return movieSubmissions.filter(movieSubmission=> movieSubmission[1]===movieCounts[0])
        } else{
            return movieSubmissions.filter(movieSubmission=>(movieSubmission[1]===movieCounts[0]||movieSubmission[1]=== movieCounts[1]))
        }

    }

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
                for (let i=0; i<data.length; i++){
                    if (data[i].id==[this.props.groupId]){
                        console.log('found a match!')
                        updatedGroupInfo=JSON.parse(JSON.stringify(data[i]))
                        currentSubmittedMovies=JSON.parse(JSON.stringify(data[i][this.props.groupName].movieSubmissions))
                        updatedSubmittedMovies=JSON.parse(JSON.stringify(data[i][this.props.groupName].movieSubmissions))
                    }
                }
                for (let i=0; i<myMovieSubmissions.length; i++){
                    let counter=0;
                    for (let j=0; j<currentSubmittedMovies.length; j++){
                        if (myMovieSubmissions[i].Title===currentSubmittedMovies[j][0].Title){
                            counter++;
                            updatedSubmittedMovies[j][1]++;
                        }
                    }
                    if (counter===0){
                        updatedSubmittedMovies.push([myMovieSubmissions[i],1]);
                    }
                }
                let currentGroupMembers = [...updatedGroupInfo[this.props.groupName].groupMembers];
                if (currentGroupMembers.indexOf(this.props.username)===-1) {
                    currentGroupMembers.push(this.props.username)
                    updatedGroupInfo[this.props.groupName].movieSubmissions = updatedSubmittedMovies;
                    updatedGroupInfo[this.props.groupName].groupMembers = currentGroupMembers;
                }
                let sortedSubmittedMovies= this.sortSubmittedMovies(updatedSubmittedMovies, currentGroupMembers)

                this.setState({
                    groupMovies: sortedSubmittedMovies,
                    showVotedMovies: true,
                    groupMembers: currentGroupMembers
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
            // console.log(this.state.groupMovies)
            // const renderedList = this.state.groupMovies.map((movie=>{
            //     return ( <div className="ui card votedMovie">
            //         <div className="image">
            //             <img src={movie[0].poster} />
            //         </div>
            //         <div className="content">
            //             <a className="header">{movie[0].title}</a>
            //             <div className="meta">
            //                 <span className="date">Rotten tomatoes rating: {movie[0].rating.Value} </span>
            //             </div>
            //             <div className="description">
            //                 <em>Votes: {movie[1]}</em>
            //             </div>
            //         </div>
            //
            //     </div>
            //     )
            // }))
            // return (
            //     <div id='renderedList'>{renderedList}</div>
            // )
            <NavBar tabSelect={this.props.tabSelect} activeTab="group" returnHome={this.onReturnHome}/>
            return <DisplayGroupMovies returnHome={this.props.returnHome} groupMovies={this.state.groupMovies} groupId={this.props.groupId} groupName={this.props.groupName} groupMembers={this.state.groupMembers}/>
        }
        return <div className='movieContainer'>
            <div className='submitButton'><button onClick={this.onSubmit}>Submit</button></div>
            <MovieCard movie={this.props.allMovies[this.state.movieNumber]} username={this.props.username}  userInfo={this.state.updatedUserInfo}  onRatedMovie={this.props.onRatedMovie} watchedMovies={this.props.watchedMovies}/>
            <div className='nextMovieButton' onClick={this.onNextMovie}>
                Skip
            </div>
            <div className='watchLaterButton' onClick={this.onWatchLater}>
                Watch <br/>Now!
            </div>
        </div>
    }



}
export default GroupMovieGenerator;