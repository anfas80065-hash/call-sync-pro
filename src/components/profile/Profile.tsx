import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, BarChart3 } from "lucide-react";

const Profile = () => {
  const userStats = {
    totalCalls: 1247,
    callDuration: "45h 23m",
    followUps: 23,
    recordings: 156
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
            JD
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mb-1">John Doe</h2>
        <p className="text-muted-foreground mb-3">Sales Representative</p>
        <Badge variant="outline" className="mb-4">Employee</Badge>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <Mail size={16} className="text-muted-foreground" />
            <span>john.doe@company.com</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Phone size={16} className="text-muted-foreground" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <BarChart3 size={24} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold">{userStats.totalCalls}</p>
          <p className="text-xs text-muted-foreground">Total Calls</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Calendar size={24} className="mx-auto text-success mb-2" />
          <p className="text-2xl font-bold">{userStats.callDuration}</p>
          <p className="text-xs text-muted-foreground">Call Time</p>
        </Card>
      </div>
    </div>
  );
};

export default Profile;