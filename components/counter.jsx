"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '@/hooks/useFetch';
import { setUser, setUserLoading, setUserError } from '@/redux/features/user/userSlice';
import { useAuth } from '@clerk/nextjs';

export function UserLoader() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const dispatch = useDispatch();

  const {
    data: user,
    isLoading,
    isError,
  } = useFetch(
    isAuthLoaded && userId ? `/api/users/${userId}` : null,
    ['user', userId]
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(setUserLoading());
    } else if (user) {
      dispatch(setUser(user));
    } else if (isError) {
      dispatch(setUserError());
    }
  }, [user, isLoading, isError, dispatch]);

  return null;
}
