import * as React from 'react'
import { shallow } from 'enzyme'
import userStateMock from '../../../__mocks__/usersStateMock'
import Body from '../Body'

describe('Body', () => {
  it('render() whith initialState', () => {
    const wrapper = shallow(<Body data={[]} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('render() whith compteted state', () => {
    const wrapper = shallow(<Body data={userStateMock.filtersResults} />)
    expect(wrapper).toMatchSnapshot()
  })
})
