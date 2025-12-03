import { Trophy, Crown, Medal, TrendingUp, Coins, Star, ArrowRight } from 'lucide-react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { getRoleName } from '../utils/roleUtils';

interface LeaderboardPageProps {
  language: Language;
  onNavigate?: (page: string) => void;
  onGoBack?: () => void;
  setLanguage: (lang: Language) => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  profileName?: string;
  profileUsername?: string;
  currentCoins?: number;
  onCoinUpdate?: (amount: number, action: string) => void;
  userRoleId?: number;
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

export function LeaderboardPage({ language, onNavigate, onGoBack, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, isDarkMode = false, setIsDarkMode }: LeaderboardPageProps) {
  const t = useTranslation(language);
  
  const topUsers = [
    {
      rank: 1,
      name: 'Zeynep Aksoy',
      username: '@zeynepaksoy',
      role: t.konyaWise,
      coins: 8450,
      contributions: 142,
      multiplier: '3x',
      badge: 'gold'
    },
    {
      rank: 2,
      name: 'Can Yılmaz',
      username: '@canyilmaz',
      role: t.curiousExplorer,
      coins: 6720,
      contributions: 98,
      multiplier: '2x',
      badge: 'silver'
    },
    {
      rank: 3,
      name: 'Ayşe Demir',
      username: '@aysedemir',
      role: t.curiousExplorer,
      coins: 5890,
      contributions: 87,
      multiplier: '2x',
      badge: 'bronze'
    },
    {
      rank: 4,
      name: 'Mehmet Öztürk',
      username: '@mehmetozturk',
      role: t.explorer,
      coins: 3450,
      contributions: 56,
      multiplier: '1.5x',
      badge: null
    },
    {
      rank: 5,
      name: 'Elif Kaya',
      username: '@elifkaya',
      role: t.explorer,
      coins: 3120,
      contributions: 51,
      multiplier: '1.5x',
      badge: null
    },
    {
      rank: 6,
      name: profileName || 'Ahmet Yılmaz',
      username: '@' + (profileUsername || 'ahmetyilmaz'),
      role: t.explorer,
      coins: currentCoins || 2450,
      contributions: 38,
      multiplier: '1.5x',
      badge: null,
      isCurrentUser: true
    },
    {
      rank: 7,
      name: 'Fatma Şahin',
      username: '@fatmasahin',
      role: t.traveler,
      coins: 1890,
      contributions: 32,
      multiplier: '1.2x',
      badge: null
    },
    {
      rank: 8,
      name: 'Ali Yıldız',
      username: '@aliyildiz',
      role: t.traveler,
      coins: 1560,
      contributions: 28,
      multiplier: '1.2x',
      badge: null
    }
  ];

  const stats = [
    { label: language === 'TR' ? 'Toplam Katkıcı' : 'Total Contributors', value: '320', icon: TrendingUp, color: '#3D5A80', bgColor: 'rgba(61, 90, 128, 0.1)' },
    { label: language === 'TR' ? 'Toplam GençCoin' : 'Total GenCoin', value: '245K', icon: Coins, color: '#EE6C4D', bgColor: 'rgba(238, 108, 77, 0.1)' },
    { label: language === 'TR' ? 'Bu Hafta Yeni' : 'New This Week', value: '42', icon: Star, color: '#9E9E9E', bgColor: 'rgba(224, 224, 224, 0.3)' }
  ];

  return (
    <div className="flex-1 p-2 sm:p-4 lg:p-8" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
      {/* Search Bar with User Controls */}
      <SearchHeader
        language={language}
        setLanguage={setLanguage}
        onNavigate={onNavigate}
        onMenuClick={onMenuClick}
        onLogout={onLogout}
        profileName={profileName}
        profileUsername={profileUsername}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="mb-2 flex items-center gap-3" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
              <Trophy className="w-8 h-8" style={{ color: '#EE6C4D' }} />
              {t.leaderboard}
            </h1>
          </div>
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 transition-all hover:opacity-70 active:scale-95 flex-shrink-0"
            style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
          >
            <span>{language === 'TR' ? 'Geri' : 'Back'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-2">
          <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
            {t.leaderboardDesc}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl p-5 shadow-sm" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'}` 
            }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-sm" style={{ color: '#98C1D9' }}>{stat.label}</div>
                  <div style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top 3 Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topUsers.slice(0, 3).map((user) => (
            <div
              key={user.rank}
              className="relative rounded-xl p-6 shadow-lg overflow-hidden"
              style={{
                background: 
                  user.rank === 1 ? 'linear-gradient(135deg, #3D5A80 0%, #2d4560 50%, #3D5A80 100%)' :
                  user.rank === 2 ? 'linear-gradient(135deg, #98C1D9 0%, #7fb0c9 50%, #98C1D9 100%)' :
                  'linear-gradient(135deg, #EE6C4D 0%, #d85a3d 50%, #EE6C4D 100%)'
              }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                {user.rank === 1 && <Crown className="w-10 h-10 text-white" />}
                {user.rank === 2 && <Medal className="w-10 h-10 text-white" />}
                {user.rank === 3 && <Medal className="w-10 h-10 text-white" />}
              </div>

              <div className="text-center text-white">
                <div className="mb-4"># {user.rank}</div>
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="mb-1">{user.name}</h3>
                <div className="text-white/80 text-sm mb-3">{user.username}</div>
                <div className="backdrop-blur-sm rounded-lg p-3 mb-2" style={{ border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'transparent' }}>
                  <div className="text-sm text-white/90 mb-1">{user.role}</div>
                  <div className="flex items-center justify-center gap-2">
                    <Coins className="w-5 h-5" />
                    <span className="text-xl">{user.coins}</span>
                  </div>
                </div>
                <div className="text-white/80 text-sm">
                  {user.contributions} {t.contributions.toLowerCase()} · {user.multiplier} {t.multiplier.toLowerCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="rounded-xl shadow-sm overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'}` 
        }}>
          <div className="p-6 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
            <h2 style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>{language === 'TR' ? 'Tüm Sıralama' : 'Full Ranking'}</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(240, 240, 240, 0.5)' }}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {t.rank}
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {t.user}
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {t.role}
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {language === 'TR' ? 'GençCoin' : 'GenCoin'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {language === 'TR' ? 'Katkı Sayısı' : 'Contribution Count'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                    {t.multiplier}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                {topUsers.map((user) => (
                  <tr
                    key={user.rank}
                    className="transition-colors"
                    style={user.isCurrentUser ? {
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(224, 224, 224, 0.3)'
                    } : {}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(249, 250, 251, 1)'}
                    onMouseLeave={(e) => {
                      if (!user.isCurrentUser) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      } else {
                        e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(224, 224, 224, 0.3)';
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span style={{ color: user.rank <= 3 ? (isDarkMode ? '#ffffff' : '#293241') : (isDarkMode ? '#94a3b8' : '#3D5A80') }}>
                          {user.rank}
                        </span>
                        {user.rank === 1 && <Crown className="w-5 h-5" style={{ color: '#EE6C4D' }} />}
                        {user.rank === 2 && <Medal className="w-5 h-5" style={{ color: '#9E9E9E' }} />}
                        {user.rank === 3 && <Medal className="w-5 h-5" style={{ color: '#3D5A80' }} />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-xs" style={{ color: '#9E9E9E' }}>({language === 'TR' ? 'Siz' : 'You'})</span>
                          )}
                        </div>
                        <div className="text-sm" style={{ color: '#9E9E9E' }}>{user.username}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid',
                          borderColor: 
                            user.role === t.konyaWise ? '#F07D60' :
                            user.role === t.curiousExplorer ? '#4A6A90' :
                            user.role === t.explorer ? '#4A6A90' :
                            '#9E9E9E',
                          color: 
                            user.role === t.konyaWise ? (isDarkMode ? '#F07D60' : '#EE6C4D') :
                            user.role === t.curiousExplorer ? (isDarkMode ? '#e5e7eb' : '#4A6A90') :
                            user.role === t.explorer ? (isDarkMode ? '#e5e7eb' : '#4A6A90') :
                            '#9E9E9E'
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5" style={{ color: '#EE6C4D' }} />
                        <span style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>{user.coins}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {user.contributions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#EE6C4D' }}>
                      {user.multiplier}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}