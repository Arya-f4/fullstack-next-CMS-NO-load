import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { authPage } from "../../middlewares/authorizationPage";
import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Nav from '../../components/Nav';
export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch('http://localhost:3000/api/posts'
    , {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

  const posts = await postReq.json();



  return {
    props: {
      token,
      posts: posts.data
    }
  }
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);


  async function deleteHandler(id, e) {
    e.preventDefault();

    const { token } = props;
    const ask = confirm('Are you sure sir to delete this?');
    if (ask) {
      const postsFiltered = posts.filter(post => {
        return post.id !== id && post;
      });
      setPosts(postsFiltered)
      const deletePost = await fetch('/api/posts/delete/' +
        id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const res = await deletePost.json();
      return console.log('Delete');
    }
  }

  function editHandler(id) {
    Router.push('/posts/edit/' + id);
  }

  return (
    <div>
      <Nav />
      <h1>Posts</h1>

      {posts.map(post => (
        <div key={post.id}>
          <h3 >
            {post.tittle}
          </h3>
          <p>{post.content}</p>
          <div>
            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>

          </div>
          <hr />
        </div>
      ))}
    </div>
  );

}