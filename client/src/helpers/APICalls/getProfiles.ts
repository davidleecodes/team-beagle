import { FetchOptions } from '../../interface/FetchOptions';
import { SearchProfileApiData } from '../../interface/Profile';
import serverPath from './server';

const getProfiles = async (): Promise<SearchProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${serverPath}/profile/sitters`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfiles;
