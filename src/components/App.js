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
        groupMovies: ''
    }

    componentDidMount(){

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(reviewObj),
        };
        fetch("https://private-atlantic-hosta.glitch.me/allMovies", getOptions)
            .then (response => response.json())
            .then(data=>{
                this.setState({
                    allMovies: data,
                    groupMovies: data
                })
                console.log(this.state.allMovies)
            })
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
                allMovies: filteredMovies,
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
        this.setState({
            preferences: preferences,
            showMovies: true,
            returnHome: false
        })

    }

    onReturnHome = (savedMovies, deletedMovies, lastWatchedMovie) =>{
        console.log(this.state.userInfo)
        let updatedUserInfo=JSON.parse(JSON.stringify(this.state.userInfo));
        updatedUserInfo[this.state.username].savedMovies=savedMovies;
        updatedUserInfo[this.state.username].deletedMovies=deletedMovies;
        updatedUserInfo[this.state.username].lastWatchedMovie=lastWatchedMovie;
        console.log(updatedUserInfo)

        this.setState({
            returnHome: true,
            viewingChoice: '',
            userInfo: updatedUserInfo
        })
        console.log(this.state.userInfo)
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

    onGroupSetupSubmit =(preferences) =>{
        this.setState({
            preferences: preferences,
            showMovies: true,
            returnHome: false
        })
    }

    renderContent(){
        if(!this.state.login){
            return <Login onLogin = {this.onLogin}/>
        }
        if (this.state.newUserBoolean){
            return <Register onRegister={this.onRegister}/>
        }
        console.log(this.state.userInfo[this.state.username].watchedMovies)
        if (!this.state.preferences || this.state.returnHome){
            if (this.state.viewingChoice === 'single') {
                return <SingleUserSetup moviePreferences={this.onPreferencesSubmit} />
            } else if (this.state.viewingChoice === 'group') {
                return <GroupSetup onGroupSetupSubmit={this.onGroupSetupSubmit}/>
            } else if (this.state.viewingChoice==='savedMovies'){
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'savedMovies'} allMovies={this.state.userInfo[this.state.username].savedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            } else if(this.state.viewingChoice==='watchedMovies'){
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'watchedMovies'} allMovies={this.state.userInfo[this.state.username].watchedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            }
            return <Intro onViewingOptionSelect={this.onViewingOptionSelect} userInfo={this.state.userInfo} username={this.state.username} movieType={'watchedMovies'} allMovies={this.state.userInfo[this.state.username].watchedMovies} returnHome={this.onReturnHome}  onRatedMovie={this.onRatedMovie} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
        }
        if (this.state.showMovies) {
            if (this.state.viewingChoice === 'single') {
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'} returnHome={this.onReturnHome} onRatedMovie={this.onRatedMovie} allMovies={this.state.allMovies} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
            }
            if (this.state.viewingChoice === 'group') {
                return <GroupMovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'} returnHome={this.onReturnHome} onRatedMovie={this.onRatedMovie} allMovies={this.state.groupMovies} watchedMovies={this.state.userInfo[this.state.username].watchedMovies}/>
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