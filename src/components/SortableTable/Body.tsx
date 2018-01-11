import React from 'react'
import * as _ from 'lodash'

interface Props {
  data: any[]
}

interface State {}

class Body extends React.Component<Props, State> {
  render() {
    const { data } = this.props
    return (
      <tbody>
        {!_.isEmpty(data) &&
          data.map(({ fullName, thumbnail, email, phone }) => {
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
    )
  }
}

export default Body
