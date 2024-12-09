"use client";
import * as React from "react";
import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SlotBooking from "@/components/booking/SlotBooking";
import { Skeleton } from "../ui/skeleton";
import { SquarePayment } from "../payment/SquarePayment";
import { useSession } from "@/hooks/session-provider";
import { supabase } from "@/utils/supabase/client";
import signIn from "@/app/login/actions";
import { useToast } from "@/hooks/use-toast";
import DateNavigator from "./DateNavigator";

export default function Booking() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = React.useState<
    { court: string; time: string; cost: number }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [initiallyBookedSlots, setInitiallyBookedSlots] = React.useState<
    { court: string; time: string }[]
  >([]);

  const { toast } = useToast();
  const { session } = useSession();
  const email = session?.user?.email;
  const handleInserts = (payload: any) => {
    const newSlot = payload.new;
    if (date && newSlot.date === format(date, "yyyy-MM-dd")) {
      setInitiallyBookedSlots((prev) => [
        ...prev,
        { court: newSlot.court, time: newSlot.time },
      ]);
    }
  };
  React.useEffect(() => {
    const fetchBookedSlots = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookedSlots")
        .select("court, time, date")
        .eq("date", date ? format(date, "yyyy-MM-dd") : "");

      if (error) {
        console.error("Error fetching booked slots:", error);
      } else if (data) {
        setInitiallyBookedSlots(
          data.map((slot: { court: string; time: string }) => ({
            court: slot.court,
            time: slot.time,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchBookedSlots();

    // Set up real-time subscription
    const subscription = supabase
      .channel("bookedSlots")
      .on(
        "postgres_changes" as any,
        { event: "INSERT", schema: "public", table: "bookedSlots" },
        handleInserts
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [date]);

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
    if (!email) {
      localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
      signIn();
    }
    setIsPaymentOpen(true);
  };

  React.useEffect(() => {
    // Check if there are stored slots after sign-in
    const savedSlots = localStorage.getItem("selectedSlots");
    if (savedSlots && !selectedSlots.length) {
      setSelectedSlots(JSON.parse(savedSlots));
      localStorage.removeItem("selectedSlots"); // Clean up local storage
    }
  }, [session, selectedSlots.length]);

  const checkDataAvailability = async (
    court: string,
    time: string,
    date: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("bookedSlots")
        .select("*")
        .eq("court", court)
        .eq("time", time)
        .eq("date", date)
        .limit(1);

      if (error) {
        console.error("Error checking data availability:", error);
        return false;
      }
      if (data && data.length > 0) {
        toast({
          title: "Slot already booked",
          description: "This slot is already booked",
          variant: "destructive",
        });
        return false;
      }

      return data && data.length > 0 ? false : true;
    } catch (err) {
      console.error("Unexpected error:", err);
      return false;
    }
  };

  const saveSelectedSlots = async () => {
    const slotsToSave = selectedSlots.map((slot) => ({
      court: slot.court,
      time: slot.time,
      date: date ? format(date, "yyyy-MM-dd") : "",
      userEmail: email,
      courtName: slot.court,
    }));
    slotsToSave.forEach(async (slot) => {
      const isDataAvailable = await checkDataAvailability(
        slot.court,
        slot.time,
        slot.date
      );
      if (isDataAvailable) {
        const { error: insertError } = await supabase
          .from("bookedSlots")
          .insert(slotsToSave);
        if (insertError) {
          console.error("Error saving slots:", insertError);
          return false;
        } else {
          toast({
            title: "Success",
            description: "Slots saved successfully!",
          });
          return true;
        }
      }
    });
    return false;
  };

  const handlePaymentSuccess = async () => {
    setSelectedSlots([]);
    setIsPaymentOpen(false);
  };

  return (
    <div className="sm:grid sm:grid-cols-4 sm:gap-10 max-w-7xl sm:mx-auto mx-5">
      <div className="sm:col-span-3 flex flex-col gap-4">
        <DateNavigator currentDate={date} onDateSelect={setDate} />
        <SlotBooking
          date={date}
          onSlotSelect={handleSlotSelection}
          selectedSlots={selectedSlots}
          isLoading={isLoading}
          initiallyBookedSlots={initiallyBookedSlots}
        />
      </div>
      <div>
        {/* Display selected slots */}
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
          saveSelectedSlots={saveSelectedSlots}
        />
      </div>
    </div>
  );
}
