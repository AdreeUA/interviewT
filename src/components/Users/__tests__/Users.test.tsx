import * as React from 'react'
import { shallow } from 'enzyme'
import Users from '../Users'

describe('Users', () => {
  it('render() whith initialState', () => {
    const wrapper = shallow(<Users />)
    expect(wrapper).toMatchSnapshot()
  })
})
