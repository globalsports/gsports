"use client";
import * as React from "react";
import { format } from "date-fns";
import { addDays, subDays } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/custom/DatePicker";
import SlotBooking from "@/components/custom/SlotBooking";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = React.useState<
    { court: string; time: string; cost: number }[]
  >([]);

  // Function to handle previous day
  const handlePreviousDate = () => {
    if (date) setDate(subDays(date, 1));
  };

  // Function to handle next day
  const handleNextDate = () => {
    if (date) setDate(addDays(date, 1));
  };

  // Function to reset to today's date
  const handleTodayDate = () => {
    setDate(new Date());
  };

  // Callback to update selected slots from SlotBooking component
  const handleSlotSelection = (
    slots: { court: string; time: string; cost: number }[]
  ) => {
    setSelectedSlots(slots);
  };

  // Function to remove a slot from the selected slots list
  const handleRemoveSlot = (court: string, time: string) => {
    const updatedSlots = selectedSlots.filter(
      (slot) => !(slot.court === court && slot.time === time)
    );
    setSelectedSlots(updatedSlots);

    // Update the slot selection in SlotBooking component
    handleSlotSelection(updatedSlots);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    console.log("Proceeding to checkout with slots:", selectedSlots);
    // Add checkout logic here, such as redirecting to a payment page
  };

  return (
    <>
      <div className="my-10 sm:grid grid-cols-3 sm:gap-10">
        <div>
          <DatePicker date={date} setDate={setDate} />
          {/* Display the selected cards */}
          <div className="my-4 grid gap-2">
            {selectedSlots.map((slot, index) => (
              <Card key={index} className="p-2 relative">
                <p className="border rounded px-2 py-1 inline-flex bg-teal-500 text-white">
                  {date && format(date, "PPP")}
                </p>
                <p className="inline-flex mx-2">${slot.cost}</p>
                <p className="font-bold">Court: {slot.court}</p>
                <p>Time: {slot.time}</p>
                <button
                  onClick={() => handleRemoveSlot(slot.court, slot.time)}
                  className="absolute top-2 right-2  font-bold"
                >
                  <FaTrashAlt />
                </button>
              </Card>
            ))}

            {/* Conditionally render the Checkout button */}
            {selectedSlots.length > 0 && (
              <Button
                className="mt-4 bg-teal-500 hover:bg-teal-700 w-full"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="sm:flex items-center">
            <div className="text-2xl font-extralight text-gray-600 text-center flex-1">
              <div>Emerton Youth Recreation Centre</div>
              <div className="text-lg">{date && format(date, "PPP")}</div>
            </div>
            <div className="flex space-x-4 mb-4 justify-end">
              <Button className="bg-teal-500" onClick={handlePreviousDate}>
                Previous Day
              </Button>
              <Button className="bg-teal-500" onClick={handleTodayDate}>
                Today
              </Button>
              <Button className="bg-teal-500" onClick={handleNextDate}>
                Next Day
              </Button>
            </div>
          </div>
          <SlotBooking
            date={date}
            onSlotSelect={handleSlotSelection}
            selectedSlots={selectedSlots}
          />
        </div>
      </div>
    </>
  );
}
