import type { FAQItem, FAQCategoryItem } from '@/lib/types';

// ==========================================
// 餐飲版 FAQ
// ==========================================

export const FAQ_CATEGORIES: FAQCategoryItem[] = [
  { id: 'about', label: '關於我們' },
  { id: 'accompany', label: '關於陪跑' },
  { id: 'payment', label: '費用與服務' },
];

export const FAQ_ITEMS: FAQItem[] = [
  // ========== Category 1: 關於我們（5 題）==========
  {
    id: 'about-1',
    category: 'about',
    question: '你們到底在幫我店裡「省掉哪幾件事」？一句話講清楚。',
    answer:
      '你可以把我們當成「90 天把 AI 變成你店裡副店長」：行銷內容、私訊回覆、報表整理、庫存提醒、訂位候位這些雜事，讓 AI 真的扛一部分。',
  },
  {
    id: 'about-2',
    category: 'about',
    question: '我加入後，90 天會「真的多出什麼東西能用」？',
    answer:
      '會多出一整組你店裡用得到的東西：7 個能上線的小幫手（文案、視覺、官網、私訊客服、報表、庫存、訂位候位），最後還會把它們串成一套你店裡跑得動的系統，外加一份成效報告。',
  },
  {
    id: 'about-3',
    category: 'about',
    question: '你們跟我自己上網學，差別到底在哪裡？',
    answer:
      '自學很容易三件事：東學西學越學越焦慮、卡住沒人救拖到放棄、學完一堆名詞但店裡根本用不上。我們的差別就是：路線幫你排好、情境直接是餐飲、而且有人陪你一路做到「做完能用、真的上線」。',
  },
  {
    id: 'about-4',
    category: 'about',
    question: '我這種店型（小店／連鎖／單店）也適用嗎？',
    answer:
      '大多數都適用，因為我們做的是「把你現在店裡的流程變順」：你是小店就先把最痛的雜事先省掉；你是規模大一點，就把流程做得更一致、更可控。',
  },
  {
    id: 'about-5',
    category: 'about',
    question: '你們做的是「教課」，還是「幫我把東西做上線」？',
    answer:
      '我們是教你怎麼做，但更重要是陪你把東西「做到可以用、可以上線」。不是上完課覺得懂了就算，是要做到你店裡真的開始用。',
  },

  // ========== Category 2: 關於陪跑（5 題）==========
  {
    id: 'accompany-1',
    category: 'accompany',
    question: '我每天忙成這樣，到底要花多少時間才跟得上？',
    answer:
      '不用每天讀書那種。大部分人是：平日零碎 20–40 分鐘做一點，週末或找一天 1–2 小時補一下。重點是每一段都做出一個能用的產出，不是背一堆東西。',
  },
  {
    id: 'accompany-2',
    category: 'accompany',
    question: '我不會寫程式，會不會做到一半就卡死？',
    answer:
      '不會，這套本來就是給「不寫程式也做得出來」的人走的。你要做的是把你店裡的流程講清楚、照步驟做出第一版，真的卡住就丟出來讓我們一起排。',
  },
  {
    id: 'accompany-3',
    category: 'accompany',
    question: '我卡住的時候，你們是怎麼救的？要丟什麼你們才看得懂？',
    answer:
      '你在 Discord 丟截圖＋你做到哪一步＋你想要它做什麼（越白話越好）。助教會直接幫你抓問題、教你怎麼改，目標是讓它變成「能跑的版本」，不是給你一堆理論。',
  },
  {
    id: 'accompany-4',
    category: 'accompany',
    question: '你們說 24 小時回覆，是「真的有人回」還是罐頭？',
    answer:
      '是真的有人回。意思就是你丟問題後，通常 24 小時內會有真人助教回你，不是機器人貼模板。',
  },
  {
    id: 'accompany-5',
    category: 'accompany',
    question: '我如果沒跟上進度，你們會不會盯？怎麼盯？',
    answer:
      '會看你的進度、提醒你該做哪個產出，該補哪一段。因為我們想要的是你最後真的交出一套能用的系統，不是「看完影片」就結束。',
  },

  // ========== Category 3: 費用與服務（5 題）==========
  {
    id: 'payment-1',
    category: 'payment',
    question: '三個方案差在哪？我到底該買哪個才不會浪費？',
    answer:
      '一句話：基礎＝只給你影片，適合你超自律、自己做也會做完的人。陪跑＝最多人選，因為有 Live Q&A＋助教每天陪你做完做上線。領航＝如果你要更快、想有人盯里程碑、還要 KPI/ROI 更完整，選這個（而且限量小班）。',
  },
  {
    id: 'payment-2',
    category: 'payment',
    question: '這筆錢我怎麼算回來？你們會給我什麼成效證明？',
    answer:
      '第八段會帶你做一份「AI 導入成效報告」：像發文頻率、漏回覆率、報表花多久、缺料次數這些，導入前後直接對比；再算 ROI；最後還有一個行為改變 checklist，讓你拿得出證據給股東或合夥人看。',
  },
  {
    id: 'payment-3',
    category: 'payment',
    question: '如果我覺得不適合，退款怎麼算？什麼時候前可以退？',
    answer:
      '5/1 之前可以全額退；5/1 之後就不能退了，但可以轉讓名額。',
  },
  {
    id: 'payment-4',
    category: 'payment',
    question: '不能退款的話，能不能轉讓？流程麻不麻煩？',
    answer:
      '可以轉讓，你聯絡客服、把需要的資料補齊就能處理。我們不會讓你卡在行政流程那種鳥事上。',
  },
  {
    id: 'payment-5',
    category: 'payment',
    question: '公司要報帳，發票怎麼開？企業團報有沒有優惠？',
    answer:
      '可以開統一發票，正常報帳沒問題。企業如果要團報也有優惠，直接跟客服說你們人數跟需求就好。',
  },
];

