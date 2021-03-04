import React from 'react';
import './HomeButton.css'

const HomeButton = (props) => {
    return <div className='HomeButton'><button onClick={()=>props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies)}>Home</button></div>
}

export default HomeButton;