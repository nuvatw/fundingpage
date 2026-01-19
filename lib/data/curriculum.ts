import type {
  CourseLevel,
  AIHelper,
  CurriculumItem,
  GeneralCurriculumItem,
} from '@/lib/types';

// 7 級課程內容（直式 Timeline）
export const COURSE_LEVELS: CourseLevel[] = [
  {
    level: 1,
    difficulty: '入門',
    title: 'AI 文案主廚',
    subtitle: '菜名、餐點故事、活動企劃一次寫到位',
    description:
      '把「不知道怎麼寫、寫不出特色、寫了沒人看」變成一套可複用的文案流程；從菜名、餐點描述、社群貼文到活動企劃一條龍產出。',
    tags: ['ChatGPT', 'Perplexity'],
    resultPromise: '擁有一個隨叫隨到的行銷企劃與餐廳小編',
    highlights: [
      '每天都能發文、有話題、有賣點',
      '菜名與餐點描述更有吸引力',
      '活動企劃從發想到文案一次搞定',
    ],
    suitableFor: '社群貼文卡關、不知道寫什麼的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 2,
    difficulty: '入門',
    title: 'AI 視覺出餐',
    subtitle: '餐點圖、海報、桌卡做得像連鎖品牌',
    description:
      '教你把「看起來不專業」變成「一眼就想點」；做出餐點示意圖、活動海報、Menu 小卡、桌上立牌等。',
    tags: ['nano banana', 'Midjourney'],
    resultPromise: '每週固定產出專業宣傳物',
    highlights: ['菜單更好賣', '活動更好推', '路過的人更想走進來'],
    suitableFor: '宣傳物看起來不專業、常外包設計的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 3,
    difficulty: '基礎',
    title: '餐廳官網一日上線',
    subtitle: '你的官方門面與資訊總整理',
    description:
      '買網域、把網站上線、用 AI 做出你要的頁面；讓「店家資訊到處散落」變成「一個連結就搞定」。',
    tags: ['Cloudflare', 'Vercel', 'AI 網站生成'],
    resultPromise: '擁有 24 小時不打烊的官方門面',
    highlights: ['客人查得到', '看得懂', '找得到怎麼訂位/怎麼來'],
    suitableFor: '還沒有官網、資訊散落各平台的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 4,
    difficulty: '進階',
    title: '24H AI 客服店員',
    subtitle: '自動回覆、推活動、把問題接住',
    description:
      '把常見問題（營業時間、地址、訂位規則、低消、包場）做成自動回覆流程；遇到特殊狀況再轉真人處理。',
    tags: ['n8n'],
    resultPromise: '擁有一個 24 小時幫你回覆的餐廳小編',
    highlights: ['不漏訊息', '不漏訂位', '不被私訊淹沒'],
    suitableFor: '每天私訊 > 20 則、常漏回覆的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 5,
    difficulty: '進階',
    title: '自動出帳 AI 財務',
    subtitle: '日/週/月報表自動整理＋漂亮輸出',
    description:
      '把每天的營收、品項、成本、毛利等資訊自動統整，固定時間吐出「好看的報告」給你和夥伴。',
    tags: ['n8n', 'HTML'],
    resultPromise: '不用再熬夜整理報表',
    highlights: ['更快看懂哪個品項賺', '哪天強', '哪裡在漏錢'],
    suitableFor: '月底才看帳、報表靠 Excel 人工整理的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 6,
    difficulty: '專案',
    title: 'AI 智能備料管家',
    subtitle: '一鍵查庫存＋每日提醒補貨',
    description:
      '做一個簡單 Dashboard（看剩多少、快沒了哪些、該補什麼），搭配資料庫管理食材與用量；每天自動提醒補貨清單。',
    tags: ['vibe coding', 'Supabase', 'AI Bot'],
    resultPromise: '降低缺料與報廢',
    highlights: ['尖峰期不爆單缺貨', '備料更準', '採買更省'],
    suitableFor: '常缺料或報廢多、備料靠經驗的店',
    previewImages: [],
    previewVideoUrl: '',
  },
  {
    level: 7,
    difficulty: '系統',
    title: '訂位＆候位系統',
    subtitle: '把尖峰期的混亂變成流程',
    description:
      '先學「怎麼寫 PRD 把規則講清楚」，再用工具做出訂位/候位/通知流程；包含狀態管理與例外情境處理（遲到、取消、併桌）。',
    tags: ['PRD', 'Claude', 'Supabase'],
    resultPromise: '尖峰期不再亂、店員壓力下降、翻桌率變穩定',
    highlights: ['訂位流程可控', '候位狀態透明', '客人感受也更好'],
    suitableFor: '尖峰期常亂、訂位候位靠人工調度的店',
    previewImages: [],
    previewVideoUrl: '',
  },
];

