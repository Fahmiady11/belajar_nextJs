import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import cookies from 'next-cookies';
import { unauthPage } from '../middleware/authorizationPage';

export async function getServerSideProps(context) {
  // const cookie = cookies(context);
  // //redirect server
  // if (cookie.token) {
  //   context.res
  //     .writeHead(302, {
  //       Location: '/posts',
  //     })
  //     .end();
  // }
  await unauthPage(context);
  return {
    props: {},
  };
}

export default function Login() {
  const router = useRouter();
  const [state, setState] = useState({ email: '', password: '' });
  const handleInput = (event) => {
    if (event.target.getAttribute('name') == 'email') {
      setState({ ...state, email: event.target.value });
    } else {
      setState({ ...state, password: event.target.value });
    }
  };
  //redirect client
  //   useEffect(() => {
  //     let token = Cookie.get('token');
  //     if (token) {
  //       router.push('/posts');
  //     }
  //     //eslint-disable-next-line
  //   }, []);
  const handleClick = async () => {
    await axios
      .post('http://localhost:3000/api/auth/login', state)
      .then((res) => {
        router.push('/posts');
        Cookie.set('token', res?.data?.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="p-2 flex flex-col  gap-2">
        <div className="flex flex-row gap-2">
          <label>Email:</label>
          <input
            name="email"
            type="text"
            onChange={handleInput}
            className="border-2 border-black"
          />
        </div>
        <div className="flex flex-row gap-2">
          <label>Password:</label>

          <input
            name="password"
            type="password"
            onChange={handleInput}
            className="border-2 border-black"
          />
          <input />
        </div>
        <button onClick={handleClick} className=" bg-orange-400 w-20">
          Login
        </button>
      </div>
    </>
  );
}
