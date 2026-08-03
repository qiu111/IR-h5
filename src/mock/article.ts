// 文章 Mock 数据 - 根据不同 nav_no 返回不同内容

// 首页文章数据 (nav_no: '110')
const homeArticles = [
  {
    id: '1',
    title: 'Company Announces Quarterly Financial Results',
    c_time: '2026-06-15',
    content: '<p> today announced its unaudited consolidated financial results for the three and six months ended Apri 30, 2026. The company reported strong revenue growth of 15% year-over-year, driven by increased demand across all major business segments.</p>',
    floor: '1',
    sub_title: '',
    names: ['financial-results-q2-2026.pdf']
  },
  {
    id: '2',
    title: 'Company News: New Partnership Announcement',
    c_time: '2026-05-20',
    content: '<p>We are excited to announce a strategic partnership with a leading technology provider that will enhance our product offerings and accelerate our digital transformation initiatives.</p>',
    floor: '1',
    sub_title: '',
    names: []
  },
  {
    id: '3',
    title: 'Shareholder Update',
    c_time: '2026-04-10',
    content: '<p>Dear Valued Shareholders, We want to take this opportunity to update you on our progress and strategic initiatives for the upcoming fiscal year.</p>',
    floor: '1',
    sub_title: '',
    names: ['shareholder-update-2026.pdf']
  }
];

// 季度报告数据 (nav_no: '112002')
const quarterlyReports = [
  {
    id: 'q3-2026',
    title: 'Third Quarter 2026 Results',
    c_time: '2026-11-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-q3-2026-results.pdf', 'Company-q3-2026-presentation.pdf']
  },
  {
    id: 'q2-2026',
    title: 'Second Quarter 2026 Results',
    c_time: '2026-08-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-q2-2026-results.pdf', 'Company-q2-2026-presentation.pdf']
  },
  {
    id: 'q1-2026',
    title: 'First Quarter 2026 Results',
    c_time: '2026-05-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-q1-2026-results.pdf', 'Company-q1-2026-presentation.pdf']
  },
  {
    id: 'q4-2024',
    title: 'Fourth Quarter 2024 Results',
    c_time: '2026-02-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-q4-2024-results.pdf', 'Company-q4-2024-presentation.pdf']
  }
];

// 年报数据 (nav_no: '112003')
const annualReports = [
  {
    id: 'annual-2024',
    title: 'Annual Report 2024',
    c_time: '2026-03-31',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-annual-report-2024.pdf']
  },
  {
    id: 'annual-2023',
    title: 'Annual Report 2023',
    c_time: '2024-03-31',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-annual-report-2023.pdf']
  },
  {
    id: 'annual-2022',
    title: 'Annual Report 2022',
    c_time: '2023-03-31',
    content: '',
    floor: '',
    sub_title: '',
    names: ['Company-annual-report-2022.pdf']
  }
];

// About页面数据 (nav_no: '115')
const aboutArticles = [
  {
    id: 'about-1',
    title: 'Company Overview',
    c_time: '2026-01-01',
    content: '<p><strong>The Company</strong> is a leading provider of innovative solutions across multiple industries. Founded on principles of excellence and innovation, we have grown to serve clients worldwide with our comprehensive range of products and services.</p><p>Our commitment to quality and customer satisfaction has been the cornerstone of our success for over two decades. We continue to invest in research and development to maintain our competitive edge and deliver value to our stakeholders.</p>',
    floor: '1',
    sub_title: '',
    names: ['about-overview.pdf']
  },
  {
    id: 'about-2',
    title: 'Our Mission & Vision',
    c_time: '2026-01-01',
    content: '<p><strong>Mission:</strong> To empower businesses through innovative technology solutions that drive growth and efficiency.</p><p><strong>Vision:</strong> To be the recognized leader in our industry, known for our commitment to excellence, sustainability, and social responsibility.</p>',
    floor: '1',
    sub_title: '',
    names: []
  },
  {
    id: 'about-3',
    title: 'Corporate History',
    c_time: '2026-01-01',
    content: '<p>Since our founding, the Company has achieved numerous milestones that have shaped our journey. From our humble beginnings to becoming a global leader, our story is one of perseverance, innovation, and strategic growth.</p>',
    floor: '2',
    sub_title: '',
    names: ['corporate-history-chronicle.jpg', 'milestone-celebration.jpg', 'global-expansion.jpg']
  }
];

// 事件日历数据 (nav_no: '111002')
const eventCalendar = [
  {
    id: 'event-1',
    title: 'Annual Shareholders\' Meeting 2026',
    c_time: '2026-04-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['agm-2026-invitation.pdf', 'agm-2026-proxy-statement.pdf']
  },
  {
    id: 'event-2',
    title: 'Q2 2026 Earnings Call',
    c_time: '2026-08-20',
    content: '',
    floor: '',
    sub_title: '',
    names: ['q2-2026-earnings-presentation.pdf']
  },
  {
    id: 'event-3',
    title: 'Investor Day 2026',
    c_time: '2026-10-10',
    content: '',
    floor: '',
    sub_title: '',
    names: ['investor-day-2026-brochure.pdf']
  },
  {
    id: 'event-4',
    title: 'Q1 2026 Earnings Call',
    c_time: '2026-05-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['q1-2026-earnings-presentation.pdf']
  },
  {
    id: 'event-5',
    title: 'Company Anniversary Celebration',
    c_time: '2026-06-01',
    content: '',
    floor: '',
    sub_title: '',
    names: []
  },
  {
    id: 'event-6',
    title: 'Q4 2024 Earnings Call',
    c_time: '2026-02-20',
    content: '',
    floor: '',
    sub_title: '',
    names: ['q4-2024-earnings-presentation.pdf']
  }
];

