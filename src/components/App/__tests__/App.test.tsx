import * as React from 'react'
import { shallow } from 'enzyme'
import routes from '../../../routes'
import App from '../App'

describe('App', () => {
  it('render()', () => {
    const route = routes[0]
    const wrapper = shallow(<App route={route} />)
    expect(wrapper).toMatchSnapshot()
  })
})
