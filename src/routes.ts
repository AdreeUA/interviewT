import App from './components/App'
import Posts from './components/Posts'
import Post from './components/Post'
import Users from './components/Users'

export default [
  {
    component: App,
    routes: [
      {
        path: '/posts',
        exact: true,
        component: Posts,
      },
      {
        path: '/posts/:id',
        component: Post,
      },
      {
        path: '/',
        component: Users,
      },
    ],
  },
]
