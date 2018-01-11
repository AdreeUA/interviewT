import * as React from 'react'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { setFilterData, filterUsers } from '../../../ducks/users'
import Header from '../Header'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../ducks/users', () => {
  return {
    setFilterData: jest.fn(() => {
      return () => Promise.resolve()
    }),
    filterUsers: jest.fn(() => {
      return () => Promise.resolve()
    }),
  }
})

describe('Header', () => {
  it('render() with initialState', () => {
    const store = mockStore({})
    const wrapper = shallow(<Header />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('Input onChange()', () => {
    const store = mockStore({})
    const wrapper = shallow(<Header />, { context: { store } })
    const input = wrapper.dive().find('input').first()
    input.simulate('change', { currentTarget: { value: 'Site' } })
    expect(setFilterData).toBeCalledWith({ fullName: 'Site' })
    expect(filterUsers).toBeCalled()
  })
})
