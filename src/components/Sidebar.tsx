import { Home, Plus, Trophy, User, Moon, Coins, TrendingUp, BookOpen, MessageSquare, Bell, Settings, X, UserPlus, ChevronRight, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { getRoleName } from '../utils/roleUtils';
import wikonLogo from 'figma:asset/ef355c6dae374918886a0b34ea705881acaf4984.png';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProfileClick: () => void;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  profileName?: string;
  profileUsername?: string;
  currentCoins?: number;
  userRoleId?: number;
  isDarkMode?: boolean;
}

export function Sidebar({ activeTab, setActiveTab, onProfileClick, isOpen, onClose, language, profileName, profileUsername, currentCoins, userRoleId = 1, isDarkMode = false }: SidebarProps) {
  const t = useTranslation(language);
  
  const roles = [
    { name: t.newComer, level: 1, minCoins: 0, multiplier: '1x' },
    { name: t.traveler, level: 2, minCoins: 100, multiplier: '1.2x' },
    { name: t.explorer, level: 3, minCoins: 500, multiplier: '1.5x' },
    { name: t.curiousExplorer, level: 4, minCoins: 1500, multiplier: '2x' },
    { name: t.konyaWise, level: 5, minCoins: 5000, multiplier: '3x' }
  ];
  
  const userCoins = currentCoins || 2450;
  const currentRole = roles.reverse().find(r => userCoins >= r.minCoins) || roles[roles.length - 1];
  roles.reverse(); // Restore original order
  const nextRole = roles[currentRole.level] || null;
  const progress = nextRole ? ((userCoins - currentRole.minCoins) / (nextRole.minCoins - currentRole.minCoins)) * 100 : 100;

  const menuItems = [
    { id: 'home', icon: Home, label: t.home },
    { id: 'wiki', icon: BookOpen, label: t.knowledgeArea },
    { id: 'discuss', icon: MessageSquare, label: t.discussionArea },
    { id: 'contribute', icon: Plus, label: t.contribute },
    { id: 'invite', icon: UserPlus, label: t.invite },
    { id: 'leaderboard', icon: Trophy, label: t.leaderboard },
    ...(userRoleId >= 4 ? [{ id: 'advanced', icon: Wrench, label: language === 'TR' ? 'Gelişmiş Özellikler' : 'Advanced Features' }] : [])
  ];

  const handleMenuClick = (itemId: string) => {
    setActiveTab(itemId);
    onClose();
  };

  const handleProfileClick = () => {
    onProfileClick();
    onClose();
  };

  return (
    <>
      {/* Backdrop - Sadece Mobilde */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden"
          style={{ zIndex: 99998 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar - 60% Beyaz arka plan */}
      <aside className={`
        w-64 lg:w-72 border-r h-screen flex-shrink-0 flex flex-col overflow-y-auto
        lg:sticky lg:top-0 lg:h-screen
        fixed top-0 left-0 h-screen
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ 
        backgroundColor: isDarkMode ? '#0f172a' : 'white',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)', 
        zIndex: 99999 
      }}>
        {/* Close Button - Sadece Mobilde */}
        <div className="lg:hidden absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              color: isDarkMode ? '#e5e7eb' : '#3D5A80',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo/Brand - 10% Marka rengi */}
        <div className="p-4 lg:p-6 mx-[0px] my-[-6px] px-[24px] py-[23px]">
          <h1 className="flex items-center gap-1.5" style={{ 
            color: '#EE6C4D',
            fontSize: '1.25rem',
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            <img src={wikonLogo} alt="WIKON" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
            <span className="text-xl lg:text-3xl mx-[-5px] my-[5px] text-[32px]">iKon</span>
          </h1>
        </div>

        {/* User Profile Card - 60% Beyaz arka plan + 10% vurgu */}
        <div className="px-[16px] py-[15px] lg:p-4 mx-[0px] my-[-20px]">
          <button 
            onClick={handleProfileClick}
            className="w-full group"
          >
            <div className="rounded-xl p-3 lg:p-4 border hover:shadow-md transition-all" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.2)' 
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center ring-2" style={{ 
                  background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                  ringColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.2)'
                }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="truncate" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{profileName || 'Ahmet Yılmaz'}</div>
                  <div className="text-sm truncate" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>@{profileUsername || 'ahmetyilmaz'}</div>
                </div>
                <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
              </div>
              
              {/* Coins & Role - 10% Marka vurgusu */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 border" style={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  borderColor: 'rgba(238, 108, 77, 0.3)' 
                }}>
                  <Coins className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                  <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{userCoins}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 whitespace-nowrap" style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(224, 224, 224, 0.3)',
                  color: isDarkMode ? '#94a3b8' : '#3D5A80'
                }}>
                  <span className="text-sm">{getRoleName(userRoleId, language)}</span>
                  <span className="text-xs opacity-75">Lvl {userRoleId}</span>
                </div>
              </div>
              
              {/* Progress Bar - 10% Marka rengi */}
              {nextRole && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{nextRole.name}</span>
                    <span className="text-xs" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{nextRole.minCoins}</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(224, 224, 224, 0.4)' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: '#3D5A80'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Navigation Menu - 30% Text + 10% Active */}
        <nav className="flex-1 overflow-y-auto px-[16px] py-[25px] lg:p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all group"
                style={activeTab === item.id ? {
                  backgroundColor: '#3D5A80',
                  boxShadow: '0 10px 15px -3px rgba(61, 90, 128, 0.3)',
                  color: 'white'
                } : { 
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon className="w-5 h-5" style={activeTab === item.id ? { color: 'white' } : { color: isDarkMode ? '#94a3b8' : '#98C1D9' }} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && activeTab !== item.id && (
                  <span className="text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EE6C4D' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Stats Cards - 60% Arka plan */}
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-3 border" style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }} />
                  <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Bu Hafta</span>
                </div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>+156</div>
              </div>
              <div className="rounded-lg p-3 border" style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                  <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Sıralama</span>
                </div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>#47</div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}