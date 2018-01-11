import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { combineReducers } from 'redux'
import reducer, { setFilterData, filterUsers, load, initialState } from '../users'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const reducerMock = combineReducers({
  users: reducer,
  router: (state = {}) => state,
})
const axiosMock = new AxiosMockAdapter(axios)

describe('sync ducks', () => {
  const resultsMock = [
    {
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/88.jpg',
      fullName: 'mr christoffer petersen',
      email: 'christoffer.petersen@example.com',
      phone: '28295606',
    },
  ]
  const filterDataMock = { phone: resultsMock[0].phone }
  it('setFilterData()', () => {
    let state = { ...initialState }
    const store = mockStore(() => state)
    store.dispatch(setFilterData(filterDataMock))
    const actions = store.getActions()
    const expectedActions = [ { type: 'USERS__SET_FILTER_DATA', payload: filterDataMock, error: false } ]
    expect(actions).toEqual(expectedActions)
    actions.forEach((action) => {
      state = reducer(state, action)
    })
    expect(state).toEqual({
      ...state,
      filtersData: filterDataMock,
    })
  })
  it('filterUsers() with initialState', () => {
    let state: any = { ...initialState, filtersData: filterDataMock }
    const store = mockStore(() => state)
    store.dispatch(filterUsers())
    const actions = store.getActions()
    const expectedActions = [ { type: 'USERS__FILTERS', error: false } ]
    expect(actions).toEqual(expectedActions)
    actions.forEach((action) => {
      state = reducer(state, action)
    })
    expect(state).toEqual({
      ...state,
      filtersData: filterDataMock,
    })
  })
  it('filterUsers() with filter entry', () => {
    let state: any = { ...initialState, filtersData: filterDataMock, results: resultsMock }
    const store = mockStore(() => state)
    store.dispatch(filterUsers())
    const actions = store.getActions()
    const expectedActions = [ { type: 'USERS__FILTERS', error: false } ]
    expect(actions).toEqual(expectedActions)
    actions.forEach((action) => {
      state = reducer(state, action)
    })
    expect(state).toEqual({
      ...state,
      filtersResults: resultsMock,
    })
  })
  it('filterUsers() whithout filter entry', () => {
    let state: any = { ...initialState, results: resultsMock, filtersData: { phone: 'dummy' } }
    const store = mockStore(() => state)
    store.dispatch(filterUsers())
    const actions = store.getActions()
    const expectedActions = [ { type: 'USERS__FILTERS', error: false } ]
    expect(actions).toEqual(expectedActions)
    actions.forEach((action) => {
      state = reducer(state, action)
    })
    expect(state).toEqual({
      ...state,
      filtersResults: [],
    })
  })
})

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  it('load()', () => {
    const usersResponse = {
      results: [
        {
          gender: 'female',
          name: { title: 'mrs', first: 'ariane', last: 'scott' },
          location: { street: '7556 peel st', city: 'souris', state: 'yukon', postcode: 39724 },
          email: 'ariane.scott@example.com',
          login: {
            username: 'whiteelephant375',
            password: 'noel',
            salt: 'AlPoCeA2',
            md5: '58e91ea87b692fa39dfb18bac8b444eb',
            sha1: 'd3466101d55bb8a51b1ea928df650438ebe2fef4',
            sha256: '04cf091903701adef86f144ef9698bd29d5b3d0922488cfb8f36dccb28f728e5',
          },
          dob: '1988-02-14 23:54:43',
          registered: '2002-11-22 12:47:14',
          phone: '563-392-7975',
          cell: '319-113-9494',
          id: { name: '', value: null },
          picture: {
            large: 'https://randomuser.me/api/portraits/women/5.jpg',
            medium: 'https://randomuser.me/api/portraits/med/women/5.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
          },
          nat: 'CA',
        },
      ],
      info: { seed: '1542136b1b521b67', results: 1, page: 1, version: '1.1' },
    }
    const usersResultsMock = [
      {
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
        fullName: 'mrs ariane scott',
        email: 'ariane.scott@example.com',
        phone: '563-392-7975',
      },
    ]
    axiosMock.onGet('https://randomuser.me/api/').reply(200, usersResponse)

    let state: any = {}
    const store = mockStore(() => state)
    return store.dispatch(load()).then(() => {
      const actions = store.getActions()
      const expectedActions = [
        { type: 'USERS__CALL_REQUEST', error: false },
        {
          type: 'USERS__ADD',
          payload: usersResponse,
          error: false,
        },
        { type: 'USERS__FILTERS', error: false },
        { type: 'USERS__CALL_SUCCESS', error: false },
      ]
      expect(actions).toEqual(expectedActions)
      actions.forEach((action) => {
        state = reducerMock(state, action)
      })
      expect(state.users).toEqual({
        ...state.users,
        results: usersResultsMock,
        filtersResults: usersResultsMock,
      })
    })
  })
})
