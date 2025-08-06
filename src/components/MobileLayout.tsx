import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { 
  Phone, 
  History, 
  Clock, 
  Settings, 
  User
} from "lucide-react";

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileLayout = ({ children, activeTab, onTabChange }: MobileLayoutProps) => {
  const tabs = [
    { id: "dialer", icon: Phone, label: "Dialer" },
    { id: "history", icon: History, label: "History" },
    { id: "followups", icon: Clock, label: "Follow-ups" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Status Bar Spacer */}
      <div className="h-6 bg-gradient-to-r from-primary to-primary-glow" />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-3 shadow-medium">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dialing App</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm opacity-90">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-2 py-1 shadow-strong">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-all duration-200",
                  "min-w-0 flex-1 max-w-[4rem]",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    "mb-1 transition-transform duration-200",
                    isActive && "scale-110"
                  )} 
                />
                <span className="text-xs font-medium truncate w-full text-center">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;