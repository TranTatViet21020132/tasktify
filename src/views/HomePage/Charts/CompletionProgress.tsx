"use client";

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useResponsive } from "@/hooks/useResponsive";
import { useTranslation } from "react-i18next";
import { LocaleDate } from "@/configs/helper";

export interface ICompletionProgress {
  date: Date | undefined;
  totalTasksForDate: number;
  completedTasksForDate: number;
  percentage: number;
  radialChartData: { task: string; visitors: number; fill: string }[];
  radialChartConfig: ChartConfig;
}

const CompletionProgress = (props: ICompletionProgress) => {
  const { isTablet, isMobile, isDesktop } = useResponsive();

  const innerRadius = isMobile
    ? 52
    : isTablet
    ? 56
    : isDesktop
    ? 60
    : 64;

  const outerRadius = isMobile
    ? 82
    : isTablet
    ? 86
    : isDesktop
    ? 90
    : 94;

  const polarRadius = isMobile
    ? [58, 46]
    : isTablet
    ? [62, 50]
    : isDesktop
    ? [66, 54]
    : [70, 58];

  const { t, i18n } = useTranslation();

  return (
    <Card className="w-full h-full flex flex-col shadow-md col-span-3 justify-evenly dark:shadow-slate-800">
      <CardHeader className="items-center pb-0 hidden md:flex">
        <CardTitle className="text-xl">{t("progressChart.title")}</CardTitle>
        <CardDescription>
          <LocaleDate date={props.date} locale={i18n.language} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={props.radialChartConfig}
          className="mx-auto aspect-square w-full"
        >
          <RadialBarChart
            data={props.radialChartData}
            startAngle={90}
            endAngle={90 - (props.percentage * 360) / 100}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={polarRadius}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {props.totalTasksForDate
                            ? `${Math.ceil(props.percentage)}%`
                            : "0%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-body4 lg:text-body4 2xl:text-body3"
                        >
                          {props.totalTasksForDate
                            ? `${props.completedTasksForDate} / ${props.totalTasksForDate}`
                            : "No tasks"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompletionProgress;
