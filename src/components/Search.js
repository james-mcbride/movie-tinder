import React from "react";
import "./Intro.css"

class Search extends React.Component{
    state={
        search: "",
        movies: [],

    }

    onSearchChange=(event)=>{
        this.setState({search: event.target.value})
        let search=event.target.value;
        if (search!=="" && search.length>3) {
            this.searchMoviesDropdown(search)
        }
        if (search.length===0){
            this.setState({movies: []})
        }
    }

   searchServerMovies(movie){
        let movieTitle="none"
       let serverMovies=this.props.serverMovies
       for (let i=0; i<serverMovies.length; i++){
           console.log(i)
           console.log(serverMovies[i][0]+" " +serverMovies[i][1].length)
           for (let j=0; j<serverMovies[i][1].length; j++){
                if (serverMovies[i][1][j].Title===movie.Title){
                   movieTitle=serverMovies[i][0]
                }
           }
       }
       return movieTitle
   }

    searchMoviesDropdown(movie) {
        let apiKey = "8dbab255"
        let movies = []
        fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({movies: data.Search.slice(0,5)})
                }
            })
    }
    renderContent(){
        if (this.state.movies===[]){
            return <div></div>

        }else{
            let renderedList = this.state.movies.map((movie => {
                return (
                    <div className="ui row">
                        <div className="eight wide column">{movie.Title}</div>
                        <div className="four wide column">{this.searchServerMovies(movie)}</div>
                    </div>
                )
            }))
            return <div className="ui grid" id="searchList">{renderedList}</div>


        }
    }

    render(){
       return (
           <div>
               <div>
                   <h2>Search for movies!</h2>

                   <label>Search</label>
                   <input type="text" placeholder="Enter movie here" value={this.state.search} onChange={this.onSearchChange}/>
                   <br />
                   <br />
                   {this.renderContent()}
               </div>

           </div>
       )
    }
}

export default Search;