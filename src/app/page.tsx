'use client'
import { AudioLines } from 'lucide-react';
import { Podcast } from 'lucide-react';
import { Users } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Accordian from './components/Accordian';


export default function Home() {

  const { data: session, status } = useSession()
  const navigate = useRouter();

  return <div className='flex flex-col items-center jsutify-center w-full pt-32 min-h-screen'>
    <h2 className='text-5xl font-extrabold'>Lets the beats going on!</h2>
    <p className='text-center w-8/12'>
      this is an streaming application in which fans can come on this stream
      and listen thier favourite songs.
    </p>
    <div className='flex items-center justify-between p-12'>
      <div className='flex flex-col items-center jsutify-center w-3/12 bg-white/30 backdrop-blur-md z-20 p-8 rounded-lg'>
        <AudioLines size={78}/>  
        <p className='text-center'>connected with youtube,top quality music</p>
      </div>
      <div className='flex flex-col items-center jsutify-center w-3/12 bg-white/30 backdrop-blur-md z-20 p-8 rounded-lg'>
        <Podcast size={78}/>
        <p className='text-center'>this is live stream so anyone can music in it</p>
      </div>
      <div className='flex flex-col items-center jsutify-center w-3/12 bg-white/30 backdrop-blur-md z-20 p-8 rounded-lg'>
        <Users size={78}/>
        <p className='text-center'>trusted by millions of active listeners</p>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center gap-4'>
    <button
        onClick={()=>status == "authenticated" ? signOut(): signIn("google")}
        className="flex items-center justify-center px-6 py-3 text-white bg-primary rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 bg-black">
        <span className="mr-2">
          { status == "authenticated" ? (
            <LogOut className="w-5 h-5" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
        </span>
        <span className="font-semibold">
          { status == "authenticated" ? 'Logout' : 'Login'}
        </span>
      </button>
      { status == "authenticated" ? <button
        onClick={()=>navigate.push("/dashboard")}
        className="flex items-center justify-center px-6 py-3 text-white bg-primary rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 bg-black">
        <span className="mr-2"><AudioLines/></span>
        <span className="font-semibold">go to streaming board</span>
      </button>: null }
    </div>
    <div className='my-12'>
      <Accordian/>
    </div>
  </div>
}