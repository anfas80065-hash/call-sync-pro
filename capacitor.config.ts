import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5c8b21fc6e5d47bb91e9db993b318a72',
  appName: 'Dialing App',
  webDir: 'dist',
  server: {
    url: 'https://5c8b21fc-6e5d-47bb-91e9-db993b318a72.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#3B82F6",
      sound: "beep.wav",
    },
  },
};

export default config;