import React from 'react';

class Login extends React.Component {
    state ={
        username: '',
        password: '',
        userInfo: ''
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
                    console.log(data[i][this.state.username])
                    if (data[i][this.state.username]!==undefined && data[i][this.state.username].password===this.state.password){
                        console.log('valid login')
                        let userInfo = data[i]
                        console.log(userInfo)
                        this.props.onLogin(false,userInfo, this.state.username)


                    } else{
                        console.log('invalid login')
                    }
                }


            })


        // this.props.onRegister(this.state.username, this.state.password)
    }

    register = (event) => {
        event.preventDefault();
        console.log('register')
        this.props.onLogin(true,null, null)
    }

    render() {
        return (
            <div>
                <h1>Welcome to Movie Tinder!</h1>
                <h3>Enter your username and password</h3>
                <form className="ui form"  >
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
                <br/>
                <h3>Not a user? Register now!     <button onClick={this.register}>Register</button></h3>
            </div>
        )
    }
}

export default Login;