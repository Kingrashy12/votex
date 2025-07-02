"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { IconButton } from "auera-ui";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { tw } from "stywind";

interface DatePickerProps {
  onHandlePick?: (day: Date) => void;
  disablePrev?: boolean;
}

// TODO: Refactor DatePicker for accurate picking
const DatePicker = ({ onHandlePick }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const header = () => (
    <div className="flex items-center justify-between p-2 bg-zinc-800 border-b-[1.9px] border-neutral-700 mb-1 rounded-t-xl">
      <IconButton
        radius="xl"
        variant="outline"
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
      >
        <FiChevronLeft />
      </IconButton>
      <div className="font-semibold text-gray-800 dark:text-white">
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <IconButton
        radius="xl"
        variant="outline"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      >
        <FiChevronRight />
      </IconButton>
    </div>
  );

  const daysOfWeek = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 px-2">
        {days.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const generateCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const now = new Date();

    const rows = [];
    let days = [];
    let loopDay = startDate;

    while (loopDay <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = loopDay; // ✅ Fix: capture the current date before mutation
        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const prevDays =
          currentDay < now && currentDay.toDateString() !== now.toDateString();

        const pickDate = () => {
          if (prevDays) return;

          setSelectedDate(currentDay);
          setShowCalendar(false);
          if (onHandlePick) {
            onHandlePick(currentDay);
          }

          console.log("dayPicked:", currentDay.toDateString());
        };

        days.push(
          <button
            key={currentDay.toISOString()}
            onClick={pickDate}
            className={tw(
              "w-9 h-9 text-center rounded-lg",
              isSelected
                ? "bg-blue-600 text-white"
                : currentDay.getDate() === now.getDate() &&
                  currentDay.getMonth() === now.getMonth() &&
                  currentDay.getFullYear() === now.getFullYear()
                ? "border border-blue-500 text-blue-500 hover:bg-blue-800/30"
                : isCurrentMonth
                ? "text-gray-900 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-zinc-700"
                : "text-gray-400",
              prevDays && "!text-gray-400 cursor-not-allowed"
            )}
          >
            {format(currentDay, "d")}
          </button>
        );

        loopDay = addDays(loopDay, 1);
      }

      rows.push(
        <div
          key={loopDay.toISOString()}
          className="grid grid-cols-7 gap-1 px-2"
        >
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1 py-2">{rows}</div>;
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-md text-left text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
      >
        {selectedDate ? format(selectedDate, "MMM-dd-yyyy") : "Pick a date"}
      </button>

      {showCalendar && (
        <div className="fixed z-1000 mt-4 top-0 w-72 rounded-xl bg-neutral-900 border-1.9 border-neutral-700 shadow-black shadow-[4px_5px_10px] animate-fadeIn">
          {header()}
          {daysOfWeek()}
          {generateCells()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
