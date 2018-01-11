import { createAction, createReducer } from 'redux-act'

export const REDUCER = 'APP'
const NS = `${REDUCER}__`

export interface AppState {
  isLoading: boolean
}

export const initialState: AppState = {
  isLoading: false,
}

const reducer = createReducer({}, initialState)

export const setLoading = createAction<boolean>(`${NS}SET`)
reducer.on(setLoading, (state, isLoading) => ({ ...state, isLoading }))

export default reducer
