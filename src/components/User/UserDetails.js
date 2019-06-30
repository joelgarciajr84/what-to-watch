import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserDetails extends PureComponent {
  componentDidMount() {
    const { accessToken, updateUserDetails } = this.props;
    if (accessToken) {
      const url = 'https://api.spotify.com/v1/me';
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${accessToken}`);

      const options = {
        method: 'GET',
        headers,
      };

      fetch(url, options)
        .then(res => res.json())
        .then((responseData) => {
          updateUserDetails(responseData.display_name);
        });
    }
  }

  render() {
    const { userName } = this.props;
    return (
      <div>
        Name:
        {userName}
      </div>
    );
  }
}


UserDetails.propTypes = {
  userName: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

export default UserDetails;
