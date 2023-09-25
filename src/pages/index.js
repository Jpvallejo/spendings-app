import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Button, Container, Unstable_Grid2 as Grid, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DashboardTransactions } from "src/sections/overview/dashboard-transactions";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { CategoriesChart } from "src/sections/overview/categories-chart";
import { useEffect, useState } from "react";
import { getByCategory } from "src/network/lib/transactions";
import ArrowSmallLeftIcon from "@heroicons/react/24/solid/ArrowSmallLeftIcon";
import ArrowSmallRightIcon from "@heroicons/react/24/solid/ArrowSmallRightIcon";
import { getForecast } from "src/network/lib/accounts";

const now = new Date();

const Page = () => {
  const [dashboardExpenses, setDashboardExpenses] = useState([]);
  const [dashboardIncomes, setDashboardIncomes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [forecastMonths, setForecastMonths] = useState([]);
  const [forecastAmounts, setForecastAmounts] = useState([]);

  function getMonthName(monthNumber) {
    console.log(monthNumber);
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString([], {
      month: "long",
    });
  }

  const goToPreviousMonth = () => {
    if (currentMonth == 1) {
      updateDashboardData(12, currentYear - 1);
    } else {
      updateDashboardData(currentMonth - 1, currentYear);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth == 12) {
      updateDashboardData(1, currentYear + 1);
    } else {
      updateDashboardData(currentMonth + 1, currentYear);
    }
  };

  const updateDashboardData = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    getByCategory({ month: month, year: year }).then((transactions) => {
      setDashboardIncomes(transactions.data.filter((x) => x.type === "Income"));
      setDashboardExpenses(transactions.data.filter((x) => x.type === "Expense"));
    });
    getForecast({accountId: 1, month: month, year: year}).then((accountForecast) => {
      setForecastAmounts(accountForecast.data.map((x) => x.amount));
      setForecastMonths(accountForecast.data.map((x) => x.month));
    });
  };
  useEffect(() => {
    const today = new Date();
    updateDashboardData(today.getMonth() + 1, today.getFullYear());
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container xs={12} sm={12} lg={12}>
            <Grid xs={3} sm={3} lg={3}>
              <Button onClick={() => goToPreviousMonth()}>
                <SvgIcon>
                  <ArrowSmallLeftIcon />
                </SvgIcon>
              </Button>
            </Grid>
            <Grid container xs={6} sm={6} lg={6} justifyContent="center">
              <Typography>{`${getMonthName(currentMonth)}${
                currentYear !== new Date().getFullYear() ? " - " + currentYear : ""
              }`}</Typography>
            </Grid>
            <Grid container xs={3} sm={3} lg={3} justifyContent="flex-end">
              <Button onClick={() => goToNextMonth()}>
                <SvgIcon>
                  <ArrowSmallRightIcon />
                </SvgIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={6}>
              <DashboardTransactions
                sx={{ height: "100%" }}
                value={dashboardExpenses.reduce((a, b) => {
                  return a + b.amount;
                }, 0)}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <DashboardTransactions
                sx={{ height: "100%" }}
                income
                value={dashboardIncomes.reduce((a, b) => {
                  return a + b.amount;
                }, 0)}
              />
            </Grid>
            {/* <Grid xs={12} sm={6} lg={6}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="1.6k"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid> */}
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "",
                    data: forecastAmounts,
                  }
                ]}
                months= {forecastMonths}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <CategoriesChart
                chartSeries={dashboardExpenses.map((x) => x.percent)}
                labels={dashboardExpenses.map((x) => x.name)}
                colors={dashboardExpenses.map((x) => x.hexcolor)}
                icons={dashboardExpenses.map((x) => x.icon)}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "DEV1049",
                    amount: 30.5,
                    customer: {
                      name: "Ekaterina Tankova",
                    },
                    createdAt: 1555016400000,
                    status: "pending",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "DEV1048",
                    amount: 25.1,
                    customer: {
                      name: "Cao Yu",
                    },
                    createdAt: 1555016400000,
                    status: "delivered",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "DEV1047",
                    amount: 10.99,
                    customer: {
                      name: "Alexa Richardson",
                    },
                    createdAt: 1554930000000,
                    status: "refunded",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "DEV1046",
                    amount: 96.43,
                    customer: {
                      name: "Anje Keizer",
                    },
                    createdAt: 1554757200000,
                    status: "pending",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "DEV1045",
                    amount: 32.54,
                    customer: {
                      name: "Clarke Gillebert",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "DEV1044",
                    amount: 16.76,
                    customer: {
                      name: "Adam Denisov",
                    },
                    createdAt: 1554670800000,
                    status: "delivered",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
