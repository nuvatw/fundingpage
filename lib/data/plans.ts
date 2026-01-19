import type {
  Plan,
  FeatureCategoryInfo,
  PlanFeatureDefinition,
  PlanV2,
} from '@/lib/types';

// ==========================================
// 餐飲版方案
// ==========================================

export const PLANS: Plan[] = [
  {
    id: 'basic',
    title: '基礎',
    subtitle: '月訂閱制，全平台課程隨時看',
    price: 'NT$2,400',
    priceNote: '每月',
    highlight: '5/1 開放觀看',
    suitableFor: '適合想先體驗、彈性學習的人',
    icon: 'Play',
    features: [
      { icon: 'CheckCircle', text: '全平台課程影片觀看' },
      { icon: 'Calendar', text: '5/1 起開放觀看' },
      { icon: 'Play', text: '訂閱期間不限次播放' },
      { icon: 'Sparkles', text: '每月兩堂新課程' },
      { icon: 'Video', text: '每週 1 次 90 分鐘線上 Live Q&A' },
      { icon: 'MessageSquare', text: 'Discord 陪跑社群（學員互助）' },
      { icon: 'FileText', text: '課程模板與講義資源' },
    ],
    ctaLink: 'https://www.zeczec.com/',
  },
  {
    id: 'accompany',
    title: '陪跑',
    subtitle: '90 天陪跑落地，把 AI 真正導入你的餐廳',
    price: 'NT$58,000',
    priceNote: '每週 Live + 助教陪跑',
    highlight: '每週 Live Q&A + 助教每日陪跑 + 終生回放',
    suitableFor: '適合想做出來、不只是看懂的人',
    icon: 'Users',
    features: [
      { icon: 'Calendar', text: '一年影片回放' },
      { icon: 'Video', text: '每週 1 次 90 分鐘線上 Live Q&A' },
      { icon: 'MessageSquare', text: 'Discord 陪跑社群（學員互助）' },
      {
        icon: 'Headset',
        text: '真人助教 90 天每日陪跑（24 小時內回覆）',
      },
      { icon: 'ListChecks', text: '學習進度追蹤（確認是否跟上）' },
      {
        icon: 'Wrench',
        text: '實作導入指導：把 AI 助理做成「可上線、可用」',
      },
      { icon: 'MapPin', text: '台北實體成果發表' },
      { icon: 'Award', text: '結業典禮' },
      {
        icon: 'ClipboardCheck',
        text: '第八堂課產出成效報告 + 行為改變 Checklist',
      },
    ],
    ctaLink: 'https://www.zeczec.com/',
  },
  {
    id: 'founder',
    title: '領航',
    subtitle: '創辦人親自帶隊，小班制高強度加速導入',
    price: 'NT$210,000',
    priceNote: '限量 15 位',
    highlight: '最高密度落地導入，90 天交付可驗收成果',
    suitableFor: '適合要快速落地、需要人盯里程碑的人',
    icon: 'Crown',
    features: [
      { icon: 'Star', text: '包含「陪跑」方案全部內容' },
      { icon: 'Crown', text: '創辦人親自帶隊（小班制 15 位）' },
      {
        icon: 'Compass',
        text: '導入策略與落地拆解（依店型/情境規劃導入路線）',
      },
      { icon: 'BarChart', text: 'KPI 追蹤 + 每週進度回報' },
      { icon: 'FileText', text: '90 天產出正式「AI 導入成效報告」' },
      { icon: 'TrendingUp', text: 'ROI 分析：協助計算這筆投資的具體回報' },
    ],
    ctaLink: 'https://www.zeczec.com/',
  },
];

// ==========================================
// V2 Plan Data - Feature Matrix Approach（餐飲版）
// ==========================================

export const FEATURE_CATEGORIES: FeatureCategoryInfo[] = [
  { id: 'content', label: '課程觀看與更新', order: 1 },
  { id: 'resources', label: '學習資源', order: 2 },
  { id: 'community', label: '社群與互動', order: 3 },
  { id: 'accompany', label: '90 天落地支持', order: 4 },
  { id: 'premium', label: '高階成果與策略', order: 5 },
];

