import { DoughnutChart, VerticalBarChart, BarChart } from "../atoms";

export const GraphMainSection = () => {
  return (
    <div>
      <p>Overview</p>
      <div style={{ display: "flex", padding: "2rem" }}>
        <DoughnutChart />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <BarChart />
        </div>
        <div>
          <VerticalBarChart />
        </div>
      </div>
    </div>
  );
};
