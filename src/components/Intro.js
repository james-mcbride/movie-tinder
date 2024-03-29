import React from 'react'
import MovieCard from "./MovieCard";
import './Intro.css'
import MovieCardRating from "./MovieCardRating";
import DisplayGroupMovies from "./DisplayGroupMovies";
import './MovieCard.css'
import Search from "./Search";
import NavBar from "./NavBar";

class Intro extends React.Component{
    state={
        displayGroupMovies: false,
    }

    onDisplayGroupMovies = (event) =>{
        event.preventDefault();
        this.setState({displayGroupMovies: true})
    }
    returnHome = (groupInfo, arr1, arr2, bool) =>{
        console.log(groupInfo);
        this.setState({
            displayGroupMovies: false,
        })
    }

    renderContent() {
    //     console.log(this.props.groupInfo)
        if (this.state.displayGroupMovies){
            console.log(this.props.groupInfo.groupMovies)
            console.log(this.props.groupInfo.topMovie)
            return <div>
                <DisplayGroupMovies returnHome={this.returnHome} groupMovies={this.props.groupInfo.groupMovies} groupId={this.props.groupInfo.groupId} groupName={this.props.groupInfo.groupName} groupMembers={this.props.groupInfo.groupMembers}/>
            </div>
        }

        return (
            <div className="" id="introContainer">
                <h1>Welcome to Movie Tinder!</h1>
                <h4>Choose an option below to start reviewing all Streaming Service Movies</h4>
                <div className='ui introButtons'>
                    <div className='' onClick={() => this.props.onViewingOptionSelect('singleViewing')}>
                        <button className="ui blue button huge" onClick={() => this.props.onViewingOptionSelect('singleViewing')}>Single Viewing</button>
                    </div>
                    <div className='' onClick={() => this.props.onViewingOptionSelect('group')}>
                        <button className="ui blue button huge" onClick={() => this.props.onViewingOptionSelect('group')}>Group Viewing</button>
                    </div>
                </div>
                <hr />
                <Search serverMovies={this.props.serverMovies}/>
            </div>
        )
    //     if (this.props.groupInfo) {
    //         return (
    //             <div className='container'>
    //                 <h1>Welcome to Movie Tinder!</h1>
    //                 <div className='ui grid' id='poster'>
    //                     <div className='seven wide column'>
    //                         <h3>Review Saved Movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
    //                         </div>
    //                         <h3>Rate your watched movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('watchedMovies')}>Watched Movies
    //                             </button>
    //                         </div>
    //                         <br />
    //                         <Search serverMovies={this.props.serverMovies}/>
    //
    //                     </div>
    //                     <div className='nine wide column'>
    //                         <div className='introMovie'>
    //                             <div className="introPoster">
    //                                 <img src={this.props.groupInfo.topMovie[0].Poster}/>
    //                                 <div className='introTitle'>
    //                                     Your group, {this.props.groupInfo.groupName}'s top movie: <br/>
    //                                     <strong>{this.props.groupInfo.topMovie[0].Title}</strong> <br/>
    //                                     {this.props.groupInfo.groupMembers.length} submitted
    //                                     ({this.props.groupInfo.groupMembers.join(" ")})
    //                                     <div>
    //                                         <button onClick={this.onDisplayGroupMovies}>View updated status</button>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <h3>Pick an available movie!!</h3>
    //                 <div className=' ui grid'>
    //                     <div className='ui row'>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('single')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Single Viewing</button>
    //                             <div>Review all of the movies available on your subscribed streaming services. You can
    //                                 track/rate the movies you've watched, choose movies to watch later, and receive
    //                                 updates
    //                                 when new movies are posted!
    //                             </div>
    //                         </div>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('group')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Group Viewing</button>
    //                             <div>When trying to decide on a movie to watch with a group of friends, each of you can
    //                                 review all the options available on your subscribed streaming services, and add any
    //                                 movies you are down to watch! The movies that the most people in your group agreed
    //                                 on
    //                                 will then be displayed and can be voted on!
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     } else if (this.props.userInfo[this.props.username].lastWatchedMovie) {
    //         return (
    //             <div className='container'>
    //                 <h1>Welcome to Movie Tinder!</h1>
    //                 <div className='ui grid' id='poster'>
    //                     <div className='seven wide column'>
    //                         <h3>Review Saved Movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
    //                         </div>
    //                         <h3>Rate your watched movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('watchedMovies')}>Watched Movies
    //                             </button>
    //                         </div>
    //                         <br />
    //                         <Search serverMovies={this.props.serverMovies}/>
    //                     </div>
    //                     <div className='nine wide column'>
    //                         <div className='introMovie'>
    //                             <div className="introPoster" id="lastWatchedMovie">
    //                                 <img src={this.props.userInfo[this.props.username].lastWatchedMovie.Poster}/>
    //                                 <div className='introTitle'>
    //                                     Your last watched movie: <br/>
    //                                     {this.props.userInfo[this.props.username].lastWatchedMovie.Title}
    //                                 </div>
    //                                 <div className='introMovieRating'>
    //                                     <MovieCardRating currentMovie={this.props.userInfo[this.props.username].lastWatchedMovie}
    //                                                      onRatedMovie={this.props.onRatedMovie} userInfo={this.props.userInfo}
    //                                                      username={this.props.username} watchedMovies={this.props.watchedMovies}/>
    //                                 </div>
    //                             </div>
    //
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <h3>Pick an available movie!!</h3>
    //                 <div className=' ui grid'>
    //                     <div className='ui row'>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('single')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Single Viewing</button>
    //                             <div>Review all of the movies available on your subscribed streaming services. You can
    //                                 track/rate the movies you've watched, choose movies to watch later, and receive
    //                                 updates
    //                                 when new movies are posted!
    //                             </div>
    //                         </div>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('group')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Group Viewing</button>
    //                             <div>When trying to decide on a movie to watch with a group of friends, each of you can
    //                                 review all the options available on your subscribed streaming services, and add any
    //                                 movies you are down to watch! The movies that the most people in your group agreed
    //                                 on
    //                                 will then be displayed and can be voted on!
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     } else if (this.props.userInfo[this.props.username].savedMovies.length > 0) {
    //         return (
    //             <div className="container">
    //                 <h1>Welcome to Movie Tinder!</h1>
    //                 <div className='ui grid'>
    //                     <div className='eight wide column'>
    //                         <h3>Review Saved Movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
    //                         </div>
    //                         <h3>Rate your watched movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('watchedMovies')}>Watched Movies
    //                             </button>
    //                         </div>
    //                         <br />
    //                         <Search serverMovies={this.props.serverMovies}/>
    //                     </div>
    //                     <div className='eight wide column' id="lastSavedMovie">
    //                         <img src={this.props.userInfo[this.props.username].savedMovies[0].Poster}/>
    //                         <div className='introTitle'>
    //                             Your last saved Movie: <br/>
    //                             {this.props.userInfo[this.props.username].savedMovies[0].Title}
    //                         </div>
    //                         <div className='introMovieRating'>
    //                             <MovieCardRating currentMovie={this.props.userInfo[this.props.username].savedMovies[0]}
    //                                              onRatedMovie={this.props.onRatedMovie} userInfo={this.props.userInfo}
    //                                              username={this.props.username} watchedMovies={this.props.watchedMovies}/>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <h3>Pick an available movie!!</h3>
    //                 <div className=' ui grid'>
    //                     <div className='ui row'>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('single')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Single Viewing</button>
    //                             <div>Review all of the movies available on your subscribed streaming services. You can
    //                                 track/rate the movies you've watched, choose movies to watch later, and receive
    //                                 updates
    //                                 when new movies are posted!
    //                             </div>
    //                         </div>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('group')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Group Viewing</button>
    //                             <div>When trying to decide on a movie to watch with a group of friends, each of you can
    //                                 review all the options available on your subscribed streaming services, and add any
    //                                 movies you are down to watch! The movies that the most people in your group agreed
    //                                 on
    //                                 will then be displayed and can be voted on!
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className="container">
    //                 <h1>Welcome to Movie Tinder!</h1>
    //                 <div className='ui grid'>
    //                     <div className='eight wide column'>
    //                         <h3>Review Saved Movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('savedMovies')}>Saved Movies</button>
    //                         </div>
    //
    //                         <h3>Rate your watched movies!</h3>
    //                         <div>
    //                             <button onClick={() => this.props.onViewingOptionSelect('watchedMovies')}>Watched Movies
    //                             </button>
    //                         </div>
    //                         <br />
    //                     </div>
    //                     <div className='eight wide column'>
    //                         <Search serverMovies={this.props.serverMovies}/>
    //
    //                     </div>
    //                 </div>
    //                 <h3>Pick an available movie!!</h3>
    //                 <div className=' ui grid'>
    //                     <div className='ui row'>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('single')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Single Viewing</button>
    //                             <div>Review all of the movies available on your subscribed streaming services. You can
    //                                 track/rate the movies you've watched, choose movies to watch later, and receive
    //                                 updates
    //                                 when new movies are posted!
    //                             </div>
    //                         </div>
    //                         <div className='eight wide column' onClick={() => this.props.onViewingOptionSelect('group')}>
    //                             <button onClick={() => this.props.onViewingOptionSelect('single')}>Group Viewing</button>
    //                             <div>When trying to decide on a movie to watch with a group of friends, each of you can
    //                                 review all the options available on your subscribed streaming services, and add any
    //                                 movies you are down to watch! The movies that the most people in your group agreed
    //                                 on
    //                                 will then be displayed and can be voted on!
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    }

    render(){

        return <div id="outerContainer">
            <NavBar tabSelect={this.props.tabSelect} activeTab="home" returnHome={this.onReturnHome}/>
            {this.renderContent()}
        </div>
    }
}

export default Intro;