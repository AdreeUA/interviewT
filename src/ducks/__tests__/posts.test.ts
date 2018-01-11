import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { combineReducers } from 'redux'
import posts, { load } from '../posts'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const reducerMock = combineReducers({
  posts,
  router: (state = {}) => state,
})
const axiosMock = new AxiosMockAdapter(axios)

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  it('load()', () => {
    const postsResponse = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto',
      },
    ]
    axiosMock.onGet('/posts').reply(200, postsResponse)

    let state: {} = {
      router: {
        location: {
          pathname: '/posts',
        },
      },
    }
    const store = mockStore(() => state)
    return store.dispatch(load()).then(() => {
      const actions = store.getActions()
      const expectedActions = [
        {
          type: 'POSTS__SET',
          payload: postsResponse,
          error: false,
        },
      ]
      expect(actions).toEqual(expectedActions)
      actions.forEach((action) => {
        state = reducerMock(state, action)
      })
      expect(state).toEqual({
        ...state,
        posts: { items: [ ...postsResponse ] },
      })
    })
  })
})
