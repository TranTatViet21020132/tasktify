"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

export interface ICompletionBar {
  tableChartData: { month: string | 0 | undefined; unfinished: number; completed: number }[];
  tableChartConfig: ChartConfig;
}

const CompletionBar = ({
  tableChartData,
  tableChartConfig,
}: ICompletionBar) => {
  const { t } = useTranslation();
  return (
    <Card className="w-full h-full flex flex-col shadow-md dark:shadow-slate-800">
      <CardHeader>
        <CardTitle>{t("barChart.title")}</CardTitle>
        <CardDescription>{t("barChart.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={tableChartConfig}>
          <BarChart accessibilityLayer data={tableChartData} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="unfinished" fill="hsl(var(--chart-1))" radius={4} />
            <Bar dataKey="completed" fill="rgb(139 92 246)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CompletionBar;
