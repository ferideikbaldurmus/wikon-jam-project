import { Search, Menu, User, Bell, Settings, LogOut, Moon, Sun, BookOpen, MessageSquare, Users, TrendingUp, X, ThumbsUp, Eye, Calendar } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Language, useTranslation } from '../utils/translations';

interface SearchHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigate?: (page: string) => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  profileName?: string;
  profileUsername?: string;
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

// Mock data for search
const searchData = {
  articles: [
    { id: 1, title: 'Selçuk Üniversitesi Kampüs Rehberi', category: 'Kampüs Yaşamı', type: 'wiki' },
    { id: 2, title: 'Konya Ulaşım Rehberi', category: 'Şehir Rehberi', type: 'wiki' },
    { id: 3, title: 'Meram Tıp Fakültesi', category: 'Akademik', type: 'wiki' },
    { id: 4, title: 'Alaaddin Tepesi Gezisi', category: 'Sosyal Yaşam', type: 'wiki' },
    { id: 5, title: 'KTO Karatay Üniversitesi', category: 'Akademik', type: 'wiki' },
    { id: 6, title: 'Konya\'da Barınma Rehberi', category: 'Barınma', type: 'wiki' },
    { id: 7, title: 'Part-time İş İmkanları', category: 'Kariyer', type: 'wiki' },
    { id: 8, title: 'Mevlana Müzesi', category: 'Şehir Rehberi', type: 'wiki' },
  ],
  discussions: [
    { id: 1, title: 'en iyi yurt kafe hangisi', replies: 234, type: 'discuss' },
    { id: 2, title: 'selçuk kampüsünde wifi sorunu', replies: 89, type: 'discuss' },
    { id: 3, title: 'konya\'da gezilecek yerler', replies: 456, type: 'discuss' },
    { id: 4, title: 'kampüste spor alanları', replies: 67, type: 'discuss' },
    { id: 5, title: 'öğrenci indirimleri', replies: 178, type: 'discuss' },
    { id: 6, title: 'yurt dışı değişim programları', replies: 92, type: 'discuss' },
  ],
  users: [
    { id: 1, name: 'Zeynep Aksoy', username: 'zeynepaksoy', role: 'Konya Bilgesi', type: 'user' },
    { id: 2, name: 'Can Yılmaz', username: 'canyilmaz', role: 'Meraklı Kaşif', type: 'user' },
    { id: 3, name: 'Ayşe Demir', username: 'aysedemir', role: 'Meraklı Kaşif', type: 'user' },
    { id: 4, name: 'Mehmet Öztürk', username: 'mehmetozturk', role: 'Gezgin', type: 'user' },
  ]
};

