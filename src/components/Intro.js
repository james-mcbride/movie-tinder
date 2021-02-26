import React from 'react'

const Intro = (props) => {
        return (
            <div>
                <h1>Welcome to Movie Tinder!</h1>
                <h3>Enter your username and password</h3>
                <h3>Choose one of the options below!</h3>
                <div className=' ui grid'>
                    <div className='ui row'>
                        <div className='eight wide column' onClick={() =>props.onViewingOptionSelect('single')}>
                            <button onClick={() =>props.onViewingOptionSelect('single')}>Single Viewing</button>
                            <div>Review all of the movies available on your subscribed streaming services. You can track/rate the movies you've watched, choose movies to watch later, and receive updates when new movies are posted! </div>
                        </div>
                        <div className='eight wide column' onClick={() =>props.onViewingOptionSelect('group')} >
                            <button onClick={() =>props.onViewingOptionSelect('single')}>Group Viewing</button>
                            <div>When trying to decide on a movie to watch with a group of friends, each of you can review  all the options available on your subscribed streaming services, and add any movies you are down to watch! The movies that the most people in your group agreed on will then be displayed and can be voted on! </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Intro;