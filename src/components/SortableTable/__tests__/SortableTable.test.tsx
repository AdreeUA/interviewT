import * as React from 'react'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import userStateMock, { initialState } from '../../../__mocks__/usersStateMock'
import SortableTable from '../SortableTable'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('SortableTable', () => {
  it('render() with initialState', () => {
    const store = mockStore({ users: initialState })
    const wrapper = shallow(<SortableTable />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('render() with completed state', () => {
    const store = mockStore({ users: userStateMock })
    const wrapper = shallow(<SortableTable />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
  it('render() with requesting', () => {
    const store = mockStore({ users: { ...userStateMock, isRequesting: true } })
    const wrapper = shallow(<SortableTable />, { context: { store } })
    expect(wrapper.dive()).toMatchSnapshot()
  })
})
