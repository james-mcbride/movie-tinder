import React from 'react';

class Register extends React.Component{
    state ={
        username: '',
        password: '',
        validUserName: true
    }
    onUsernameChange = (event) =>{
        this.setState({username: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    onFormSubmit = (event) => {
        event.preventDefault();

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
                    if (data[i][this.state.username]!==undefined){
                        console.log('username taken')
                        this.setState({validUserName: false})
                    } else{
                        this.setState({validUserName: true})
                    }
                }


            })
            .then(()=>{
                if (this.state.validUserName) {
                    let newUserObj = {};

                    newUserObj[this.state.username] = {
                        password: this.state.password,
                        deletedMovies: [],
                        savedMovies: [],
                        watchedMovies: []
                    }
                    this.props.onRegister(newUserObj, this.state.username)


                    const postOpt = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUserObj)
                    }
                    fetch("https://private-atlantic-hosta.glitch.me/users", postOpt)
                        .then(response => console.log(newUserObj))
                        .catch(error => console.log(error))

                }
            })


        // this.props.onRegister(this.state.username, this.state.password)
    }

    renderContent() {
        if (!this.state.validUserName) {
            return (
                <div>
                    <h1>Welcome to Movie Tinder!</h1>
                    <h3>Enter your username and password</h3>
                    <form className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input type="text" placeholder="Username" value={this.state.username}
                                   onChange={this.onUsernameChange}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        </div>
                        <button onClick={this.onFormSubmit}>Submit</button>
                    </form>
                    <h2 style={{color: 'red'}}>Invalid Username, please choose a different one</h2>
                </div>

            )
        } else{
            return (
                <div>
                    <h1>Welcome to Movie Tinder!</h1>
                    <h3>Enter your username and password</h3>
                    <form className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input type="text" placeholder="Username" value={this.state.username}
                                   onChange={this.onUsernameChange}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        </div>
                        <button onClick={this.onFormSubmit}>Submit</button>

                    </form>
                </div>
            )
        }

    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }

}

export default Register;