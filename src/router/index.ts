// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { getNav } from '@/api/user'

// 静态路由
const staticRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      icon: 'home-o'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About',
      icon: 'home-o'
    }
  },
  {
    path: '/governance',
    name: 'governance',
    children: [
      {
        path: '/management',
        name: 'Governance / Management',
        component: () => import('@/views/Governance/Management.vue')
      },
      {
        path: '/board',
        name: 'Governance / Board of Directors',
        component: () => import('@/views/Governance/Board.vue')
      },
      {
        path: '/governance',
        name: 'Governance / Governance Documents',
        component: () => import('@/views/Governance/Governance.vue')
      },
      {
        path: '/committee',
        name: 'Governance / Committee Composition',
        component: () => import('@/views/Governance/Committee.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'news',
    children: [
      {
        path: '/newsReleases',
        name: 'News & Events / News Releases',
        component: () => import('@/views/News/NewsReleases.vue')
      },
      {
        path: '/eventCalendar',
        name: 'News & Events / Event Calendar',
        component: () => import('@/views/News/EventCalendar.vue')
      },
      {
        path: '/eventsPresentations',
        name: 'News & Events / Events & Presentations',
        component: () => import('@/views/News/EventsPresentations.vue')
      },
      {
        path: '/annualGeneralMeeting',
        name: 'News & Events / Annual General Meeting',
        component: () => import('@/views/News/AnnualGeneralMeeting.vue')
      }
    ]
  },
  {
    path: '/financial',
    name: 'financial',
    children: [
      {
        path: '/SECFilings',
        name: 'Financial & Reports / SEC Filings',
        component: () => import('@/views/Financial/SECFilings.vue')
      },
      {
        path: '/quarterlyResults',
        name: 'Financial & Reports / Quarterly Results',
        component: () => import('@/views/Financial/QuarterlyResults.vue')
      },
      {
        path: '/annualReports',
        name: 'Financial & Reports / Annual Reports',
        component: () => import('@/views/Financial/AnnualReports.vue')
      }
    ]
  },
  {
    path: '/stockQuote',
    name: 'stockQuote',
    children: [
      {
        path: '/stockQuoteChart',
        name: 'Stock Information / Stock Quote & Chart',
        component: () => import('@/views/StockQuoteChart/StockQuoteChart.vue')
      }
    ]
  },
  {
    path: '/investor',
    name: 'investor',
    children: [
      {
        path: '/investorFAQs',
        name: 'Investor Resources / Investor FAQs',
        component: () => import('@/views/Investor/InvestorFAQs.vue')
      },
      {
        path: '/EmailAlerts',
        name: 'Investor Resources / Email Alerts',
        component: () => import('@/views/Investor/EmailAlerts.vue')
      },
      {
        path: '/contact',
        name: 'Investor Resources / IR Contact',
        component: () => import('@/views/Investor/IRContact.vue')
      },
      {
        path: '/investorEmailAlerts',
        name: '',
        component: () => import('@/views/Investor/InvestorEmailAlerts.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // 通配符路由捕获所有未匹配到的路由
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory(),
  routes: staticRoutes
})

// 动态添加路由的函数
export async function setupDynamicRoutes() {
  try {
    const response = await getNav()
    const routes = Array.isArray(response) ? response : []
    routes.forEach((route: { path: any; name: any; component: any; meta: any; }) => {
      router.addRoute({
        path: route.path,
        name: route.name,
        component: () => import(`@/views/${route.component}.vue`),
        meta: route.meta || {}
      })
    })
  } catch (error) {
    // 动态路由设置失败
  }
}

export default router