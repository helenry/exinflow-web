// /components/charts/PieChart.jsx
import React, { useState } from 'react';
import { PieChart as MUIPieChart } from '@mui/x-charts';

const PieChart = ({
  data,
  activeWallet,
  setActiveWallet
}) => {
  // Convert hex to rgba
  const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const processedData = data.map((item) => ({
    value: item.base_amount,
    label: item.name,
    color:
      activeWallet === null || activeWallet === item.id
        ? `#${item.color}`
        : hexToRgba(`#${item.color}`, 0.2),
  }));

  const handleItemClick = (clickedIndex) => {
    const clickedId = data[clickedIndex]?.id;
    setActiveWallet(prevId => prevId === clickedId ? null : clickedId);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <MUIPieChart
        series={[
          {
            data: processedData,
            innerRadius: 30,
            outerRadius: 100,
            cornerRadius: 5,
          },
        ]}
        onItemClick={(event, itemIdentifier) => handleItemClick(itemIdentifier.dataIndex)}
        width={250}
        height={250}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        slotProps={{
          legend: {
            onItemClick: (event, legendItem, index) => {
              handleItemClick(index);
            }
          }
        }}
      />
    </div>
  );
};

export { PieChart };