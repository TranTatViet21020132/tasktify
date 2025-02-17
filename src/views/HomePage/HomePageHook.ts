import { ChartConfig } from "@/components/ui/chart";
import { useTasksQueries } from "@/queries/Tasks/useTasksQueries";

import * as React from "react";
import { isWithinInterval, endOfDay, isSameDay } from "date-fns";
import { useTranslation } from "react-i18next";

const useHomePageHook = () => {
  const { memoizedTotalTasks } = useTasksQueries();
  const { t } = useTranslation();

  const [date, setDate] = React.useState<Date | undefined>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const hasTasksOnDate = (dateToCheck: Date) => {
    return memoizedTotalTasks?.some((task) => {
      const taskDate = new Date(task.date);
      return isSameDay(taskDate, dateToCheck);
    }) || false;
  };

  const tasksForSelectedDate = React.useMemo(() => {
    return memoizedTotalTasks?.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        date &&
        isWithinInterval(taskDate, {
          start: date,
          end: endOfDay(date),
        })
      );
    }) || [];
  }, [date, memoizedTotalTasks]);

  const totalTasksForDate = tasksForSelectedDate.length;
  const completedTasksForDate = tasksForSelectedDate.filter(
    (task) => task.completed
  ).length;

  const percentage =
    totalTasksForDate && completedTasksForDate
      ? (completedTasksForDate / totalTasksForDate) * 100
      : 0;

  const radialChartData = [
    { task: "completed", visitors: percentage, fill: "rgb(139 92 246)" },
  ];

  const radialChartConfig = {
    visitors: {
      label: "Visitors",
    },
    completed: {
      label: "Completed Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const getMonthlyTasksData = React.useMemo(() => {
    if (!memoizedTotalTasks?.length) return [];
  
    const currentYear = date?.getFullYear();
    const monthlyTasks = new Map();
  
    for (let month = 0; month < 12; month++) {
      monthlyTasks.set(month, {
        completed: 0,
        unfinished: 0,
        month: month,
      });
    }
  
    memoizedTotalTasks.forEach((task) => {
      const taskDate = new Date(task.date);
      const taskYear = taskDate.getFullYear();
      const taskMonth = taskDate.getMonth();
  
      if (taskYear === currentYear) {
        const monthData = monthlyTasks.get(taskMonth);
        if (task.completed) {
          monthData.completed++;
        } else {
          monthData.unfinished++;
        }
      }
    });
  
    return Array.from(monthlyTasks.values())
      .map((data) => ({
        month: currentYear && new Date(currentYear, data.month).toLocaleString('default', { month: 'short' }),
        completed: data.completed,
        unfinished: data.unfinished,
      }));
  }, [date, memoizedTotalTasks]);
  
  const tableChartData = getMonthlyTasksData;

  const tableChartConfig = {
    unfinished: {
      label: t("barChart.legend.unfinished"),
      color: "hsl(var(--chart-1))",
    },
    completed: {
      label: t("barChart.legend.completed"),
      color: "rgb(139 92 246)",
    },
  } satisfies ChartConfig;

  return {
    date,
    setDate,
    hasTasksOnDate,
    tasksForSelectedDate,
    totalTasksForDate,
    completedTasksForDate,
    percentage,
    radialChartData,
    radialChartConfig,
    tableChartData,
    tableChartConfig,
  };
};

export default useHomePageHook;
