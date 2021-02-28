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
        this.props.moviePreferences(preferences)
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
                    <button onClick={()=>this.setState({})}>submit</button>
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