export const PLAN_FEATURES: PlanFeatureDefinition[] = [
  // 1) 課程觀看與更新
  { id: 'free-courses', categoryId: 'content', text: '免費課程無限觀看', icon: 'Play' },
  { id: 'all-courses', categoryId: 'content', text: '全平台課程無限觀看', icon: 'CheckCircle' },
  { id: 'monthly-new', categoryId: 'content', text: '每月新增 1 堂 AI 新課', icon: 'Sparkles' },

  // 2) 學習資源
  { id: 'templates', categoryId: 'resources', text: '模板 / 講義 / 可套用素材', icon: 'FileText' },

  // 3) 社群與互動
  { id: 'live-qa', categoryId: 'community', text: '每週 1 次：90 分鐘線上 Live Q&A', icon: 'Video' },
  { id: 'discord', categoryId: 'community', text: 'Discord 學員社群互助', icon: 'MessageSquare' },

  // 4) 90 天落地支持
  { id: 'ta-support', categoryId: 'accompany', text: '助教每日陪跑 90 天（24 小時內回覆）', icon: 'Headset' },
  { id: 'implementation', categoryId: 'accompany', text: '導入實作指導：做成可上線、可直接使用', icon: 'Wrench' },

  // 5) 高階成果與策略
  { id: 'ceremony', categoryId: 'premium', text: '台北實體成果發表暨結業典禮', icon: 'MapPin' },
  { id: 'founder-lead', categoryId: 'premium', text: '小班制：創辦人親自帶隊（限 15 位）', icon: 'Crown' },
  { id: 'strategy', categoryId: 'premium', text: '創辦人 1 對 1：導入策略與落地拆解（依店型/情境規劃路線）', icon: 'Compass' },
  { id: 'report', categoryId: 'premium', text: '90 天產出正式「AI 導入成效報告」', icon: 'ClipboardCheck' },
];

export const PLANS_V2: PlanV2[] = [
  {
    id: 'free',
    title: '免費體驗',
    subtitle: '先隨意逛逛',
    price: 'NT$0',
    priceNote: '/ 月',
    suitableFor: '你想先確認課程內容與教學風格',
    icon: 'Play',
    featureMatrix: {
      'free-courses': { type: 'boolean', enabled: true },
      'all-courses': { type: 'boolean', enabled: false },
      'monthly-new': { type: 'boolean', enabled: false },
      'templates': { type: 'boolean', enabled: false },
      'live-qa': { type: 'boolean', enabled: false },
      'discord': { type: 'boolean', enabled: false },
      'ta-support': { type: 'boolean', enabled: false },
      'implementation': { type: 'boolean', enabled: false },
      'ceremony': { type: 'boolean', enabled: false },
      'founder-lead': { type: 'boolean', enabled: false },
      'strategy': { type: 'boolean', enabled: false },
      'report': { type: 'boolean', enabled: false },
    },
    ctaLink: 'https://www.zeczec.com/',
    ctaText: '免費開始',
  },
  {
    id: 'basic',
    title: '基礎進修',
    subtitle: '全平台學習 + 每月新課',
    price: 'NT$2,400',
    priceNote: '/ 月',
    suitableFor: '你要穩定學、持續更新，但不需要專人陪跑',
    icon: 'Play',
    featureMatrix: {
      'free-courses': { type: 'boolean', enabled: true },
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '1 次/週' },
      'discord': { type: 'boolean', enabled: true },
      'ta-support': { type: 'boolean', enabled: false },
      'implementation': { type: 'boolean', enabled: false },
      'ceremony': { type: 'boolean', enabled: false },
      'founder-lead': { type: 'boolean', enabled: false },
      'strategy': { type: 'boolean', enabled: false },
      'report': { type: 'boolean', enabled: false },
    },
    ctaLink: 'https://www.zeczec.com/',
    ctaText: '開始訂閱',
  },
  {
    id: 'accompany',
    title: '90 天陪跑',
    subtitle: '貼身助教與你共學',
    price: 'NT$58,000',
    priceNote: '/ 90 天',
    suitableFor: '你想在 90 天內把 AI 真的導入工作流程',
    icon: 'Users',
    isRecommended: true,
    featureMatrix: {
      'free-courses': { type: 'boolean', enabled: true },
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '1 次/週' },
      'discord': { type: 'boolean', enabled: true },
      'ta-support': { type: 'value', text: '90 天' },
      'implementation': { type: 'boolean', enabled: true },
      'ceremony': { type: 'boolean', enabled: true },
      'founder-lead': { type: 'boolean', enabled: false },
      'strategy': { type: 'boolean', enabled: false },
      'report': { type: 'boolean', enabled: false },
    },
    ctaLink: 'https://www.zeczec.com/',
    ctaText: '加入陪跑',
  },
  {
    id: 'founder',
    title: '夢幻隊',
    subtitle: '創辦人親自帶隊學習',
    price: 'NT$210,000',
    priceNote: '/ 90 天',
    badge: '限 15 位',
    suitableFor: '你需要更快落地、策略拆解與成果報告',
    icon: 'Crown',
    featureMatrix: {
      'free-courses': { type: 'boolean', enabled: true },
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '1 次/週' },
      'discord': { type: 'boolean', enabled: true },
      'ta-support': { type: 'value', text: '90 天' },
      'implementation': { type: 'boolean', enabled: true },
      'ceremony': { type: 'boolean', enabled: true },
      'founder-lead': { type: 'value', text: '限 15 位' },
      'strategy': { type: 'callout', text: '1 對 1' },
      'report': { type: 'boolean', enabled: true },
    },
    ctaLink: 'https://www.zeczec.com/',
    ctaText: '申請席位',
  },
];

