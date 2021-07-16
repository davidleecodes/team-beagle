import { FetchOptions } from '../../interface/FetchOptions';
import serverPath from './server';

const getUnreadNotifications = () => async (): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`${serverPath}/notifications/unread`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUnreadNotifications;