// ==========================================
// 通用版 FAQ
// ==========================================

export const GENERAL_FAQ_CATEGORIES: FAQCategoryItem[] = [
  { id: 'about', label: '關於課程' },
  { id: 'accompany', label: '學習方式' },
  { id: 'payment', label: '費用與方案' },
];

export const GENERAL_FAQ_ITEMS: FAQItem[] = [
  // ========== Category 1: 關於課程（5 題）==========
  {
    id: 'general-about-1',
    category: 'about',
    question: '這個課程適合完全不會 AI 的人嗎？',
    answer:
      '完全適合！這門課就是專門設計給「從零開始」的人。不需要任何程式背景，只要會用電腦打字、上網，就能跟上。我們從最基礎的「怎麼跟 AI 對話」開始教，一步步帶你上手。',
  },
  {
    id: 'general-about-2',
    category: 'about',
    question: '課程內容會不會過時？AI 工具一直在更新怎麼辦？',
    answer:
      '我們每月都會新增 1 堂 AI 新課，追蹤最新的工具和應用場景。而且課程重點是教你「怎麼思考、怎麼使用 AI」這個核心能力，這個能力不會過時。工具可能換，但底層邏輯是一樣的。',
  },
  {
    id: 'general-about-3',
    category: 'about',
    question: '我工作很忙，有時間學嗎？',
    answer:
      '課程設計就是為了忙碌的人。每堂課約 30-60 分鐘，可以自己安排時間觀看。我們建議每週花 2-3 小時，依自己的節奏學習。而且每月都會新增課程，你可以持續學習最新的 AI 應用。',
  },
  {
    id: 'general-about-4',
    category: 'about',
    question: '學完之後，我能做到什麼？',
    answer:
      '你會學會：用 AI 寫文案、做圖片、分析資料、建立自動化流程、甚至做出自己的網站。每堂課都有具體產出，5 月開始會有 7 堂完整課程，之後每月再新增 1 堂。學完後你會有一整套可以用在工作和生活的 AI 技能，還有自己的作品集。',
  },
  {
    id: 'general-about-5',
    category: 'about',
    question: '這跟 YouTube 免費教學有什麼不同？',
    answer:
      '免費教學通常是零散的片段，容易學了這個忘了那個。我們的課程是完整的學習路徑，從入門到進階有明確的順序，每堂課都有實作產出，還有社群可以問問題。最重要的是，我們陪你「做出來」，不是只有「看懂」。',
  },

  // ========== Category 2: 學習方式（5 題）==========
  {
    id: 'general-accompany-1',
    category: 'accompany',
    question: '線上 Live Q&A 是什麼？錯過怎麼辦？',
    answer:
      '每月有 4 次線上 Live Q&A，你可以即時問問題、看別人的問題、聽講師解答。如果錯過，我們會有錄影可以回看。你也可以提前在 Discord 發問，講師會在 Live 時回答。',
  },
  {
    id: 'general-accompany-2',
    category: 'accompany',
    question: '我卡住的時候怎麼辦？有人可以問嗎？',
    answer:
      '有！我們有 Discord 學員社群，24/7 都可以發問。社群裡有其他學員可以互相幫忙，也有助教會回覆。通常問題在 24 小時內都能得到回應。',
  },
  {
    id: 'general-accompany-3',
    category: 'accompany',
    question: '課程可以重複觀看嗎？有期限嗎？',
    answer:
      '可以無限次觀看！在你購買的方案期限內，所有課程都可以重複看。比如你買了 5 個月的方案，這 5 個月內隨時都能回去複習任何一堂課。',
  },
  {
    id: 'general-accompany-4',
    category: 'accompany',
    question: '實體 AI 聚會是什麼？一定要參加嗎？',
    answer:
      '每 2 個月我們會在台北舉辦實體 AI 聚會，會員可以免費參加。聚會內容包括：分享最新 AI 應用、學員作品展示、認識其他學員。不強制參加，但很推薦來交流、建立人脈。',
  },
  {
    id: 'general-accompany-5',
    category: 'accompany',
    question: '我可以只看課程、不參加社群活動嗎？',
    answer:
      '當然可以！社群和活動都是額外的資源，不是必須的。你可以純粹當作線上課程來學，按照自己的節奏完成課程、產出作品。',
  },

  // ========== Category 3: 費用與方案（5 題）==========
  {
    id: 'general-payment-1',
    category: 'payment',
    question: '三個方案差在哪？我該選哪個？',
    answer:
      '所有方案內容完全相同，差別只在「學習時長」和「月均成本」。體驗方案（買 1 送 1，共 2 個月）月均 $1,200，適合先試試看；探索方案（買 2 送 3，共 5 個月）月均 $960，超值選擇；大師方案（買 4 送 8，共 12 個月）月均 $800，最划算、省最多，適合想長期學習的人。另有團體報名優惠，3 人以上可 LINE 諮詢。',
  },
  {
    id: 'general-payment-2',
    category: 'payment',
    question: '募資優惠之後還會有嗎？',
    answer:
      '募資優惠是限時的，2/28 23:59 截止後就會恢復原價。現在的「買 X 送 X」優惠是募資期間限定，之後不會再有同樣的折扣。想省錢的話，建議趁募資期間購買。',
  },
  {
    id: 'general-payment-3',
    category: 'payment',
    question: '可以開發票嗎？公司報帳怎麼處理？',
    answer:
      '可以開立統一發票，正常報帳沒問題。購買時填寫公司統編即可。如果是企業團報（多人一起買），另有優惠，請直接聯繫客服洽詢。',
  },
  {
    id: 'general-payment-4',
    category: 'payment',
    question: '買了之後可以退費嗎？',
    answer:
      '課程開放觀看前（5/1 之前）可以全額退費。5/1 開始觀看後就不能退費，但可以轉讓給其他人。轉讓流程很簡單，聯繫客服處理即可。',
  },
];
