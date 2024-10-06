'use client'
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

export default function Navbar(){

    const { data: session, status } = useSession()

    const getShortName = (name: string)=>{
        const nameArray = name.split(" ");
        let firstLetterName: string="";
        nameArray.forEach((n)=>{
            firstLetterName += n[0]
        })
        return firstLetterName;
    }

    return <div className="flex justify-between items-center py-4 px-6 fixed top-0 w-full bg-white/30 backdrop-blur-md z-50">
        <div>
            <h1 className="text-3xl font-extrabold">Music-Room</h1>
        </div>
        <div className="flex gap-2 items-center">
            {status == "authenticated" ? <Image src={session.user?.image || ""} alt={getShortName(session.user?.name || " ")}  width={40} height={40} className="rounded-full"/>: null }
            {status == "unauthenticated" ? <button onClick={()=>signIn("google")} className="border-2 font-extrabold rounded-xl bg-transparent px-2 text-sm">signin</button>: <button onClick={()=>signOut()} className="border-2 font-extrabold rounded-xl bg-transparent px-2 text-sm">signout</button>}
        </div>
    </div>
}