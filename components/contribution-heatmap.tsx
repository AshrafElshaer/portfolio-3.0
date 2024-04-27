"use client";
import React, { useEffect, useMemo } from "react";
import moment from "moment";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  GithubContributionResponse,
  getGithubContributions,
} from "@/lib/getGithubContributions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

export default function ContributionHeatmap() {
  const [contributions, setContributions] =
    React.useState<GithubContributionResponse["data"]>();
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);
  useEffect(() => {
    getGithubContributions({
      selectedYear,
    }).then((res) => {
      setContributions(res.data);
      console.log(res.data);
    });
  }, [selectedYear]);

  const availableYears = Array.from({
    length: moment().year() - 2021 + 1,
  }).map((_, index) => 2021 + index);

  const startDate = selectedYear ? moment().year(selectedYear) : moment();
  const dateRange = [
    moment(startDate).startOf("year"),
    moment(startDate).endOf("year"),
  ];
  const data =
    contributions?.user.contributionsCollection.contributionCalendar.weeks.reduce(
      (acc, week) => {
        let weekStartDate = moment(week.firstDay);
        week.contributionDays.forEach((day) => {
          acc.push({
            date: moment(weekStartDate).add(day.weekday, "day"),
            value: day.contributionCount,
          });
        });
        return acc;
      },
      [] as { date: moment.Moment; value: number }[]
    );

  if (!data) return null;

  return (
    <section>
      <div className="flex gap-4 justify-center items-center">
        {availableYears.map((year) => (
          <Button
            key={year}
            onClick={() => setSelectedYear(year)}
            variant={year === selectedYear ? "secondary" : "ghost"}
            size={"sm"}
          >
            {year}
          </Button>
        ))}
      </div>
      <ScrollArea className="w-full mb-2">
        <Timeline
          range={dateRange}
          data={data}
          colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex justify-end w-full items-center">
        <span className="text-sm ">Less</span>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="timeline-cells-cell"
            style={{
              backgroundColor: `rgba(3, 160, 3, ${0.2 * index})`,
            }}
          />
        ))}
        <span className="text-sm ml-2">More</span>
      </div>
    </section>
  );
}

const DayNames: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

function Cell({
  color,
  value,
  date,
}: {
  color: string;
  value: number | undefined;
  date: moment.Moment | undefined;
}) {
  let style = {
    backgroundColor: value === 0 ? "hsl(0 0% 10)" : color,
  };
  color;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <div className="timeline-cells-cell" style={style}></div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={16}
        className="flex flex-col justify-center items-center"
      >
        <span>{date?.format("MMM DD, YYYY")}</span>
        <span>{value} contributions</span>
      </TooltipContent>
    </Tooltip>
  );
  // return <div className="timeline-cells-cell" style={style}></div>;
}

function Month({
  startDate,
  index,
}: {
  startDate: moment.Moment;
  index: number;
}) {
  let date = moment(startDate).add(index * 7, "day");
  let monthName = date.format("MMM");

  return (
    <div className={`timeline-months-month ${monthName}`}>{monthName}</div>
  );
}

function WeekDay({ index }: { index: number }) {
  return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>;
}

function Timeline({
  range,
  data,
  colorFunc,
}: {
  range: moment.Moment[];
  data: { date: moment.Moment; value: number }[] | undefined;
  colorFunc: (props: { alpha: number }) => string;
}) {
  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  if (!data) return null;

  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = "DDMMYYYY";

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} />
          ))}
        </div>

        <TooltipProvider>
          <div className="timeline-cells">
            {cells.map((_, index) => {
              let date = moment(startDate).add(index, "day");
              let dataPoint = data.find(
                (d) =>
                  moment(date).format(DayFormat) ===
                  moment(d.date).format(DayFormat)
              );
              let alpha = colorMultiplier * (dataPoint?.value ?? 0.2);
              let color = colorFunc({ alpha });

              return (
                <Cell
                  key={index}
                  color={color}
                  value={dataPoint?.value}
                  date={dataPoint?.date}
                />
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
