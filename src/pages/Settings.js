import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Settings() {
    return (
        <div>
            <div className="text-transparent mt-[1200px]" id="settings">Settings</div>
                <h1 className="bg-gradient-to-t from-slate-100 to-slate-300 text-transparent bg-clip-text text-center pt-10 font-semibold text-3xl select-none mt-[100px]">Settings</h1>
        </div>
    );
}
