import React from 'react'
import { Dispatch, connect } from 'react-redux'
import { setLoading } from '../../ducks/app'
import { load } from '../../ducks/post'
import { StoreState } from '../../store/types'

interface OwnProps {}

interface ConnectedState {
  isLoading: boolean
  post: any
  comments: any[]
}

interface ConnectedDispatch {
  dispatch: Dispatch<StoreState>
}

type Props = OwnProps & ConnectedState & ConnectedDispatch

interface State {}

const mapStateToProps = (state: StoreState, ownProps: OwnProps) => ({
  isLoading: state.app.isLoading,
  post: state.post,
  comments: state.comments.items,
})

const WrappedPost = connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps)(
  class Post extends React.Component<Props, State> {
    componentWillMount() {
      this.props.dispatch(setLoading(true))
    }

    componentDidMount() {
      this.props
        .dispatch(load())
        .catch((error: any) => console.error(error))
        .then(() => this.props.dispatch(setLoading(false)))
    }

    render() {
      const { isLoading, post, comments } = this.props
      if (isLoading) {
        return <div>Loading...</div>
      }
      return (
        <div>
          <h1>Post</h1>
          <div>userId: {post.userId}</div>
          <div>title: {post.title}</div>
          <div>body: {post.body}</div>
          <h2>Comments</h2>
          {comments.map(item => (
            <div key={item.id}>
              <hr />
              <div>id: {item.id}</div>
              <div>name: {item.name}</div>
              <div>email: {item.email}</div>
              <div>body: {item.body}</div>
            </div>
          ))}
        </div>
      )
    }
  },
)

export default WrappedPost