// ==========================================
// 通用版方案
// ==========================================

export const GENERAL_FEATURE_CATEGORIES: FeatureCategoryInfo[] = [
  { id: 'content', label: '課程觀看與更新', order: 1 },
  { id: 'resources', label: '學習資源', order: 2 },
  { id: 'community', label: '社群與互動', order: 3 },
  { id: 'events', label: '實體活動', order: 4 },
];

export const GENERAL_PLAN_FEATURES: PlanFeatureDefinition[] = [
  // 1) 課程觀看與更新
  { id: 'all-courses', categoryId: 'content', text: '全平台課程無限觀看', icon: 'Play' },
  { id: 'monthly-new', categoryId: 'content', text: '每月新增 1 堂 AI 新課', icon: 'Sparkles' },

  // 2) 學習資源
  { id: 'templates', categoryId: 'resources', text: '模板 / 講義 / 可套用素材', icon: 'FileText' },

  // 3) 社群與互動
  { id: 'live-qa', categoryId: 'community', text: '每月 4 次線上 Live Q&A', icon: 'Video' },
  { id: 'discord', categoryId: 'community', text: 'Discord 學員社群互助', icon: 'MessageSquare' },
  { id: 'support', categoryId: 'community', text: '24/7 線上問答支援（on-demand）', icon: 'Headset' },

  // 4) 實體活動
  { id: 'meetup', categoryId: 'events', text: '每 2 個月實體 AI 聚會（會員免費）', icon: 'MapPin' },
];

export const GENERAL_PLANS_V2: PlanV2[] = [
  {
    id: 'starter',
    title: '體驗方案',
    subtitle: '買 1 送 1，共 2 個月',
    price: 'NT$2,400',
    priceNote: '月均 $1,200',
    suitableFor: '最彈性的入門選擇，先體驗看看',
    icon: 'Play',
    featureMatrix: {
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '4 次/月' },
      'discord': { type: 'boolean', enabled: true },
      'support': { type: 'boolean', enabled: true },
      'meetup': { type: 'boolean', enabled: true },
    },
    ctaLink: '/checkout?plan=starter',
    ctaText: '選擇此方案',
  },
  {
    id: 'explorer',
    title: '探索方案',
    subtitle: '買 2 送 3，共 5 個月',
    price: 'NT$4,800',
    priceNote: '月均 $960',
    suitableFor: '最多人選擇，時間充裕學得深入',
    icon: 'Compass',
    isRecommended: true,
    featureMatrix: {
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '4 次/月' },
      'discord': { type: 'boolean', enabled: true },
      'support': { type: 'boolean', enabled: true },
      'meetup': { type: 'value', text: '2 次' },
    },
    ctaLink: '/checkout?plan=explorer',
    ctaText: '選擇此方案',
  },
  {
    id: 'master',
    title: '大師方案',
    subtitle: '買 4 送 8，共 12 個月',
    price: 'NT$9,600',
    priceNote: '月均 $800',
    suitableFor: '一整年 AI 學習旅程，CP 值最高',
    icon: 'Crown',
    featureMatrix: {
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '4 次/月' },
      'discord': { type: 'boolean', enabled: true },
      'support': { type: 'boolean', enabled: true },
      'meetup': { type: 'value', text: '6 次' },
    },
    ctaLink: '/checkout?plan=master',
    ctaText: '選擇此方案',
  },
  {
    id: 'group',
    title: '團體報名',
    subtitle: '企業／團隊專屬優惠',
    price: '專屬報價',
    priceNote: '3 人以上',
    suitableFor: '公司團報、讀書會、社群揪團',
    icon: 'Users',
    badge: '另有優惠',
    featureMatrix: {
      'all-courses': { type: 'boolean', enabled: true },
      'monthly-new': { type: 'boolean', enabled: true },
      'templates': { type: 'boolean', enabled: true },
      'live-qa': { type: 'value', text: '4 次/月' },
      'discord': { type: 'boolean', enabled: true },
      'support': { type: 'boolean', enabled: true },
      'meetup': { type: 'callout', text: '專屬場次' },
    },
    ctaLink: 'https://line.me/ti/p/@nuva',
    ctaText: 'LINE 諮詢',
  },
];
