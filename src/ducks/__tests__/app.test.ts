import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import reducer, { setLoading, initialState } from '../app'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('sync ducks', () => {
  it('setLoading()', () => {
    let state = {...initialState }
    const store = mockStore(() => state)
    store.dispatch(setLoading(true))
    const actions = store.getActions()
    const expectedActions = [{ type: 'APP__SET', payload: true, error: false }]
    expect(actions).toEqual(expectedActions)
    actions.forEach(action => {
      state = reducer(state, action)
    })
    expect(state).toEqual({
      ...state, 
      isLoading: true ,
    })
  })
})
