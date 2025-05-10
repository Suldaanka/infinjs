"use client"

import { useFetch } from '@/hooks/useFetch';
import { setRoom } from '@/redux/features/room/roomSlice';
import { setTable } from '@/redux/features/tables/tableSlice';
import { setUser } from '@/redux/features/user/userSlice';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Counter() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const id = isAuthLoaded ? userId : null;
  const tbles = useSelector((state)=> state.table.table);
  const { data: user } = useFetch(
    id ? `/api/users/${id}` : null,
    ["user", id]
  );
  
  const { data: rooms } = useFetch('/api/rooms/', ['rooms']);
  const { data: tables, isLoading, isError } = useFetch('/api/table', ['tables'])

  const dispatch = useDispatch();
  useEffect(() => {
    if (user && rooms && tables) {
      dispatch(setUser(user));
      dispatch(setRoom(rooms));
      dispatch(setTable(tables));
    }
  }, [user, rooms,tables, dispatch]);

  console.log("rooms and tables", rooms, tables);
    
  return (
    <></>
  );
}