import {Link} from 'react-router-dom';
import {FileText,ChevronRight} from 'lucide-react';
import {useHelp} from '@/hooks/useHelp';
import type {Article} from '@/types/help';
interface Props {articles:Article[];}
export default function ArticleList({articles}:Props){const {lang,data}=useHelp();return <div className="glass divide-y divide-border/60 overflow-hidden">{articles.map(a=><Link key={a.id} to={`/${lang}/article/${a.id}`} className="flex items-center gap-4 px-5 py-5 hover:bg-surface/50 md:px-6"><span className="rounded-xl bg-background p-3 text-subtle"><FileText size={18} strokeWidth={1.5}/></span><div className="flex-1"><h3 className="text-sm font-semibold">{a.translations[lang]?.approved?a.translations[lang]?.title:a.title}</h3><p className="mt-1 text-[11px] text-subtle">{data.categories.find(c=>c.id===a.categoryId)?.name} <span className="mx-1">·</span> {Math.max(1,Math.ceil(a.body.split(' ').length/180))} min read</p></div><ChevronRight size={16} className="text-subtle"/></Link>)}{!articles.length&&<p className="p-8 text-sm text-subtle">No published articles in this topic yet.</p>}</div>;}
