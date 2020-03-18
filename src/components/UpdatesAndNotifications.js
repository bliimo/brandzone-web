import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCol } from 'mdbreact';
import moment from 'moment';
import Pagination from 'react-js-pagination';

import Text from './Text';
import { getNotifications, viewNotifications } from '../store/actions';

class UpdatesAndNotifications extends Component {
  state = {
    activePage: 1,
    itemsCountPerPage: 10,
    endIndex: 10
  };
  componentDidMount() {
    const { getNotifications } = this.props;
    getNotifications();
  }

  handlePageChange = pageNumber => {
    const { itemsCountPerPage } = this.state;
    this.setState({
      activePage: pageNumber,
      endIndex: pageNumber * itemsCountPerPage
    });
  };

  render() {
    const { activePage, itemsCountPerPage, endIndex } = this.state;
    const { notification, isLoading } = this.props;

    let Notifications = <Text>No notifications</Text>;

    if (notification.data) {
      Notifications = notification.data
        .slice(endIndex - itemsCountPerPage, endIndex)
        .map((notif, index) => {
          return (
            <div
              key={index}
              style={
                notif.isViewed
                  ? styles.notification
                  : { ...styles.notification, ...styles.notificationRead }
              }
              onClick={() =>
                (window.location.href = `/notification/${notif.id}`)
              }
            >
              <p dangerouslySetInnerHTML={{ __html: notif.content }} />
              <p style={styles.notificationTime}>
                {moment(notif.date).fromNow()}
                {notif.isViewed && <span style={styles.italic}> - Seen</span>}
              </p>
            </div>
          );
        });
    }

    return (
      <MDBCol size='12' className='col-info profile-institution-info'>
        {isLoading ? (
          <Text>Fetching Updates and Notifications...</Text>
        ) : (
          Notifications
        )}
        {notification.data && (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={notification.data.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        )}
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
  },
  notificationRead: {
    background: 'rgba(103,103,103,0.9)',
    fontWeight: 'bold'
  },
  notificationTime: {
    paddingTop: '8px',
    color: '#ccc',
    fontSize: '14px'
  },
  italic: {
    fontStyle: 'italic'
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.auth.error,
  account: state.auth.currentUser,
  isLoading: state.notification.isLoading,
  notification: state.notification.notification
});

export default connect(mapStateToProps, {
  getNotifications,
  viewNotifications
})(UpdatesAndNotifications);
