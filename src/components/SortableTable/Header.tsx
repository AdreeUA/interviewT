import React from 'react'
import * as _ from 'lodash'

interface Props {
  columns: any[]
  onChangeSearch: (key: string) => any
}

interface State {}

class Header extends React.Component<Props, State> {
  render() {
    const { columns } = this.props
    return (
      <thead>
        <tr>
          {!_.isEmpty(columns) &&
            columns.map((item) => {
              return (
                <th key={item.key} className={`table__header-${item.key}`}>
                  {item.label}
                  {item.sort && <input className="table__input" onChange={this.props.onChangeSearch(item.key)} />}
                </th>
              )
            })}
        </tr>
      </thead>
    )
  }
}

export default Header
