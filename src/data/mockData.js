export const feedTrend = [
  { day: 'Mon', actual: 420, predicted: 415, waste: 32 },
  { day: 'Tue', actual: 398, predicted: 410, waste: 28 },
  { day: 'Wed', actual: 445, predicted: 440, waste: 41 },
  { day: 'Thu', actual: 412, predicted: 418, waste: 25 },
  { day: 'Fri', actual: 388, predicted: 395, waste: 19 },
  { day: 'Sat', actual: 402, predicted: 405, waste: 22 },
  { day: 'Sun', actual: null, predicted: 390, waste: null },
];

export const flockHealth = [
  { week: 'W1', weight: 0.4, fcr: 1.6, mortality: 0.2 },
  { week: 'W2', weight: 0.9, fcr: 1.7, mortality: 0.3 },
  { week: 'W3', weight: 1.6, fcr: 1.8, mortality: 0.4 },
  { week: 'W4', weight: 2.4, fcr: 1.9, mortality: 0.5 },
  { week: 'W5', weight: 3.1, fcr: 2.0, mortality: 0.3 },
  { week: 'W6', weight: 3.8, fcr: 1.95, mortality: 0.2 },
];

export const anomalies = [
  { id: 1, type: 'high',   flock: 'House B - Batch 12', msg: 'Feed conversion ratio spiked +18% above baseline', time: '2h ago',   resolved: false },
  { id: 2, type: 'medium', flock: 'House A - Batch 11', msg: 'Performance trend dropped 12% below expected range', time: '5h ago',  resolved: false },
  { id: 3, type: 'high',   flock: 'House C - Batch 10', msg: 'Mortality rate exceeded 1% threshold for Day 21',    time: '1d ago',   resolved: true  },
  { id: 4, type: 'low',    flock: 'House A - Batch 11', msg: 'Weight gain trending slightly below expected range',  time: '8h ago',   resolved: true  },
];

export const kpis = [
  { label: 'Feed Conversion Ratio', value: '1.82', target: '1.75', unit: 'FCR',    trend: '+4%', up: false },
  { label: 'Avg Body Weight',       value: '2.4',  target: '2.5',  unit: 'kg',     trend: '-4%', up: false },
  { label: 'Mortality Rate',        value: '0.3%', target: '<0.5%',unit: 'rate',   trend: 'Good',up: true  },
  { label: 'Feed Waste Saved',      value: '18%',  target: '20%',  unit: 'saved',  trend: '+18%',up: true  },
];

export const farmBatches = [
  { id: 1, house: 'House A', batch: 'Batch 11', age: 32, birds: 18000, fcr: 1.85, weight: 2.38, status: 'good'    },
  { id: 2, house: 'House B', batch: 'Batch 12', age: 21, birds: 20000, fcr: 2.02, weight: 1.62, status: 'warning' },
  { id: 3, house: 'House C', batch: 'Batch 10', age: 40, birds: 16500, fcr: 1.76, weight: 3.10, status: 'good'    },
  { id: 4, house: 'House D', batch: 'Batch 13', age: 7,  birds: 22000, fcr: 1.61, weight: 0.42, status: 'new'     },
];

export const recommendations = [
  { id: 1, icon: '🌾', priority: 'high',   flock: 'House B - Batch 12', action: 'Reduce feed quantity by 8% today', reason: 'FCR trend predicts overfeeding for next 3 days', saving: 'Save ~$420' },
  { id: 2, icon: '📈', priority: 'medium', flock: 'House A - Batch 11', action: 'Review batch performance trend',    reason: 'Weight gain and FCR moved below expected range', saving: 'Catch issue early' },
  { id: 3, icon: '🌡️', priority: 'low',    flock: 'House C - Batch 10', action: 'Review environment notes for Day 38', reason: 'Optimal finish weight target in 5 days',       saving: '+0.12kg/bird' },
  { id: 4, icon: '💊', priority: 'medium', flock: 'House A - Batch 11', action: 'Review health support plan for Day 34', reason: 'Performance curve trending below target',        saving: 'Protect FCR target' },
];
