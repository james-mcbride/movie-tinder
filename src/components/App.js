import React from 'react';
import Intro from "./Intro";
import Login from './Login'
import SingleUserSetup from "./SingleUserSetup";
import GroupSetup from "./GroupSetup";
import MovieCard from './MovieCard';
import JSONServer from "../apis/JSONServer";
import MovieGenerator from "./MovieGenerator";
import Register from "./Register";

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
                this.setState({allMovies: data})
                console.log(this.state.allMovies)
            })
    }

    onLogin = (newUserBoolean, userInfo, username)=>{

        this.setState({
            newUserBoolean: newUserBoolean,
            allMovies: userInfo[username].allMovies,
            savedMovies: userInfo[username].savedMovies,
            watchedMovies: userInfo[username].watchedMovies,
            userInfo: userInfo,
            login: true,
            username: username,
            userID: userInfo.id
        })


    }

    onRegister = (allMovies)=>{
        this.setState({
            allMovies: allMovies,
            newUserBoolean: false
        })


    }

    onViewingOptionSelect = (choice) =>{
        this.setState({viewingChoice: choice});
        console.log(this.state.viewingChoice)
    }

    onPreferencesSubmit = (preferences) => {
        this.setState({
            preferences: preferences,
            showMovies: true
        })

    }
    renderContent(){
        if(!this.state.login){
            return <Login onLogin = {this.onLogin}/>
        }
        if (this.state.newUserBoolean){
            return <Register onRegister={this.onRegister}/>
        }
        if (!this.state.preferences){
            if (this.state.viewingChoice === 'single') {
                return <SingleUserSetup moviePreferences={this.onPreferencesSubmit} />
            } else if (this.state.viewingChoice === 'group') {
                return <GroupSetup moviePreferences={this.onPreferencesSubmit}/>
            } else if (this.state.viewingChoice==='savedMovies'){
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'savedMovies'}/>
            }
            return <Intro onViewingOptionSelect={this.onViewingOptionSelect}/>
        }
        if (this.state.showMovies) {
            if (this.state.viewingChoice === 'single') {
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'}/>
            }
            if (this.state.viewingChoice === 'group') {
                return <MovieGenerator userInfo={this.state.userInfo} username={this.state.username} movieType={'allMovies'}/>
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