// Events & Presentations (nav_no: '111003')
const eventsPresentations = [
  {
    id: 'ep-1',
    title: 'Q2 2026 Financial Results Presentation',
    c_time: '2026-08-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['q2-2026-presentation.pdf']
  },
  {
    id: 'ep-2',
    title: 'Investor Conference Presentation',
    c_time: '2026-06-10',
    content: '',
    floor: '',
    sub_title: '',
    names: ['investor-conference-2026.pdf']
  },
  {
    id: 'ep-3',
    title: 'Annual Investor Day',
    c_time: '2026-03-20',
    content: '',
    floor: '',
    sub_title: '',
    names: ['annual-investor-day.pdf']
  }
];

// AGM (nav_no: '111004')
const agmData = [
  {
    id: 'agm-1',
    title: 'Annual General Meeting 2026',
    c_time: '2026-04-15',
    content: '',
    floor: '',
    sub_title: '',
    names: ['agm-2026-notice.pdf', 'agm-2026-proxy-statement.pdf', 'agm-2026-annual-report.pdf']
  }
];

// Governance Documents (nav_no: '109003')
const governanceDocs = [
  {
    id: 'gov-1',
    title: 'Corporate Governance Guidelines',
    c_time: '2026-01-01',
    content: '',
    floor: '',
    sub_title: '',
    names: ['corporate-governance-guidelines.pdf']
  },
  {
    id: 'gov-2',
    title: 'Code of Business Conduct and Ethics',
    c_time: '2026-01-01',
    content: '',
    floor: '',
    sub_title: '',
    names: ['code-of-conduct.pdf']
  },
  {
    id: 'gov-3',
    title: 'Charters of Board Committees',
    c_time: '2026-01-01',
    content: '',
    floor: '',
    sub_title: '',
    names: ['audit-committee-charter.pdf', 'compensation-committee-charter.pdf', 'nominating-committee-charter.pdf']
  }
];

// Management (nav_no: '109001')
const managementData = [
  {
    id: 'mgmt-1',
    title: 'Leadership Team',
    c_time: '2026-01-01',
    content: '<p><strong>Chief Executive Officer</strong><br>Alex Johnson has been the CEO of the Company since 2015. With over 25 years of experience in the industry, he has led the company through significant transformation and growth.</p>',
    floor: '1',
    sub_title: '',
    names: []
  },
  {
    id: 'mgmt-2',
    title: 'Executive Leadership',
    c_time: '2026-01-01',
    content: '<p>Our executive leadership team brings together experienced professionals from diverse backgrounds, united by a shared commitment to excellence and innovation.</p>',
    floor: '1',
    sub_title: '',
    names: []
  }
];

// Board of Directors (nav_no: '109002')
const boardData = [
  {
    id: 'board-1',
    title: 'Board of Directors',
    c_time: '2026-01-01',
    content: '<p>The Board of Directors is responsible for overseeing the strategic direction of the company and ensuring accountability to shareholders.</p>',
    floor: '1',
    sub_title: '',
    names: ['board-of-directors-list.pdf']
  }
];

// Investor FAQs (nav_no: '114001')
const investorFAQs = [
  {
    id: 'faq-1',
    title: 'How can I purchase shares of the Company?',
    c_time: '2026-01-01',
    content: '<p>Shares of the Company can be purchased through any licensed securities broker. Our stock is listed on the [Exchange Name] under the ticker symbol EXMP.</p>',
    floor: '',
    sub_title: '',
    names: []
  },
  {
    id: 'faq-2',
    title: 'When is the next earnings release?',
    c_time: '2026-01-01',
    content: '<p>Our quarterly earnings releases are typically scheduled for the middle of the month following the end of each quarter. Please refer to our Event Calendar for specific dates.</p>',
    floor: '',
    sub_title: '',
    names: []
  },
  {
    id: 'faq-3',
    title: 'How do I contact Investor Relations?',
    c_time: '2026-01-01',
    content: '<p>You can reach our Investor Relations team through the contact form on this website or by emailing investor.relations@example.com. We are happy to assist with any inquiries.</p>',
    floor: '',
    sub_title: '',
    names: []
  },
  {
    id: 'faq-4',
    title: 'How can I receive company updates?',
    c_time: '2026-01-01',
    content: '<p>Subscribe to our email alerts to receive the latest news, financial reports, and event notifications directly in your inbox. Visit our Email Alerts page to sign up.</p>',
    floor: '',
    sub_title: '',
    names: []
  }
];

// IR Contact (nav_no: '114002')
const irContactData = [
  {
    id: 'ir-1',
    title: 'Investor Relations Contact Information',
    c_time: '2026-01-01',
    content: '<p><strong>Investor Relations Department</strong><br>Email: investor.relations@example.com<br>Phone: +1 (555) 000-0000<br>Address: 123 Business Center, Suite 100, San Francisco, CA 94102</p>',
    floor: '',
    sub_title: '',
    names: []
  }
];

// 根据 nav_no 返回对应数据
export function getMockArticles(navNo: string) {
  const articleMap: Record<string, any[]> = {
    '110': homeArticles,
    '112002': quarterlyReports,
    '112003': annualReports,
    '115': aboutArticles,
    '111002': eventCalendar,
    '111003': eventsPresentations,
    '111004': agmData,
    '109003': governanceDocs,
    '109001': managementData,
    '109002': boardData,
    '114001': investorFAQs,
    '114002': irContactData
  };
  return articleMap[navNo] || [];
}
