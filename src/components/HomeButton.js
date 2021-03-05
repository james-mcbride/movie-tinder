import React from 'react';
import './HomeButton.css'

const HomeButton = (props) => {
    if (props.saveInfoBoolean) {
        return <div className='HomeButton'>
            <button
                onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean)}>Home
            </button>
        </div>
    } else{
        return <div className='HomeButton'>
            <button
                onClick={() => props.returnHome([], [], [], props.saveInfoBoolean)}>Home
            </button>
        </div>
    }
}

export default HomeButton;