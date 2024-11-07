import * as React from "react";
import { Button } from "@/components/ui/button";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";

interface SlotBookingProps {
  date: Date | undefined;
  onSlotSelect: (
    slots: { court: string; time: string; cost: number }[]
  ) => void;
  selectedSlots: { court: string; time: string; cost: number }[];
  onPreviousDate: () => void;
  onTodayDate: () => void;
  onNextDate: () => void;
  isLoading: boolean;
  initiallyBookedSlots: { court: string; time: string }[];
}

const SlotBooking = ({
  date,
  onSlotSelect,
  selectedSlots,
  onPreviousDate,
  onTodayDate,
  onNextDate,
  isLoading,
  initiallyBookedSlots
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

  const isPastTime = (time: string) => {
    if (!date) return false;
    const currentDate = new Date();
    const slotDate = new Date(date);
    const timeHour = parseInt(time.replace("pm", "")) + 12; 
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

  const getSlotStatus = (court: string, time: string) => {
    if (isPastTime(time)) return "Past";
    if (isBooked(court, time)) return "Booked";
    if (isSelected(court, time)) return "Selected";
    return "Available";
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-12 w-full my-3" />
      ) : (
        <div className="text-2xl font-extralight text-gray-600 text-center flex-1 my-3">
          <div className="text-lg">{date && format(date, "PPP")}</div>
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-[36rem] w-full" />
      ) : (
        <div className="overflow-x-auto">
          <div className="rounded-sm">
            <div className="sm:flex overflow-hidden hidden">
              <Button
                className="bg-teal-600 flex-1 rounded-none hover:bg-teal-700 transition-colors"
                onClick={onPreviousDate}
              >
                <GrPrevious className="mr-2" />
                Previous Day
              </Button>
              <Button
                className="bg-teal-600 flex-1 rounded-none border-x hover:bg-teal-700 transition-colors"
                onClick={onTodayDate}
              >
                Today
              </Button>
              <Button
                className="bg-teal-600 flex-1 rounded-none hover:bg-teal-700 transition-colors"
                onClick={onNextDate}
              >
                Next Day
                <GrNext className="ml-2" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-teal-500">
                  <tr>
                    <th className="border border-gray-500 p-2 text-white"></th>
                    {courts.map((court) => (
                      <th
                        key={court}
                        className="border border-gray-500 p-2 font-bold text-white"
                      >
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
                      {courts.map((court) => {
                        const status = getSlotStatus(court, time);
                        return (
                          <td
                            key={`${court}-${time}`}
                            className={`border border-gray-500 p-2 cursor-pointer transition-colors duration-200
                              ${
                                isPastTime(time)
                                  ? "bg-gray-100 cursor-not-allowed"
                                  : isBooked(court, time)
                                  ? "bg-red-200 cursor-not-allowed"
                                  : isSelected(court, time)
                                  ? "bg-teal-200 hover:bg-teal-300"
                                  : "hover:bg-gray-100"
                              }`}
                            onClick={() =>
                              !isBooked(court, time) &&
                              !isPastTime(time) &&
                              handleSlotClick(court, time)
                            }
                            title={`${status} - ${court} at ${time}`}
                          >
                            <div className="w-full h-8 flex items-center justify-center">
                              {status !== "Available" && (
                                <span className="text-sm text-gray-600">
                                  {status}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="border border-gray-500 p-2 font-bold">Cost</td>
                    {courts.map((court) => (
                      <td
                        key={court}
                        className="border border-gray-500 p-2 text-center font-medium"
                      >
                        ${courtCosts[court]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;