import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,Package,MessagesSquare,ShieldCheck} from 'lucide-react';
import {useHelp} from '@/hooks/useHelp';
import {useSEO} from '@/hooks/useSEO';
import SearchBar from '@/components/features/SearchBar';
import CategoryCard from '@/components/features/CategoryCard';
import ArticleList from '@/components/features/ArticleList';
import hero from '@/assets/help-hero.webp';
import {STORE_URL} from '@/constants/content';

const COPY = {
 en:{official:'Your D’Ah Glow support guide',tracking:'Find tracking instructions and open the official store for private order details.',store:'Open official store',availability:'Support availability needs owner confirmation.',preview:'The assistant currently finds help articles in a local preview. Live AI and human delivery are not connected.'},
 es:{official:'Tu guía de soporte D’Ah Glow',tracking:'Consulta las instrucciones de seguimiento y abre la tienda oficial para ver los datos privados de tu pedido.',store:'Abrir la tienda oficial',availability:'La disponibilidad del soporte requiere confirmación del propietario.',preview:'El asistente encuentra artículos en una vista previa local. La IA y la atención humana en directo no están conectadas.'},
 fr:{official:'Votre guide d’assistance D’Ah Glow',tracking:'Consultez les instructions de suivi et ouvrez la boutique officielle pour accéder aux détails privés de votre commande.',store:'Ouvrir la boutique officielle',availability:'La disponibilité du support doit être confirmée par le propriétaire.',preview:'L’assistant recherche des articles dans un aperçu local. L’IA et les échanges humains en direct ne sont pas connectés.'}
};

export default function Home(){
 const {data,lang,t,categoryName,setChatOpen}=useHelp();
 useSEO(t.home,t.subtitle);
 const copy=COPY[lang];
 const categories=data.categories.filter(c=>c.published).sort((a,b)=>a.order-b.order);
 const articles=data.articles.filter(a=>a.published&&categories.some(c=>c.id===a.categoryId));
 const featured=articles.filter(a=>a.featured);
 return <div className="mx-auto max-w-[1440px] space-y-12 slide-in">
  <section className="glass relative isolate rounded-3xl px-6 py-10 md:px-10 md:py-14 xl:px-12">
   <img src={hero} alt="" aria-hidden="true" className="hero-image pointer-events-none absolute inset-0 -z-10 h-full w-full rounded-3xl object-cover" fetchPriority="high"/>
   <div className="relative max-w-[740px]">
    <p className="eyebrow mb-5 flex items-center gap-2"><ShieldCheck size={16}/>{copy.official}</p>
    <h1 className="whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight md:text-5xl xl:text-6xl">{t.title}</h1>
    <p className="mb-7 mt-5 max-w-xl text-base text-subtle">{t.subtitle}</p>
    <SearchBar large/>
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"><span className="text-subtle">{t.popular}:</span>{categories.slice(0,3).map(c=><Link key={c.id} className="inline-flex min-h-11 items-center text-primary underline decoration-primary/30 underline-offset-4" to={`/${lang}/search?q=${encodeURIComponent(c.name)}`}>{categoryName(c)}</Link>)}</div>
   </div>
  </section>
  <section aria-labelledby="help-topics"><div className="mb-6"><p className="eyebrow mb-2">{t.browse}</p><h2 id="help-topics" className="section-title">{t.topics}</h2><p className="mt-2 text-base text-subtle">{t.topicsSub}</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{categories.map(category=><CategoryCard key={category.id} category={category}/>)}</div>{!categories.length&&<p className="glass p-6 text-subtle">{t.supportSub}</p>}</section>
  <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
   <section aria-labelledby="help-articles"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h2 id="help-articles" className="section-title">{t.articles}</h2><p className="mt-2 text-base text-subtle">{t.articleSub}</p></div><Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary" to={`/${lang}/search`}>{t.all}<ArrowRight size={16}/></Link></div><ArticleList articles={(featured.length?featured:articles).slice(0,5)}/></section>
   <aside className="glass p-7"><span className="icon-tile mb-5 bg-sage"><Package size={24} strokeWidth={1.65}/></span><h2 className="section-title">{t.orders}</h2><p className="mt-3 text-base text-subtle">{copy.tracking}</p><a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 w-full">{copy.store}<ArrowUpRight size={16}/></a><Link to={`/${lang}/category/orders`} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-primary">{t.read}<ArrowRight size={16}/></Link></aside>
  </div>
  <section className="glass flex flex-col justify-between gap-8 p-7 md:p-10 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="eyebrow mb-3">{t.welcome}</p><h2 className="section-title">{t.support}</h2><p className="mt-3 text-base text-subtle">{t.supportSub}</p><p className="mt-3 text-sm text-subtle">{copy.availability}</p></div><div className="flex shrink-0 flex-col gap-3"><Link className="btn-secondary" to={`/${lang}/contact`}>{t.contact}<ArrowRight size={16}/></Link>{data.settings.aiEnabled&&<button type="button" className="btn-secondary" onClick={()=>setChatOpen(true)}><MessagesSquare size={18}/>{t.chat}</button>}</div></section>
  {data.settings.aiEnabled&&<p className="text-sm text-subtle">{copy.preview}</p>}
 </div>;
}