// 7 階段 AI 小幫手（新版卡片）
export const AI_HELPERS: AIHelper[] = [
  {
    level: 1,
    difficulty: '入門',
    name: 'Luna',
    role: 'AI 社群文案小編',
    problem: '寫社群文案很卡、餐點文案不夠吸引人',
    canHelp: [
      '想菜名／餐點描述／餐點故事（更有畫面、更能打動人）',
      '產出社群貼文文案或短影片腳本（可直接發佈）',
    ],
    youWillStart: [
      '每天都有內容可發',
      '文案更有賣點、更像品牌',
      '活動企劃不再從零想',
    ],
    tools: 'Perplexity / ChatGPT',
  },
  {
    level: 2,
    difficulty: '入門',
    name: 'Momo',
    role: 'AI 視覺設計小幫手',
    problem: '宣傳物看起來不專業、常常需要外包設計',
    canHelp: [
      '生成餐點視覺圖、活動海報、桌卡（固定風格、像連鎖品牌）',
      '把「同一個活動」快速做成多尺寸素材（貼文/限動/看板）',
    ],
    youWillStart: [
      '每週固定產出專業宣傳物',
      '視覺風格一致、品牌感更強',
      '活動更好推、菜單更好賣',
    ],
    tools: 'Midjourney（或同等出圖工具）/ 圖像生成流程',
  },
  {
    level: 3,
    difficulty: '基礎',
    name: 'Navi',
    role: '官網上線小幫手',
    problem: '沒有官網、資訊散落在各平台，客人找不到重點',
    canHelp: [
      '把菜單、訂位、地圖、營業資訊整理成「一個連結」',
      '協助你把官網上線（網域/部署/更新流程一次建好）',
    ],
    youWillStart: [
      '擁有 24 小時不打烊的官方門面',
      '客人查得到、看得懂、找得到怎麼訂位/怎麼來',
      '店家資訊不再到處散落',
    ],
    tools: 'Cloudflare / Vercel / AI 網站生成',
  },
  {
    level: 4,
    difficulty: '進階',
    name: 'Echo',
    role: '24H 私訊客服小幫手',
    problem: '每天私訊很多、常漏回覆、訂位問題卡住人力',
    canHelp: [
      '自動回覆常見問題（營業時間/地址/菜單/訂位方式）',
      '把訂位與活動導到正確流程（必要時轉真人）',
    ],
    youWillStart: [
      '不漏訊息、不漏訂位',
      '私訊量被分流，店員壓力下降',
      '回覆更一致、更有品牌感',
    ],
    tools: 'n8n（或自動化流程）/ 訊息串接',
  },
  {
    level: 5,
    difficulty: '進階',
    name: 'Ledger',
    role: '財務報表小幫手',
    problem: '月底才看帳、報表靠 Excel 人工整理，常常看不出問題',
    canHelp: [
      '自動整理日/週/月報表（營收、品項、時段）',
      '把數字變成可讀的結論（哪個品項賺、哪天強、哪裡在漏錢）',
    ],
    youWillStart: [
      '不用再熬夜整理報表',
      '更快抓到經營決策重點',
      '報表變成「每天都看得懂」的東西',
    ],
    tools: 'n8n / HTML（或報表輸出格式）',
  },
  {
    level: 6,
    difficulty: '專案',
    name: 'Stocky',
    role: '備料與庫存小幫手',
    problem: '常缺料或報廢多、備料靠經驗，尖峰期容易出包',
    canHelp: [
      '一鍵查庫存＋每日提醒補貨（依你設定的閾值）',
      '提醒高風險品項（缺料/即期/高報廢）讓你提早處理',
    ],
    youWillStart: [
      '尖峰期不爆單缺貨',
      '備料更準、報廢更少',
      '採買更省、更有依據',
    ],
    tools: 'Supabase / AI Bot（或同等資料庫＋機器人）/ vibe coding',
  },
  {
    level: 7,
    difficulty: '系統',
    name: 'Flow',
    role: '訂位＆候位流程小幫手',
    problem: '尖峰期混亂、訂位候位靠人工調度，現場壓力大',
    canHelp: [
      '把訂位、候位、叫號做成可控流程（店家端看得見、顧客端也清楚）',
      '讓狀態透明：候位到哪、何時可入座、下一組是誰',
    ],
    youWillStart: [
      '尖峰期不再亂、店員壓力下降',
      '訂位流程可控、候位狀態透明',
      '翻桌率變穩定、客人感受更好',
    ],
    tools: 'PRD / Claude / Supabase',
  },
];

