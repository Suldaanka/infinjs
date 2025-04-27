"use client";

import { useState, useEffect } from "react";
import FooterSection from "@/components/footer-section";
import NavBar from "@/components/nav-bar";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users, CreditCard, Moon } from "lucide-react";

export default function RecentBooking() {
  const { data, isLoading, isError } = useFetch("/api/reservation", ["reservation"]);
  const user = useSelector((state) => state.user.user);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (data && user) {
      // Filter reservations to only show those matching the current user's name
      const filteredBookings = data.filter(booking => booking.fullName === user.name);
      // Sort by check-in date (most recent first)
      filteredBookings.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
      setUserBookings(filteredBookings);
    }
  }, [data, user]);
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate number of nights between check-in and check-out
  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle size={16} className="mr-1" />,
          class: "bg-green-100 text-green-800"
        };
      case 'pending':
        return {
          icon: <AlertCircle size={16} className="mr-1" />,
          class: "bg-yellow-100 text-yellow-800"
        };
      case 'cancelled':
        return {
          icon: <XCircle size={16} className="mr-1" />,
          class: "bg-red-100 text-red-800"
        };
      default:
        return {
          icon: null,
          class: "bg-gray-100 text-gray-800"
        };
    }
  };

  // Check if a booking is in the past
  const isPastBooking = (checkOut) => {
    return new Date(checkOut) < new Date();
  };

  // Get room number by room id

  
  const { data: allRooms } = useFetch('/api/rooms/');

  // Create a mapping of roomId to roomNumber
  const roomNumberMap = {};
  if (allRooms) {
    allRooms.forEach(room => {
      roomNumberMap[room.id] = room.number;
    });
  }

  const RoomNumber = roomNumberMap[booking.roomId]
  
  console.log(RoomNumber);


  return (
    <>
      <div>
        <NavBar />
      </div>
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto mt-20 px-4">
        <h1 className="text-xxlg">Recent Booking</h1>
          <div className="bg-white h-[100vh] overflow-hidden">

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-12">
                <XCircle size={40} className="text-red-500 mx-auto mb-4" />
                <p className="text-red-500 font-medium">Error loading your bookings. Please try again later.</p>
              </div>
            ) : userBookings.length === 0 ? (
              <div className="text-center py-16">
                <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-6">You don't have any bookings yet.</p>
                <button className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                  Explore Available Rooms
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {userBookings.map((booking) => {
                  const statusBadge = getStatusBadge(booking.status);
                  const nights = calculateNights(booking.checkIn, booking.checkOut);
                  const past = isPastBooking(booking.checkOut);

                  const RoomNumber = roomNumberMap[booking.roomId] || "N/A"
                  
                  return (
                    <div 
                      key={booking.id} 
                      className={`border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all ${
                        past ? 'border-gray-200 opacity-80' : 'border-amber-200'
                      }`}
                    >
                      <div className="md:flex">
                        {/* Left side with image/placeholder and nights */}
                        <div className="bg-amber-50 md:w-1/3 h-40 md:h-auto relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-85 flex flex-col items-center justify-center text-white">
                            <h3 className="text-xl font-bold mb-2">Room Number {RoomNumber}</h3>
                            <div className="flex items-center bg-amber-500 bg-opacity-20 px-4 py-2 rounded-full">
                              <Moon size={18} className="mr-2" />
                              <span className="font-semibold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side with booking details */}
                        <div className="p-5 md:w-2/3">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <h2 className="text-xl font-semibold text-gray-800">{}</h2>
                              {booking.fullName && (
                                <p className="text-gray-600 text-sm">{booking.fullName}</p>
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center mt-2 md:mt-0 ${statusBadge.class}`}>
                              {statusBadge.icon}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                            <div className="flex items-center text-gray-700">
                              <Calendar size={16} className="mr-2 text-amber-600" />
                              <span className="font-medium">Check-In: </span>
                              <span>{formatDate(booking.checkIn)}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-700">
                              <Calendar size={16} className="mr-2 text-amber-600" />
                              <span className="font-medium">Check-Out:</span>
                              <span>{formatDate(booking.checkOut)}</span>
                            </div>
                            
                            {booking.guest && (
                              <div className="flex items-center text-gray-700">
                                <Users size={16} className="mr-2 text-amber-600" />
                                <span className="font-medium w-20">Guests:</span>
                                <span>{booking.guest}</span>
                              </div>
                            )}
                            
                            {RoomNumber.price && (
                              <div className="flex items-center text-gray-700">
                                <CreditCard size={16} className="mr-2 text-amber-600" />
                                <span className="font-medium w-20">Total:</span>
                                <span className="font-semibold text-amber-800">{RoomNumber.price}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-6 pt-3 border-t border-gray-100 flex justify-end items-center">
                            <div className="flex space-x-3">
                              <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors">
                                View Details
                              </button>
                              {booking.status !== 'cancelled' && !past && (
                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      <FooterSection />
    </>
  );
}