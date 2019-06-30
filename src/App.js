import React, { Component } from 'react';
import './App.css';

import LoginWithSpotify from './components/LoginWithSpotifyForm';
import UserDetails from './components/User/UserDetails';

class App extends Component {
  state ={
    isLoggedIn: false,
    accessToken: null,
    userName: '',
  }

  componentDidMount() {
    /*
      Checks the access token after spotify redirects the user back to the website
      after sucessfully logging in
    */
    const accessToken = this.checkUrlForSpotifyAccessToken();
    if (accessToken) {
      this.setState({
        isLoggedIn: true,
        accessToken,
      });
    }
  }

  // TOFO: Move checkUrlForSpotifyAccessToken and getHashParams to an utils file
  checkUrlForSpotifyAccessToken = () => {
    const params = this.getHashParams();
    const accessToken = params.access_token;
    if (!accessToken) {
      return false;
    }

    return accessToken;
  }

  getHashParams = () => {
    const hashParams = {};
    let e; const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  updateUserDetails = (userName) => {
    this.setState({
      userName,
    });
  }

  render() {
    const { isLoggedIn, accessToken, userName } = this.state;

    if (isLoggedIn) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>What to watch?</h1>
          </header>
          <UserDetails
            accessToken={accessToken}
            userName={userName}
            updateUserDetails={this.updateUserDetails}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>What to watch?</h1>
        </header>
        <div>
          <p>Don&apos;t know what movie to watch next?</p>
          <p>Login with spotify and check what to watch next based on your favoorite songs</p>
        </div>
        <LoginWithSpotify />

      </div>
    );
  }
}

export default App;
