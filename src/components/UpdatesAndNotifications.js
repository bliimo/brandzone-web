import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCol } from 'mdbreact';
import Text from './Text';
import { getNotifications, viewNotifications } from '../store/actions';

class UpdatesAndNotifications extends Component {
  render() {
    const { notification } = this.props;

    let Notifications = <Text>Fetching Updates and Notifications...</Text>;
    if (notification) {
      Notifications = notification.data.map((notif, index) => {
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: notif.content }}
            style={styles.notification}
          />
        );
      });
    }

    return (
      <MDBCol size='12' className='col-info profile-institution-info'>
        {Notifications}
      </MDBCol>
    );
  }
}

const styles = {
  notification: {
    padding: '15px 10px',
    background: 'rgba(103,103,103,0.5)',
    borderTop: '1px solid gray',
    borderBottom: '1px solid gray',
    cursor: 'pointer'
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.auth.error,
  account: state.auth.currentUser,
  notification: state.notification.notification
});

export default connect(mapStateToProps, {
  viewNotifications
})(UpdatesAndNotifications);
