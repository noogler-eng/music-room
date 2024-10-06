import Link from "next/link";

export default function BottomBar(){
    return <div className="relative bottom-0 text-black bg-white/30 bg-blur-md">
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 p-4">
                <p className="font-semibold underline">contacts</p>
                <div className="flex flex-col gap-1">
                    <Link href='/github'>github</Link>
                    <Link href='https://www.linkedin.com/in/sharad-poddar-895985283/'>linkedin</Link>
                    <Link href='https://x.com/SharadPoddar11'>twitter</Link>
                    <Link href='mailto:sharadpoddar1001@gmail.com'>mail</Link>
                </div>
            </div>
            <div className="p-4">
                <p className="text-2xl">soon available on <span className="font-semibold">playstore!</span> and <span className="font-semibold">ios!</span></p>
                <p className="flex flex-col text-center">for any query, feel free to mail at: <a href="mailto:poddarsharad460@gmail.com" className="underline">poddarsharad460@gmail.com</a></p>
            </div>
        </div>
        <p className="text-center text-sm w-full bg-black text-white font-semibold">made by ❤️ by sharad</p>
    </div>
}