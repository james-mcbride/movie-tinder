import React from 'react';

class Login extends React.Component {
    state ={
        username: '',
        password: ''
    }
    onUsernameChange = (event) =>{
        this.setState({username: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password)
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
            </div>
        )
    }
}

export default Login;