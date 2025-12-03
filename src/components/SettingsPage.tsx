import { User, Bell, Lock, Eye, Palette, Globe, Coins, CreditCard, LogOut, Trash2, ChevronRight, Settings, ArrowRight, CheckCircle, AlertTriangle, Trophy, Check, X, Sprout, Footprints, Briefcase, Map, Crown } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';

interface SettingsPageProps {
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

export function SettingsPage({ language, onNavigate, onGoBack, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, isDarkMode = false, setIsDarkMode }: SettingsPageProps) {
  const t = useTranslation(language);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showCoins, setShowCoins] = useState(true);
  const [localLanguage, setLocalLanguage] = useState(language === 'TR' ? 'tr' : 'en');
  const [showCardLinkModal, setShowCardLinkModal] = useState(false);
  const [cardID, setCardID] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  // Bildirim state'leri
  const [showCardLinkSuccess, setShowCardLinkSuccess] = useState(false);
  const [showFreezeConfirm, setShowFreezeConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [showRoleInfoModal, setShowRoleInfoModal] = useState(false);
  const [selectedRoleInfo, setSelectedRoleInfo] = useState<number | null>(null);

  // Kart ID validasyonu - sadece rakamlar, 12 haneli olmalı
  const isCardIDValid = () => {
    const digitsOnly = cardID.replace(/\s/g, ''); // Boşlukları kaldır
    return digitsOnly.length === 12 && /^\d+$/.test(digitsOnly); // 12 rakam kontrolü
  };

  const isFormValid = cardHolderName.trim() !== '' && isCardIDValid();

  const settingSections = [
    {
      id: 'account',
      title: 'Hesap Bilgileri',
      icon: User,
      items: [
        { id: 'name', label: 'Ad Soyad', value: 'Ahmet Yılmaz', type: 'text' },
        { id: 'username', label: 'Kullanıcı Adı', value: '@ahmetyilmaz', type: 'text' },
        { id: 'email', label: 'E-posta', value: 'ahmet@example.com', type: 'text' },
        { id: 'university', label: 'Üniversite', value: 'Selçuk Üniversitesi', type: 'select' },
        { id: 'department', label: 'Bölüm', value: 'Bilgisayar Mühendisliği', type: 'text' }
      ]
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: Bell,
      items: []
    },
    {
      id: 'privacy',
      title: 'Gizlilik',
      icon: Lock,
      items: []
    },
    {
      id: 'appearance',
      title: 'Görünüm',
      icon: Palette,
      items: []
    },
    {
      id: 'coins',
      title: 'GençCoin Ayarları',
      icon: Coins,
      items: []
    }
  ];

  return (
    <main className="flex-1 p-2 sm:p-4 lg:p-8 min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
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

      {/* Header with Back Button */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="mb-2 flex items-center gap-3" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
            <Settings className="w-8 h-8" style={{ color: '#EE6C4D' }} />
            {t.settings}
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
        <p style={{ color: '#3D5A80' }}>{language === 'TR' ? 'Hesap bilgilerinizi ve tercihlerinizi yönetin' : 'Manage your account information and preferences'}</p>
      </div>

      <div className="max-w-4xl space-y-4 lg:space-y-6">
        {/* Hesap Bilgileri */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
              background: isDarkMode 
                ? 'linear-gradient(90deg, rgba(61, 90, 128, 0.2) 0%, rgba(61, 90, 128, 0.1) 100%)' 
                : 'linear-gradient(90deg, rgba(224, 224, 224, 0.3) 0%, rgba(240, 240, 240, 0.5) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3D5A80' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{t.accountInfo}</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{t.fullName}</label>
              <input
                type="text"
                defaultValue="Ahmet Yılmaz"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{t.username}</label>
              <input
                type="text"
                defaultValue="@ahmetyilmaz"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{t.email}</label>
              <input
                type="email"
                defaultValue="ahmet@example.com"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{t.university}</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#e5e7eb' : '#293241',
                    '--tw-ring-color': '#EE6C4D'
                  } as React.CSSProperties}
                >
                  <option>Selçuk Üniversitesi</option>
                  <option>KTO Karatay Üniversitesi</option>
                  <option>Necmettin Erbakan Üniversitesi</option>
                  <option>Konya Teknik Üniversitesi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{t.department}</label>
                <input
                  type="text"
                  defaultValue="Bilgisayar Mühendisliği"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#e5e7eb' : '#293241',
                    '--tw-ring-color': '#EE6C4D'
                  } as React.CSSProperties}
                />
              </div>
            </div>
            <button 
              className="w-full sm:w-auto px-6 py-3 text-white rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#3D5A80' }}
            >
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
              background: isDarkMode 
                ? 'linear-gradient(90deg, rgba(158, 158, 158, 0.15) 0%, rgba(158, 158, 158, 0.08) 100%)'
                : 'linear-gradient(90deg, rgba(224, 224, 224, 0.3) 0%, rgba(240, 240, 240, 0.5) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D0D0D0' }}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Bildirim Tercihleri</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>E-posta Bildirimleri</div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Yeni yorumlar ve güncellemeler hakkında e-posta alın</div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: emailNotifications ? '#EE6C4D' : 'rgba(61, 90, 128, 0.2)' }}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Anlık Bildirimler</div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Tarayıcı üzerinden anlık bildirim alın</div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: pushNotifications ? '#EE6C4D' : 'rgba(61, 90, 128, 0.2)' }}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Gizlilik Ayarları */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
              background: isDarkMode 
                ? 'linear-gradient(90deg, rgba(61, 90, 128, 0.2) 0%, rgba(61, 90, 128, 0.1) 100%)'
                : 'linear-gradient(90deg, rgba(61, 90, 128, 0.1) 0%, rgba(224, 224, 224, 0.3) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3D5A80' }}>
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Gizlilik ve Güvenlik</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Profil Görünürlüğü</label>
              <div className="space-y-2">
                <label 
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ 
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#0f172a' : 'white'}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={profileVisibility === 'public'}
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#D0D0D0' }}
                  />
                  <div className="flex-1">
                    <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Herkes Görebilir</div>
                    <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Profiliniz tüm kullanıcılara açık</div>
                  </div>
                </label>
                <label 
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ 
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#0f172a' : 'white'}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="students"
                    checked={profileVisibility === 'students'}
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#D0D0D0' }}
                  />
                  <div className="flex-1">
                    <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Sadece Öğrenciler</div>
                    <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Sadece doğrulanmış öğrenciler görebilir</div>
                  </div>
                </label>
                <label 
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ 
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#0f172a' : 'white'}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={profileVisibility === 'private'}
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#D0D0D0' }}
                  />
                  <div className="flex-1">
                    <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Gizli</div>
                    <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Profiliniz başkaları tarafından görünmez</div>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
              <div className="flex-1">
                <div className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>GençCoin Bakiyesini Göster</div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>Profilinizde coin bakiyenizi gösterin</div>
              </div>
              <button
                onClick={() => setShowCoins(!showCoins)}
                className="relative w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: showCoins ? '#EE6C4D' : 'rgba(61, 90, 128, 0.2)' }}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    showCoins ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Rol ve İlerleme */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
              background: isDarkMode
                ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(61, 90, 128, 0.15) 100%)'
                : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(61, 90, 128, 0.1) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EE6C4D' }}>
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Rolünüz ve İlerleme</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {/* Mevcut Rol */}
            <div 
              className="rounded-xl p-4"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(238, 108, 77, 0.2) 0%, rgba(61, 90, 128, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(238, 108, 77, 0.1) 0%, rgba(61, 90, 128, 0.1) 100%)',
                border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.3)' : '1px solid rgba(238, 108, 77, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm mb-1" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    Mevcut Rolünüz
                  </div>
                  <div className="text-2xl flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    {userRoleId === 1 && <><Sprout className="w-6 h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} /> Yeni Gelen</>}
                    {userRoleId === 2 && <><Footprints className="w-6 h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} /> Seyyah</>}
                    {userRoleId === 3 && <><Briefcase className="w-6 h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} /> Gezgin</>}
                    {userRoleId === 4 && <><Map className="w-6 h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} /> Kaşif</>}
                    {userRoleId === 5 && <><Crown className="w-6 h-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} /> Konya Bilgesi</>}
                  </div>
                </div>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.3)' : 'rgba(238, 108, 77, 0.15)',
                    border: `2px solid #EE6C4D`
                  }}
                >
                  {userRoleId === 1 && <Sprout className="w-8 h-8" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {userRoleId === 2 && <Footprints className="w-8 h-8" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {userRoleId === 3 && <Briefcase className="w-8 h-8" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {userRoleId === 4 && <Map className="w-8 h-8" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {userRoleId === 5 && <Crown className="w-8 h-8" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                </div>
              </div>

              {/* Progress Bar - sadece Konya Bilgesi değilse göster */}
              {userRoleId < 5 && (
                <>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      Bir sonraki rol
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: '#EE6C4D' }}>
                      {userRoleId === 1 && <><Footprints className="w-4 h-4" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} /> Seyyah</>}
                      {userRoleId === 2 && <><Briefcase className="w-4 h-4" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} /> Gezgin</>}
                      {userRoleId === 3 && <><Map className="w-4 h-4" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} /> Kaşif</>}
                      {userRoleId === 4 && <><Crown className="w-4 h-4" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} /> Konya Bilgesi</>}
                    </span>
                  </div>
                  <div 
                    className="h-3 rounded-full overflow-hidden"
                    style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: userRoleId === 1 ? '45%' : userRoleId === 2 ? '60%' : userRoleId === 3 ? '75%' : '90%',
                        background: 'linear-gradient(90deg, #EE6C4D 0%, #3D5A80 100%)'
                      }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-center" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {userRoleId === 1 && '55 puan daha kazanarak Seyyah olun'}
                    {userRoleId === 2 && '140 puan daha kazanarak Gezgin olun'}
                    {userRoleId === 3 && '250 puan daha kazanarak Kaşif olun'}
                    {userRoleId === 4 && '500 puan daha kazanarak Konya Bilgesi olun'}
                  </div>
                </>
              )}

              {userRoleId === 5 && (
                <div className="text-center text-sm" style={{ color: '#EE6C4D' }}>
                  🎉 Tebrikler! En yüksek role ulaştınız.
                </div>
              )}
            </div>

            {/* Tüm Roller Listesi */}
            <div>
              <div className="text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                Tüm Roller
              </div>
              <div className="space-y-2">
                {[
                  { id: 1, icon: Sprout, name: 'Yeni Gelen', points: '0-100 puan' },
                  { id: 2, icon: Footprints, name: 'Seyyah', points: '101-500 puan' },
                  { id: 3, icon: Briefcase, name: 'Gezgin', points: '501-1500 puan' },
                  { id: 4, icon: Map, name: 'Kaşif', points: '1501-3000 puan' },
                  { id: 5, icon: Crown, name: 'Konya Bilgesi', points: '3000+ puan' }
                ].map((role) => {
                  const IconComponent = role.icon;
                  return (
                  <div
                    key={role.id}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer hover:scale-[1.02]"
                    style={{
                      backgroundColor: userRoleId === role.id
                        ? isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.1)'
                        : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)',
                      border: userRoleId === role.id
                        ? `2px solid #EE6C4D`
                        : isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(61, 90, 128, 0.1)'
                    }}
                    onClick={() => {
                      setSelectedRoleInfo(role.id);
                      setShowRoleInfoModal(true);
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: userRoleId === role.id
                          ? 'rgba(238, 108, 77, 0.2)'
                          : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'
                      }}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ 
                          color: userRoleId === role.id 
                            ? (isDarkMode ? 'white' : '#EE6C4D')
                            : (isDarkMode ? '#94a3b8' : '#3D5A80')
                        }} 
                      />
                    </div>
                    <div className="flex-1">
                      <div 
                        className="mb-0.5"
                        style={{ 
                          color: userRoleId === role.id 
                            ? isDarkMode ? '#e5e7eb' : '#293241'
                            : isDarkMode ? '#94a3b8' : '#3D5A80'
                        }}
                      >
                        {role.name}
                      </div>
                      <div className="text-xs" style={{ color: isDarkMode ? '#64748b' : '#94a3b8' }}>
                        {role.points}
                      </div>
                    </div>
                    {userRoleId === role.id && (
                      <div 
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ 
                          backgroundColor: '#EE6C4D',
                          color: 'white'
                        }}
                      >
                        Aktif
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* GençCoin Ayarları */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
              background: isDarkMode
                ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
                : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EE6C4D' }}>
                <Coins className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>GençCoin ve Genç Kültür Kart</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div 
              className="rounded-lg p-4"
              style={{
                backgroundColor: isDarkMode ? 'rgba(158, 158, 158, 0.1)' : 'rgba(224, 224, 224, 0.2)',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(208, 208, 208, 0.5)'
              }}
            >
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#9E9E9E' }} />
                <div className="flex-1">
                  <div className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Genç Kültür Kart Bağlantısı</div>
                  <div className="text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    GençCoin'lerinizi Genç Kültür Kart puanına çevirmek için kartınızı bağlayın
                  </div>
                  <button 
                    className="px-4 py-2 text-white rounded-lg transition-opacity hover:opacity-90 text-sm"
                    style={{ backgroundColor: '#EE6C4D' }}
                    onClick={() => setShowCardLinkModal(true)}
                  >
                    Kart Bağla
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4" style={{ 
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
              backgroundColor: isDarkMode ? '#0f172a' : 'white'
            }}>
              <div className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Dönüşüm Oranı</div>
              <div className="text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                10 GençCoin = 1 Genç Kültür Kart Puanı
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div 
                  className="rounded-lg p-3 text-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.15)' : 'rgba(238, 108, 77, 0.1)',
                    border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.4)' : '1px solid rgba(238, 108, 77, 0.3)'
                  }}
                >
                  <div className="mb-1" style={{ color: '#EE6C4D' }}>Toplam Kazancınız</div>
                  <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>2,450 GençCoin</div>
                </div>
                <div 
                  className="rounded-lg p-3 text-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(158, 158, 158, 0.15)' : 'rgba(224, 224, 224, 0.3)',
                    border: isDarkMode ? '1px solid rgba(208, 208, 208, 0.3)' : '1px solid rgba(208, 208, 208, 0.5)'
                  }}
                >
                  <div className="mb-1" style={{ color: '#9E9E9E' }}>Dönüştürülebilir</div>
                  <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>245 Puan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tehlikeli Alan */}
        <div className="rounded-xl overflow-hidden" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.4)' : '1px solid rgba(238, 108, 77, 0.3)' 
        }}>
          <div 
            className="p-4 sm:p-6 border-b"
            style={{
              borderColor: isDarkMode ? 'rgba(238, 108, 77, 0.4)' : 'rgba(238, 108, 77, 0.3)',
              background: isDarkMode
                ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
                : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EE6C4D' }}>
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <h2 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Hesap Silme</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <div className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Hesabı Dondur</div>
              <div className="text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                Hesabınızı geçici olarak dondurun. İstediğiniz zaman geri aktif edebilirsiniz.
              </div>
              <button 
                onClick={() => setShowFreezeConfirm(true)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  border: '2px solid #EE6C4D',
                  color: '#EE6C4D'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#EE6C4D';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#EE6C4D';
                }}
              >
                Hesabı Dondur
              </button>
            </div>
            <div className="pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
              <div className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Hesabı Sil</div>
              <div className="text-sm mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                Hesabınızı kalıcı olarak silin. Bu işlem geri alınamaz ve tüm verileriniz silinir.
              </div>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  border: '2px solid #EE6C4D',
                  color: '#EE6C4D'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#EE6C4D';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#EE6C4D';
                }}
              >
                Hesabı Kalıcı Olarak Sil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Card Linking */}
      {showCardLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div 
            className="rounded-3xl max-w-md w-full overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
          >
            {/* Header */}
            <div 
              className="p-6 border-b"
              style={{
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                background: isDarkMode
                  ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
                  : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, #EE6C4D 0%, #D0D0D0 100%)'
                    }}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                      Genç Kültür Kart Bağla
                    </h3>
                    <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      Kart bilgilerinizi girin
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCardLinkModal(false)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Kart Sahibinin Adı Soyadı
                </label>
                <input
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                  style={{
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#e5e7eb' : '#293241',
                    '--tw-ring-color': '#EE6C4D'
                  } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Genç Kültür Kart ID <span style={{ color: '#EE6C4D' }}>*</span>
                </label>
                <input
                  type="text"
                  value={cardID}
                  onChange={(e) => setCardID(e.target.value)}
                  placeholder="1234 5678 9012"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 tracking-wider"
                  style={{
                    border: cardID && !isCardIDValid() 
                      ? `2px solid #EE6C4D`
                      : isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#e5e7eb' : '#293241',
                    '--tw-ring-color': '#EE6C4D'
                  } as React.CSSProperties}
                />
                {cardID && !isCardIDValid() && (
                  <div 
                    className="mt-3 rounded-xl p-3 flex items-start gap-2"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.15)' : 'rgba(238, 108, 77, 0.1)',
                      border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.5)' : '1px solid rgba(238, 108, 77, 0.3)'
                    }}
                  >
                    <span className="text-lg flex-shrink-0">⚠️</span>
                    <p className="text-xs leading-relaxed" style={{ color: '#EE6C4D' }}>
                      Kart ID <strong>12 haneli</strong> ve <strong>sadece rakamlardan</strong> oluşmalıdır. Lütfen kartınız üzerindeki numarayı kontrol edin.
                    </p>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div 
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(158, 158, 158, 0.1)' : 'rgba(224, 224, 224, 0.3)',
                  border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(208, 208, 208, 0.3)'
                }}
              >
                <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <span style={{ color: '#EE6C4D' }}>ℹ️</span> Genç Kültür Kart ID bilginizi kartınızın üzerinde bulabilirsiniz. Bu bilgi ile GençCoin'lerinizi kart puanına dönüştürebilirsiniz.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div 
              className="p-6 border-t flex gap-3"
              style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <button
                onClick={() => setShowCardLinkModal(false)}
                className="flex-1 px-4 py-3 rounded-xl transition-all hover:opacity-80"
                style={{
                  border: `2px solid ${isDarkMode ? '#475569' : '#E8E8E8'}`,
                  color: isDarkMode ? '#94a3b8' : '#3D5A80',
                  backgroundColor: 'transparent'
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  if (isFormValid) {
                    setShowCardLinkModal(false);
                    setCardID('');
                    setCardHolderName('');
                    setShowCardLinkSuccess(true);
                    setTimeout(() => setShowCardLinkSuccess(false), 3000);
                  }
                }}
                className="flex-1 px-4 py-3 text-white rounded-xl transition-all shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #EE6C4D 0%, #D0D0D0 100%)',
                  opacity: isFormValid ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (isFormValid) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Kartı Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification - Card Link */}
      {showCardLinkSuccess && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div 
            className="rounded-2xl shadow-2xl overflow-hidden max-w-sm"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
          >
            <div 
              className="p-4 flex items-start gap-3"
              style={{ 
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#22c55e' }}
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Kart Başarıyla Bağlandı!</h4>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Artık GençCoin'lerinizi Genç Kültür Kart puanına dönüştürebilirsiniz.
                </p>
              </div>
              <button
                onClick={() => setShowCardLinkSuccess(false)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal - Freeze Account */}
      {showFreezeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div 
            className="rounded-3xl max-w-md w-full overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
          >
            <div 
              className="p-6 border-b"
              style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                background: isDarkMode
                  ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
                  : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    Hesabı Dondur
                  </h3>
                  <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    Bu işlemi onaylıyor musunuz?
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                Hesabınız geçici olarak <strong style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>dondurulacak</strong>. İstediğiniz zaman tekrar giriş yaparak hesabınızı aktif edebilirsiniz.
              </p>
            </div>

            <div 
              className="p-6 border-t flex gap-3"
              style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <button
                onClick={() => setShowFreezeConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl transition-all hover:opacity-80"
                style={{ 
                  border: `2px solid ${isDarkMode ? '#475569' : '#E8E8E8'}`,
                  color: isDarkMode ? '#94a3b8' : '#3D5A80',
                  backgroundColor: 'transparent'
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  setShowFreezeConfirm(false);
                  onLogout?.();
                }}
                className="flex-1 px-4 py-3 text-white rounded-xl transition-all"
                style={{ backgroundColor: '#EE6C4D' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Hesabı Dondur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal - Delete Account */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div 
            className="rounded-3xl max-w-md w-full overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
          >
            <div 
              className="p-6 border-b"
              style={{ 
                borderColor: isDarkMode ? 'rgba(238, 108, 77, 0.4)' : 'rgba(238, 108, 77, 0.3)',
                background: isDarkMode
                  ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.2) 0%, rgba(238, 108, 77, 0.1) 100%)'
                  : 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    Hesabı Kalıcı Olarak Sil
                  </h3>
                  <p className="text-xs" style={{ color: '#EE6C4D' }}>
                    ⚠️ Bu işlem geri alınamaz!
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div 
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.15)' : 'rgba(238, 108, 77, 0.1)',
                  border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.5)' : '1px solid rgba(238, 108, 77, 0.3)'
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#EE6C4D' }}>
                  <strong>Silinecek veriler:</strong>
                </p>
                <ul className="text-xs mt-2 space-y-1" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <li>• Profil bilgileriniz</li>
                  <li>• Tüm içerik ve yorumlarınız</li>
                  <li>• {currentCoins} GençCoin bakiyeniz</li>
                  <li>• Genç Kültür Kart bağlantınız</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Onaylamak için <strong style={{ color: '#EE6C4D' }}>\"SİL\"</strong> yazın:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="SİL"
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                  style={{ 
                    border: deleteConfirmText && deleteConfirmText !== 'SİL'
                      ? `2px solid #EE6C4D`
                      : isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#e5e7eb' : '#293241',
                    '--tw-ring-color': '#EE6C4D'
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div 
              className="p-6 border-t flex gap-3"
              style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-3 rounded-xl transition-all hover:opacity-80"
                style={{ 
                  border: `2px solid ${isDarkMode ? '#475569' : '#E8E8E8'}`,
                  color: isDarkMode ? '#94a3b8' : '#3D5A80',
                  backgroundColor: 'transparent'
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmText === 'SİL') {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText('');
                    onLogout?.();
                  }
                }}
                className="flex-1 px-4 py-3 text-white rounded-xl transition-all"
                style={{ 
                  backgroundColor: '#EE6C4D',
                  opacity: deleteConfirmText === 'SİL' ? 1 : 0.5
                }}
                onMouseEnter={(e) => {
                  if (deleteConfirmText === 'SİL') {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Hesabı Kalıcı Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Info Modal */}
      {showRoleInfoModal && selectedRoleInfo !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div 
            className="rounded-3xl max-w-md w-full overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
          >
            <div 
              className="p-6 border-b"
              style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                background: isDarkMode
                  ? 'linear-gradient(90deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.08) 100%)'
                  : 'linear-gradient(90deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    Rol Bilgisi
                  </h3>
                  <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    Rol hakkında daha fazla bilgi
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Rol Özeti */}
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.1)',
                    border: '2px solid #EE6C4D'
                  }}
                >
                  {selectedRoleInfo === 1 && <Sprout className="w-10 h-10" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {selectedRoleInfo === 2 && <Footprints className="w-10 h-10" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {selectedRoleInfo === 3 && <Briefcase className="w-10 h-10" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {selectedRoleInfo === 4 && <Map className="w-10 h-10" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                  {selectedRoleInfo === 5 && <Crown className="w-10 h-10" style={{ color: isDarkMode ? 'white' : '#EE6C4D' }} />}
                </div>
                <h4 className="text-xl mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {selectedRoleInfo === 1 && 'Yeni Gelen'}
                  {selectedRoleInfo === 2 && 'Seyyah'}
                  {selectedRoleInfo === 3 && 'Gezgin'}
                  {selectedRoleInfo === 4 && 'Kaşif'}
                  {selectedRoleInfo === 5 && 'Konya Bilgesi'}
                </h4>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {selectedRoleInfo === 1 && '0-100 puan'}
                  {selectedRoleInfo === 2 && '101-500 puan'}
                  {selectedRoleInfo === 3 && '501-1500 puan'}
                  {selectedRoleInfo === 4 && '1501-3000 puan'}
                  {selectedRoleInfo === 5 && '3000+ puan'}
                </p>
              </div>

              {/* Yetkiler */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#22c55e' }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h5 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Yetkiler</h5>
                </div>
                <div 
                  className="rounded-xl p-4 space-y-2"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                    border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)'
                  }}
                >
                  {selectedRoleInfo === 1 && (
                    <>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>İçerikleri okuyabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Günde 3 yorum yapabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Temel profil düzenleme</span>
                      </div>
                    </>
                  )}
                  {selectedRoleInfo === 2 && (
                    <>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Entry (içerik) oluşturabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Günde 10 yorum yapabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>GençCoin kazanabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>İçerikleri favorilere ekleyebilme</span>
                      </div>
                    </>
                  )}
                  {selectedRoleInfo === 3 && (
                    <>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Sınırsız entry oluşturma</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Sınırsız yorum yapabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Artırılmış GençCoin kazanma (%20 bonus)</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Mesaj gönderebilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Özel profil rozetleri</span>
                      </div>
                    </>
                  )}
                  {selectedRoleInfo === 4 && (
                    <>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Tüm Gezgin yetkileri</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>İçerik moderasyonu (uygunsuz içerik bildirimi)</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Artırılmış GençCoin kazanma (%40 bonus)</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Premium profil temaları</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Öncelikli destek</span>
                      </div>
                    </>
                  )}
                  {selectedRoleInfo === 5 && (
                    <>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Tüm Kaşif yetkileri</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Tam moderasyon yetkileri</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Artırılmış GençCoin kazanma (%50 bonus)</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Özel "Konya Bilgesi" rozeti</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>İçerik önerileri yapabilme</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
                        <span>Özel etkinliklere erişim</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Kısıtlamalar */}
              {selectedRoleInfo < 5 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#EE6C4D' }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </div>
                    <h5 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>Kısıtlamalar</h5>
                  </div>
                  <div 
                    className="rounded-xl p-4 space-y-2"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(238, 108, 77, 0.15)' : 'rgba(238, 108, 77, 0.1)',
                      border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.4)' : '1px solid rgba(238, 108, 77, 0.3)'
                    }}
                  >
                    {selectedRoleInfo === 1 && (
                      <>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Entry oluşturamazsınız</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Günde maksimum 3 yorum</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Mesaj gönderemezsiniz</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>GençCoin kazanamazsınız</span>
                        </div>
                      </>
                    )}
                    {selectedRoleInfo === 2 && (
                      <>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Günde maksimum 10 yorum</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Moderasyon yetkileri yok</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Mesaj gönderemezsiniz</span>
                        </div>
                      </>
                    )}
                    {selectedRoleInfo === 3 && (
                      <>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Moderasyon yetkileri yok</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Premium profil temaları yok</span>
                        </div>
                      </>
                    )}
                    {selectedRoleInfo === 4 && (
                      <>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Kullanıcı yönetimi yetkisi yok</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EE6C4D' }} />
                          <span>Özel etkinliklere erişim yok</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {selectedRoleInfo === 5 && (
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                    border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.2)'
                  }}
                >
                  <p className="text-sm" style={{ color: '#22c55e' }}>
                    🎉 Bu rolde hiçbir kısıtlama bulunmamaktadır!
                  </p>
                </div>
              )}
            </div>

            <div 
              className="p-6 border-t flex gap-3"
              style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <button
                onClick={() => {
                  setShowRoleInfoModal(false);
                  setSelectedRoleInfo(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl transition-all hover:opacity-80"
                style={{ 
                  border: `2px solid ${isDarkMode ? '#475569' : '#E8E8E8'}`,
                  color: isDarkMode ? '#94a3b8' : '#3D5A80',
                  backgroundColor: 'transparent'
                }}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}