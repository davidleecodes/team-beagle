import { FetchOptions } from '../../interface/FetchOptions';
import { Request } from '../../interface/Request';
import serverPath from './server';

export async function getBookingsSitter(): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${serverPath}/request/bookings/sitter`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
export async function getBookingsOwner(): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`${serverPath}/request/bookings/owner`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
export async function updateBookingsAccept(id: string, accept: boolean, decline: boolean): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accept, decline }),
  };
  return await fetch(`${serverPath}/request/edit-request/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function deleteBooking(id: string): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'Delete',
    credentials: 'include',
  };
  return await fetch(`${serverPath}/request/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateBookingsPaid(id: string, paid: boolean): Promise<Request> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paid }),
  };
  return await fetch(`${serverPath}/request/edit-request/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
