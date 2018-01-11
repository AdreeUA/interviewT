import React from 'react'
import { Dispatch, connect } from 'react-redux'
import * as _ from 'lodash'
import { StoreState } from '../../store/types'
import { load as userLoad, UserState } from '../../ducks/users'

import './List.css'

interface OwnProps {}

interface ConnectedState {
  users: UserState[]
  isRequesting: boolean
}

interface ConnectedDispatch {
  dispatch: Dispatch<StoreState>
}

type Props = OwnProps & ConnectedState & ConnectedDispatch

interface State {}

const mapStateToProps = (state: StoreState) => ({
  users: state.users.results,
  isRequesting: state.users.isRequesting,
})

const WrappedList = connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps)(
  class List extends React.Component<Props, State> {
    tableColumns = [
      {
        label: 'Image',
      },
      {
        label: 'Name',
      },
      {
        label: 'Email',
      },
      {
        label: 'Phone',
      },
    ]

    handleAddUser = () => {
      this.props.dispatch(userLoad())
    }

    render() {
      const { users } = this.props
      return (
        <div className="user-list">
          <table className="table user-list__table">
            <thead>
              <tr>
                {this.tableColumns.map((item) => {
                  return <th key={item.label}>{item.label}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {users.map(({ fullName, thumbnail, email, phone }) => {
                return (
                  <tr key={email}>
                    <td>
                      <div className="table__image-wrapper">
                        <img src={thumbnail} className="table__image" alt={fullName} />
                      </div>
                    </td>
                    <td className="table__name">{fullName}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {_.isEmpty(users) && !this.props.isRequesting && <div className="user-list__text text">Empty table</div>}
          {this.props.isRequesting && <div className="user-list__text text">Loading...</div>}
          <button className="button" onClick={this.handleAddUser}>
            Add user
          </button>
        </div>
      )
    }
  },
)

export default WrappedList