// 8 堂課程時程表（餐飲版）
export const CURRICULUM_ITEMS: CurriculumItem[] = [
  {
    level: 1,
    stage: '基礎階段',
    name: 'Luna',
    title: 'AI 社群文案小編',
    subtitle: '菜名、餐點故事、活動企劃一次寫到位',
    description:
      '把「不知道怎麼寫、寫不出特色、寫了沒人看」變成一套可複用的文案流程；從菜名、餐點描述、社群貼文到活動企劃一條龍產出。',
    dateRange: '2026年07月01日 - 2026年07月10日',
    highlights: [
      '想菜名／餐點描述／餐點故事（更有畫面、更能打動人）',
      '產出社群貼文文案或短影片腳本（可直接發佈）',
      '活動企劃從發想到文案一次搞定',
    ],
    tools: 'Perplexity / ChatGPT',
  },
  {
    level: 2,
    stage: '基礎階段',
    name: 'Momo',
    title: 'AI 視覺設計小幫手',
    subtitle: '餐點圖、海報、桌卡做得像連鎖品牌',
    description:
      '教你把「看起來不專業」變成「一眼就想點」；做出餐點示意圖、活動海報、Menu 小卡、桌上立牌等。',
    dateRange: '2026年07月11日 - 2026年07月20日',
    highlights: [
      '生成餐點視覺圖、活動海報、桌卡（固定風格、像連鎖品牌）',
      '把同一個活動快速做成多尺寸素材（貼文/限動/看板）',
      '視覺風格一致、品牌感更強',
    ],
    tools: 'Midjourney / 圖像生成流程',
  },
  {
    level: 3,
    stage: '基礎階段',
    name: 'Navi',
    title: '官網上線小幫手',
    subtitle: '你的官方門面與資訊總整理',
    description:
      '買網域、把網站上線、用 AI 做出你要的頁面；讓「店家資訊到處散落」變成「一個連結就搞定」。',
    dateRange: '2026年07月21日 - 2026年07月31日',
    highlights: [
      '把菜單、訂位、地圖、營業資訊整理成「一個連結」',
      '協助你把官網上線（網域/部署/更新流程一次建好）',
      '客人查得到、看得懂、找得到怎麼訂位/怎麼來',
    ],
    tools: 'Cloudflare / Vercel / AI 網站生成',
  },
  {
    level: 4,
    stage: '進階階段',
    name: 'Echo',
    title: '24H 私訊客服小幫手',
    subtitle: '自動回覆、推活動、把問題接住',
    description:
      '把常見問題（營業時間、地址、訂位規則、低消、包場）做成自動回覆流程；遇到特殊狀況再轉真人處理。',
    dateRange: '2026年08月01日 - 2026年08月10日',
    highlights: [
      '自動回覆常見問題（營業時間/地址/菜單/訂位方式）',
      '把訂位與活動導到正確流程（必要時轉真人）',
      '不漏訊息、不漏訂位、回覆更一致',
    ],
    tools: 'n8n / 訊息串接',
  },
  {
    level: 5,
    stage: '進階階段',
    name: 'Ledger',
    title: '財務報表小幫手',
    subtitle: '日/週/月報表自動整理＋漂亮輸出',
    description:
      '把每天的營收、品項、成本、毛利等資訊自動統整，固定時間吐出「好看的報告」給你和夥伴。',
    dateRange: '2026年08月11日 - 2026年08月20日',
    highlights: [
      '自動整理日/週/月報表（營收、品項、時段）',
      '把數字變成可讀的結論（哪個品項賺、哪天強、哪裡在漏錢）',
      '報表變成「每天都看得懂」的東西',
    ],
    tools: 'n8n / HTML 報表',
  },
  {
    level: 6,
    stage: '專業階段',
    name: 'Stocky',
    title: '備料與庫存小幫手',
    subtitle: '一鍵查庫存＋每日提醒補貨',
    description:
      '做一個簡單 Dashboard（看剩多少、快沒了哪些、該補什麼），搭配資料庫管理食材與用量；每天自動提醒補貨清單。',
    dateRange: '2026年08月21日 - 2026年08月31日',
    highlights: [
      '一鍵查庫存＋每日提醒補貨（依你設定的閾值）',
      '提醒高風險品項（缺料/即期/高報廢）讓你提早處理',
      '尖峰期不爆單缺貨、備料更準、報廢更少',
    ],
    tools: 'Supabase / AI Bot / vibe coding',
  },
  {
    level: 7,
    stage: '專業階段',
    name: 'Flow',
    title: '訂位＆候位流程小幫手',
    subtitle: '把尖峰期的混亂變成流程',
    description:
      '先學「怎麼寫 PRD 把規則講清楚」，再用工具做出訂位/候位/通知流程；包含狀態管理與例外情境處理（遲到、取消、併桌）。',
    dateRange: '2026年09月01日 - 2026年09月10日',
    highlights: [
      '把訂位、候位、叫號做成可控流程（店家端看得見、顧客端也清楚）',
      '讓狀態透明：候位到哪、何時可入座、下一組是誰',
      '訂位流程可控、候位狀態透明、翻桌率變穩定',
    ],
    tools: 'PRD / Claude / Supabase',
  },
  {
    level: 8,
    stage: '成果階段',
    name: 'Final',
    title: '成效驗收 + ROI 報告產出',
    subtitle: '產出可衡量的成效報告，證明投資回報',
    description:
      '這不是一堂「新工具教學」，而是帶你回顧 7 個 AI 小幫手的實際導入成效，產出一份可以拿給老闆/股東看的「AI 導入成效報告」。用數據證明這筆投資的具體回報。',
    dateRange: '2026年09月11日 - 2026年09月28日',
    highlights: [
      '產出「AI 導入成效報告」（含量化指標 + ROI 計算）',
      '建立導入前 vs 導入後的對比數據',
      '行為改變 Checklist：確認團隊有把 AI 用進日常',
      '準備成果發表的簡報與 Demo',
    ],
    tools: '全課程工具整合 / 簡報工具',
    isPresentation: true,
  },
];

