import React from 'react';

class SingleUserSetup extends React.Component {
    state={
        services: [],
        genre: [],
        sorting: ''
    }

    servicesChosen = (service) =>{
        let updatedArray=this.state.services;
        updatedArray.push(service)
        this.setState({services: updatedArray})
        console.log(this.state.services)
    }

    genreChosen=(genre) =>{
        let updatedArray=this.state.genre;
        updatedArray.push(genre)
        this.setState({genre: updatedArray})
        console.log(this.state.genre)
    }

    sortingMethodChosen = (sortingMethod) =>{
        this.setState({sorting: sortingMethod})
        console.log(this.state.sorting)
    }


    render() {
        return (
            <div>
                <h2>Select the Streaming Services you are signed up for</h2>
                <div className='ui grid'>
                    <div className='ui row'>
                        <div className='two wide column' onClick={() =>this.servicesChosen('netflix')}>Netflix</div>
                        <div className='two wide column' onClick={() =>this.servicesChosen('hulu')}>Hulu</div>
                        <div className='two wide column' onClick={() =>this.servicesChosen('amazonPrime')}>Amazon Prime</div>
                        <div className='two wide column' onClick={() =>this.servicesChosen('hbo')}>HBO</div>
                        <div className='two wide column' onClick={() =>this.servicesChosen('disneyPlus')}>Disney+</div>
                        <div className='two wide column' onClick={() =>this.servicesChosen('peacock')}>Peacock</div>
                    </div>
                </div>
                <h3>Put in your movie generation preferences below</h3>
                <h4>Genres</h4>
                <div className='ui grid'>
                    <div className='ui row'>
                        <div className='two wide column' onClick={() =>this.genreChosen('All')}>All</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Action')}>Action</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Comedy')}>Comedy</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Drama')}>Drama</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Horror')}>Horror</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Family')}>Family</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Animated')}>Animated</div>
                        <div className='two wide column' onClick={() =>this.genreChosen('Thriller')}>Thriller</div>
                    </div>
                </div>
                <h4>How would you like your movies sorted?</h4>
                <div className='ui grid'>
                    <div className='ui row'>
                        <div className='five wide column' onClick={() =>this.sortingMethodChosen('IMDB Rating')}>IMDB Rating</div>
                        <div className='five wide column' onClick={() =>this.sortingMethodChosen('Box Office Views')}>Box Office Views</div>
                        <div className='five wide column' onClick={() =>this.sortingMethodChosen('Movie Tinder Choice')}>Movie Tinder Choice</div>
                    </div>
                </div>
                <button onClick={()=>{this.props.moviePreferences(this.state)}}>Start Selecting Movies!</button>


            </div>

        )
    }
}

export default SingleUserSetup;