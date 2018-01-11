import React from 'react'
import { Dispatch, connect } from 'react-redux'
import * as _ from 'lodash'
import { StoreState } from '../../store/types'
import { setFilterData, filterUsers } from '../../ducks/users'
import Header from './Header'
import Body from './Body'

import './SortableTable.css'

interface OwnProps {}

interface ConnectedState {
  usersFilters: any[]
  isRequesting: boolean
}

interface ConnectedDispatch {
  dispatch: Dispatch<StoreState>
}

type Props = OwnProps & ConnectedState & ConnectedDispatch

interface State {}

const mapStateToProps = (state: StoreState) => ({
  usersFilters: state.users.filtersResults,
  isRequesting: state.users.isRequesting,
})

const WrappedFilters = connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps)(
  class SortableTable extends React.Component<Props, State> {
    tableColumns = [
      {
        label: 'Image',
        key: 'thumbnail',
      },
      {
        label: 'Name',
        sort: true,
        key: 'fullName',
      },
      {
        label: 'Email',
        sort: true,
        key: 'email',
      },
      {
        label: 'Phone',
        sort: true,
        key: 'phone',
      },
    ]

    handleChangeSearch = (key: string) => (event: React.SyntheticEvent<any>) => {
      const value = event.currentTarget.value
      this.props.dispatch(setFilterData({ [key]: value }))
      this.props.dispatch(filterUsers())
    }

    render() {
      const data = this.props.usersFilters
      return (
        <div className="sortable-table">
          <table className="table sortable-table__table">
            <Header columns={this.tableColumns} onChangeSearch={this.handleChangeSearch} />
            <Body data={data} />
          </table>
          {_.isEmpty(data) &&
          !this.props.isRequesting && <div className="sortable-table__text text">Empty filters table</div>}
          {this.props.isRequesting && <div className="sortable-table__text text">Loading...</div>}
        </div>
      )
    }
  },
)

export default WrappedFilters
