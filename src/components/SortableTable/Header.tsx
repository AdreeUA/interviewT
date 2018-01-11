import React from 'react'
import { Dispatch, connect } from 'react-redux'
import { StoreState } from '../../store/types'
import { setFilterData, filterUsers } from '../../ducks/users'

interface OwnProps {}

interface ConnectedState {}

interface ConnectedDispatch {
  dispatch: Dispatch<StoreState>
}

type Props = OwnProps & ConnectedState & ConnectedDispatch

interface State {}

const mapStateToProps = (state: StoreState) => ({})

const WrappedHeader = connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps)(
  class Header extends React.Component<Props, State> {
    tableColumns: { label: string; key: string; sort?: boolean }[] = [
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
      return (
        <thead>
          <tr>
            {this.tableColumns.map((item) => {
              return (
                <th key={item.key} className={`table__header-${item.key}`}>
                  {item.label}
                  {item.sort && <input className="table__input" onChange={this.handleChangeSearch(item.key)} />}
                </th>
              )
            })}
          </tr>
        </thead>
      )
    }
  },
)

export default WrappedHeader
