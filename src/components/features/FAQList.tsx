import {ChevronDown} from 'lucide-react';
import type {FAQ} from '@/types/help';
interface Props {faqs:FAQ[];}
export default function FAQList({faqs}:Props){return <div className="glass divide-y divide-border overflow-hidden">{faqs.map(f=><details key={f.id} className="group px-6 py-2"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold">{f.question}<ChevronDown size={17} className="shrink-0 group-open:rotate-180"/></summary><p className="pb-5 text-sm text-subtle leading-loose">{f.answer}</p></details>)}</div>;}
