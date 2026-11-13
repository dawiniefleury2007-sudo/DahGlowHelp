import {Package,Truck,RotateCcw,CreditCard,Sparkles,ShieldCheck,Gift,Mail,MessagesSquare,type LucideIcon} from 'lucide-react';
interface Props {name:string;size?:number;className?:string;}
const ICONS:Record<string,LucideIcon>={Package,Truck,RotateCcw,CreditCard,Sparkles,ShieldCheck,Gift,Mail,MessagesSquare};
export default function TopicIcon({name,size=22,className}:Props){const Icon=ICONS[name]||Sparkles;return <Icon size={size} strokeWidth={1.65} className={className}/>;}
