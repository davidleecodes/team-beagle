import { FetchOptions } from '../../interface/FetchOptions';
import { NewRequest, CreateRequestApiData } from '../../interface/NewRequest';
import serverPath from './server';

export const createBookingRequest = async (data: NewRequest): Promise<CreateRequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data }),
    credentials: 'include',
  };
  return await fetch(`${serverPath}/request/new-request`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
