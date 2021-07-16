import { FetchOptions } from '../../interface/FetchOptions';
import { INotification } from '../../interface/Notification';
import serverPath from './server';

const sendNotification =
  (type: string, title: string, content: string, recipient: string) => async (): Promise<INotification> => {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ type, title, content, recipient }),
    };
    return await fetch(`${serverPath}/notifications/new`, fetchOptions)
      .then((res) => res.json())
      .catch(() => ({
        error: { message: 'Unable to connect to server. Please try again' },
      }));
  };

export default sendNotification;
