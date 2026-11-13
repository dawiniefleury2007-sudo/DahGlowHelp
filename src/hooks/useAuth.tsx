import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {User} from '@supabase/supabase-js';
import {supabase} from '@/lib/api';
import {toast} from 'sonner';
interface AuthValue {user:User|null;role:string|null;loading:boolean;logout:()=>Promise<void>;signIn:(email:string,password:string)=>Promise<string|null>;sendOtp:(email:string)=>Promise<string|null>;verifyOtp:(email:string,code:string)=>Promise<string|null>;}
const Context=createContext<AuthValue|null>(null);
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [role,setRole]=useState<string|null>(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{let mounted=true;let version=0;const apply=async(u:User|null)=>{const current=++version;if(mounted){setUser(u);setRole(null)}if(!u){if(mounted)setLoading(false);return}const {data,error}=await supabase.rpc('help_claim_owner');if(mounted&&current===version){if(error)toast.error('Unable to verify administration permissions.');setRole(error?null:data as string|null);setLoading(false)}};
 supabase.auth.getSession().then(({data,error})=>{if(error)toast.error('Unable to restore your session.');if(mounted){void apply(data.session?.user||null);setLoading(false)}});
 const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{if(mounted){setLoading(false);setTimeout(()=>{if(mounted)void apply(session?.user||null)},0)}});
 return()=>{mounted=false;subscription.unsubscribe()};},[]);
 const logout=async()=>{const {error}=await supabase.auth.signOut();if(error){toast.error(error.message);return}setUser(null);setRole(null)};
 const signIn=async(email:string,password:string)=>{const {error}=await supabase.auth.signInWithPassword({email,password});return error?.message||null};
 const sendOtp=async(email:string)=>{const {error}=await supabase.auth.signInWithOtp({email,options:{shouldCreateUser:true}});return error?.message||null};
 const verifyOtp=async(email:string,token:string)=>{const {error}=await supabase.auth.verifyOtp({email,token,type:'email'});return error?.message||null};
 return <Context.Provider value={{user,role,loading,logout,signIn,sendOtp,verifyOtp}}>{children}</Context.Provider>;
}
export function useAuth(){const ctx=useContext(Context);if(!ctx)throw new Error('AuthProvider required');return ctx;}
