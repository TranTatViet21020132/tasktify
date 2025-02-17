"use client";

import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks/useResponsive";

export interface ISingleDatePicker {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  hasTasksOnDate: (dateToCheck: Date) => boolean;
  className?: string;
}

const SingleDatePicker = ({
  date,
  setDate,
  hasTasksOnDate,
  className,
 }: ISingleDatePicker) => {
  const { isMobile } = useResponsive();
 
  const renderCalendarDay = (props: { date: Date }) => {
    const hasTasks = hasTasksOnDate(props.date);
    return (
      <div className="flex items-center flex-col justify-center text-sm relative w-full 2xl:text-xl">
        {props.date.getDate()}
        <div className={`w-1 h-1 ${hasTasks ? "bg-primary-light-500" : "bg-transparent"} rounded-full`} />
      </div>
    );
  };
 
  const CalendarComponent = (
    <Calendar
      mode="single" 
      selected={date}
      onSelect={setDate}
      className={cn("rounded-lg border shadow-md dark:shadow-slate-800 h-full w-full", className)}
      components={{ DayContent: renderCalendarDay }}
      initialFocus
    />
  );

  return isMobile ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("flex flex-col justify-between aspect-square w-fit font-normal rounded-lg p-0 pb-2", !date && "text-muted-foreground", className)}>
          {date ? (
            <>
              <div className="bg-primary-light-500 text-white w-full text-center py-2 rounded-t-lg">
                <strong className="uppercase text-subheading1">{format(date, "MMMM")}</strong>
              </div>
              <div className="flex w-full justify-center text-center text-h1 font-bold">{format(date, "d")}</div>
              <div className="flex w-full justify-center text-center text-subheading2 text-muted-foreground">{format(date, "EEEE")}</div>
            </>
          ) : (
            <span>Select a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">{CalendarComponent}</PopoverContent>
    </Popover>
  ) : CalendarComponent;
 };

 export default SingleDatePicker