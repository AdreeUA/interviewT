import { UsersState } from '../ducks/users'

export const initialState: UsersState = {
  results: [],
  filtersResults: [],
  filtersData: {},
  isRequestError: false,
  isRequesting: false,
}

const state: UsersState = {
  results: [
    {
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
      fullName: 'mrs ariane scott',
      email: 'ariane.scott@example.com',
      phone: '563-392-7975',
    },
  ],
  filtersResults: [
    {
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
      fullName: 'mrs ariane scott',
      email: 'ariane.scott@example.com',
      phone: '563-392-7975',
    },
  ],
  filtersData: {},
  isRequestError: false,
  isRequesting: false,
}

export default state
