"use client"

import { useFetch } from '@/hooks/useFetch';
import { setUser } from '@/redux/features/user/userSlice';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

export function Counter() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const id = isAuthLoaded ? userId : null;


  const { data } = useFetch(
    id ? `/api/users/${id}` : null, // only fetch if id is available
    ["user", id]
  );


  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  return (
    <></>
  );
}