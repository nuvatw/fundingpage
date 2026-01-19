// 難度等級
export type DifficultyLevel = '入門' | '基礎' | '進階' | '專案' | '系統';

// 課程階段類型
export type StageType = '基礎階段' | '進階階段' | '專業階段' | '成果階段';

// General 課程階段類型（AI 自學者學習路徑）
export type GeneralStageType = '入門階段' | '應用階段' | '進階階段';

// 課程時程表項目（可收合 Accordion）
export interface CurriculumItem {
  level: number;
  stage: StageType;
  name: string;           // AI 小幫手名字
  title: string;          // 課程標題
  subtitle: string;       // 副標題
  description: string;    // 課程描述
  dateRange: string;      // 建議學習日期 "7/1 - 7/10"
  highlights: string[];   // 學習重點（列表）
  tools: string;          // 使用工具
  isPresentation?: boolean; // 是否為成果發表（Lv8 特殊標記）
  videoUrl?: string;        // YouTube 影片 URL（可選）
  videoTitle?: string;      // 影片標題（可選，用於無障礙）
}

// General 課程時程表項目（AI 自學者）
export interface GeneralCurriculumItem {
  level: number;
  stage: GeneralStageType;
  title: string;          // 課程標題
  subtitle: string;       // 副標題
  description: string;    // 課程描述
  dateRange: string;      // 建議學習日期
  highlights: string[];   // 學習重點（列表）
  tools: string;          // 使用工具
  deliverable: string;    // 產出成果
}

// 課程等級（7 級直式 Timeline）
export interface CourseLevel {
  level: number;
  difficulty: DifficultyLevel;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  resultPromise: string;
  highlights: string[];
  suitableFor: string;
  previewImages?: string[];
  previewVideoUrl?: string;
}

// AI 小幫手（7 階段卡片）
export interface AIHelper {
  level: number;
  difficulty: DifficultyLevel;
  name: string;           // Luna, Momo, Navi, etc.
  role: string;           // "AI 社群文案小編"
  problem: string;        // 餐廳問題
  canHelp: string[];      // 小幫手可以幫你 (2-3 bullets)
  youWillStart: string[]; // 你會開始 (3 bullets)
  tools: string;          // "Perplexity / ChatGPT"
}

// FAQ 分類
export type FAQCategory = 'about' | 'accompany' | 'payment';

// FAQ 分類項目
export interface FAQCategoryItem {
  id: FAQCategory;
  label: string;
}

// FAQ
export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

// 導覽項目
export interface NavItem {
  id: string;
  label: string;
  mobileHidden?: boolean;
}

// 課程配置
export interface CourseConfig {
  seasonStart: string;
  seasonEnd: string;
  presentationDate: string;
  installmentDates: {
    first: string;
    second: string;
    third: string;
  };
}

// 方案功能項目
export interface PlanFeature {
  icon: string;
  text: string;
  highlight?: boolean;
}

// 方案 Badge 類型
export type PlanBadgeVariant = 'popular' | 'limited';

// 課程方案
export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;           // 價格旁的小字（如「/ 90 天」）
  badge?: string;               // 保留向後相容
  badgeVariant?: PlanBadgeVariant;
  highlight: string;
  suitableFor: string;          // hover 時顯示的「適合...」文案
  features: PlanFeature[];
  ctaLink: string;
  icon?: string;                // 方案 icon
}

// ==========================================
// V2 Plan Types - Feature Matrix Approach
// ==========================================

// Feature category identifiers
export type FeatureCategory =
  | 'content'      // A. 課程內容與觀看權限
  | 'resources'    // B. 學習資源
  | 'community'    // C. 互動與社群
  | 'accompany'    // D. 陪跑與落地導入
  | 'premium'      // E. 高階顧問 / 策略 / 成果
  | 'events';      // F. 實體活動（General 專用）

// Feature category metadata
export interface FeatureCategoryInfo {
  id: FeatureCategory;
  label: string;
  order: number;
}

// Individual feature in the catalog
export interface PlanFeatureDefinition {
  id: string;
  categoryId: FeatureCategory;
  text: string;
  icon: string;
}

// ==========================================
// Feature Cell Value Types (for comparison matrix)
// ==========================================

// Cell 的三種值類型
export type FeatureCellValue =
  | { type: 'boolean'; enabled: boolean }   // 勾/叉
  | { type: 'value'; text: string }         // 數量文字，如 "1 次/週"
  | { type: 'callout'; text: string };      // 特殊文字，如 "洽詢"

// 功能矩陣：featureId -> CellValue
export interface PlanFeatureMatrix {
  [featureId: string]: FeatureCellValue;
}

// V2 Plan interface with feature matrix
export interface PlanV2 {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  badge?: string;
  badgeVariant?: PlanBadgeVariant;
  suitableFor: string;
  featureMatrix: PlanFeatureMatrix;
  ctaLink: string;
  ctaText?: string;
  icon?: string;
  isRecommended?: boolean;
}

// Re-export fundraising types
export * from './fundraising';

// Re-export admin types
export * from './admin';
