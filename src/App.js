import React, {Component} from 'react'
import './App.css'
import axios from 'axios';
import SearchBox from './SearchBox';


class App extends Component{
  constructor(){
    super()
    this.state = {
      userprofile: '',
      avatarurl: '',
      username: '',
      bio: '',
      company:'',
      location: '',
      followers: '',
      following: '',
      public_repos: '',
      hireable: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleClick(){

    //remove display none on click to show the profile container
    var profileContainer = document.getElementById('profileContainer');
    profileContainer.classList.remove('display-none');
    var userNotFound = document.getElementById('userNotFound');
    userNotFound.classList.add('display-none');

    axios.get(`https://api.github.com/users/${this.state.userprofile}`)
            //then tells program to wait for data to come back from Github
          .then(response => this.setState(
              {
              avatarurl: response.data.avatarurl,
              username: response.data.name,
              bio: response.data.bio,
              location: response.data.location,
              blog: response.data.blog,
              company: response.data.company,
              followers: response.data.followers,
              following: response.data.following,
              publicrepos: response.data.publicrepos,
              hireable: response.data.hireable
              }
            ))
            .catch(err => {
              //if user isn't found
              if(err.request){
                console.log(err.request)
                profileContainer.classList.add('display-none');
                userNotFound.classList.remove('display-none');
              }
              else if(err.response){
                console.log(err.response)
                profileContainer.classList.add('display-none');
                userNotFound.classList.remove('display-none');
              }
            })
            // .then(response => console.log(response));
            /*
            //         if(!response.ok){
                      throw Error("Error fetching the dogs");
                    }            */


  }


  handleChange(event){
    this.setState({userprofile: event.target.value})
  }


  render(){
    return(
      <React.Fragment>
      <h1 className="main-heading">Enter a name below to search their Github profile</h1>
      <div className="searchbox__container">
        <input
          className="user-input"
          type="text"
          placeholder="Enter profile name"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
      <div className="button__container">
        <button className="button" onClick={this.handleClick} id="button">
          Search
        </button>
        <div className="profile-container display-none" id="profileContainer">
        <img src={this.state.avatarurl}/>
        <p>{this.state.username}</p>
        <p>{this.state.bio}</p>
        <p>{this.state.location}</p>
        <p><a href={this.state.blog} target="_blank">Blog</a></p>
        <p>Followers: {this.state.followers}</p>
        <p>Following: {this.state.following}</p>
        <p>Public repos: {this.state.public_repos}</p>
        <p>{this.state.hireable}</p>
      </div>
      </div>
      <div className="user-not-found display-none" id="userNotFound">
        <p>User Not Found!</p>
        <p>Please try again</p>
      </div>
    </React.Fragment>
    )
  }
}

export default App;
