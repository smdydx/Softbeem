
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  companyName?: string;
  fontFamily?: string;
  themeColor?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  isLoading: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'SOFTBEEM',
  siteDescription: 'Leading IT and Legal Services Provider',
  contactEmail: 'contact@softbeem.com',
  contactPhone: '+91 11693 10715',
  companyName: 'Softbeem',
  fontFamily: 'Orbitron',
  themeColor: '#00FF00',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/softbeem',
    twitter: 'https://twitter.com/softbeem',
  },
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    // Load settings from API or use defaults
    const loadSettings = async () => {
      try {
        // You can add API call here to fetch settings
        // For now, using default settings
        setSettings(defaultSettings);
      } catch (error) {
        console.error('Failed to load site settings:', error);
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value = {
    settings,
    updateSettings,
    isLoading,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
