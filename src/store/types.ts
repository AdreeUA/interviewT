import { RouterState } from 'connected-react-router'
import { Dispatch } from 'redux'
import { AppState } from '../ducks/app'
import { PostsState } from '../ducks/posts'
import { PostState } from '../ducks/post'
import { CommentsState } from '../ducks/comments'
import { UsersState } from '../ducks/users'

export interface StoreState {
  router: RouterState
  app: AppState
  posts: PostsState
  post: PostState
  comments: CommentsState
  users: UsersState
}

export interface ReduxThunkCb {
  (dispatch: Dispatch<StoreState>, getState: () => StoreState): Promise<any>
}
