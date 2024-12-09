import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { GrPrevious, GrNext } from "react-icons/gr";

interface DateNavigatorProps {
  currentDate: Date ;
  onDateSelect: (date: Date) => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onDateSelect,
}) => {
  const [visibleDates, setVisibleDates] = useState(
    Array.from(
      { length: 15 },
      (_, i) => addDays(currentDate, i - 1)
    )
  );

  const handlePrevious = () => {
    const newDates = visibleDates.map((date) => subDays(date, 1));
    setVisibleDates(newDates);
  };

  const handleNext = () => {
    const newDates = visibleDates.map((date) => addDays(date, 1));
    setVisibleDates(newDates);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Previous Button */}
      <Button
        className="rounded-lg shadow-lg bg-white text-black hover:bg-gray-200"
        onClick={handlePrevious}
      >
        <GrPrevious />
      </Button>

      {/* Date List */}
      <div className="flex justify-between overflow-x-auto flex-1 p-2 border rounded-lg bg-white">
        {visibleDates.map((date) => {
          const isSelected =
            format(date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd");
          return (
            <div
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`cursor-pointer text-center px-2 scrollbar-hide overflow-auto ${
                isSelected
                  ? "bg-blue-200 text-blue-800"
                  : "hover:bg-gray-200 text-gray-800"
              }`}
            >
              <div className="font-bold">{format(date, "d")}</div>
              <div className="text-xs">{format(date, "EEE")}</div>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        className="rounded-lg shadow-lg bg-white text-black hover:bg-gray-200"
        onClick={handleNext}
      >
        <GrNext />
      </Button>
    </div>
  );
};

export default DateNavigator;
