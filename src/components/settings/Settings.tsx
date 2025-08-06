import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Wifi,
  Mic,
  Phone,
  Bell,
  Shield,
  Cloud,
  Smartphone,
  HardDrive,
  RefreshCw,
  LogOut,
  Info,
  Settings as SettingsIcon,
  CheckCircle,
  AlertTriangle,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PermissionStatus {
  name: string;
  icon: any;
  status: "granted" | "denied" | "unknown";
  description: string;
}

const Settings = () => {
  const [settings, setSettings] = useState({
    wifiOnlyUploads: true,
    autoCallRecording: true,
    notifications: true,
    hapticFeedback: true,
    autoSync: true
  });

  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());

  // Mock permission status
  const permissions: PermissionStatus[] = [
    {
      name: "Phone",
      icon: Phone,
      status: "granted",
      description: "Required to make calls"
    },
    {
      name: "Microphone",
      icon: Mic,
      status: "granted", 
      description: "Required for call recording"
    },
    {
      name: "Storage",
      icon: HardDrive,
      status: "granted",
      description: "Required to save recordings"
    },
    {
      name: "Notifications",
      icon: Bell,
      status: "granted",
      description: "For follow-up reminders"
    }
  ];

  const storageInfo = {
    used: "2.4 GB",
    total: "10 GB",
    percentage: 24,
    recordings: 156,
    pendingUploads: 3
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSync = () => {
    setLastSync(new Date());
    // Simulate sync process
  };

  const getPermissionIcon = (status: string) => {
    switch (status) {
      case "granted":
        return <CheckCircle size={16} className="text-green-600" />;
      case "denied":
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return <AlertTriangle size={16} className="text-yellow-600" />;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <SettingsIcon size={24} className="text-primary" />
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Connection Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Connection Status</h2>
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isOnline ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Last sync:</span>
            <span>{lastSync.toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending uploads:</span>
            <span>{storageInfo.pendingUploads} files</span>
          </div>
        </div>
        
        <Button 
          onClick={handleSync}
          variant="outline" 
          size="sm" 
          className="w-full mt-3"
        >
          <RefreshCw size={16} className="mr-2" />
          Sync Now
        </Button>
      </Card>

      {/* App Settings */}
      <Card className="p-4">
        <h2 className="font-medium mb-4">App Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Wi-Fi Only Uploads</p>
                <p className="text-xs text-muted-foreground">Only upload recordings on Wi-Fi</p>
              </div>
            </div>
            <Switch
              checked={settings.wifiOnlyUploads}
              onCheckedChange={(checked) => handleSettingChange("wifiOnlyUploads", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mic size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Auto Call Recording</p>
                <p className="text-xs text-muted-foreground">Automatically record all calls</p>
              </div>
            </div>
            <Switch
              checked={settings.autoCallRecording}
              onCheckedChange={(checked) => handleSettingChange("autoCallRecording", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Follow-up reminders and alerts</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Haptic Feedback</p>
                <p className="text-xs text-muted-foreground">Vibration for button presses</p>
              </div>
            </div>
            <Switch
              checked={settings.hapticFeedback}
              onCheckedChange={(checked) => handleSettingChange("hapticFeedback", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium">Auto Sync</p>
                <p className="text-xs text-muted-foreground">Automatically sync data</p>
              </div>
            </div>
            <Switch
              checked={settings.autoSync}
              onCheckedChange={(checked) => handleSettingChange("autoSync", checked)}
            />
          </div>
        </div>
      </Card>

      {/* Permissions */}
      <Card className="p-4">
        <h2 className="font-medium mb-4">Permissions</h2>
        
        <div className="space-y-3">
          {permissions.map((permission) => {
            const Icon = permission.icon;
            return (
              <div key={permission.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPermissionIcon(permission.status)}
                  <Badge 
                    variant={permission.status === "granted" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {permission.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Storage Info */}
      <Card className="p-4">
        <h2 className="font-medium mb-4">Storage</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Used Storage</span>
            <span>{storageInfo.used} of {storageInfo.total}</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${storageInfo.percentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p>Total Recordings</p>
              <p className="font-medium text-foreground">{storageInfo.recordings}</p>
            </div>
            <div>
              <p>Pending Uploads</p>
              <p className="font-medium text-foreground">{storageInfo.pendingUploads}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4">
        <h2 className="font-medium mb-4">App Information</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span>2024.01.15</span>
          </div>
          <div className="flex justify-between">
            <span>Device</span>
            <span>Android 14</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <LogOut size={16} className="mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default Settings;