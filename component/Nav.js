import Link from 'next/link';
import Cookie from 'js-cookie';
import Router  from 'next/router';
export default function Nav() {
  const handleLogout=()=>{
    Cookie.remove('token')
    Router.replace('/login')
  }
  return (
    <>
      <div className="flex">
        <p className="m-2 p-2 bg-orange-400 cursor-pointer" onClick={handleLogout}>Logout</p>
      </div>
    </>
  );
}
