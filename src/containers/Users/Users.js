import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import Loader from 'react-loader-spinner';

import styles from './Users.style';
import { getUsers } from '../../store/actions';

const columns = [
  {
    name: 'FIRSTNAME',
    selector: 'firstname',
    sortable: true
  },
  {
    name: 'LASTNAME',
    selector: 'lastname',
    sortable: true
  },
  {
    name: 'EMAIL',
    selector: 'email',
    sortable: true
  },
  {
    name: 'ACCOUNT LEVEL',
    selector: 'accountlevel',
    sortable: true
  },
  {
    name: 'STATUS',
    selector: 'status',
    sortable: true
  }
];

class Users extends PureComponent {
  componentDidMount() {
    const { token, fetchUsers } = this.props;

    fetchUsers({ token });
  }

  render() {
    const { users, isFetching } = this.props;
    return (
      <div style={styles.container}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            marginTop: 40
          }}
        ></div>
        <DataTable
          pagination={true}
          progressPending={isFetching}
          progressComponent={<Loader type='Bars' color='deeppink' height={60} width={60} />}
          title='List of Users'
          columns={columns}
          data={users.map(user => ({
            firstname: user.person.firstname,
            lastname: user.person.lastname,
            email: user.email,
            accountlevel: user.member_level,
            status: user.account_status,
            action: ''
          }))}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  token: state.auth.payload.token,
  isFetching: state.user.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: data => dispatch(getUsers(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
