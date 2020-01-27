import React, {Component} from 'react';
import Header from "./components/Header"
import Posts from "./components/Posts"
import Post from "./components/Post"
import PostForm from "./components/PostForm"
import NotFound from "./components/NotFound"
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
    state = {
      posts: [
          {
              id: 1,
              slug: 'hello-react',
              title: "Hello React",
              content: "Lorem."
          },
          {
              id: 2,
              slug: 'hello-project',
              title: "Hello Project",
              content: "Tothe."
          },
          {
              id: 3,
              slug: 'hello-blog',
              title: "Hello Blog",
              content: "Ipsum."
          }
      ]
  }

    addNewPost = post => {
        post.id = this.state.posts.length + 1;
        post.slug = encodeURIComponent(
            post.title
                .toLowerCase()
                .split(" ")
                .join("-")
        );
        this.setState({
            posts : [...this.state.posts, post]
        });
    };

    render() {
        return (
                <Router>
                  <div className="App">
                    <Header/>
                    <Switch>
                      <Route
                         exact
                         path="/"
                         render={() => <Posts posts={this.state.posts}/>}
                      />

                      <Route
                        path="/post/:postSlug"
                        render={props => {
                            const post = this.state.posts.find(
                                post => post.slug === props.match.params.postSlug
                            );
                            if (post) return <Post post={post} />;
                            else return <NotFound />;
                        }}
                />

                <Route exact path="/new" render={() => <PostForm addNewPost={this.addNewPost} />} />
                <Route component={NotFound} />
                </Switch> 
                  </div>
                </Router>
        );
    }

}

export default App;
