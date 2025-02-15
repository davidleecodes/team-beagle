import serverPath from './server';

const changeMainPhoto = async (index: number): Promise<any> => {
  return await fetch(`${serverPath}/profile/change-main-photo/${index}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeMainPhoto;
