import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import type {Category} from '@/types/help';
import {useHelp} from '@/hooks/useHelp';
import TopicIcon from '@/components/features/TopicIcon';
import {cn} from '@/lib/utils';
interface Props {category:Category;}
export default function CategoryCard({category:c}:Props){const {data,lang,categoryName}=useHelp();const count=data.articles.filter(a=>a.categoryId===c.id&&a.published).length;return <Link to={`/${lang}/category/${c.id}`} className="glass hover-card group flex flex-col p-6"><div className="mb-5 flex items-start justify-between"><span className={cn('icon-tile text-foreground',c.tone==='rose'?'bg-rose':c.tone==='sage'?'bg-sage':'bg-lavender')}><TopicIcon name={c.icon}/></span><ArrowUpRight size={17} className="text-subtle opacity-60"/></div><h3 className="text-base font-semibold tracking-tight">{categoryName(c)}</h3><p className="mt-2 flex-1 text-[13px] leading-relaxed text-subtle">{c.description}</p><span className="mt-5 text-[11px] font-medium text-subtle">{count} {lang==='es'?'artículos':lang==='fr'?'articles':'articles'} <span className="mx-1.5 text-border">·</span> {lang==='en'?'Explore topic':lang==='es'?'Explorar':'Explorer'} →</span></Link>;}
