"use client";
import { useState, useEffect } from "react";

interface SlotBookingProps {
  date: Date | undefined;
  onSlotSelect: (slots: { court: string; time: string; cost: number }[]) => void;
  selectedSlots: { court: string; time: string; cost: number }[]; // Receive selectedSlots as prop
}

const SlotBooking = ({ date, onSlotSelect, selectedSlots }: SlotBookingProps) => {
  const courts = [
    "Court 1",
    "Court 2",
    "Court 3",
    "Court 4",
    "Court 5",
    "Court 6",
    "Court 7",
  ];
  const times = [
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ];
  const courtCosts: { [key: string]: number } = {
    "Court 1": 22,
    "Court 2": 23,
    "Court 3": 24,
    "Court 4": 22,
    "Court 5": 21,
    "Court 6": 25,
    "Court 7": 24,
  };

  const initiallyBookedSlots = [
    { court: "Court 1", time: "2pm" },
    { court: "Court 3", time: "5pm" },
    { court: "Court 6", time: "8pm" },
  ];

  const [bookedSlots] = useState<{ court: string; time: string }[]>(initiallyBookedSlots);

  // Function to check if a slot is booked
  const isBooked = (court: string, time: string) => {
    return bookedSlots.some((slot) => slot.court === court && slot.time === time);
  };

  // Function to check if a slot is selected (now uses the passed prop)
  const isSelected = (court: string, time: string) => {
    return selectedSlots.some((slot) => slot.court === court && slot.time === time);
  };

  // Function to handle slot click
  const handleSlotClick = (court: string, time: string) => {
    const isAlreadySelected = isSelected(court, time);

    if (isAlreadySelected) {
      // Remove the slot if it's already selected
      const updatedSlots = selectedSlots.filter((slot) => !(slot.court === court && slot.time === time));
      onSlotSelect(updatedSlots); // Pass updated slots to the parent
    } else {
      // Add the slot if it's not selected
      const updatedSlots = [...selectedSlots, { court, time, cost: courtCosts[court] }];
      onSlotSelect(updatedSlots); // Pass updated slots to the parent
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-500 p-2"></th>
            {courts.map((court) => (
              <th key={court} className="border border-gray-500 p-2 font-bold">
                {court}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="border border-gray-500 p-2 bg-teal-500 text-white font-bold">
                {time}
              </td>
              {courts.map((court) => (
                <td
                  key={`${court}-${time}`}
                  className={`border border-gray-500 p-2 cursor-pointer 
                    ${
                      isBooked(court, time)
                        ? "bg-red-200 text-white cursor-not-allowed"
                        : isSelected(court, time)
                        ? "bg-gray-300"
                        : "hover:bg-gray-200"
                    }`}
                  onClick={() => !isBooked(court, time) && handleSlotClick(court, time)}
                ></td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border border-gray-500 p-2">Cost</td>
            {courts.map((court) => (
              <td key={court} className="border border-gray-500 p-2">
                ${courtCosts[court]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SlotBooking;
