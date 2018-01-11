import { createAction, createReducer } from 'redux-act'
import { matchPath } from 'react-router'
import axios from 'axios'
import { ReduxThunkCb } from '../store/types'
import { load as loadComments } from './comments'
import * as _ from 'lodash'

export const REDUCER = 'POST'
const NS = `${REDUCER}__`

export interface PostState {
    body: string
    id: number
    title: string
    userId: number
}

export const initialState: PostState | {} = {
}

const reducer = createReducer({}, initialState)

const set = createAction<{}>(`${NS}SET`)
reducer.on(set, (state, post) => ({ ...state, ...post }))

export const load = (): ReduxThunkCb => (dispatch, getState) => {
  const state = getState()
  const match = matchPath(state.router.location.pathname, { path: '/posts/:id' })
  const id = _.get(match, 'params.id', null)
  if (_.isNull(id)) {
    return Promise.reject(new Error('id must have a value'))
  }
  return axios.get(`/posts/${id}`).then(response => {
    dispatch(set(response.data))
    return dispatch(loadComments(id))
  })
}

export default reducer
