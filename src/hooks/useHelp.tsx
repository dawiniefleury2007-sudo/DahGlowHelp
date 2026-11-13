import { createContext,useContext,useState,useCallback,useMemo,type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { INITIAL_DATA } from '@/constants/content';
import { LABELS,CATEGORY_NAMES } from '@/constants/languages';
import type { HelpData,AnalyticsEvent,Language,Category } from '@/types/help';
interface HelpContextValue {data:HelpData;update:(fn:(d:HelpData)=>HelpData)=>void;track:(type:AnalyticsEvent['type'],label:string,value?:number)=>void;lang:Language;t:typeof LABELS.en;categoryName:(c:Category)=>string;chatOpen:boolean;setChatOpen:(value:boolean)=>void;dark:boolean;setDark:(value:boolean)=>void;}
const Context=createContext<HelpContextValue|null>(null);
const KEY='dahglow-help-preview-v1';
export function HelpProvider({children}:{children:ReactNode}){
 const [data,setData]=useState<HelpData>(()=>{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw) as HelpData:INITIAL_DATA});
 const [chatOpen,setChatOpen]=useState(false);const [dark,setDarkState]=useState(localStorage.getItem('glow-theme')==='dark');
 const path=useLocation().pathname;const lang=(path.split('/').find(x=>['en','es','fr'].includes(x))||'en') as Language;
 const update=useCallback((fn:(d:HelpData)=>HelpData)=>{setData(d=>{const next=fn(d);localStorage.setItem(KEY,JSON.stringify(next));return next})},[]);
 const track=useCallback((type:AnalyticsEvent['type'],label:string,value?:number)=>update(d=>({...d,events:[...d.events,{id:crypto.randomUUID(),type,label,value,createdAt:new Date().toISOString()}].slice(-3000)})),[update]);
 const setDark=useCallback((v:boolean)=>{setDarkState(v);localStorage.setItem('glow-theme',v?'dark':'light');document.documentElement.classList.toggle('dark',v)},[]);
 document.documentElement.classList.toggle('dark',dark);
 const value=useMemo(()=>({data,update,track,lang,t:LABELS[lang],categoryName:(c:Category)=>CATEGORY_NAMES[lang][c.order]||c.name,chatOpen,setChatOpen,dark,setDark}),[data,update,track,lang,chatOpen,dark,setDark]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useHelp(){const context=useContext(Context);if(!context)throw new Error('HelpProvider is required');return context;}
