import React from 'react'
import { Dispatch, connect } from 'react-redux'
import * as _ from 'lodash'
import { StoreState } from '../../store/types'
import { UserState } from '../../ducks/users'
import Header from './Header'
import Body from './Body'

import './SortableTable.css'

interface OwnProps {}

interface ConnectedState {
  usersFilters: UserState[]
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
    render() {
      const data = this.props.usersFilters
      return (
        <div className="sortable-table">
          <table className="table sortable-table__table">
            <Header />
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
