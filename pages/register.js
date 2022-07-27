import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { unauthPage } from '../middleware/authorizationPage';

export async function getServerSideProps(context) {
  await unauthPage(context);
  return {
    props: {},
  };
}
export default function Register() {
  const router = useRouter();
  const [state, setState] = useState({ email: '', password: '' });
  const handleInput = (event) => {
    if (event.target.getAttribute('name') == 'email') {
      setState({ ...state, email: event.target.value });
    } else {
      setState({ ...state, password: event.target.value });
    }
  };

  const handleClick = async () => {
    await axios
      .post('http://localhost:3000/api/auth/register', state)
      .then((res) => {
        router.push('/login')
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
          <input />
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
          Register
        </button>
      </div>
    </>
  );
}
