import { useState } from "react";
import MobileLayout from "@/components/MobileLayout";
import DialPad from "@/components/dialer/DialPad";
import CallHistory from "@/components/history/CallHistory";
import FollowUps from "@/components/followups/FollowUps";
import Profile from "@/components/profile/Profile";
import Settings from "@/components/settings/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dialer");
  const [isInCall, setIsInCall] = useState(false);

  const handleCall = (number: string) => {
    console.log("Initiating call to:", number);
    setIsInCall(true);
    // In a real app, this would use Capacitor to make an actual call
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dialer":
        return (
          <DialPad 
            onCall={handleCall}
            onEndCall={handleEndCall}
            isInCall={isInCall}
          />
        );
      case "history":
        return <CallHistory />;
      case "followups":
        return <FollowUps />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <DialPad onCall={handleCall} onEndCall={handleEndCall} isInCall={isInCall} />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MobileLayout>
  );
};

export default Index;
