import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { combineReducers } from 'redux'
import comments, { load } from '../comments'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const reducerMock = combineReducers({
  comments,
  router: (state = {}) => state,
})
const axiosMock = new AxiosMockAdapter(axios)

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset()
  })
  it('load()', () => {
    const commentsResponse = [
      {
        postId: 1,
        id: 1,
        name: 'name',
        email: 'email@example.com',
        body: 'body',
      }
    ]
    const postId = 1
        
    axiosMock.onGet(`/comments?postId=${postId}`).reply(200, commentsResponse)
    let state: {} = {
      router: {
        location: {
          pathname: `/posts/${postId}`,
        },
      }
    }
    const store = mockStore(() => state)
    return store.dispatch(load(postId)).then(() => {
      const actions = store.getActions()
      const expectedActions = [
        { type: 'COMMENTS__SET', payload: commentsResponse, error: false },
      ]
      expect(actions).toEqual(expectedActions)
      actions.forEach(action => {
        state = reducerMock(state, action)
      })
      expect(state).toEqual({
        ...state,
        comments: { items: commentsResponse},
      })
    })
  })
})
