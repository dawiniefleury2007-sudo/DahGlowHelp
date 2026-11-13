import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useHelp} from '@/hooks/useHelp';
export function useSEO(title:string,description:string,privatePage=false){const {lang}=useHelp();const {pathname}=useLocation();useEffect(()=>{document.title=`${title} | D’Ah Glow`;document.documentElement.lang=lang;
 const meta=(name:string,content:string,property=false)=>{const key=property?'property':'name';let el=document.head.querySelector(`meta[${key}="${name}"]`);if(!el){el=document.createElement('meta');el.setAttribute(key,name);document.head.appendChild(el)}el.setAttribute('content',content)};
 meta('description',description);meta('robots',privatePage?'noindex, nofollow, noarchive':'index, follow');meta('og:title',title,true);meta('og:description',description,true);meta('og:url',`https://help.dahglow.com${pathname}`,true);meta('og:locale',lang==='en'?'en_US':lang==='es'?'es_ES':'fr_FR',true);meta('twitter:title',title);meta('twitter:description',description);
 let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.setAttribute('rel','canonical');document.head.appendChild(canonical)}canonical.setAttribute('href',`https://help.dahglow.com${pathname}`);
 document.querySelectorAll('link[data-glow-language]').forEach(x=>x.remove());if(!privatePage)['en','es','fr'].forEach(l=>{const el=document.createElement('link');el.rel='alternate';el.hreflang=l;el.href=`https://help.dahglow.com${pathname.replace(/^\/(en|es|fr)/,'/'+l)}`;el.dataset.glowLanguage='true';document.head.appendChild(el)});
 },[title,description,lang,pathname,privatePage]);}
