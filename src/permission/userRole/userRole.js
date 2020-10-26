import React, { Fragment, Component } from 'react';
import RoleTable from './RoleTable';
import RoleModal from './RoleModal';

class UserRole extends Component {

  render() {
    return (
      <Fragment>
        <RoleTable />
        <RoleModal />
      </Fragment>
    )
  }

};

export default UserRole;
