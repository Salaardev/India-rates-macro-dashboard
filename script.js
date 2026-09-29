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