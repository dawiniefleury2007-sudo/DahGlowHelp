export type Language = 'en'|'es'|'fr';
export interface Category { id:string; name:string; description:string; icon:string; tone:string; published:boolean; order:number; }
export interface Article { id:string; categoryId:string; title:string; excerpt:string; body:string; published:boolean; featured:boolean; tags:string; seoTitle:string; seoDescription:string; updatedAt:string; translations:Partial<Record<Language,{title:string;body:string;approved:boolean}>>; }
export interface FAQ { id:string; categoryId:string; question:string; answer:string; published:boolean; featured:boolean; }
export interface Message { id:string; role:'customer'|'assistant'|'agent'|'note'; text:string; createdAt:string; }
export interface SupportRequest { id:string; name:string; email:string; order:string; category:string; subject:string; message:string; status:string; createdAt:string; messages:Message[]; assignedTo:string; }
export interface AnalyticsEvent { id:string; type:'view'|'search'|'feedback'|'chat'|'handoff'; label:string; value?:number; createdAt:string; }
export interface SiteSettings { name:string; greeting:string; aiName:string; aiEnabled:boolean; contactUrl:string; hours:string; logo:string; verification:string; maintenance:boolean; }
export interface HelpData { categories:Category[]; articles:Article[]; faqs:FAQ[]; requests:SupportRequest[]; events:AnalyticsEvent[]; settings:SiteSettings; }
