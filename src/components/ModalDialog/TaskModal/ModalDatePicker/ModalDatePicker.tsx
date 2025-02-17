"use client";

import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleDate } from "@/configs/helper";
import { useTranslation } from "react-i18next";

export interface ISingleDatePicker {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  hasTasksOnDate: (dateToCheck: Date) => boolean;
  className?: string;
}

const ModalDatePicker = ({
  date,
  setDate,
  hasTasksOnDate,
  className,
 }: ISingleDatePicker) => {
  const { i18n } = useTranslation();
 
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-fit w-fit" />
          {date ? <LocaleDate date={date} locale={i18n.language} /> : <span>{i18n.language === 'en' ? "Pick a date" : "Chọn ngày"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        {CalendarComponent}
      </PopoverContent>
    </Popover>
  );
 };

 export default ModalDatePicker