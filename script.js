const months = [
  "Jul-25", "Aug-25", "Sep-25", "Oct-25", "Nov-25", "Dec-25",
  "Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26", "Jul-26",
];
const cpi = [1.61, 2.07, 1.44, 0.25, 0.71, 1.33, 2.74, 3.21, 3.40, 3.48, 3.93, 4.38, 4.45];
const wpi = [-0.79, 0.00, -0.20, -1.18, -0.59, 0.30, 1.19, 2.18, 3.98, 8.36, 9.88, 9.97, 9.78];

const upperBand = months.map(() => 6);
const lowerBand = months.map(() => 2);

const ctx = document.getElementById("cpiChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: months,
    datasets: [
      { label: "WPI (%)", data: wpi, borderColor: "#B4842E" },
      { label: "CPI (%)", data: cpi, borderColor: "black" },
      { label: "Upper band (6%)", data: upperBand, borderColor: "transparent", fill: false },
      {
        label: "Lower band (2%)",
        data: lowerBand,
        borderColor: "transparent",
        backgroundColor: "rgba(31, 107, 92, 0.15)",
        fill: "-1",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          filter: (item) => item.text !== "Upper band (6%)",
        },
      },
    },
  },
});
const tenors = [1, 2, 3, 5, 7, 10, 30];
const curveAug26 = [5.88, 6.29, 6.42, 6.64, 6.77, 6.96, 7.51];
const curveAug25 = [5.65, 5.81, 6.03, 6.38, 6.61, 6.64, 7.28];

const toPoints = (yields) => tenors.map((t, i) => ({ x: t, y: yields[i] }));

new Chart(document.getElementById("curveChart"), {
  type: "line",
  data: {
    datasets: [
      { label: "Aug-2026", data: toPoints(curveAug26), borderColor: "#1F6B5C" },
      {
        label: "Aug-2025",
        data: toPoints(curveAug25),
        borderColor: "#8B93A6",
        borderDash: [5, 4],
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "logarithmic",
        title: { display: true, text: "Maturity (years)" },
        afterBuildTicks: (axis) => {
          axis.ticks = tenors.map((t) => ({ value: t }));
        },
        ticks: {
          autoSkip: false,
          callback: (value) => value + "Y",
        },
      },
      y: { title: { display: true, text: "Yield (%, month-end)" } },
    },
  },
});
// ---- RBI month-end yields (SGL transactions), Jul-25 to Aug-26 ----
const yMonths = [
  "Jul-25", "Aug-25", "Sep-25", "Oct-25", "Nov-25", "Dec-25", "Jan-26",
  "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26", "Jul-26", "Aug-26",
];
const y2 = [5.74, 5.81, 5.83, 5.68, 5.78, 5.81, 5.81, 5.66, 6.34, 6.23, 6.37, 5.98, 6.07, 6.29];
const y10 = [6.42, 6.64, 6.64, 6.63, 6.60, 6.66, 6.78, 6.71, 7.08, 7.08, 7.03, 6.74, 6.82, 6.96];
const y30 = [7.10, 7.28, 7.19, 7.23, 7.29, 7.27, 7.37, 7.36, 7.68, 7.63, 7.64, 7.32, 7.48, 7.51];

// ---- Derived metrics ----
const spread2s10s = y10.map((v, i) => Math.round((v - y2[i]) * 100));
const realRate = cpi.map((c, i) => +(y10[i] - c).toFixed(2));
new Chart(document.getElementById("historyChart"), {
  type: "line",
  data: {
    labels: yMonths,
    datasets: [
      { label: "2Y", data: y2, borderColor: "#8B93A6" },
      { label: "10Y", data: y10, borderColor: "#1F6B5C" },
      { label: "30Y", data: y30, borderColor: "#B4842E" },
    ],
  },
});

new Chart(document.getElementById("spreadChart"), {
  type: "line",
  data: {
    labels: yMonths,
    datasets: [{ label: "10Y minus 2Y (bp)", data: spread2s10s, borderColor: "#B4842E" }],
  },
});

new Chart(document.getElementById("realChart"), {
  type: "line",
  data: {
    labels: months,
    datasets: [{ label: "10Y minus CPI (%)", data: realRate, borderColor: "#1F6B5C" }],
  },
});