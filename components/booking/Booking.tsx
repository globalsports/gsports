"use client";
import * as React from "react";
import { format } from "date-fns";
import { addDays, subDays } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/booking/DatePicker";
import SlotBooking from "@/components/booking/SlotBooking";
import { Skeleton } from "../ui/skeleton";
import { SquarePayment } from "../payment/SquarePayment";

export default function Booking() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = React.useState<
    { court: string; time: string; cost: number }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handlePreviousDate = () => {
    if (date) setDate(subDays(date, 1));
  };

  const handleNextDate = () => {
    if (date) setDate(addDays(date, 1));
  };

  const handleTodayDate = () => {
    setDate(new Date());
  };

  const handleSlotSelection = (
    slots: { court: string; time: string; cost: number }[]
  ) => {
    setSelectedSlots(slots);
  };

  const handleRemoveSlot = (court: string, time: string) => {
    const updatedSlots = selectedSlots.filter(
      (slot) => !(slot.court === court && slot.time === time)
    );
    setSelectedSlots(updatedSlots);
    handleSlotSelection(updatedSlots);
  };

  const calculateTotal = () => {
    return Number(selectedSlots.reduce((total, slot) => total + slot.cost, 0));
  };

  const handleCheckout = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Clear selected slots and show success message
    setSelectedSlots([]);
    // You might want to add a toast notification here
  };

  return (
    <>
      <div className="my-10 sm:grid grid-cols-3 sm:gap-10">
        <div>
          {isLoading ? (
            <Skeleton className="h-12 w-full mb-4" />
          ) : (
            <DatePicker date={date} setDate={setDate} />
          )}

          {/* Display selected slots */}
          <div className="my-4 grid gap-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full mb-2" />
                )) // Skeleton for each slot card
              : selectedSlots.map((slot, index) => (
                  <Card key={index} className="p-2 relative">
                    <p className="border rounded px-2 py-1 inline-flex bg-teal-500 text-white">
                      {date && format(date, "PPP")}
                    </p>
                    <p className="inline-flex mx-2">${slot.cost}</p>
                    <p className="font-bold">Court: {slot.court}</p>
                    <p>Time: {slot.time}</p>
                    <button
                      onClick={() => handleRemoveSlot(slot.court, slot.time)}
                      className="absolute top-2 right-2 font-bold"
                    >
                      <FaTrashAlt />
                    </button>
                  </Card>
                ))}
            {selectedSlots.length > 0 && (
              <Button
                className="mt-4 bg-teal-500 hover:bg-teal-700 w-full"
                onClick={handleCheckout}
              >
                Checkout (${calculateTotal()})
              </Button>
            )}
          </div>
          <SquarePayment
            isOpen={isPaymentOpen}
            onClose={() => setIsPaymentOpen(false)}
            amount={calculateTotal()}
            onPaymentSuccess={handlePaymentSuccess}
            selectedSlots={selectedSlots}
          />
        </div>
        <div className="col-span-2">
          <SlotBooking
            date={date}
            onSlotSelect={handleSlotSelection}
            selectedSlots={selectedSlots}
            onPreviousDate={handlePreviousDate}
            onTodayDate={handleTodayDate}
            onNextDate={handleNextDate}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
