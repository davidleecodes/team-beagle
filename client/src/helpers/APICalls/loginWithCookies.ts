import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import serverPath from './server';

const loginWithCookies = async (): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${serverPath}/auth/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default loginWithCookies;
