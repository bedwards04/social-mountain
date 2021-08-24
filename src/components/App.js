import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response => {
      console.log(response)
      this.setState({ posts: response.data });
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text }).then(response => {
      this.setState({ posts: response.data });
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response => {
      this.setState({ posts: response.data })
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then(response => {
      this.setState({ posts: response.data });
    })
  }

  //Black Diamond - search to find posts that contain a certain string
  // searchPosts() {
  //   axios.get('https://practiceapi.devmountain.com/api/posts/filter').then(response => {
  //     this.setState({ posts: response.data });
  //   })
  // }

  render() {
    const { posts } = this.state;
    // console.log(this.state.posts)
    //How you would destructure line 62
    // const { id, text, date } = this.state.posts[0]; 

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

          {
            posts.map(post => (
              <Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
                createPostFn={this.createPost} />
            ))
          }
          {/* <Post id={this.state.posts.id} text={this.state.posts.text} date={this.state.posts[0].date} /> */}
        </section>
      </div>
    );
  }
}

export default App;
