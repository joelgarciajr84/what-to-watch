import React, { Component } from 'react';

class LoginWithSpotify extends Component {
  generateRandomString = () => (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );

  authenticate = () => {
    /*
      You must create an .env file with the vars:
      REACT_APP_SPOTIFY_CLIENT_ID
      REACT_APP_SPOTIFY_CLIENT_SECRET
      REACT_APP_SPOTIFY_REDIRECT_URI
      (if after that the vars are undefined, restart your server)
    */
    const {
      REACT_APP_SPOTIFY_CLIENT_ID: SPOTIFY_CLIENT_ID,
      REACT_APP_SPOTIFY_REDIRECT_URI: SPOTIFY_REDIRECT_URI,
    } = process.env;

    const scope = 'user-read-currently-playing user-read-playback-state';
    const authenticationURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${SPOTIFY_REDIRECT_URI}&state=${this.generateRandomString()}`;

    window.location = authenticationURL;
  };

  render() {
    return <button type="button" onClick={this.authenticate}>Login with spotify</button>;
  }
}


export default LoginWithSpotify;
