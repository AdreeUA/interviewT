import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { ReduxThunkCb } from '../store/types'
import { PostState } from './post'

export const REDUCER = 'POSTS'
const NS = `${REDUCER}__`

export interface PostsState {
  items: PostState[]
}

export const initialState: PostsState = {
  items: [],
}

const reducer = createReducer({}, initialState)

const set = createAction<any[]>(`${NS}SET`)
reducer.on(set, (state, items) => ({ ...state, items: [...items] }))

export const load = (): ReduxThunkCb => dispatch => {
  return axios.get('/posts').then(response => {
    dispatch(set(response.data))
  })
}

export default reducer
