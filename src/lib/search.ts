import type {HelpData} from '@/types/help';
export interface SearchResult {id:string;title:string;description:string;category:string;kind:'article'|'category'|'faq';score:number;}
function distance(a:string,b:string){const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}return row[b.length]}
export function searchHelp(data:HelpData,query:string):SearchResult[]{const normalized=query.toLowerCase().trim();const aliases:Record<string,string>={package:'shipping',refund:'return',arrived:'delivery',declined:'payment',password:'account',sizing:'size',cancel:'order'};const terms=normalized.split(/\s+/).filter(x=>x.length>2).flatMap(x=>[x,aliases[x]||x]);
 const score=(title:string,body:string)=>terms.reduce((sum,t)=>sum+(title.toLowerCase().includes(t)?5:body.toLowerCase().includes(t)?1:t.length>4&&title.toLowerCase().split(/\W+/).some(w=>distance(w,t)<=1)?2:0),0);
 const articles=data.articles.filter(a=>a.published).map(a=>({id:a.id,title:a.title,description:a.excerpt,category:a.categoryId,kind:'article' as const,score:score(a.title,a.body)}));
 const cats=data.categories.filter(c=>c.published).map(c=>({id:c.id,title:c.name,description:c.description,category:c.id,kind:'category' as const,score:score(c.name,c.description)}));
 const faqs=data.faqs.filter(f=>f.published).map(f=>({id:f.id,title:f.question,description:f.answer,category:f.categoryId,kind:'faq' as const,score:score(f.question,f.answer)}));
 return normalized?[...articles,...cats,...faqs].filter(r=>r.score>0).sort((a,b)=>b.score-a.score):articles.filter(a=>data.articles.find(x=>x.id===a.id)?.featured);
}
