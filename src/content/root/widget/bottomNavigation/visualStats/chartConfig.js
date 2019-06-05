import recordTooltip from './recordTooltip';

export default {
  colors: ['#f9343a'],
  zoom: {
    enabled: true,
    type: 'x',
    resetIcon: {
      offsetX: -10,
      offsetY: 0,
      fillColor: '#fff',
      strokeColor: '#37474F'
    },
    selection: {
      background: '#90CAF9',
      border: '#0D47A1'
    }
  },
  annotations: {
    yaxis: [{
      y: 0,
      borderColor: '#999',
      label: {
        show: true,
        text: 'Zero point',
        style: {
          color: '#fff',
          background: '#00E396'
        }
      }
    }]
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 6
  },
  yaxis: {
    decimalsInFloat: 0,
    tooltip: {
      enabled: true
    }
  },
  tooltip: {
    enabled: true,
    intersect: true, // Show tooltip only when user hovers exactly over datapoint.
    shared: false, // When having multiple series, show a shared tooltip
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const RECORD_INDEX = 2;
      const record = w.config.series[seriesIndex].data[dataPointIndex][RECORD_INDEX];
      console.log(record);
      return recordTooltip(record);
    }
  },
  markers: {
    size: 4,
    opacity: 0.9,
    colors: ['#FFA41B'],
    strokeColor: '#fff',
    strokeWidth: 2,
    hover: {
      size: 7
    },
    discrete: []
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#16ce50', '#cc1016'],
      type: 'vertical',
      stops: [0]
    }
  },
  grid: {
    padding: {
      left: -5,
      right: 5
    }
  }
};
