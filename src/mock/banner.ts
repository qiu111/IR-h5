// Banner Mock 数据
export const mockBannerResponse = {
  status: 200,
  bname: 'banner-mock.jpg'
};

export const mockBannerResponseAbout = {
  status: 200,
  bname: 'about-banner-mock.jpg'
};

export const mockBannerResponseFinance = {
  status: 200,
  bname: 'finance-banner-mock.jpg'
};

export const mockBannerResponseGovernance = {
  status: 200,
  bname: 'governance-banner-mock.jpg'
};

export const mockBannerResponseNews = {
  status: 200,
  bname: 'news-banner-mock.jpg'
};

export const mockBannerResponseInvestor = {
  status: 200,
  bname: 'investor-banner-mock.jpg'
};

export const mockBannerResponseStock = {
  status: 200,
  bname: 'stock-banner-mock.jpg'
};

// 根据不同 selectedNav 返回不同的 banner
export function getMockBanner(selectedNav: string) {
  const bannerMap: Record<string, { status: number; bname: string }> = {
    '110': mockBannerResponse,
    '115': mockBannerResponseAbout,
    '109001': mockBannerResponseGovernance,
    '109002': mockBannerResponseGovernance,
    '109003': mockBannerResponseGovernance,
    '109004': mockBannerResponseGovernance,
    '111001': mockBannerResponseNews,
    '111002': mockBannerResponseNews,
    '111003': mockBannerResponseNews,
    '111004': mockBannerResponseNews,
    '112001': mockBannerResponseFinance,
    '112002': mockBannerResponseFinance,
    '112003': mockBannerResponseFinance,
    '113001': mockBannerResponseStock,
    '114001': mockBannerResponseInvestor,
    '114002': mockBannerResponseInvestor,
    '114003': mockBannerResponseInvestor
  };
  return bannerMap[selectedNav] || mockBannerResponse;
}
