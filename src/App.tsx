import { useState, useEffect } from 'react';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';
import { NotificationsPage } from './components/NotificationsPage';
import { WikiPage } from './components/WikiPage';
import { DiscussPage } from './components/DiscussPage';
import { ContributePage } from './components/ContributePage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { InvitePage } from './components/InvitePage';
import { AdvancedFeaturesPage } from './components/AdvancedFeaturesPage';
import { AIChatBot } from './components/AIChatBot';
import { AuthPage } from './components/AuthPage';
import { Language } from './utils/translations';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('TR');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  // User profile state
  const [profileName, setProfileName] = useState('Ahmet Yılmaz');
  const [profileUsername, setProfileUsername] = useState('ahmetyilmaz');
  const [profileBio, setProfileBio] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [gencKulturKartID, setGencKulturKartID] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [currentCoins, setCurrentCoins] = useState(2450);
  
  // User role state - Determines permissions and coin multiplier
  const [userRoleId, setUserRoleId] = useState(3); // Default: Gezgin (Explorer)
  
  // User contributions state
  const [userContributions, setUserContributions] = useState<Array<{
    id: number;
    type: 'wiki' | 'discuss';
    title: string;
    category: string;
    content: string;
    timestamp: Date;
  }>>([]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Automatically update user role based on coins
  useEffect(() => {
    if (currentCoins >= 100000) {
      setUserRoleId(5); // Konya Bilgesi
    } else if (currentCoins >= 25000) {
      setUserRoleId(4); // Kaşif
    } else if (currentCoins >= 5000) {
      setUserRoleId(3); // Gezgin
    } else if (currentCoins >= 500) {
      setUserRoleId(2); // Seyyah
    } else {
      setUserRoleId(1); // Yeni Gelen
    }
  }, [currentCoins]);

  const handleRegister = (firstName: string, lastName: string, email: string, cardID: string) => {
    // Set user profile from registration
    setProfileName(`${firstName} ${lastName}`);
    
    // Create username from first name and last name (lowercase, no spaces)
    const generatedUsername = `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replace(/\s+/g, '');
    setProfileUsername(email ? email.split('@')[0] : generatedUsername); // Use email username if available, otherwise use name-based username
    
    setProfileEmail(email);
    setGencKulturKartID(cardID);
    setProfileBio('');
    
    // New users start with 0 coins and role 1
    setCurrentCoins(0);
    setUserRoleId(1);
    
    // Clear contributions
    setUserContributions([]);
    
    // Login the user
    setIsAuthenticated(true);
    
    // Set document title to the user's name
    document.title = `${firstName} ${lastName}`;
  };

  const handleUpdateProfile = (name: string, username: string, bio: string, photoUrl?: string) => {
    setProfileName(name);
    setProfileUsername(username);
    setProfileBio(bio);
    if (photoUrl !== undefined) {
      setProfilePhotoUrl(photoUrl);
    }
  };

  const handleCoinUpdate = (amount: number, action: string) => {
    setCurrentCoins(prev => prev + amount);
    // Toast notification will be shown in the respective component
  };

  const handleRoleChange = (roleId: number) => {
    setUserRoleId(roleId);
  };

  const handleAddContribution = (type: 'wiki' | 'discuss', title: string, category: string, content: string) => {
    const newContribution = {
      id: Date.now(),
      type,
      title,
      category,
      content,
      timestamp: new Date()
    };
    setUserContributions(prev => [newContribution, ...prev]);
  };

  const handleNavigate = (page: string) => {
    setActiveTab(page);
    setNavigationHistory(prev => [...prev, page]);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setActiveTab(previousPage);
    } else {
      // If no history, go to home
      setActiveTab('home');
      setNavigationHistory(['home']);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <MainContent onNavigate={handleNavigate} language={language} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userContributions={userContributions} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} onGoBack={handleGoBack} language={language} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'knowledge':
        return <WikiPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userContributions={userContributions.filter(c => c.type === 'wiki')} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'wiki':
        return <WikiPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userContributions={userContributions.filter(c => c.type === 'wiki')} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'discussion':
        return <DiscussPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userContributions={userContributions.filter(c => c.type === 'discuss')} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'discuss':
        return <DiscussPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userContributions={userContributions.filter(c => c.type === 'discuss')} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'contribute':
        return <ContributePage onNavigate={handleNavigate} onGoBack={handleGoBack} language={language} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} onAddContribution={handleAddContribution} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'invite':
        return <InvitePage onNavigate={handleNavigate} onGoBack={handleGoBack} language={language} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'leaderboard':
        return <LeaderboardPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'profile':
        return <ProfilePage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} profileBio={profileBio} profileEmail={profileEmail} gencKulturKartID={gencKulturKartID} profilePhotoUrl={profilePhotoUrl} onUpdateProfile={handleUpdateProfile} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'settings':
        return <SettingsPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'advanced':
        return <AdvancedFeaturesPage language={language} onNavigate={handleNavigate} onGoBack={handleGoBack} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <MainContent onNavigate={handleNavigate} language={language} setLanguage={setLanguage} onMenuClick={() => setIsSidebarOpen(true)} onLogout={() => setIsAuthenticated(false)} profileName={profileName} profileUsername={profileUsername} currentCoins={currentCoins} onCoinUpdate={handleCoinUpdate} userRoleId={userRoleId} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
    }
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} onRegister={handleRegister} language={language} isDarkMode={isDarkMode} />;
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#F9FAFF' }}>
      <div className="flex gap-2 p-2 lg:gap-6 lg:p-6 max-w-[1800px] mx-auto">
        <div className="hidden lg:block rounded-2xl overflow-hidden shadow-lg sticky top-6 self-start h-[calc(100vh-3rem)]">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleNavigate}
            onProfileClick={() => handleNavigate('profile')}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            language={language}
            profileName={profileName}
            profileUsername={profileUsername}
            currentCoins={currentCoins}
            userRoleId={userRoleId}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="lg:hidden">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={handleNavigate}
            onProfileClick={() => handleNavigate('profile')}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            language={language}
            profileName={profileName}
            profileUsername={profileUsername}
            currentCoins={currentCoins}
            userRoleId={userRoleId}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="flex-1 rounded-xl lg:rounded-2xl overflow-y-auto max-h-[calc(100vh-1rem)] lg:max-h-[calc(100vh-3rem)]" 
             style={{ 
               backgroundColor: isDarkMode ? '#1e293b' : 'white',
               boxShadow: isDarkMode 
                 ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)' 
                 : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
             }}>
          {renderContent()}
        </div>
      </div>
      <AIChatBot language={language} isDarkMode={isDarkMode} />
      <Toaster position="top-right" expand={false} richColors />
    </div>
  );
}