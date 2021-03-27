import React from 'react';
import "./Preferences.css"
import NavBar from "./NavBar";

class SingleUserSetup extends React.Component {
    state={
        services: [],
        genre: [],
        sorting: ''
    }
    componentDidMount(){
        if (this.props.services){
            this.setState({
                services: [...this.props.services],
                genre: ["All"],
                sorting: "Movie Tinder's Choice"
            })
        } else{
            this.setState({
                services: ["netflix"],
                genre: ["All"],
                sorting: "Movie Tinder's Choice"
            })
        }
    }

    servicesChosen = (service) =>{
        let updatedArray=this.state.services;
        if (updatedArray.indexOf(service)===-1) {
            console.log('new' +service)
            updatedArray.push(service)
        } else{
            console.log('delete' +service)
            let index = this.state.services.indexOf(service);
            updatedArray.splice(index,1);
        }
        this.setState({services: updatedArray})
        console.log(this.state.services)
    }

    genreChosen=(genre) =>{
        let updatedArray=this.state.genre;
        if (genre!=="All"){
            updatedArray=updatedArray.filter(genre=>genre!=="All")
            if (updatedArray.indexOf(genre)===-1){
                updatedArray.push(genre)
            } else{
                let index=updatedArray.indexOf(genre);
                updatedArray.splice(index,1)
            }
        } else{
            updatedArray=["All"]
        }

        this.setState({genre: updatedArray})
        console.log(this.state.genre)
    }

    sortingMethodChosen = (sortingMethod) =>{
        if (sortingMethod!==this.state.sorting) {
            this.setState({sorting: sortingMethod})
            console.log(this.state.sorting)
        }
    }

    renderServices() {
        let services = ["netflix", "hulu", "amazonPrime", "disneyPlus"];
        const renderedList = services.map((service => {
            if (this.state.services.indexOf(service) !== -1) {
                return <button className="ui secondary button"
                               onClick={() => this.servicesChosen(service)}>{service}</button>
            } else {
                return <button className="ui button" onClick={() => this.servicesChosen(service)}>{service}</button>
            }
        }))
        return <div id="servicesList">{renderedList}</div>
    }

    renderGenres() {
        let genres=["All","Adventure", "Action", "Comedy", "Family", "Animation", "Drama", "Romance", "Sci-fi", "Horror", "Sport", "Musical", "Documentary", "Fantasy", "Mystery", "History", "Western", "Thriller"  ]

        const renderedList = genres.map((genre => {
            if (this.state.genre.indexOf(genre) !== -1) {
                return <button className="ui secondary button"
                               onClick={() => this.genreChosen(genre)}>{genre}</button>
            } else {
                return <button className="ui tiny button" onClick={() => this.genreChosen(genre)}>{genre}</button>
            }
        }))
        return <div id="genresList">{renderedList}</div>
    }

    renderSortingMethods(){
        let sortingMethods=  ["Movie Tinder's Choice", "IMDB Rating", "Box Office Hits"]

        const renderedList = sortingMethods.map((method => {
            if (this.state.sorting === method) {
                return <button className="ui secondary button"
                               onClick={() => this.sortingMethodChosen(method)}>{method}</button>
            } else {
                return <button className="ui button" onClick={() => this.sortingMethodChosen(method)}>{method}</button>
            }
        }))
        return <div id="sortingMethodList">{renderedList}</div>
    }

    renderContent(){
        if (this.props.tab==="group"){
            return (<NavBar tabSelect={this.props.tabSelect} activeTab="group" returnHome={this.onReturnHome}/>)
        } else{
            return (<NavBar tabSelect={this.props.tabSelect} activeTab="single" returnHome={this.onReturnHome}/>)
        }
    }

    render() {
        return (
            <div id="preferencesContainer">
                {this.renderContent()}
                <h2>Movie Tinder Preferences</h2>
                <h3>Select the Streaming Services you are signed up for</h3>
                <div className='ui grid'>
                    <div className='ui row'>
                        {this.renderServices()}
                    </div>
                </div>
                <h3>Select genres below</h3>
                <div className='ui grid'>
                    <div className='ui row'>
                        {this.renderGenres()}
                    </div>
                </div>
                <h3>How would you like your movies sorted?</h3>
                <div className='ui grid'>
                    <div className='ui row'>
                        {this.renderSortingMethods()}
                    </div>
                </div>
                <br />
                <button className="ui primary button" onClick={()=>{this.props.moviePreferences(this.state)}}>Start Selecting Movies!</button>
                <br />

            </div>

        )
    }
}

export default SingleUserSetup;