export function SearchHeader({ language, setLanguage, onNavigate, onMenuClick, onLogout, profileName, profileUsername, isDarkMode = false, setIsDarkMode }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchResults, setSearchResults] = useState<any>({ articles: [], discussions: [], users: [] });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(89);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      
      const filteredArticles = searchData.articles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.category.toLowerCase().includes(query)
      ).slice(0, 3);

      const filteredDiscussions = searchData.discussions.filter(discussion =>
        discussion.title.toLowerCase().includes(query)
      ).slice(0, 3);

      const filteredUsers = searchData.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      ).slice(0, 3);

      setSearchResults({
        articles: filteredArticles,
        discussions: filteredDiscussions,
        users: filteredUsers
      });
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
      setSearchResults({ articles: [], discussions: [], users: [] });
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const totalResults = searchResults.articles.length + searchResults.discussions.length + searchResults.users.length;

  return (
    <div className="mb-2">
      <div className="sticky top-0 flex items-center gap-2 py-3 px-2 -mx-2 -mt-2 lg:gap-3 lg:py-4 lg:px-4 lg:-mx-4 lg:-mt-4" style={{ zIndex: 10 }}>
        {/* Hamburger Menu Button - Sadece Mobil */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-3 rounded-xl text-white hover:shadow-lg transition-all"
          style={{ backgroundColor: '#3D5A80' }}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1" ref={searchRef}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
          <input
            type="text"
            placeholder={language === 'TR' ? 'Bilgi, tartışma veya kullanıcı ara...' : 'Search for articles, discussions or users...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setIsSearchOpen(true)}
            className="w-full pl-12 pr-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md transition-all"
            style={{ 
              backgroundColor: isDarkMode ? '#0f172a' : 'white',
              borderColor: isSearchOpen ? '#EE6C4D' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
              color: isDarkMode ? '#e5e7eb' : '#293241',
              '--tw-ring-color': '#EE6C4D'
            } as React.CSSProperties}
          />

          {/* Search Results Dropdown */}
          {isSearchOpen && totalResults > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border overflow-hidden max-h-[500px] overflow-y-auto"
              style={{ 
                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)', 
                zIndex: 20 
              }}
            >
              {/* Articles Section */}
              {searchResults.articles.length > 0 && (
                <div className="border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(240, 240, 240, 0.3)' }}>
                    <BookOpen className="w-4 h-4" style={{ color: '#3D5A80' }} />
                    <span className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {language === 'TR' ? 'Bilgi Makaleleri' : 'Knowledge Articles'} ({searchResults.articles.length})
                    </span>
                  </div>
                  {searchResults.articles.map((article: any) => (
                    <button
                      key={article.id}
                      onClick={() => handleResultClick(article)}
                      className="w-full px-4 py-3 transition-colors flex items-start gap-3 text-left"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{article.title}</div>
                        <div className="text-sm truncate" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{article.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Discussions Section */}
              {searchResults.discussions.length > 0 && (
                <div className="border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(240, 240, 240, 0.3)' }}>
                    <MessageSquare className="w-4 h-4" style={{ color: '#3D5A80' }} />
                    <span className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {language === 'TR' ? 'Tartışmalar' : 'Discussions'} ({searchResults.discussions.length})
                    </span>
                  </div>
                  {searchResults.discussions.map((discussion: any) => (
                    <button
                      key={discussion.id}
                      onClick={() => handleResultClick(discussion)}
                      className="w-full px-4 py-3 transition-colors flex items-start gap-3 text-left"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <MessageSquare className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{discussion.title}</div>
                        <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                          {discussion.replies} {language === 'TR' ? 'yanıt' : 'replies'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Users Section */}
              {searchResults.users.length > 0 && (
                <div>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(240, 240, 240, 0.3)' }}>
                    <Users className="w-4 h-4" style={{ color: '#3D5A80' }} />
                    <span className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {language === 'TR' ? 'Kullanıcılar' : 'Users'} ({searchResults.users.length})
                    </span>
                  </div>
                  {searchResults.users.map((user: any) => (
                    <button
                      key={user.id}
                      onClick={() => handleResultClick(user)}
                      className="w-full px-4 py-3 transition-colors flex items-start gap-3 text-left"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#3D5A80' }}
                      >
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{user.name}</div>
                        <div className="text-sm truncate" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>@{user.username} • {user.role}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {isSearchOpen && totalResults === 0 && searchQuery.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border overflow-hidden"
              style={{ 
                backgroundColor: isDarkMode ? '#0f172a' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)', 
                zIndex: 20 
              }}
            >
              <div className="px-4 py-8 text-center">
                <Search className="w-12 h-12 mx-auto mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                <div className="font-medium mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {language === 'TR' ? 'Sonuç bulunamadı' : 'No results found'}
                </div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                  {language === 'TR' ? 'Farklı anahtar kelimeler deneyin' : 'Try different keywords'}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* User Controls */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          {/* Notifications - 10% Brand Color */}
          <button
            onClick={() => onNavigate?.('notifications')}
            className="hidden sm:flex w-12 h-12 border rounded-xl items-center justify-center hover:shadow-md transition-all shadow-sm relative"
            style={{ 
              backgroundColor: isDarkMode ? '#0f172a' : 'white',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)', 
              color: '#3D5A80' 
            }}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: '#EE6C4D' }}></span>
          </button>

          {/* User Profile */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-12 h-12 border rounded-xl items-center justify-center hover:shadow-lg transition-all shadow-sm"
            style={{ 
              backgroundColor: '#3D5A80',
              borderColor: '#3D5A80'
            }}
            title="Profile"
          >
            <User className="w-5 h-5 text-white" />
          </button>

          {/* Dropdown Menu - 60% White */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border py-2 overflow-hidden" style={{ 
              backgroundColor: isDarkMode ? '#0f172a' : 'white',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)', 
              zIndex: 99999 
            }}>
              {/* User Info Header */}
              {profileName && (
                <div className="px-4 py-3 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' }}>
                  <div className="font-medium" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{profileName}</div>
                  <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>@{profileUsername}</div>
                </div>
              )}
              <button 
                onClick={() => {
                  onNavigate?.('profile');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
                style={{ color: isDarkMode ? '#e5e7eb' : '#293241', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <User className="w-4 h-4" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }} />
                <span>{t.profile}</span>
              </button>
              <button 
                onClick={() => {
                  setIsDarkMode?.(!isDarkMode);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
                style={{ 
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                    <span>{language === 'TR' ? 'Aydınlık Mod' : 'Light Mode'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" style={{ color: '#3D5A80' }} />
                    <span>{language === 'TR' ? 'Karanlık Mod' : 'Dark Mode'}</span>
                  </>
                )}
              </button>

              <button 
                onClick={() => {
                  onNavigate?.('settings');
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
                style={{ color: isDarkMode ? '#e5e7eb' : '#293241', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings className="w-4 h-4" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }} />
                <span>{t.settings}</span>
              </button>
              <div className="border-t my-2" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' }}></div>
              <button 
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
                style={{ color: '#EE6C4D', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(238,108,77,0.1)' : 'rgba(238,108,77,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <LogOut className="w-4 h-4" />
                <span>{t.logout}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 transition-opacity"
            style={{ 
              zIndex: 100000,
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'
            }}
            onClick={() => setShowLogoutConfirm(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100001 }}>
            <div 
              className="rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
              style={{ 
                backgroundColor: isDarkMode ? '#2d3748' : 'white',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.15)'}` 
              }}
            >
              {/* Header */}
              <div 
                className="px-6 py-4"
                style={{ 
                  backgroundColor: isDarkMode ? '#1a202c' : 'rgba(238, 108, 77, 0.05)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.15)' }}
                  >
                    <LogOut className="w-6 h-6" style={{ color: '#EE6C4D' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: isDarkMode ? '#f7fafc' : '#293241' }}>
                      {language === 'TR' ? 'Çıkış Yap' : 'Log Out'}
                    </h3>
                    <p className="text-sm" style={{ color: isDarkMode ? '#a0aec0' : '#98C1D9' }}>
                      {language === 'TR' ? 'Hesabınızdan çıkış yapılacak' : 'You will be logged out'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6" style={{ backgroundColor: isDarkMode ? '#1e2838' : 'white' }}>
                <p style={{ color: isDarkMode ? '#cbd5e0' : '#3D5A80' }}>
                  {language === 'TR' 
                    ? 'Çıkış yapmak istediğinizden emin misiniz? Devam eden tüm işlemleriniz kaybolacaktır.'
                    : 'Are you sure you want to log out? All your ongoing activities will be lost.'}
                </p>
              </div>

              {/* Actions */}
              <div 
                className="px-6 py-4 flex gap-3"
                style={{ 
                  backgroundColor: isDarkMode ? '#1a202c' : 'rgba(152, 193, 217, 0.03)',
                }}
              >
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-medium transition-all hover:shadow-md"
                  style={{
                    backgroundColor: isDarkMode ? '#2d3748' : 'white',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(61, 90, 128, 0.2)'}`,
                    color: isDarkMode ? '#f7fafc' : '#3D5A80'
                  }}
                >
                  {language === 'TR' ? 'Hayır, Kal' : 'No, Stay'}
                </button>
                <button
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout?.();
                  }}
                  className="flex-1 px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg text-white"
                  style={{ backgroundColor: '#EE6C4D' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d85a3d'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EE6C4D'}
                >
                  {language === 'TR' ? 'Evet, Çıkış Yap' : 'Yes, Log Out'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Detail Modal for Search Results */}
      {showDetailModal && selectedItem && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 transition-opacity"
            style={{ 
              zIndex: 100000,
              backgroundColor: 'rgba(0, 0, 0, 0.85)'
            }}
            onClick={() => setShowDetailModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 100001 }}>
            <div 
              className="rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden"
              style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="px-6 py-5 flex items-start justify-between border-b"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(61, 90, 128, 0.05)',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'
                }}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#3D5A80' }}
                  >
                    {selectedItem.type === 'wiki' && <BookOpen className="w-7 h-7 text-white" />}
                    {selectedItem.type === 'discuss' && <MessageSquare className="w-7 h-7 text-white" />}
                    {selectedItem.type === 'user' && <User className="w-7 h-7 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl mb-1" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
                      {selectedItem.name || selectedItem.title}
                    </h2>
                    {selectedItem.type === 'wiki' && (
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: 'rgba(61, 90, 128, 0.15)',
                            color: '#3D5A80'
                          }}
                        >
                          {selectedItem.category}
                        </span>
                      </div>
                    )}
                    {selectedItem.type === 'discuss' && (
                      <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        {selectedItem.replies} {language === 'TR' ? 'yanıt' : 'replies'}
                      </p>
                    )}
                    {selectedItem.type === 'user' && (
                      <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        @{selectedItem.username} • {selectedItem.role}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 rounded-xl hover:bg-opacity-20 transition-all flex-shrink-0"
                  style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {selectedItem.type === 'wiki' && (
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="flex items-center gap-6 pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5" style={{ color: '#3D5A80' }} />
                        <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>1.2k {language === 'TR' ? 'görüntülenme' : 'views'}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setIsLiked(!isLiked);
                          setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:shadow-md"
                        style={{ 
                          backgroundColor: isLiked 
                            ? (isDarkMode ? 'rgba(238, 108, 77, 0.15)' : 'rgba(238, 108, 77, 0.1)')
                            : 'transparent',
                          border: `1px solid ${isLiked ? 'rgba(238, 108, 77, 0.3)' : 'transparent'}`
                        }}
                      >
                        <ThumbsUp 
                          className="w-5 h-5 transition-all" 
                          style={{ 
                            color: isLiked ? '#EE6C4D' : '#3D5A80',
                            fill: isLiked ? '#EE6C4D' : 'none'
                          }} 
                        />
                        <span style={{ color: isLiked ? '#EE6C4D' : (isDarkMode ? '#e5e7eb' : '#293241') }}>
                          {likeCount} {language === 'TR' ? 'beğeni' : 'likes'}
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                        <span style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>12 Kas 2024</span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div>
                      <h3 className="mb-3" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                        {language === 'TR' ? 'Makale İçeriği' : 'Article Content'}
                      </h3>
                      <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80', lineHeight: '1.8' }}>
                        {language === 'TR'
                          ? 'Bu makale Konya\'daki öğrenciler için hazırlanmış kapsamlı bir rehberdir. İçerisinde kampüs yaşamı, barınma olanakları, ulaşım bilgileri ve sosyal aktiviteler hakkında detaylı bilgiler bulabilirsiniz. Tüm bilgiler güncel olup, öğrenciler tarafından paylaşılmıştır.'
                          : 'This is a comprehensive guide prepared for students in Konya. You can find detailed information about campus life, accommodation options, transportation, and social activities. All information is up-to-date and shared by students.'}
                      </p>
                    </div>

                    {/* Author */}
                    <div 
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(61, 90, 128, 0.05)' }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#3D5A80' }}
                      >
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Ahmet Yılmaz</div>
                        <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>@ahmetyilmaz • Gezgin</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem.type === 'discuss' && (
                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="flex items-center gap-6 pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" style={{ color: '#3D5A80' }} />
                        <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{selectedItem.replies} {language === 'TR' ? 'yanıt' : 'replies'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5" style={{ color: '#3D5A80' }} />
                        <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>2.5k {language === 'TR' ? 'görüntülenme' : 'views'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                        <span style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>2 saat önce</span>
                      </div>
                    </div>

                    {/* Discussion Content */}
                    <div>
                      <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80', lineHeight: '1.8' }}>
                        {language === 'TR'
                          ? 'Merhaba arkadaşlar, bu konu hakkında deneyimlerinizi paylaşabilir misiniz? Özellikle yeni gelen öğrenciler için çok faydalı olacaktır. Kendi tecrübelerimden bahsetmek gerekirse...'
                          : 'Hello everyone, can you share your experiences about this topic? It will be very helpful, especially for new students. Speaking from my own experience...'}
                      </p>
                    </div>

                    {/* Sample Reply */}
                    <div 
                      className="p-4 rounded-xl border"
                      style={{ 
                        backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.05)' : 'rgba(61, 90, 128, 0.03)',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'
                      }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#3D5A80' }}
                        >
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Elif Demir</span>
                            <span className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>• 1 saat önce</span>
                          </div>
                          <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                            {language === 'TR'
                              ? 'Harika bir soru! Ben de aynı şeyi merak ediyordum. Benim tavsiyem...'
                              : 'Great question! I was wondering the same thing. My recommendation is...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem.type === 'user' && (
                  <div className="space-y-6">
                    {/* User Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(61, 90, 128, 0.05)' }}
                      >
                        <div className="text-2xl mb-1" style={{ color: '#EE6C4D' }}>12,450</div>
                        <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>GençCoin</div>
                      </div>
                      <div 
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(61, 90, 128, 0.05)' }}
                      >
                        <div className="text-2xl mb-1" style={{ color: '#3D5A80' }}>47</div>
                        <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Makale' : 'Articles'}</div>
                      </div>
                      <div 
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(61, 90, 128, 0.05)' }}
                      >
                        <div className="text-2xl mb-1" style={{ color: '#3D5A80' }}>234</div>
                        <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Yorum' : 'Comments'}</div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                        {language === 'TR' ? 'Hakkında' : 'About'}
                      </h3>
                      <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        {language === 'TR'
                          ? 'Selçuk Üniversitesi öğrencisiyim. Konya hakkında bilgi paylaşmayı ve yeni arkadaşlar edinmeyi seviyorum.'
                          : 'I am a student at Selcuk University. I love sharing information about Konya and making new friends.'}
                      </p>
                    </div>

                    {/* Recent Contributions */}
                    <div>
                      <h3 className="mb-3" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                        {language === 'TR' ? 'Son Katkılar' : 'Recent Contributions'}
                      </h3>
                      <div className="space-y-2">
                        {['Kampüs Rehberi', 'Ulaşım Bilgileri', 'Sosyal Etkinlikler'].map((item, idx) => (
                          <div 
                            key={idx}
                            className="p-3 rounded-lg flex items-center gap-3"
                            style={{ backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.05)' : 'rgba(61, 90, 128, 0.03)' }}
                          >
                            <BookOpen className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
                            <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div 
                className="px-6 py-4 flex gap-3 border-t"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.05)' : 'rgba(61, 90, 128, 0.02)',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'
                }}
              >
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                  style={{
                    backgroundColor: isDarkMode ? '#2d3748' : 'white',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(61, 90, 128, 0.2)'}`,
                    color: isDarkMode ? '#f7fafc' : '#3D5A80'
                  }}
                >
                  {language === 'TR' ? 'Kapat' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    if (selectedItem.type === 'wiki') {
                      onNavigate?.('wiki');
                    } else if (selectedItem.type === 'discuss') {
                      onNavigate?.('discuss');
                    } else if (selectedItem.type === 'user') {
                      onNavigate?.('profile');
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-xl transition-all hover:shadow-lg text-white"
                  style={{ backgroundColor: '#3D5A80' }}
                >
                  {language === 'TR' ? 'Sayfaya Git →' : 'Go to Page →'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}