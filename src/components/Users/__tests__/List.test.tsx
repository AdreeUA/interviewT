import * as React from 'react'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import userStateMock, { initialState } from '../../../__mocks__/usersStateMock'
import { load } from '../../../ducks/users'
import List from '../List'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../ducks/users', () => {
  return {
    load: jest.fn(() => {
      return () => Promise.resolve()
    }),
  }
})

describe('List', () => {
  it('render() with initialState', () => {
    const store = mockStore({ users: initialState })
    const wrapper = shallow(<List />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('render() with completed state', () => {
    const store = mockStore({ users: userStateMock })
    const wrapper = shallow(<List />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('render() with requesting', () => {
    const store = mockStore({ users: { ...userStateMock, isRequesting: true } })
    const wrapper = shallow(<List />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('Button onClick()', () => {
    const store = mockStore({ users: initialState })
    const wrapper = shallow(<List />, { context: { store } })
    const input = wrapper.dive().find('.button')
    input.simulate('click', { currentTarget: { value: 'Site' } })
    expect(load).toBeCalled()
  })
})
