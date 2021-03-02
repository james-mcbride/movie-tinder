import React from 'react';
import './HomeButton.css'

const HomeButton = (props) => {
    return <div className='HomeButton'><button onClick={()=>props.returnHome(true, props.savedMovies)}>Home</button></div>
}

export default HomeButton;