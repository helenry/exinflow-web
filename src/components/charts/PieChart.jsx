// /components/charts/PieChart.jsx
import React, { useCallback } from 'react';
import { PieChart as MUIPieChart } from '@mui/x-charts';
import { PIE_CHART_CONFIG } from '../../constants/configs';
import { usePieChartData } from '../../hooks/charts/usePieChartData';

const PieChart = ({ data, activeWallet, setActiveWallet }) => {
  const processedData = usePieChartData(data, activeWallet);

  const handleItemClick = useCallback((clickedIndex) => {
    if (!data[clickedIndex]) {
      console.warn('Invalid click index:', clickedIndex);
      return;
    }

    const clickedId = data[clickedIndex].id;
    setActiveWallet(prevId => prevId === clickedId ? null : clickedId);
  }, [data, setActiveWallet]);

  const handleLegendClick = useCallback((event, legendItem, index) => {
    event.preventDefault();
    handleItemClick(index);
  }, [handleItemClick]);

  const handleSliceClick = useCallback((event, itemIdentifier) => {
    if (itemIdentifier?.dataIndex !== undefined) {
      handleItemClick(itemIdentifier.dataIndex);
    }
  }, [handleItemClick]);

  const handleContainerClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  
  const series = [{
    data: processedData,
    innerRadius: PIE_CHART_CONFIG.innerRadius,
    outerRadius: PIE_CHART_CONFIG.outerRadius,
    cornerRadius: PIE_CHART_CONFIG.cornerRadius,
  }];

  if (!processedData || processedData.length === 0) {
    return (
      <div className="pie-chart-empty" style={{ width: PIE_CHART_CONFIG.width, height: PIE_CHART_CONFIG.height }}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="pie-chart-container h-64" onClick={handleContainerClick}>
      <MUIPieChart
        series={series}
        sx={{
          height: '100%',
        }}
        onItemClick={handleSliceClick}
        width={PIE_CHART_CONFIG.width}
        height={PIE_CHART_CONFIG.height}
        margin={PIE_CHART_CONFIG.margin}
        slotProps={{
          legend: {
            onItemClick: handleLegendClick,
            sx: {
              overflowY: 'scroll',
              flexWrap: 'nowrap',
              height: '100%',
              padding: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'start',
              '& .MuiChartsLegend-label': {
                maxWidth: 84,
                whiteSpace: 'wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              },
            },
            direction: 'vertical',
            position: { 
              vertical: 'middle',
              horizontal: 'start'
            }
          },
        }}
        aria-label="Interactive pie chart"
        role="img"
      />
    </div>
  );
};

export { PieChart };