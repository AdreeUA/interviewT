import React from 'react'
import { Dispatch, connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLoading } from '../../ducks/app'
import { load } from '../../ducks/posts'
import { StoreState } from '../../store/types'

interface OwnProps {}

interface ConnectedState {
  isLoading: boolean
  posts: any[]
}

interface ConnectedDispatch {
  dispatch: Dispatch<StoreState>
}

type Props = OwnProps & ConnectedState & ConnectedDispatch

interface State {}

const mapStateToProps = (state: StoreState) => ({
  isLoading: state.app.isLoading,
  posts: state.posts.items,
})

const WrappedPosts = connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps)(
  class Posts extends React.Component<Props, State> {
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
      const { isLoading, posts } = this.props
      if (isLoading) {
        return <div>Loading...</div>
      }
      return (
        <div>
          <h1>Posts</h1>
          {posts.map(post => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
          ))}
        </div>
      )
    }
  },
)

export default WrappedPosts
