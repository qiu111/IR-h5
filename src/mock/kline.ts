// K线数据 Mock
// 生成模拟股票K线数据
function generateKlineData(days: number, basePrice: number): string[][] {
  const data: string[][] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const changePercent = (Math.random() - 0.5) * 0.05;
    const open = (basePrice * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2);
    const close = (basePrice * (1 + changePercent)).toFixed(2);
    const high = (Math.max(parseFloat(open), parseFloat(close)) * (1 + Math.random() * 0.02)).toFixed(2);
    const low = (Math.min(parseFloat(open), parseFloat(close)) * (1 - Math.random() * 0.02)).toFixed(2);
    const volume = Math.floor(1000000 + Math.random() * 5000000).toString();
    
    data.push([dateStr, open, high, low, close, volume]);
  }
  return data;
}

const basePrice = 150.00;

export const mockKlineData = {
  data: {
    'usDEMO.OQ': {
      day: generateKlineData(60, basePrice),
      week: generateKlineData(52, basePrice * 0.98).filter((_, i) => i % 5 === 0),
      month: generateKlineData(24, basePrice * 0.95).filter((_, i) => i % 20 === 0),
      year: generateKlineData(10, basePrice * 0.85)
    }
  }
};
