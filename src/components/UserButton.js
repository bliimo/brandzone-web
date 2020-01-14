import React, { PureComponent } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { connect } from 'react-redux';

import Text from './Text';

import { logout } from '../store/actions';

class UserButton extends PureComponent {
  state = {
    isDropdownOpen: false,
  };

  toggleDropDown = () => {
    this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  };

  render() {
    const { isDropdownOpen } = this.state;
    const { onLogout } = this.props;
    return (
      <div>
        <button
          onClick={this.toggleDropDown}
          type="button"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <p style={{ color: 'lightgray', marginRight: 15, fontSize: '1rem' }}>
            |
          </p>
          <FaUserCircle size={26} style={{ marginRight: 3 }} />
          <Text fontSize="0.6rem">Admin</Text>
          <FaCaretDown size={12} style={{ marginLeft: 5, paddingTop: 2 }} />
        </button>
        <div
          style={{
            display: !isDropdownOpen && 'none',
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 1,
            top: 50,
            right: 35,
            boxShadow: '0px 0px 8px -1px lightgray',
            minWidth: 120,
            borderRadius: 5,
            borderTopRightRadius: 0,
          }}
        >
          <button
            onClick={() => onLogout()}
            type="button"
            style={{ float: 'right', paddingTop: 5, paddingBottom: 10 }}
          >
            <Text>Log out</Text>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserButton);
