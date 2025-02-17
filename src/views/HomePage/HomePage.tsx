"use client"

import useHomePageHook from "./HomePageHook"
import SingleDatePicker from "@/components/SingleDatePicker/SingleDatePicker"
import CompletionProgress from "@/views/HomePage/Charts/CompletionProgress"
import WeatherWidget from "@/components/WeatherWidget/WeatherWidget"
import CompletionBar from "./Charts/CompletionBar"
import { Helmet } from "react-helmet-async"

const HomePage = () => {
  const {
    date,
    setDate,
    hasTasksOnDate,
    totalTasksForDate,
    completedTasksForDate,
    percentage,
    radialChartData,
    radialChartConfig,
    tableChartData,
    tableChartConfig
  } = useHomePageHook();
  
  return (
    <section className="h-full gap-4 w-full flex flex-col px-2 pb-2">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the Home Page" />
      </Helmet>
      <div className="w-full h-full grid lg:grid-cols-12 grid-cols-6 gap-4">
        <SingleDatePicker 
          className="w-full h-full col-span-3 shadow-md dark:shadow-slate-800 flex items-center justify-between" 
          date={date}
          setDate={setDate}
          hasTasksOnDate={hasTasksOnDate}
        />
        <CompletionProgress
          date={date}
          totalTasksForDate={totalTasksForDate}
          completedTasksForDate={completedTasksForDate}
          percentage={percentage}
          radialChartData={radialChartData}
          radialChartConfig={radialChartConfig}
        />
        <WeatherWidget />
      </div>

      <CompletionBar
        tableChartData={tableChartData}
        tableChartConfig={tableChartConfig}
      />
    </section>
  )
}

export default HomePage