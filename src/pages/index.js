import AIChat from "@/pages/AIChat";
import Settings from "@/pages/Settings";
import Sources from "@/pages/Sources";

export default function Home() {
  return (
    <main className="h-[5000px] relative">
      <div>
        <AIChat/>
        <Sources/>
        <Settings/>
      </div>
    </main>
  );
}
