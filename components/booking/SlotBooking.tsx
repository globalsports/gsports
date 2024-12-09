import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import DateNavigator from "./DateNavigator";

interface SlotBookingProps {
  date: Date | undefined;
  onSlotSelect: (
    slots: { court: string; time: string; cost: number }[]
  ) => void;
  selectedSlots: { court: string; time: string; cost: number }[];
  isLoading: boolean;
  initiallyBookedSlots: { court: string; time: string }[];
}

const SlotBooking = ({
  date,
  onSlotSelect,
  selectedSlots,
  isLoading,
  initiallyBookedSlots,
}: SlotBookingProps) => {
  const courts = [
    "Court 1",
    "Court 2",
    "Court 3",
    "Court 4",
    "Court 5",
    "Court 6",
    "Court 7",
  ];
  const times = ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
  const courtCosts: { [key: string]: number } = {
    "Court 1": 22,
    "Court 2": 28,
    "Court 3": 26,
    "Court 4": 30,
    "Court 5": 25,
    "Court 6": 32,
    "Court 7": 22,
  };

  const isPastTime = (time: string) => {
    if (!date) return false;
    const currentDate = new Date();
    const slotDate = new Date(date);
    const timeHour = parseInt(time.replace(" PM", "")) + 12; // Convert to 24-hour format
    slotDate.setHours(timeHour, 0, 0, 0);
    return slotDate < currentDate;
  };

  const isBooked = (court: string, time: string) => {
    return initiallyBookedSlots.some(
      (slot) => slot.court === court && slot.time === time
    );
  };

  const isSelected = (court: string, time: string) => {
    return selectedSlots.some(
      (slot) => slot.court === court && slot.time === time
    );
  };

  const handleSlotClick = (court: string, time: string) => {
    if (isPastTime(time)) return;

    const isAlreadySelected = isSelected(court, time);

    if (isAlreadySelected) {
      const updatedSlots = selectedSlots.filter(
        (slot) => !(slot.court === court && slot.time === time)
      );
      onSlotSelect(updatedSlots);
    } else {
      const updatedSlots = [
        ...selectedSlots,
        { court, time, cost: courtCosts[court] },
      ];
      onSlotSelect(updatedSlots);
    }
  };

  const handleDateSelect = (selectedDate: Date) => {};

  const getSlotStatusClass = (court: string, time: string) => {
    if (isPastTime(time)) return "bg-gray-200 text-gray-400 cursor-not-allowed";
    if (isBooked(court, time))
      return "bg-[#ececec] text-red-700 cursor-not-allowed";
    if (isSelected(court, time)) return "bg-green-200 text-green-800";
    return "bg-white hover:bg-gray-200";
  };

  return (
    <div className="">
      {/* Grid Layout */}
      <div className="grid grid-cols-8 gap-4">
        {/* Time Labels */}
        <div className="flex flex-col gap-3">
          {times.map((time) => (
            <div
              key={time}
              className="flex items-center justify-center font-bold bg-[#bdcdd6] py-4 px-2 rounded shadow-lg"
            >
              {time}
            </div>
          ))}
          <div className="flex items-center justify-center font-bold bg-[#bdcdd6] py-4 px-2 rounded shadow-lg">
            Cost
          </div>
        </div>

        {/* Courts */}
        {courts.map((court) => (
          <div key={court} className="flex flex-col gap-3">
            {times.map((time) => {
              return (
                <div
                  key={`${court}-${time}`}
                  className={`flex items-center justify-center py-4 px-2 rounded shadow-lg cursor-pointer flex-1 ${getSlotStatusClass(
                    court,
                    time
                  )}`}
                  onClick={() =>
                    !isBooked(court, time) &&
                    !isPastTime(time) &&
                    handleSlotClick(court, time)
                  }
                  title={`${court} at ${time}`}
                >
                  {isBooked(court, time)
                    ? "Booked"
                    : isSelected(court, time)
                    ? "Selected"
                    : isPastTime(time)
                    ? "Past"
                    : "Available"}
                </div>
              );
            })}
            <div className="flex items-center justify-center font-bold bg-[#bdcdd6] py-4 px-2 rounded shadow-lg">
              ${courtCosts[court]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotBooking;
