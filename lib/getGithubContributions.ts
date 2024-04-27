import moment from "moment";
export type GithubContributionResponse = {
  data: {
    user: {
      name: string;
      contributionsCollection: {
        contributionCalendar: {
          colors: string[];
          totalContributions: number;
          weeks: {
            contributionDays: {
              color: string;
              contributionCount: number;
              date: string;
              weekday: number;
            }[];
            firstDay: string;
          }[];
        };
      };
    };
  };
};
export async function getGithubContributions({
  selectedYear,
}: {
  selectedYear: number;
}) {
  const startDate = moment()
    .year(selectedYear)
    .startOf("year")
    .format("YYYY-MM-DDTHH:mm:ss[Z]");
  const endDate = moment(selectedYear)
    .year(selectedYear)
    .endOf("year")
    .format("YYYY-MM-DDTHH:mm:ss[Z]");



  const headers = {
    Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  };

  const body = {
    query: `query {
            user(login: "AshrafElshaer") {
              name
              contributionsCollection(from: "${startDate}", to: "${endDate}") {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });

  return (await response.json()) as GithubContributionResponse;
}
