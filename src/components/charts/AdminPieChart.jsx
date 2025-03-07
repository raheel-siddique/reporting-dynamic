import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Sector,
} from "recharts";

class AdminPieChartComponent extends PureComponent {
  // The renderActiveShape function
  renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
      data, // The full dataset passed as a prop
    } = props;

    const { totalSum, centerText } = this.props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        {/* Display the sum of all values at the center */}
        <text
          x={cx}
          y={cy}
          dy={-8}
          textAnchor="middle"
          fill="#000"
          style={{ fontWeight: 600 }}
        >
          {Math.floor(totalSum)}
        </text>

        {/* Display the name of the payload at the center */}
        <text
          fontSize={14}
          x={cx}
          y={cy}
          dy={13}
          textAnchor="middle"
          fill="#777777"
        >
          {centerText}
        </text>

        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"#fff"} // White color for inner sector
        />
      </g>
    );
  };

  render() {
    const { data, dataKey, colors, totalSum, centerText, showLegends } =
      this.props;

    return (
      <div className="">
        {/* Pie chart */}
        <div className="">
          <ResponsiveContainer
            width="100%"
            height={250} // Explicitly set a height for the container
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%" // Center horizontally within its container
                cy="40%" // Center vertically within its container
                innerRadius="65%" // Responsive inner radius
                outerRadius="85%" // Responsive outer radius
                fill="#8884d8"
                paddingAngle={0.5}
                dataKey={dataKey}
                activeIndex={0} // Set the activeIndex as needed
                activeShape={this.renderActiveShape} // Add the active shape renderer
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors ? colors[index] : entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Charts Legends */}
        {showLegends ? (
          <div className="flex flex-wrap justify-center gap-5 px-4">
            {data.map((entry, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="h-[12px] w-[12px] block rounded-full"
                    style={{
                      backgroundColor: colors[index] || "black",
                    }}
                  />
                  <span
                    style={{
                      color: colors[index] || "black",
                    }}
                    className="text-[14px] font-medium"
                  >
                    {entry.name}
                  </span>
                </div>
                <span className="font-semibold text-gray-600 ml-5">
                  {Math.floor(entry.value === 0.01 ? 0 : entry.value)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

AdminPieChartComponent.defaultProps = {
  dataKey: "value",
  colors: [],
  thickness: 30, // Default thickness value
};

export default AdminPieChartComponent;
