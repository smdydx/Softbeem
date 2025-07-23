
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useSocket from '@/hooks/useSocket';

interface SiteSettings {
  themeColor?: string;
  fontFamily?: string;
  logoUrl?: string;
  companyName?: string;
  services?: any[];
  heroTitle?: string;
  heroSubtitle?: string;
  footerText?: string;
  [key: string]: any;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (key: string, value: any) => void;
  updateTheme: (themeSettings: Partial<SiteSettings>) => void;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/site-settings');
        const result = await response.json();
        setSettings(result.data || {});
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.on('siteSettingsUpdate', ({ settingKey, settingValue }) => {
      setSettings(prev => ({
        ...prev,
        [settingKey]: settingValue
      }));
    });

    socket.on('themeUpdate', (themeSettings) => {
      setSettings(prev => ({
        ...prev,
        ...themeSettings
      }));
      
      // Apply theme changes immediately
      applyThemeChanges(themeSettings);
    });

    socket.on('servicesUpdate', (services) => {
      setSettings(prev => ({
        ...prev,
        services
      }));
    });

    return () => {
      socket.off('siteSettingsUpdate');
      socket.off('themeUpdate');
      socket.off('servicesUpdate');
    };
  }, [socket]);

  const applyThemeChanges = (themeSettings: Partial<SiteSettings>) => {
    const root = document.documentElement;
    
    if (themeSettings.themeColor) {
      root.style.setProperty('--primary-color', themeSettings.themeColor);
    }
    
    if (themeSettings.fontFamily) {
      root.style.setProperty('--font-family', themeSettings.fontFamily);
    }
  };

  const updateSettings = async (key: string, value: any) => {
    try {
      await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settingKey: key, settingValue: value })
      });
    } catch (error) {
      console.error('Failed to update setting:', error);
    }
  };

  const updateTheme = async (themeSettings: Partial<SiteSettings>) => {
    try {
      await fetch('/api/admin/theme-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeSettings })
      });
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  return (
    <SiteSettingsContext.Provider 
      value={{ settings, updateSettings, updateTheme, loading }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  }
  return context;
};
