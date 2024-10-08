import AIChat from "@/pages/AIChat";
import Settings from "@/pages/Settings";
import Sources from "@/pages/Sources";
import { BasePromptProvider } from './api/BasePromptContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function index() {
  return (

    <BasePromptProvider>
    <title>MySourceAI</title>
      <main className="relative">
        <div className="min-h-screen">
          <AIChat/>
        </div>
        <div className="min-h-screen">
          <Sources/>
        </div>
        <div className="min-h-screen">
          <Settings/>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </main>
    </BasePromptProvider>
  );
}
