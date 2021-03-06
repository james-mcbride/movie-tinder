import React from 'react';
import SingleUserSetup from "./SingleUserSetup";

class GroupSetup extends React.Component {
    state={
        newGroupNeeded: false,
        preferences: {},
        joinGroupName: '',
        newGroupName: ''
    }

    onPreferencesSubmit = (preferences) => {
        let validGroupName=false
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
                if (data.length===0){
                    validGroupName=true;
                }
                let counter=0;
                for (let i=0; i<data.length; i++){
                    if (data[i][this.state.newGroupName]){
                        counter++
                    }
                }
                if (counter>0){
                    alert("Not a valid group name, please try again.")
                }
                else{
                    validGroupName=true;
                }


            })
            .then(()=>{
                if (validGroupName) {
                    let newUserObj = {};

                    newUserObj[this.state.newGroupName] = {
                        preferences: preferences,
                        movieSubmissions: []
                    }


                    const postOpt = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUserObj)
                    }
                    fetch("https://private-atlantic-hosta.glitch.me/groups", postOpt)
                        .then (response => response.json())
                        .then(data => {
                            this.props.onGroupSetupSubmit(preferences, data.id, this.state.newGroupName)

                        })
                        .catch(error => console.log(error))

                }
            })


    }

    onNewGroupNameChange = (event) => {
        this.setState({newGroupName: event.target.value})
    }

    onJoinGroupNameChange = (event) => {
        this.setState({joinGroupName: event.target.value})
    }

    onNewGroupSubmission = (event) => {
        event.preventDefault();
        this.setState({newGroupNeeded: true})
    }

    onJoinGroupSubmission = (event) =>{
        event.preventDefault();
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
                console.log(this.state.joinGroupName)
                let counter=0;
                let movieIndex=0;
                for (let i=0; i<data.length; i++){
                    console.log(data[i])
                    console.log(data[i][this.state.joinGroupName])
                    if (data[i][this.state.joinGroupName]){
                        counter++
                        movieIndex=i;
                    }
                }
                if (counter>0){
                    this.props.onGroupSetupSubmit(data[movieIndex][this.state.joinGroupName].preferences, data[movieIndex].id, this.state.joinGroupName)

                } else{
                    alert("Not a valid group name, please try again.")

                }
            })
    }



    renderContent(){
        if (!this.state.newGroupNeeded){
            return (
                <div>
                    <h2>Create a new group</h2>
                    <form className="ui form"  >
                        <div className="field">
                            <label>Group Name</label>
                            <input type="text" placeholder="Group Name" value={this.state.newGroupName} onChange={this.onNewGroupNameChange}/>
                        </div>
                        <button onClick={this.onNewGroupSubmission}>Submit</button>
                    </form>
                    <h2>Join an existing group</h2>
                    <form className="ui form"  >
                        <div className="field">
                            <label>Group Name</label>
                            <input type="text" placeholder="Group Name" value={this.state.joinGroupName} onChange={this.onJoinGroupNameChange}/>
                        </div>
                    </form>
                    <button onClick={this.onJoinGroupSubmission}>submit</button>
                </div>
            )
        } else{
            return <div>
                <SingleUserSetup moviePreferences={this.onPreferencesSubmit} />
            </div>
        }

    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default GroupSetup;