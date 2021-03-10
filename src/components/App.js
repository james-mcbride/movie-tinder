import React from 'react';
import Intro from "./Intro";
import Login from './Login'
import SingleUserSetup from "./SingleUserSetup";
import GroupSetup from "./GroupSetup";
import MovieCard from './MovieCard';
import JSONServer from "../apis/JSONServer";
import MovieGenerator from "./MovieGenerator";
import Register from "./Register";
import GroupMovieGenerator from "./GroupMovieGenerator";

class App extends React.Component {
    state={
        viewingChoice: '',
        preferences: null,
        newGroup: false,
        showMovies: false,
        allMovies: [],
        newUserBoolean: false,
        savedMovies: [],
        watchedMovies: [],
        login: false,
        username: '',
        userID: '',
        userInfo: {},
        returnHome: false,
        groupMovies: '',
        groupId: '',
        groupName: '',
        groupInfo: "",
        serverMovies: ""
    }

    componentDidMount(){

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(reviewObj),
        };
        fetch("https://private-atlantic-hosta.glitch.me/streamingMovies", getOptions)
            .then (response => response.json())
            .then(data=>{
                 let disneyMovies=data[0].disneyPlus;
                // let netflixMovies=data[1].netflix;
                // let allMovies=disneyMovies.concat(netflixMovies)
                this.setState({
                    serverMovies: [["disneyPlus",disneyMovies], ["netflix", []], ["hulu", []], ["amazonPrime", []]],
                })
            })
    }

    sortMoviesWithPreferences(services, genres, sortingMethod){
        console.log(services, genres, sortingMethod)
        let allMovies=[];
        for (let i=0; i<this.state.serverMovies.length; i++){
            for (let j=0; j<services.length; j++){
                if (this.state.serverMovies[i][0]===services[j]){
                    allMovies.push.apply(allMovies,this.state.serverMovies[i][1])
                }
            }
        }
        let sortedGenreMovies=[]
        console.log('allMovies length: '+allMovies.length)
        if (genres[0]==="All"){
            sortedGenreMovies=allMovies;
        } else{
            sortedGenreMovies=allMovies.filter(movie=>{
                let counter=0;
                for (let i=0; i<genres.length; i++){
                    if (movie.Genre.includes(genres[i])){
                        counter++
                    }
                    if (counter>0){
                        break;
                    }
                }
                return counter>0;
            })
        }
        console.log("sorted movies length after genre check: "+sortedGenreMovies.length)

        if (sortingMethod==="IMDB Rating"){
            sortedGenreMovies.sort((a,b)=>{
                if (a.imdbRating==="N/A"){
                    a.imdbRating=0;
                } else if(b.imdbRating==="N/A"){
                    b.imdbRating=0;
                } else{

                }
                return Number(b.imdbRating) - Number(a.imdbRating)

            })
        } else if(sortingMethod==="Box Office Hits"){
            console.log("sorting by box office hits")
            sortedGenreMovies.sort((a,b)=>{
                let ab=a.BoxOffice;
                let bb=b.BoxOffice;

                if (ab==="N/A" || ab===undefined){
                    ab="$0";
                }
                if(bb==="N/A" ||bb===undefined){
                    bb="$0";
                }
                ab=ab.replaceAll(",", "");
                bb=bb.replaceAll(",", "")
                return Number(bb.substr(1)) - Number(ab.substr(1))
            })
        } else if(sortingMethod==="Movie Tinder's Choice"){


            sortedGenreMovies.sort((a,b)=>{
                let aa=a.Awards;
                let ba=b.Awards;
                let aascore=0;
                let bascore=0;

                if (aa==="N/A" || aa===undefined){
                    aa=0
                } else{
                    let awards = aa.split(" ")
                    for (let i=0; i<awards.length; i++){
                        if (awards[i]==="win"||awards[i]==="wins"){
                            aascore+=Number(awards[i-1])*10
                        }
                        if (awards[i]==="nomination"|| awards[i]==="nominations"){
                            aascore+=Number(awards[i-1])
                        }
                        if ((awards[i]==="Osar."|| awards[i]==="Oscars.")){
                            if (awards[i-2]==="Won"){
                                aascore+=Number(awards[i-1])*20;
                            } else{
                                aascore+=Number(awards[i-1])*10;

                            }
                        }
                    }
                }
                if (ba==="N/A" ||ba===undefined){
                    ba=0;
                } else{
                    let awards = ba.split(" ")
                    for (let i=0; i<awards.length; i++){
                        if (awards[i]==="win"||awards[i]==="wins"){
                            bascore+=Number(awards[i-1])*10
                        }
                        if (awards[i]==="nomination"|| awards[i]==="nominations"){
                            bascore+=Number(awards[i-1])
                        }
                        if ((awards[i]==="Osar."|| awards[i]==="Oscars.")){
                            if (awards[i-2]==="Won"){
                                bascore+=Number(awards[i-1])*20;
                            } else{
                                bascore+=Number(awards[i-1])*10;

                            }
                        }
                    }
                }
                return bascore-aascore;
            })
        }

        return sortedGenreMovies

    }

    onLogin = (newUserBoolean, userInfo, username)=>{
        if (newUserBoolean===false) {
            let deletedMovies=userInfo[username].deletedMovies;
            let filteredMovies=this.state.allMovies.filter(movie => {
                let counter=0;
                for (let i=0; i<deletedMovies.length; i++){
                    if (deletedMovies[i].title===movie.title){
                        counter++
                    }
                }
                return counter===0;
            })

            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
            shuffleArray(filteredMovies);

            this.setState({
                newUserBoolean: newUserBoolean,
                userInfo: userInfo,
                login: true,
                username: username,
            })
        } else{
            this.setState({
                newUserBoolean: true,
                login: true
            })
        }


    }

    onRegister = (newUserObj, username)=>{
        let userId=null;
        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(reviewObj),
        };
        fetch("https://private-atlantic-hosta.glitch.me/users", getOptions)
            .then (response => response.json())
            .then(data=>{
                for (let i=0; i<data.length; i++){
                    if (data[i][username]!==undefined){
                        userId=data[i].id;
                        newUserObj.id=userId
                        console.log(userId)
                    }
                }
            })
            .then(()=> {
                console.log(newUserObj.id)
                this.setState({
                    userInfo: newUserObj,
                    newUserBoolean: false,
                    username: username,

                })
            })


    }

    onViewingOptionSelect = (choice) =>{
        this.setState({viewingChoice: choice});
        console.log(this.state.viewingChoice)
    }

    onPreferencesSubmit = (preferences) => {
        console.log(preferences)
        let allMovies=this.sortMoviesWithPreferences(preferences.services, preferences.genre, preferences.sorting)

        let deletedMovies=this.state.userInfo[this.state.username].deletedMovies;
        let filteredMovies=allMovies.filter(movie => {
            let counter=0;
            for (let i=0; i<deletedMovies.length; i++){
                if (deletedMovies[i].title===movie.title){
                    counter++
                }
            }
            return counter===0;
        })

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        // shuffleArray(filteredMovies);

        let userInfo=JSON.parse(JSON.stringify(this.state.userInfo));
        userInfo.services=preferences.services;

        this.setState({
            preferences: preferences,
            showMovies: true,
            returnHome: false,
            allMovies: filteredMovies,
            userInfo: userInfo
        })

    }

    onReturnHome = (savedMovies, deletedMovies, lastWatchedMovie, saveInfoBoolean) =>{
        if (saveInfoBoolean) {
            console.log(this.state.userInfo)
            let updatedUserInfo = JSON.parse(JSON.stringify(this.state.userInfo));
            updatedUserInfo[this.state.username].savedMovies = savedMovies;
            updatedUserInfo[this.state.username].deletedMovies = deletedMovies;
            updatedUserInfo[this.state.username].lastWatchedMovie = lastWatchedMovie;
            console.log(updatedUserInfo)

            this.setState({
                returnHome: true,
                viewingChoice: '',
                userInfo: updatedUserInfo
            })
            console.log(this.state.userInfo)
        } else{
            this.setState({
                returnHome: true,
                viewingChoice: '',
                groupInfo: savedMovies
            })
        }
    }

    onRatedMovie=(watchedMovies) => {
        // console.log('updated userinfo below: ')
        let updatedUserInfo=JSON.parse(JSON.stringify(this.state.userInfo));
        updatedUserInfo[this.state.username].watchedMovies=watchedMovies;
        // console.log(updatedUserInfo[this.state.username].watchedMovies)
        this.setState({
            userInfo: updatedUserInfo
        })
        // console.log(watchedMovies)
    }

    onGroupSetupSubmit =(preferences, groupId, groupName) =>{
        console.log('Group id after submission is: '+groupId)
        console.log(preferences)
        let allMovies=this.sortMoviesWithPreferences(preferences.services, preferences.genre, preferences.sorting)


        this.setState({
            preferences: preferences,
            showMovies: true,
            returnHome: false,
            groupId: groupId,
            groupName: groupName,
            groupMovies: allMovies
        })
    }

    renderContent(){
        if(!this.state.login){
            return <Login onLogin = {this.onLogin}/>
        }
        if (this.state.newUserBoolean){
            return <Register onRegister={this.onRegister}/>
        }
        if (!this.state.preferences || this.state.returnHome){
            if (this.state.viewingChoice === 'single') {
                return <SingleUserSetup moviePreferences={this.onPreferencesSubmit} services={this.state.userInfo.services} />
            } else if (this.state.viewingChoice === 'group') {
                return <GroupSetup onGroupSetupSubmit={this.onGroupSetupSubmit} username={this.state.username} returnHome={this.onReturnHome}/>
            } else if (this.state.viewingChoice==='savedMovies'){
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'savedMovies'} allMovies={this.state.userInfo[this.state.username].savedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            } else if(this.state.viewingChoice==='watchedMovies'){
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'watchedMovies'} allMovies={this.state.userInfo[this.state.username].watchedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            }
            return <Intro onViewingOptionSelect={this.onViewingOptionSelect} userInfo={this.state.userInfo} username={this.state.username} movieType={'watchedMovies'} allMovies={this.state.userInfo[this.state.username].watchedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies} groupInfo={this.state.groupInfo}/>
        }
        if (this.state.showMovies) {
            if (this.state.viewingChoice === 'single') {
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'} returnHome={this.onReturnHome} onRatedMovie={this.onRatedMovie} allMovies={this.state.allMovies} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            }
            if (this.state.viewingChoice === 'group') {
                return <GroupMovieGenerator groupName={this.state.groupName} groupId={this.state.groupId} userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'} returnHome={this.onReturnHome} onRatedMovie={this.onRatedMovie} allMovies={this.state.groupMovies} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            }
        }
    }

    render(){
        //Originally, needs to render a page giving the user the options to set a name for themselves and for there group
        //Also need to be able to choose the streaming services they have, and how they want to choose movies (genre, rating, views, etc.)
        //We will call this intro
        return(
            <div style={{height: '100%'}}>
                {this.renderContent()}
            </div>
        )
    }

}

export default App;