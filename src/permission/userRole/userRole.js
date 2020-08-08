import React, { Component } from 'react'
import RoleTable from './RoleTable'
import RoleModal from './RoleModal'

class UserRole extends Component {
  constructor(props) {
    super(props)
    this.single = []
  }

  render() {
    return (
      <>
        <RoleTable />
        <RoleModal information={this._information} />
      </>
    )
  }

  _information = (key, single) => {
    this.single[key] = single
  }
}

export default UserRole
