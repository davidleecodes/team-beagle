import { IMessage } from '../../interface/Message';
import serverPath from './server';

interface NewMessage {
  message: IMessage;
}

const sendImage = (name: string, file: string | Blob, id: string) => async (): Promise<NewMessage> => {
  const data = new FormData();
  data.append('file', file);
  data.append('name', name);
  return await fetch(`${serverPath}/message/image/${id}`, {
    method: 'PATCH',
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    credentials: 'include',
    body: data,
  })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default sendImage;
