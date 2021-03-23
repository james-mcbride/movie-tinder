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
        if (this.state.search===""){
            return <div></div>

        }else{
            let renderedList = this.state.movies.map((movie => {
                console.log(movie)
                return (
                    <tr>
                        <td>
                            <h4 className="ui image header">
                                <img src={movie.Poster} className="ui massive rounded image" />
                                    <div className="content">
                                        {movie.Title}
                                        <div className="sub header">{movie.Year}
                                        </div>
                                    </div>
                            </h4>
                        </td>
                        <td>{this.searchServerMovies(movie)}</td>
                    </tr>
                    // <div className="ui row">
                    //     <div className="eight wide column">{movie.Title}</div>
                    //     <div className="four wide column">{this.searchServerMovies(movie)}</div>
                    // </div>
                )
            }))
            return (
                <table className="ui unstackable table" id="movieTable">
                    <thead>
                    <tr>
                        <th className="thirteen wide">Movie Title</th>
                        <th className="three wide">Availability</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderedList}
                    </tbody>
                </table>
            )

                /*// <div className="ui grid" id="searchList">*/
                /*//     <div className="ui row">*/
                /*//         <div className="eight wide column">Title</div>*/
                /*//         <div className="four wide column">Availability</div>*/
                /*//     </div>*/
                /*//     {renderedList}*/
                /*// </div>*/


        }
    }

    render(){
       return (
           <div>
               <div>
                   <h3>Search streaming services for movie availability!</h3>
                   <div class="ui large icon input">
                       <input type="text" placeholder="Enter movie here" value={this.state.search}
                              onChange={this.onSearchChange}/>
                       <i className="search icon"></i>

                   </div>
                   <br />
                   {this.renderContent()}
               </div>

           </div>
       )
    }
}

export default Search;