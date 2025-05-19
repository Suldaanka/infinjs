"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useFetch } from "@/hooks/useFetch"

const chartConfig = {
  amount: {
    label: "Amount",
  },
  hall: {
    label: "Hall",
    color: "#4f46e1",
  },
  deen: {
    label: "Deen",
    color: "var(--chart-2)",
  },
  qudaar: {
    label: "Qudaar",
    color: "var(--chart-3)",
  },
  shidaal: {
    label: "Shidaal",
    color: "var(--chart-4)",
  },
  Farsamo: {
    label: "Farsamo",
    color: "var(--chart-5)",
  },
}

export function BChart() {
  const {data, isLoading, isError} = useFetch('/api/revenue/expenses', ['expenses'])
  
  const chartData = data ? data.map(item => ({
    ...item,
    fill: chartConfig[item.category]?.color || "var(--chart-1)"
  })) : []
  
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading chart data</p>

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label ?? value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="amount"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              fill="#4f46e1"
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}