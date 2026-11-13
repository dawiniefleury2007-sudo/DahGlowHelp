import monogram from '@/assets/dw-logo.webp';
import {useHelp} from '@/hooks/useHelp';
interface Props {compact?:boolean;}
export default function Logo({compact=false}:Props){const {data}=useHelp();return <div className="flex items-center gap-3"><img src={data.settings.logo||monogram} alt="DW — D’Ah Glow" className="h-11 w-11 rounded-xl object-cover"/>{!compact&&<div><span className="font-display font-bold text-lg tracking-tight">D’Ah Glow<span className="text-primary">.</span></span><span className="block text-[10px] uppercase tracking-[.2em] text-subtle">Help Center</span></div>}</div>;}
