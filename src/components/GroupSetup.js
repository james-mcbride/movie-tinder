import React from 'react';
import SingleUserSetup from "./SingleUserSetup";
import DisplayGroupMovies from "./DisplayGroupMovies";
import NavBar from "./NavBar";

class GroupSetup extends React.Component {
    state={
        newGroupNeeded: false,
        preferences: {},
        joinGroupName: '',
        newGroupName: '',
        displayGroupMovies: false,
        groupInfo:{},
        allMovies: []
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
        // let allMovies=[];
        // let streamingServices=preferences.services
        // console.log(streamingServices)
        // console.log(allMovies)
        // for (let i=0; i<this.props.allMovies.length; i++){
        //     console.log(this.props.allMovies[i])
        //     for (let j=0; j<streamingServices.length; j++){
        //         console.log(streamingServices[j])
        //         if (this.props.allMovies[i][0]===streamingServices[j]){
        //             console.log("match!")
        //             allMovies.push.apply(allMovies,this.props.allMovies[i][1])
        //         }
        //     }
        // }
        // console.log(allMovies)
        // this.setState({allMovies: allMovies})
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
                let preferences={};
                let counter=0;
                let movieIndex=0;
                let currentGroupMembers=[]
                for (let i=0; i<data.length; i++){
                    if (data[i][this.state.joinGroupName]){
                        counter++
                        movieIndex=i;
                        currentGroupMembers=data[i][this.state.joinGroupName].groupMembers
                        preferences=data[i][this.state.joinGroupName].preferences
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

                // let allMovies=[];
                // let streamingServices=preferences.services
                // console.log(streamingServices)
                // console.log(allMovies)
                // for (let i=0; i<this.props.allMovies.length; i++){
                //     console.log(this.props.allMovies[i])
                //     for (let j=0; j<streamingServices.length; j++){
                //         console.log(streamingServices[j])
                //         if (this.props.allMovies[i][0]===streamingServices[j]){
                //             console.log("match!")
                //             allMovies.push.apply(allMovies,this.props.allMovies[i][1])
                //         }
                //     }
                // }
                // console.log(allMovies)
                // this.setState({allMovies: allMovies})
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
                <SingleUserSetup moviePreferences={this.onPreferencesSubmit} tab="group" />
            </div>
        }

    }
    render(){
        return (
            <div>
                <NavBar tabSelect={this.props.tabSelect} activeTab="group" returnHome={this.onReturnHome}/>
                {this.renderContent()}
            </div>
        )
    }
}

export default GroupSetup;