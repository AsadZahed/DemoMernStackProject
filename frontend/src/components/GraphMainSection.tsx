import BarChart from "./barChart";
import DoughnutChart from "./doughnutChart";

const GraphMainSection = () => {
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "600px", height: "600px" }}>
          <BarChart />
        </div>
        <div style={{ width: "600px", height: "600px" }}>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default GraphMainSection;
