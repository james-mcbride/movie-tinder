import React from 'react';
import Intro from "./Intro";
import Login from './Login'
import SingleUserSetup from "./SingleUserSetup";
import GroupSetup from "./GroupSetup";

class App extends React.Component {
    state={
        viewingChoice: '',
        login: null,
        preferences: null
    }

    onLogin = (username,password)=>{
        console.log(username, password)
        let loginInfo={username: username, password: password}
        this.setState({login: loginInfo })
    }

    onViewingOptionSelect = (choice) =>{
        this.setState({viewingChoice: choice});
        console.log(this.state.viewingChoice)
    }

    onPreferencesSubmit = (preferences) => {
        this.setState({preferences: preferences})
        console.log(preferences);
    }

    renderContent(){
        if(!this.state.login){
            return <Login onLogin = {this.onLogin}/>
        }
        if (!this.state.preferences){
            if (this.state.viewingChoice === 'single') {
                return <SingleUserSetup moviePreferences={this.onPreferencesSubmit} />
            } else if (this.state.viewingChoice === 'group') {
                return <GroupSetup moviePreferences={this.onPreferencesSubmit}/>
            }
            return <Intro onViewingOptionSelect={this.onViewingOptionSelect}/>
        }
        if (this.state.viewingChoice ==='single'){

        }
    }

    render(){
        //Originally, needs to render a page giving the user the options to set a name for themselves and for there group
        //Also need to be able to choose the streaming services they have, and how they want to choose movies (genre, rating, views, etc.)
        //We will call this intro
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }

}

export default App;