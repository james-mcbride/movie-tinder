import React from 'react';
import SingleUserSetup from "./SingleUserSetup";
import DisplayGroupMovies from "./DisplayGroupMovies";

class GroupSetup extends React.Component {
    state={
        newGroupNeeded: false,
        preferences: {},
        joinGroupName: '',
        newGroupName: '',
        displayGroupMovies: false,
        groupInfo:{}
    }

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

    onPreferencesSubmit = (preferences) => {

        let newUserObj = {};

        newUserObj[this.state.newGroupName] = {
            preferences: preferences,
            movieSubmissions: [],
            groupCreator: this.props.username,
            groupMembers: []

        }


        const postOpt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserObj)
        }
        fetch("https://private-atlantic-hosta.glitch.me/groups", postOpt)
            .then(response => response.json())
            .then(data => {
                this.props.onGroupSetupSubmit(preferences, data.id, this.state.newGroupName)

            })
            .catch(error => console.log(error))

    }

    onNewGroupNameChange = (event) => {
        this.setState({newGroupName: event.target.value})
    }

    onJoinGroupNameChange = (event) => {
        this.setState({joinGroupName: event.target.value})
    }

    onNewGroupSubmission = (event) => {
        event.preventDefault();
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
                    console.log(data)
                    alert("Not a valid group name, please try again.")
                }
                else{
                    validGroupName=true;
                }


            })
            .then(()=>{
                if (validGroupName){
                    this.setState({newGroupNeeded: true})
                }
            })
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
                let currentGroupMembers=[]
                for (let i=0; i<data.length; i++){
                    console.log(data[i])
                    console.log(data[i][this.state.joinGroupName])
                    if (data[i][this.state.joinGroupName]){
                        counter++
                        movieIndex=i;
                        currentGroupMembers=data[i][this.state.joinGroupName].groupMembers
                    }
                }
                if (counter>0 && currentGroupMembers.indexOf(this.props.username)===-1){
                    this.props.onGroupSetupSubmit(data[movieIndex][this.state.joinGroupName].preferences, data[movieIndex].id, this.state.joinGroupName)

                } else if(counter>0 && currentGroupMembers.indexOf(this.props.username)!==-1){
                    alert("You have already submitted the movies for this group, you will be redirected to the group movie page.")
                    this.setState({
                        displayGroupMovies: true,
                        groupInfo: data[movieIndex]
                    })
                }else{
                    alert("Not a valid group name, please try again.")

                }
            })
    }



    renderContent() {

        if (this.state.displayGroupMovies){
            let sortedGroupMovies=this.sortSubmittedMovies([...this.state.groupInfo[this.state.joinGroupName].movieSubmissions], [...this.state.groupInfo[this.state.joinGroupName].groupMembers] )
            console.log(sortedGroupMovies)
            return <DisplayGroupMovies returnHome={this.props.returnHome} groupMovies={sortedGroupMovies} groupId={this.state.groupInfo.id} groupName={this.state.joinGroupName} groupMembers={this.state.groupInfo[this.state.joinGroupName].groupMembers}/>

        }
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