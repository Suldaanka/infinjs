"use client";

import { useState, useEffect } from "react";
import FooterSection from "@/components/footer-section";
import NavBar from "@/components/nav-bar";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  CreditCard,
  Moon,
} from "lucide-react";

export default function RecentBooking() {
  const { data, isLoading, isError } = useFetch(
    "/api/reservation",
    ["reservation"]
  );
  const user = useSelector((state) => state.user.user);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    if (data && user) {
      const filtered = data.filter(
        (booking) => booking.fullName === user.name
      );
      filtered.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
      setUserBookings(filtered);
    }
  }, [data, user]);

  const formatDate = (dateString) => {
    const opts = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", opts);
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return {
          icon: <CheckCircle size={16} className="mr-1 text-green-600" />,
          class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        };
      case "pending":
        return {
          icon: <AlertCircle size={16} className="mr-1 text-yellow-600" />,
          class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        };
      case "cancelled":
        return {
          icon: <XCircle size={16} className="mr-1 text-red-600" />,
          class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        };
      default:
        return {
          icon: null,
          class: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
        };
    }
  };

  const isPast = (checkOut) => new Date(checkOut) < new Date();

  const { data: allRooms } = useFetch("/api/rooms/", ["rooms"]);
  const roomMap = {};
  if (allRooms) {
    allRooms.forEach((room) => {
      roomMap[room.id] = room.number;
    });
  }

  const handleCancel = (id) => {
    console.log("cancel", id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <NavBar />
      <main className="flex-grow w-full md:w-3/4 lg:w-2/3 mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-6">Recent Booking</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 dark:border-amber-400"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <XCircle size={40} className="text-red-500 mx-auto mb-4" />
              <p className="text-red-500 font-medium">
                Error loading your bookings. Please try again later.
              </p>
            </div>
          ) : userBookings.length === 0 ? (
            <div className="text-center py-16">
              <Calendar size={48} className="text-gray-400 mx-auto mb-4 dark:text-gray-500" />
              <p className="text-gray-500 text-lg mb-6 dark:text-gray-400">
                You don't have any bookings yet.
              </p>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                Explore Available Rooms
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking) => {
                const badge = getStatusBadge(booking.status);
                const nights = calculateNights(booking.checkIn, booking.checkOut);
                const past = isPast(booking.checkOut);
                const roomNum = roomMap[booking.roomId] || "N/A";

                return (
                  <div
                    key={booking.id}
                    className={`border rounded-lg overflow-hidden transition-shadow ${
                      past
                        ? "border-gray-200 dark:border-gray-700 opacity-70"
                        : "border-amber-200 dark:border-amber-600"
                    } hover:shadow-md bg-white dark:bg-gray-800`}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-40 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-80 flex flex-col items-center justify-center text-white">
                          <h3 className="text-xl font-bold mb-2">
                            Room #{roomNum}
                          </h3>
                          <div className="flex items-center bg-amber-500 bg-opacity-20 px-4 py-2 rounded-full">
                            <Moon size={18} className="mr-2" />
                            <span className="font-semibold">
                              {nights} {nights === 1 ? "Night" : "Nights"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 md:w-2/3">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <div>
                            <h2 className="text-xl font-semibold">
                              {booking.fullName}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {booking.email || booking.fullName}
                            </p>
                          </div>
                          <span className={`${badge.class} px-3 py-1 rounded-full text-sm font-medium flex items-center mt-2 md:mt-0`}>   
                            {badge.icon}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-amber-600" />
                            <span className="font-medium">Check-In:</span>
                            <span className="ml-1">{formatDate(booking.checkIn)}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-amber-600" />
                            <span className="font-medium">Check-Out:</span>
                            <span className="ml-1">{formatDate(booking.checkOut)}</span>
                          </div>
                          {booking.guest && (
                            <div className="flex items-center">
                              <Users size={16} className="mr-2 text-amber-600" />
                              <span className="font-medium">Guests:</span>
                              <span className="ml-1">{booking.guest}</span>
                            </div>
                          )}
                          {booking.totalAmount && (
                            <div className="flex items-center">
                              <CreditCard size={16} className="mr-2 text-amber-600" />
                              <span className="font-medium">Total:</span>
                              <span className="ml-1 font-semibold">
                                {booking.totalAmount}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                          {!past && booking.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancel(booking.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
