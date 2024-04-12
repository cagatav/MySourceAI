import AIChat from "@/pages/AIChat";
import Settings from "@/pages/Settings";
import Sources from "@/pages/Sources";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main className="h-[5000px] relative">
      <div>
        <AIChat/>
        <Sources/>
        <Settings/>
      </div>
      <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
    </main>
    
  );
}

