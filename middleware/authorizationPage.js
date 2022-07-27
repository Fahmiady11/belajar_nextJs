import cookies from 'next-cookies';

export function unauthPage(context) {
  return new Promise((resolve) => {
    const cookie = cookies(context);
    //redirect server
    if (cookie.token) {
      return context.res
        .writeHead(302, {
          Location: '/posts',
        })
        .end();
    }
    return resolve('unauthorization');
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const cookie = cookies(context);
    //redirect server
    if (!cookie.token) {
      return context.res
        .writeHead(302, {
          Location: '/login',
        })
        .end();
    }
    return resolve({
      token: cookie.token,
    });
  });
}
