import { Component } from 'react';

import './styles.css';

//components
import { loadPosts } from '../../../utils/loadPost'
import { Posts } from '../../Posts/index'
import { Button } from '../../Button/index';
import { TextInput } from '../../TextInput/index';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      allPosts: postsAndPhotos,
      posts: postsAndPhotos.slice(page, postsPerPage)
    });
  }
  //pagination
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    //inserindo os dois objetos dentro de nextPosts no array
    posts.push(...nextPosts)

    this.setState({
      posts: posts,

      //aqui está fazendo a alteração do valor de page
      page: nextPage
    })
  }

  async componentDidMount() {
    await this.loadPosts()
  }
  //search filter
  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      })
      : posts

    return (
      <section className="container" >
        <div className="search-container">
          {!!searchValue && (
            <h1>Your Search: {searchValue}</h1>
          )}
          <TextInput value={searchValue} handleChange={this.handleChange} placeholder='Type your post' />
        </div>


        {!!filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {!filteredPosts.length > 0 && (
          <p> Não existem posts =( </p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button disabled={noMorePosts} text='Load more posts' handleClick={this.loadMorePosts} />
          )}
        </div>
      </section>
    );
  }
}