// 9 堂課程時程表（通用版）
export const GENERAL_CURRICULUM_ITEMS: GeneralCurriculumItem[] = [
  {
    level: 1,
    stage: '入門階段',
    title: 'AI 協作思維與 Prompt 工程',
    subtitle: '掌握 AI 溝通的核心技術，讓 AI 真正聽懂你的需求',
    description:
      '這不只是學會用 ChatGPT，而是建立「AI 協作思維」。學會如何拆解問題、設計 Prompt、迭代優化，讓 AI 成為你最強的工作夥伴。R&D（Research & Development）不再只是大公司的專利，每個人都能用 AI 做研究、做開發。',
    dateRange: '',
    highlights: [
      '認識 ChatGPT、Claude、Gemini 三大 AI 的特性與適用場景',
      '掌握 Prompt 結構：角色設定、任務拆解、輸出格式、Few-shot 範例',
      '學會用 AI 做研究（R&D）：資料蒐集、競品分析、趨勢洞察',
    ],
    tools: 'ChatGPT / Claude / Gemini / Perplexity',
    deliverable: '一套分類整理的個人 Prompt 模板庫（至少 20 個實用 Prompt）',
  },
  {
    level: 2,
    stage: '入門階段',
    title: '打造你的 AI 分身',
    subtitle: '在 ChatGPT 創造專屬 AI 角色，24 小時為你服務',
    description:
      '學會在 ChatGPT 建立自訂 GPT，設定專屬的角色、知識庫、對話風格。你的 AI 分身可以是客服助理、寫作教練、或任何你需要的角色。',
    dateRange: '',
    highlights: [
      '深入理解 GPT Builder 的完整功能與設定邏輯',
      '設計 AI 角色的人格、語氣、專業知識邊界',
      '上傳知識庫檔案，讓 AI 具備專屬領域知識',
    ],
    tools: 'ChatGPT GPTs / Claude Projects',
    deliverable: '一個公開上線的自訂 GPT（可分享連結給別人使用）',
  },
  {
    level: 3,
    stage: '入門階段',
    title: 'AI 圖像創作工作坊',
    subtitle: '用 AI 生成專業級圖片，不需要設計背景',
    description:
      '掌握 AI 圖像生成的完整技能。從理解 Prompt 結構、風格控制、到進階的圖生圖技巧，讓你能產出專業級的視覺素材。',
    dateRange: '',
    highlights: [
      'Midjourney 完整操作：參數設定、風格詞彙、版本差異',
      'Google Nano Banana：Gemini 內建的圖片生成與編輯功能',
      '建立個人視覺風格，產出一致性的品牌素材',
    ],
    tools: 'Midjourney / Nano Banana (Gemini) / Ideogram',
    deliverable: '個人品牌視覺素材包（頭像、Banner、社群貼圖至少 10 張）',
  },
  {
    level: 4,
    stage: '應用階段',
    title: 'AI 影片製作實戰',
    subtitle: '用 AI 製作電影級短影片，一人就是整個製作團隊',
    description:
      '2025 年最火的 AI 應用就是影片生成。學會用 Kling、Runway 製作高品質影片，加上 AI 配音、字幕，完成可發布的作品。',
    dateRange: '',
    highlights: [
      'Kling 實戰：文生影片、圖生影片、影片延展、口型同步',
      'Runway Gen-4 進階：鏡頭運動控制、角色一致性',
      'AI 配音與數位人：HeyGen 虛擬人、ElevenLabs 語音克隆',
    ],
    tools: 'Kling / Runway / HeyGen / ElevenLabs',
    deliverable: '一支 30-60 秒的完整 AI 短影片（含配音、字幕、音效）',
  },
  {
    level: 5,
    stage: '應用階段',
    title: '自動化工作流設計',
    subtitle: '把重複的工作交給 AI，你只做決策',
    description:
      '學會用 n8n 串接各種工具和 AI，打造「觸發 → 處理 → 輸出」的自動化流程。從此告別手動複製貼上的低效工作。',
    dateRange: '',
    highlights: [
      'n8n 完整教學：節點概念、觸發器、條件判斷、錯誤處理',
      '串接 ChatGPT API，讓自動化流程擁有 AI 智慧',
      '實作三大場景：內容自動發布、客戶通知、資料整理',
    ],
    tools: 'n8n / Make / Zapier / OpenAI API',
    deliverable: '3 個實際運作的自動化工作流（附流程圖說明）',
  },
  {
    level: 6,
    stage: '應用階段',
    title: 'LINE 機器人開發',
    subtitle: '打造 24 小時在線的智能客服與互動機器人',
    description:
      '從 LINE 開發者帳號申請、到串接 AI 大腦、再到部署上線，完整學會如何打造一個真正能用的 LINE 機器人。',
    dateRange: '',
    highlights: [
      'LINE Messaging API 完整設定與 Webhook 串接',
      '用 n8n 串接 ChatGPT，讓機器人具備對話能力',
      '設計對話流程：關鍵字觸發、圖文選單、Rich Menu',
    ],
    tools: 'LINE Developers / n8n / OpenAI API / Vercel',
    deliverable: '一個上線運作的 LINE 機器人（可加好友互動）',
  },
  {
    level: 7,
    stage: '進階階段',
    title: 'AI + 資料庫內部系統',
    subtitle: '用 Supabase 打造專屬的智能管理系統',
    description:
      '學會用 Supabase 建立資料庫，串接 AI 做智能分析，打造屬於你的 CRM、訂單系統、或任何內部管理工具。',
    dateRange: '',
    highlights: [
      'Supabase 基礎：資料表設計、關聯、權限控制',
      '用 n8n 串接 Supabase + ChatGPT，實現智能資料處理',
      '建立簡易後台：資料 CRUD、自動通知、報表產出',
    ],
    tools: 'Supabase / n8n / OpenAI API',
    deliverable: '一個簡易 CRM 或內部管理系統（含資料庫 + 自動化流程）',
  },
  {
    level: 8,
    stage: '進階階段',
    title: 'Vibe Coding 架設官網',
    subtitle: '用 AI 寫程式，打造專業級品牌官網',
    description:
      'Vibe Coding 是 2025 年最熱門的開發方式。學會用 Cursor + Claude 用自然語言「指揮」AI 寫程式，從零建立一個現代化網站並部署上線。',
    dateRange: '',
    highlights: [
      'Cursor / Claude Code 操作：如何用自然語言描述需求',
      '用 v0.dev 快速生成 UI 元件，加速開發流程',
      'Vercel 一鍵部署：從本地到上線的完整流程',
    ],
    tools: 'Cursor / Claude / v0.dev / Vercel',
    deliverable: '一個正式上線的個人/品牌官網（綁定自訂網域）',
  },
  {
    level: 9,
    stage: '進階階段',
    title: '畢業專案整合展示',
    subtitle: '整合所學，展示你的 AI 創作能力',
    description:
      '這是你的 AI 學習成果展。結合前八堂課學到的技能，完成一個解決真實問題的 AI 專案，並整理成可展示的作品集。',
    dateRange: '',
    highlights: [
      '專案規劃：定義問題、設計解決方案、選擇工具組合',
      '執行與迭代：邊做邊優化，用 AI 加速開發',
      '成果展示：整理成作品集頁面，準備 Demo 簡報',
    ],
    tools: '依專案需求整合運用',
    deliverable: '完整的 AI 專案作品 + 作品集展示頁面',
  },
];
