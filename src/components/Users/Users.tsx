import React from 'react'
import List from './List'
import SortableTable from '../SortableTable'

import './Users.css'

interface Props {}

interface State {}

class Users extends React.Component<Props, State> {
  render() {
    return (
      <div className="users">
        <h2>Users</h2>
        <div className="users__list">
          <div className="users__item">
            <List />
          </div>
          <div className="users__item">
            <SortableTable />
          </div>
        </div>
      </div>
    )
  }
}

export default Users
