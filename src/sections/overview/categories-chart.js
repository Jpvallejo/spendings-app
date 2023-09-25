import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { Chart } from "src/components/chart";
import { HeroIcon } from "src/components/HeroIcon";

const useChartOptions = (labels, colors) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const CategoriesChart = (props) => {
  const { chartSeries, labels, sx, colors, icons } = props;
  const chartOptions = useChartOptions(labels, colors);

  return (
    <Card sx={sx}>
      <CardHeader title="Spendings by category" />
      <CardContent>
        <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index].to;
            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {icons.length > 0 && (
                  <SvgIcon>
                    <HeroIcon icon={icons[index]} color="text-black-600" size={6} solid />
                  </SvgIcon>
                )}
                <Typography sx={{ my: 1 }} variant="h6">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {item}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

CategoriesChart.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
