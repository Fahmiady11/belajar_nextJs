import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { authPage } from '../../middleware/authorizationPage';
import Link from 'next/link';
import Nav from '../../component/Nav';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';
// import dynamic from 'next/dynamic';

// const Blog=dynamic(()=>import("../component/Blog"),{
//   ssr:false
// })
export async function getServerSideProps(context) {
  const data = await authPage(context);
  const dataApi = await axios.get('http://localhost:3000/api/posts/', {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return {
    props: {
      token: data.token,
      dataPosts: dataApi?.data?.data,
    },
  };
}
export default function Home(props) {
  const { dataPosts, token } = props;
  const [state, setState] = useState({ title: '', content: '' });
  const [data, setData] = useState([]);
  //   let key;
  //   if (typeof window !== 'undefined') {
  //     key = Cookie.get('token');
  //   }
  const handleInput = (event, type) => {
    if (type == 'title') {
      setState({ ...state, title: event.target.value });
    } else {
      setState({ ...state, content: event.target.value });
    }
  };
  const handleClick = async (event) => {
    await axios
      .post('http://localhost:3000/api/posts/create', state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData([...data, res?.data?.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async (event, id) => {
    await axios
      .delete(`http://localhost:3000/api/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let dataFilter = data.filter((data) => data.id !== id);
        setData([...dataFilter]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setData(dataPosts);
  }, []);

  return (
    <>
      <Head>
        <title>Halaman Blog</title>
      </Head>
      <main>
        <div className="">
          <Nav />
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="isi title"
              className="p-1 border-2 border-black rounded-md"
              required
              onChange={(event) => handleInput(event, 'title')}
            />
          </div>
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="content2">content:</label>
            <input
              type="text"
              id="content2"
              name="content"
              placeholder="isi content"
              className="p-1 border-2 border-black rounded-md"
              required
              onChange={(event) => handleInput(event, 'content')}
            />
          </div>
          <div>
            <button
              onClick={handleClick}
              className="border-2 p-2 bg-yellow-400 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {data?.map((data, index) => (
            <div key={index}>
              <div className="mt-4">
                <p>{data.title}</p>
                <p>{data.content}</p>
              </div>
              <div className="flex flex-row">
                <p
                  className="p-2 bg-blue-400 cursor-pointer"
                  onClick={(event) => handleDelete(event, data.id)}
                >
                  Delete
                </p>
                <Link href={`/posts/update/${data.id}`}>
                  <p className="p-2 bg-red-400 cursor-pointer">Edit</p>
                </Link>
              </div>
              <hr className="w-36 border-2 border-black m-2" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
