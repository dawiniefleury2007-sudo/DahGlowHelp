import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, Package, ShieldCheck } from 'lucide-react';
import { useHelp } from '@/hooks/useHelp';
import { useSEO } from '@/hooks/useSEO';
import SearchBar from '@/components/features/SearchBar';
import CategoryCard from '@/components/features/CategoryCard';
import ArticleList from '@/components/features/ArticleList';
import hero from '@/assets/help-hero.webp';
import { STORE_URL } from '@/constants/content';

export default function Home() {
  const { data, lang, t, categoryName, setChatOpen } = useHelp();
  useSEO(t.home, t.subtitle);
  const categories = data.categories.filter(c => c.published).sort((a, b) => a.order - b.order);
  const published = data.articles.filter(a => a.published);
  const featured = published.filter(a => a.featured);
  const articles = (featured.length ? featured : published).slice(0, 5);
  const suggestions = categories.filter(c => ['orders', 'shipping', 'returns'].includes(c.id));
  const availability = lang === 'es' ? 'Horario de atención pendiente de confirmación.' : lang === 'fr' ? 'Horaires du support en attente de confirmation.' : 'Support hours await owner confirmation.';
  const preview = lang === 'es' ? 'Vista previa: los artículos y las conversaciones se guardan solo en este navegador. Para recibir asistencia real, visita la tienda oficial.' : lang === 'fr' ? 'Aperçu : les articles et les conversations sont enregistrés uniquement dans ce navigateur. Pour une assistance réelle, consultez la boutique officielle.' : 'Preview: articles and conversations are stored in this browser only. For actual support, visit the official storefront.';

  return <div className="mx-auto max-w-[1160px] slide-in">
    <section className="glass relative mb-12 isolate px-6 py-10 md:px-10 md:py-14" aria-labelledby="home-title">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl" aria-hidden="true">
        <img src={hero} alt="" fetchPriority="high" className="hero-image h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
      </div>
      <p className="eyebrow mb-4">D’Ah Glow · {t.home}</p>
      <p className="mb-3 text-base font-medium text-primary">{t.welcome}</p>
      <h1 id="home-title" className="mb-5 whitespace-pre-line text-4xl font-semibold tracking-tight md:text-5xl">{t.title}</h1>
      <p className="mb-8 max-w-xl text-base text-subtle">{t.subtitle}</p>
      <SearchBar large />
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-subtle">{t.popular}:</span>
        {suggestions.map(c => <Link key={c.id} to={`/${lang}/category/${c.id}`} className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline">{categoryName(c)}</Link>)}
      </div>
    </section>
    <section className="mb-12" aria-labelledby="topics-title">
      <h2 id="topics-title" className="section-title">{t.topics}</h2>
      <p className="mb-6 mt-2 text-subtle">{t.topicsSub}</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{categories.map(category => <CategoryCard key={category.id} category={category} />)}</div>
    </section>
    <div className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section aria-labelledby="articles-title"><h2 id="articles-title" className="section-title">{t.articles}</h2><p className="mb-6 mt-2 text-subtle">{t.articleSub}</p><ArticleList articles={articles} /><Link to={`/${lang}/search`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">{t.all}<ArrowUpRight size={16} /></Link></section>
      <aside className="glass h-fit p-6"><span className="icon-tile mb-5 bg-sage"><Package size={24} strokeWidth={1.5} /></span><h2 className="text-xl font-semibold">{t.orders}</h2><p className="mt-3 text-base text-subtle">{categories.find(c => c.id === 'orders')?.description}</p><a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-5 w-full">{t.store}<ArrowUpRight size={16} /></a><p className="mt-4 flex items-center gap-2 text-sm text-subtle"><ShieldCheck size={18} className="shrink-0" />Shopify Customer Account</p></aside>
    </div>
    <section className="glass mb-8 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8" aria-labelledby="support-title">
      <div className="max-w-xl"><h2 id="support-title" className="section-title">{t.support}</h2><p className="mt-2 text-subtle">{t.supportSub}</p><p className="mt-3 text-sm text-subtle">{availability}</p></div>
      <div className="flex shrink-0 flex-col gap-3"><Link className="btn-secondary" to={`/${lang}/contact`}>{t.contact}<ArrowUpRight size={16} /></Link><button type="button" className="btn-secondary" onClick={() => setChatOpen(true)}><MessageCircle size={18} strokeWidth={1.5} />{t.chat}</button></div>
    </section>
    <p className="mb-8 text-sm text-subtle">{preview}</p>
  </div>;
}
