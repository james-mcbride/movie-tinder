import React from "react";

class Search extends React.Component{
    State={
        search: "",

    }

    onSearchChange(event){
        this.setState({search: event.target.value})
    }

    searchMoviesDropdown(movie) {
        let apiKey=""
        let movieInfo=[]
        fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response==="True") {
                    for (let i = 0; i < data.Search.length; i++) {
                        movieInfo.push(data.Search[i])
                    }
                }
            })


            .catch(error => console.error(error)); /* handle errors */
        return movieInfo
    }
    renderContent(){
        let movies=this.searchMoviesDropdown(this.state.search)
        let renderedList=movies.map((movie=>{
            return <div>{movie.Title}</div>
        }))
        return <div>{renderedList}</div>
    }

    render(){
       return (
           <div>
               <div>
                   <label>Password</label>
                   <input type="password" value={this.state.search} onChange={this.onSearchChange}/>
                   <button onClick={this.onFormSubmit}>Login</button>
               </div>
               <div>
                   {this.renderContent()}
               </div>
           </div>
       )
    }
}

export default Search;