import Link from "next/link";
import Cookie from 'js-cookie';
import Router from "next/router";


export default function Nav() {
  function logoutHandler(e) {
    e.preventDefault();

    Cookie.remove('token');
    Router.push('/auth/login');

  }


  return (
    <>
      <Link href="/posts/">
        <a > Post   </a>
      </Link>
      &nbsp; | &nbsp;
      <Link href="/posts/create">
        <button >Create Post   </button>
      </Link>
      &nbsp; | &nbsp;
      <a href="#" onClick={logoutHandler.bind(this)}>Logout </a>
    </>
  );
}