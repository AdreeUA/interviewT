import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { ReduxThunkCb } from '../store/types'

export const REDUCER = 'COMMENTS'
const NS = `${REDUCER}__`

export interface CommentsState {
  items: {
    body: string
    email: string
    id: number
    name: string
    postId: number
  }[]
}

export const initialState: CommentsState = {
  items: []
}

const reducer = createReducer({}, initialState)

const set = createAction<any>(`${NS}SET`)
reducer.on(set, (state, items) => ({ ...state, items: [...items],  }))

export const load = (postId: number): ReduxThunkCb => dispatch => {
  return axios.get(`/comments?postId=${postId}`).then(response => {
    dispatch(set(response.data))
  })
}

export default reducer
