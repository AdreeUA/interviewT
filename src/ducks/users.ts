import { createAction, createReducer } from 'redux-act'
import axios from 'axios'
import { ReduxThunkCb } from '../store/types'

export const REDUCER = 'USERS'
const NS = `${REDUCER}__`

export interface UserState {
  thumbnail: string
  fullName: string
  email: string
  phone: string
}

export interface UsersState {
  results: UserState[]
  filtersResults: UserState[]
  filtersData: { [key: string]: string }
  isRequestError: boolean
  isRequesting: boolean
}

export const initialState: UsersState = {
  results: [],
  filtersResults: [],
  filtersData: {},
  isRequestError: false,
  isRequesting: false,
}

const reducer = createReducer({}, initialState)

const callFailure = createAction(`${NS}CALL_FAILURE`)
reducer.on(callFailure, (state) => ({
  ...state,
  isRequestError: true,
  isRequesting: false,
}))

const callSuccess = createAction(`${NS}CALL_SUCCESS`)
reducer.on(callSuccess, (state) => ({
  ...state,
  isRequestError: false,
  isRequesting: false,
}))

const callRequest = createAction(`${NS}CALL_REQUEST`)
reducer.on(callRequest, (state) => ({
  ...state,
  isRequestError: false,
  isRequesting: true,
}))

const set = createAction<any>(`${NS}SET`)
reducer.on(set, (state, users) => ({ ...state, results: users.results }))

const add = createAction<any>(`${NS}ADD`)
reducer.on(add, (state, { results }) => {
  const user = results[0]
  const nameField = user.name
  const titleName = nameField.title
  const firstName = nameField.first
  const lastName = nameField.last
  const fullName = `${titleName} ${firstName} ${lastName}`
  const thumbnail = user.picture.thumbnail
  const email = user.email
  const phone = user.phone
  return {
    ...state,
    results: [ ...state.results, { thumbnail, fullName, email, phone } ],
  }
})

export const setFilterData = createAction<any>(`${NS}SET_FILTER_DATA`)
reducer.on(setFilterData, (state, filterData) => {
  return {
    ...state,
    filtersData: {
      ...state.filtersData,
      ...filterData,
    },
  }
})

export const filterUsers = createAction(`${NS}FILTERS`)
reducer.on(filterUsers, (state) => {
  const filterKey = Object.keys(state.filtersData)
  const filtersResults = state.results.filter((user) => {
    const filterCollection: boolean[] = []
    filterKey.forEach((key) => {
      const result = user[key].toLowerCase().includes(state.filtersData[key].toLowerCase())
      return filterCollection.push(result)
    })
    return filterCollection.every((el: boolean) => el)
  })
  return {
    ...state,
    filtersResults,
  }
})

export const load = (): ReduxThunkCb => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(callRequest())
    return axios
      .get('https://randomuser.me/api/')
      .then((response) => {
        dispatch(add(response.data))
        dispatch(filterUsers())
        dispatch(callSuccess())
        resolve()
      })
      .catch((error) => {
        dispatch(callFailure())
        reject(error)
      })
  })
}

export default reducer
