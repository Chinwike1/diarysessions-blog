import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import CreatePost from './components/pages/CreatePost';
import Dashboard from './components/pages/Dashboard';
import PostsContextProivder from './context/PostsContext';
import Alerts from './components/layout/Alerts';
import AlertContextProvider from './context/AlertContext';
import Post from './components/pages/Post';
import MyPosts from './components/pages/MyPosts';

function App() {
  return (
    <AlertContextProvider>
      <PostsContextProivder>
        <div className='App'>
          <Router>
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/post/:postId' component={Post} />
              <Route exact path='/myposts' component={MyPosts} />
              <Route exact path='/create-post' component={CreatePost} />
            </Switch>
          </Router>
        </div>
      </PostsContextProivder>
    </AlertContextProvider>
  );
}

export default App;
