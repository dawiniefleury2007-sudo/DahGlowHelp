import {useState} from 'react';
import {Outlet,useParams,Navigate} from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/ChatWidget';
import {cn} from '@/lib/utils';
import {useHelp} from '@/hooks/useHelp';
export default function PublicLayout(){const [collapsed,setCollapsed]=useState(false);const [mobile,setMobile]=useState(false);const {lang}=useParams();const {data}=useHelp();if(!['en','es','fr'].includes(lang||''))return <Navigate to="/en" replace/>;return <div className="app-bg min-h-screen"><Sidebar collapsed={collapsed} toggle={()=>setCollapsed(!collapsed)} mobile={mobile} closeMobile={()=>setMobile(false)}/><div className={cn('min-h-screen',collapsed?'lg:ml-[88px]':'lg:ml-[248px]')}><Header openMenu={()=>setMobile(true)}/>{data.settings.maintenance&&<div className="bg-rose p-4 text-center text-sm">Help content is under review. For assistance, visit the official store.</div>}<main className="px-5 pb-2 pt-8 md:px-10 xl:px-12"><Outlet/></main><Footer/></div><ChatWidget/></div>;}
