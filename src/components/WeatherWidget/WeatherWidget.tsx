import { Card, CardContent } from "@/components/ui/card";
import { useWeatherQueries } from "@/queries/Weather/useWeatherQueries";
import { getDayFromDate } from "@/configs/helper";
import { Skeleton } from "@/components/ui/skeleton";

const WeatherSkeleton = () => (
  <Card className="w-full mx-auto bg-gradient-to-br col-span-6 shadow-md dark:shadow-slate-800">
    <CardContent className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="text-right flex flex-col items-center">
            <Skeleton className="h-16 w-16 rounded-full mb-2" />
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-2 pt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <Skeleton className="h-12 w-12 rounded-full mb-2" />
              <Skeleton className="h-5 w-8 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const WeatherWidget = () => {
  const { weatherData, isError, isLoading } = useWeatherQueries();

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (isError) {
    return (
      <Card className="w-full mx-auto bg-gradient-to-br col-span-6 shadow-md dark:shadow-slate-800">
        <CardContent className="flex items-center justify-center p-6 text-white">
          Failed to fetch weather data
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <Card className="w-full h-full mx-auto bg-gradient-to-br col-span-6 shadow-md dark:shadow-slate-800">
      <CardContent className="p-6 h-full space-y-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-h5 font-semibold ml-1">{weatherData.location.name}</h3>
            <h2 className="text-h3 font-bold mt-1">{weatherData.current.temp_c}°C</h2>
          </div>
          <div className="text-right flex flex-col items-center">
            <img src={weatherData.current.condition.icon} className="h-16 w-16" alt={weatherData.current.condition.text} />
            <strong className="text-body4 font-semibold">{weatherData.current.condition.text}</strong>
            <p className="text-body5 opacity-95">
              H: {weatherData.forecast.forecastday[0].day.maxtemp_c}°{" "}
              L: {weatherData.forecast.forecastday[0].day.mintemp_c}°
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-2 pt-4">
          {weatherData.forecast.forecastday.slice(1).map((day) => (
            <div key={day.date} className="text-center flex flex-col items-center">
              <img src={day.day.condition.icon} className="h-12 w-12 " alt={day.day.condition.text} />
              <p className="text-subheading3 font-semibold">{day.day.avgtemp_c}°</p>
              <p className="text-body5 opacity-80">{getDayFromDate(day.date)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;