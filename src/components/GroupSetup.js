import React from 'react';
import SingleUserSetup from "./SingleUserSetup";

class GroupSetup extends React.Component {
    state={
        groupAlreadyCreated: false,
        preferences: {}
    }

    onPreferencesSubmit = (preferences) => {
        this.setState({preferences: preferences})
        console.log(preferences);
    }

    renderContent(){
        if (!this.state.groupAlreadyCreated){
            return (
                <div>
                    <h2>Create a new group</h2>
                    <form className="ui form"  >
                        <div className="field">
                            <label>Group Name</label>
                            <input type="text" placeholder="Group Name" />
                        </div>
                        <button>Submit</button>
                    </form>
                    <h2>Join an existing group</h2>
                    <form className="ui form"  >
                        <div className="field">
                            <label>Group Name</label>
                            <input type="text" placeholder="Group Name" />
                        </div>
                    </form>
                    <button>submit</button>
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
                <h2>Create a new group</h2>
                <form className="ui form"  >
                    <div className="field">
                        <label>Group Name</label>
                        <input type="text" placeholder="Group Name" />
                    </div>
                    <button>Submit</button>
                </form>
                <h2>Join an existing group</h2>
                <form className="ui form"  >
                    <div className="field">
                        <label>Group Name</label>
                        <input type="text" placeholder="Group Name" />
                    </div>
                </form>
                <button>submit</button>
            </div>
        )
    }
}

export default GroupSetup;