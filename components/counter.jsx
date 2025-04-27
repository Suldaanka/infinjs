"use client"

import { useFetch } from '@/hooks/useFetch';
import { setRoom } from '@/redux/features/room/roomSlice';
import { setUser } from '@/redux/features/user/userSlice';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Counter() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const id = isAuthLoaded ? userId : null;
  
  const { data: user } = useFetch(
    id ? `/api/users/${id}` : null,
    ["user", id]
  );
  
  const { data: rooms } = useFetch('/api/rooms/');
  
  const dispatch = useDispatch();
  useEffect(() => {
    // Fix the logical check here - use && instead of comma
    if (user && rooms) {
      dispatch(setUser(user));
      dispatch(setRoom(rooms));
    }
  }, [user, rooms, dispatch]);
    
 
  
  return (
    <></>
  );
}