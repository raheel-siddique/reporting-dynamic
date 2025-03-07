import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

class LineChartComponent extends PureComponent {
  render() {
    const {
      data,
      xAxisDataKey,
      yAxisDataKey,
      yAxisDomain,
      yAxisTickCount,
      yAxisTickFormatter,
      tooltipFormatter,
      lines, // Array of line configurations
      legend, // Show/hide legend
    } = this.props;

    return (
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: -17, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} tickMargin={15} style={{ fontSize: '13px', fontWeight: 600 }} />
            <YAxis
              tickMargin={5}
              style={{ fontSize: '13px', fontWeight: 600 }}
              domain={yAxisDomain}
              tickCount={yAxisTickCount}
              tickFormatter={yAxisTickFormatter}
            />
            <Tooltip formatter={tooltipFormatter} />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                activeDot={{ r: 8 }}
                name={line.name} // For legend
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

// Default props for flexibility
LineChartComponent.defaultProps = {
  xAxisDataKey: 'name',
  yAxisDataKey: 'Amount',
  yAxisDomain: [1000, 50000],
  yAxisTickCount: 8,
  yAxisTickFormatter: (value) => `${value / 1000}k`,
  tooltipFormatter: (value) => `AED ${value.toLocaleString()}`,
  lines: [
    { dataKey: 'Amount', stroke: '#35b536', name: 'Amount' }, // Default line
  ],
};

export default LineChartComponent;