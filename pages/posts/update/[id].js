import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
// import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { authPage } from '../../../middleware/authorizationPage';
export async function getServerSideProps(context) {
  const { token } = await authPage(context);
  const { id } = context.query;
  const dataDetail = await axios.get(
    `http://localhost:3000/api/posts/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      token,
      dataPosts: dataDetail?.data?.data,
    },
  };
}
export default function Home(props) {
  const router = useRouter();
  const { token, dataPosts } = props;
  const [state, setState] = useState({
    title: dataPosts.title,
    content: dataPosts.content,
  });
  const handleInput = (event, type) => {
    if (type == 'title') {
      setState({ ...state, title: event.target.value });
    } else {
      setState({ ...state, content: event.target.value });
    }
  };

  const handleClick = async (event) => {
    await axios
      .put(`http://localhost:3000/api/posts/update/${dataPosts.id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        router.push("/posts")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Halaman Blog</title>
      </Head>
      <main>
        <div className="">
          <p className="p-2">id : {dataPosts.id}</p>
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={state.title || ''}
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
              value={state.content || ''}
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
              Update
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
