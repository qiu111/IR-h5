// 导航菜单 Mock 数据
export const mockNavData = [
  {
    nav_no: '107',
    nav_parent_no: '0',
    nav_name: 'Home',
    link: '/Page/Index/index.html',
    type: '2',
    sub: []
  },
  {
    nav_no: '108',
    nav_parent_no: '0',
    nav_name: 'About US',
    link: '/Page/Index/about.html',
    type: '2',
    sub: []
  },
  {
    nav_no: '109',
    nav_parent_no: '0',
    nav_name: 'Governance',
    link: '/Page/Index/governance.html',
    type: '2',
    sub: [
      { nav_no: '109001', nav_name: 'Management', link: '/Page/Index/management.html', type: '2' },
      { nav_no: '109002', nav_name: 'Board of Directors', link: '/Page/Index/board.html', type: '2' },
      { nav_no: '109003', nav_name: 'Governance Documents', link: '/Page/Index/governance.html', type: '2' },
      { nav_no: '109004', nav_name: 'Committee Composition', link: '/Page/Index/committee.html', type: '2' }
    ]
  },
  {
    nav_no: '110',
    nav_parent_no: '0',
    nav_name: 'News & Events',
    link: '/Page/Index/news.html',
    type: '2',
    sub: [
      { nav_no: '111001', nav_name: 'News Releases', link: '/Page/Index/newsReleases.html', type: '2' },
      { nav_no: '111002', nav_name: 'Event Calendar', link: '/Page/Index/eventCalendar.html', type: '2' },
      { nav_no: '111003', nav_name: 'Events & Presentations', link: '/Page/Index/eventsPresentations.html', type: '2' },
      { nav_no: '111004', nav_name: 'Annual General Meeting', link: '/Page/Index/annualGeneralMeeting.html', type: '2' }
    ]
  },
  {
    nav_no: '112',
    nav_parent_no: '0',
    nav_name: 'Financial Information',
    link: '/Page/Index/financial.html',
    type: '2',
    sub: [
      { nav_no: '112001', nav_name: 'SEC Filings', link: '/Page/Index/secFilings.html', type: '2' },
      { nav_no: '112002', nav_name: 'Quarterly Results', link: '/Page/Index/quarterlyResults.html', type: '2' },
      { nav_no: '112003', nav_name: 'Annual Reports', link: '/Page/Index/annualReports.html', type: '2' }
    ]
  },
  {
    nav_no: '113',
    nav_parent_no: '0',
    nav_name: 'Stock Information',
    link: '/Page/Index/stock.html',
    type: '2',
    sub: [
      { nav_no: '113001', nav_name: 'Stock Quote & Chart', link: '/Page/Index/stockQuoteChart.html', type: '2' }
    ]
  },
  {
    nav_no: '114',
    nav_parent_no: '0',
    nav_name: 'Investor Relations',
    link: '/Page/Index/investor.html',
    type: '2',
    sub: [
      { nav_no: '114001', nav_name: 'Investor FAQs', link: '/Page/Index/investorFAQs.html', type: '2' },
      { nav_no: '114002', nav_name: 'IR Contact', link: '/Page/Index/irContact.html', type: '2' },
      { nav_no: '114003', nav_name: 'Email Alerts', link: '/Page/Index/emailAlerts.html', type: '2' }
    ]
  }
];
