"use client" // ✅ Important for client-side component

//import { setUser } from '@/redux/features/user/userSlice';
//import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function Counter() {
  const user = useSelector((state) => state.user.user); 
  return (
    <div>
      <span>{user}</span>
    </div>
  );
}
