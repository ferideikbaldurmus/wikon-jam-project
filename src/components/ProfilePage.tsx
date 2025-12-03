import { useState, useRef } from 'react';
import { User, Coins, Trophy, BookOpen, MessageSquare, TrendingUp, Calendar, Award, Edit, Target, PenLine, Sparkles, Brain, Flame, Crown, ArrowRightLeft, ArrowRight, X, Save, Upload, Loader2, Check } from 'lucide-react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { getRoleName, getRolePermissions } from '../utils/roleUtils';
import { toast } from 'sonner@2.0.3';
import { useIsMobile } from './ui/use-mobile';

interface ProfilePageProps {
  language: Language;
  onNavigate?: (page: string) => void;
  onGoBack?: () => void;
  setLanguage: (lang: Language) => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  profileName?: string;
  profileUsername?: string;
  profileBio?: string;
  profileEmail?: string;
  gencKulturKartID?: string;
  profilePhotoUrl?: string;
  onUpdateProfile?: (name: string, username: string, bio: string, photoUrl?: string) => void;
  currentCoins?: number;
  onCoinUpdate?: (amount: number, action: string) => void;
  userRoleId?: number;
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

export function ProfilePage({ language, onNavigate, onGoBack, setLanguage, onMenuClick, onLogout, profileName = 'Ahmet Yılmaz', profileUsername = 'ahmetyilmaz', profileBio = '', profileEmail = '', gencKulturKartID = '', profilePhotoUrl = '', onUpdateProfile, currentCoins, onCoinUpdate, userRoleId = 1, isDarkMode = false, setIsDarkMode }: ProfilePageProps) {
  const t = useTranslation(language);
  const isMobile = useIsMobile();
  
  // Profile editing states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAmount, setConfirmAmount] = useState(0);
  const [confirmGkkPoints, setConfirmGkkPoints] = useState(0);
  
  // Transfer states
  const [isTransferring, setIsTransferring] = useState(false);
  const [showTransferSuccessModal, setShowTransferSuccessModal] = useState(false);
  const [transferredAmount, setTransferredAmount] = useState(0);
  const [transferredGkkPoints, setTransferredGkkPoints] = useState(0);
  const [showAmountInputModal, setShowAmountInputModal] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  
  // Temporary editing states
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleEditClick = () => {
    setEditName(profileName);
    setEditUsername(profileUsername);
    setEditBio(profileBio);
    setEditPhotoUrl(profilePhotoUrl);
    setIsEditModalOpen(true);
  };
  
  const handleSaveProfile = () => {
    onUpdateProfile?.(editName, editUsername, editBio, editPhotoUrl);
    setIsEditModalOpen(false);
    setShowSuccessModal(true);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          language === 'TR' ? '❌ Fotoğraf boyutu 5MB\'dan küçük olmalıdır!' : '❌ Photo size must be smaller than 5MB!',
          {
            style: {
              background: '#EE6C4D',
              color: 'white',
              border: '2px solid #d45a3a'
            },
            duration: 3000
          }
        );
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error(
          language === 'TR' ? '❌ Lütfen bir resim dosyası seçin!' : '❌ Please select an image file!',
          {
            style: {
              background: '#EE6C4D',
              color: 'white',
              border: '2px solid #d45a3a'
            },
            duration: 3000
          }
        );
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhotoUrl(reader.result as string);
        toast.success(
          language === 'TR' ? '✅ Fotoğraf yüklendi!' : '✅ Photo uploaded!',
          {
            style: {
              background: '#3D5A80',
              color: 'white',
              border: '2px solid #D0D0D0'
            },
            duration: 2000
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const userCoins = currentCoins || 2450;
  const userStats = [
    { label: language === 'TR' ? 'GençCoin' : 'GenCoin', value: userCoins.toLocaleString(), icon: Coins, color: '#EE6C4D', bgColor: 'rgba(238, 108, 77, 0.1)' },
    { label: t.cultureCardPoints, value: Math.floor(userCoins / 10).toString(), icon: Award, color: '#9E9E9E', bgColor: 'rgba(224, 224, 224, 0.3)' },
    { label: t.totalContributions, value: '38', icon: TrendingUp, color: '#3D5A80', bgColor: 'rgba(61, 90, 128, 0.1)' },
    { label: t.leadershipRank, value: '#6', icon: Trophy, color: '#EE6C4D', bgColor: 'rgba(238, 108, 77, 0.1)' }
  ];

  const recentActivities = [
    {
      type: 'wiki',
      title: 'Selçuk Üniversitesi Kampüs Rehberi',
      action: t.createdArticle,
      coins: 100,
      time: `2 ${t.daysAgo}`,
      category: t.campusLife
    },
    {
      type: 'discuss',
      title: 'Part-time iş arayanlar için tavsiyeler',
      action: t.commentedOn,
      coins: 10,
      time: `3 ${t.daysAgo}`,
      category: t.career
    },
    {
      type: 'wiki',
      title: 'Konya Ulaşım Rehberi',
      action: t.updatedArticle,
      coins: 30,
      time: `5 ${t.daysAgo}`,
      category: t.cityGuide
    },
    {
      type: 'discuss',
      title: 'Hafta sonu gezilecek yerler',
      action: t.startedDiscussion,
      coins: 20,
      time: `1 ${t.weeksAgo}`,
      category: t.social
    }
  ];

  const badges = [
    { name: language === 'TR' ? 'İlk Adım' : 'First Step', description: language === 'TR' ? 'İlk katkıyı yaptı' : 'Made first contribution', unlocked: true, icon: Target },
    { name: language === 'TR' ? 'Yazarlık' : 'Writing', description: language === 'TR' ? '5 makale yazdı' : 'Wrote 5 articles', unlocked: true, icon: PenLine },
    { name: language === 'TR' ? 'Sosyal Kelebek' : 'Social Butterfly', description: language === 'TR' ? '20 tartışmaya katıldı' : 'Joined 20 discussions', unlocked: true, icon: Sparkles },
    { name: language === 'TR' ? 'Bilge' : 'Wise', description: language === 'TR' ? '10 makale oluşturdu' : 'Created 10 articles', unlocked: false, icon: Brain },
    { name: language === 'TR' ? 'Trend Yaratıcı' : 'Trendsetter', description: language === 'TR' ? 'Bir gönderi 100+ beğeni aldı' : 'One post got 100+ likes', unlocked: false, icon: Flame },
    { name: language === 'TR' ? 'Yılın Öğrencisi' : 'Student of the Year', description: language === 'TR' ? 'Aylık lider oldu' : 'Became monthly leader', unlocked: false, icon: Crown }
  ];

  const allRoles = [
    { name: t.newComer, level: 1, minCoins: 0, multiplier: '1x' },
    { name: t.traveler, level: 2, minCoins: 100, multiplier: '1.2x' },
    { name: t.explorer, level: 3, minCoins: 500, multiplier: '1.5x' },
    { name: t.curiousExplorer, level: 4, minCoins: 1500, multiplier: '2x' },
    { name: t.konyaWise, level: 5, minCoins: 5000, multiplier: '3x' }
  ];
  
  // Determine current role based on userRoleId (active role from App state)
  const actualCurrentRoleIndex = userRoleId - 1;
  
  const roles = allRoles.map((role, index) => ({
    ...role,
    completed: index < actualCurrentRoleIndex,
    current: index === actualCurrentRoleIndex
  }));
  
  const permissions = getRolePermissions(userRoleId);

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
            <h2 className="flex items-center gap-2" style={{ color: isDarkMode ? '#ffffff' : '#293241' }}>
              <User className="w-7 h-7" style={{ color: '#EE6C4D' }} />
              {language === 'TR' ? 'Profil' : 'Profile'}
            </h2>
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

        {/* Profile Header */}
        <div 
          className="rounded-xl p-8 mb-2 text-white"
          style={{
            background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)'
          }}
        >
          <div className="relative mb-6">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center ring-4 ring-white/30">
                <User className="w-12 h-12" style={{ color: '#EE6C4D' }} />
              </div>
              <div>
                <h1 className="mb-2">{profileName}</h1>
                <p className="mb-2" style={{ color: 'rgba(224, 224, 224, 0.9)' }}>@{profileUsername}</p>
                {profileEmail && (
                  <p className="text-sm mb-2" style={{ color: 'rgba(224, 224, 224, 0.8)' }}>
                    📧 {profileEmail}
                  </p>
                )}
                {gencKulturKartID && (
                  <p className="text-sm mb-2" style={{ color: 'rgba(224, 224, 224, 0.8)' }}>
                    💳 {language === 'TR' ? 'GKK ID' : 'GCC ID'}: {gencKulturKartID}
                  </p>
                )}
                {profileBio && (
                  <p className="text-sm mb-2" style={{ color: 'rgba(240, 240, 240, 0.8)' }}>{profileBio}</p>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span 
                    className="px-3 py-1.5 backdrop-blur-sm rounded-full text-sm"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#e5e7eb' : '#4A6A90',
                      border: '1px solid',
                      borderColor: '#4A6A90'
                    }}
                  >
                    {getRoleName(userRoleId, language)}
                  </span>
                  <span 
                    className="px-3 py-1.5 backdrop-blur-sm rounded-full text-sm flex items-center gap-1.5"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#F07D60' : '#EE6C4D',
                      border: '1px solid',
                      borderColor: '#F07D60'
                    }}
                  >
                    <Trophy className="w-4 h-4" />
                    {permissions.multiplier}x {t.multiplier}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleEditClick}
              className="absolute top-2 right-2 px-4 py-1.5 backdrop-blur-sm rounded-full transition-colors flex items-center justify-center gap-1.5 text-xs z-10 min-w-[90px]"
              style={{ 
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">{language === 'TR' ? 'Düzenle' : 'Edit'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(224, 224, 224, 0.9)' }}>
            <Calendar className="w-4 h-4" />
            <span>{language === 'TR' ? 'Katılım Tarihi: Eylül 2024' : 'Joined: September 2024'}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {userStats.map((stat, index) => (
            <div key={index} className="rounded-xl p-5 shadow-sm" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
            }}>
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-sm mb-1" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{stat.label}</div>
              <div className="text-xl" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Transfer to Culture Card */}
        <div className="mb-8">
          <div 
            className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            style={{ 
              border: isDarkMode ? '1px solid rgba(238, 108, 77, 0.3)' : '1px solid rgba(238, 108, 77, 0.2)',
              background: isDarkMode 
                ? 'linear-gradient(135deg, #1e293b 0%, rgba(238, 108, 77, 0.05) 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, rgba(238, 108, 77, 0.02) 100%)',
            }}
          >
            {/* Decorative background element */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, #EE6C4D 0%, transparent 70%)',
                transform: 'translate(30%, -30%)'
              }}
            />
            
            <div className="flex items-center justify-between gap-6 relative z-10 flex-wrap lg:flex-nowrap">
              <div className="flex items-start gap-5 flex-1">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(238, 108, 77, 0.15) 0%, rgba(238, 108, 77, 0.05) 100%)',
                    boxShadow: '0 4px 12px rgba(238, 108, 77, 0.15)'
                  }}
                >
                  <ArrowRightLeft className="w-8 h-8" style={{ color: '#EE6C4D' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                      {language === 'TR' ? 'GençCoin → Kültür Kart Puanı' : 'GenCoin → Culture Card Points'}
                    </h3>
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: 'rgba(238, 108, 77, 0.1)',
                        color: '#EE6C4D'
                      }}
                    >
                      💳 {language === 'TR' ? 'Aktif' : 'Active'}
                    </span>
                  </div>
                  <p className="text-sm mb-2 leading-relaxed" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {language === 'TR' 
                      ? 'Kazandığınız coinleri anında kültür-sanat etkinliklerinde kullanabileceğiniz puanlara çevirin!' 
                      : 'Convert your earned coins into points you can use instantly for culture and art events!'}
                  </p>
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                    style={{ 
                      backgroundColor: 'rgba(238, 108, 77, 0.08)',
                      border: '1px solid rgba(238, 108, 77, 0.2)'
                    }}
                  >
                    <span style={{ color: '#EE6C4D' }}>⚡</span>
                    <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {language === 'TR' 
                        ? 'Dönüşüm: 10 GençCoin = 1 GKK Puan' 
                        : 'Rate: 10 GenCoin = 1 GCC Point'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowAmountInputModal(true)}
                className="px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2.5 shadow-md hover:shadow-xl active:scale-95 flex-shrink-0 relative overflow-hidden group/btn"
                style={{ 
                  background: 'linear-gradient(135deg, #EE6C4D 0%, #d45a3a 100%)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #d45a3a 0%, #c24d2e 100%)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #EE6C4D 0%, #d45a3a 100%)';
                }}
              >
                {/* Button shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />
                <Coins className="w-5 h-5 relative z-10" />
                <span className="relative z-10">
                  {language === 'TR' ? 'Aktar' : 'Transfer'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activities */}
            <div className="rounded-xl shadow-sm p-6" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
            }}>
              <h2 className="mb-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{t.recentActivity}</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: activity.type === 'wiki' ? 'rgba(61, 90, 128, 0.1)' : 'rgba(224, 224, 224, 0.3)'
                      }}
                    >
                      {activity.type === 'wiki' ? (
                        <BookOpen className="w-6 h-6" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
                      ) : (
                        <MessageSquare className="w-6 h-6" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{activity.title}</h3>
                        <span className="text-sm whitespace-nowrap ml-2" style={{ color: '#EE6C4D' }}>
                          +{activity.coins} coin
                        </span>
                      </div>
                      <p className="mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{activity.action}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span 
                          className="px-3 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: 'transparent',
                            color: isDarkMode ? '#e5e7eb' : '#4A6A90',
                            border: '1px solid',
                            borderColor: '#4A6A90'
                          }}
                        >
                          {activity.category}
                        </span>
                        <span style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Path */}
            <div className="rounded-xl shadow-sm p-6" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
            }}>
              <h2 className="mb-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{language === 'TR' ? 'Rol İlerleme Yolu' : 'Role Progress Path'}</h2>
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="relative mt-[0px] mr-[0px] mb-[2px] ml-[0px] m-[0px]">
                    <div 
                      className="flex items-center gap-4 p-4 rounded-lg border-2 transition-all"
                      style={{
                        borderColor: role.current 
                          ? '#F07D60' 
                          : role.completed 
                          ? '#4A6A90' 
                          : isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(74, 106, 144, 0.4)',
                        borderRadius: '0.75rem',
                        borderWidth: '1px',
                        backgroundColor: 'transparent',
                        color: isDarkMode ? '#e5e7eb' : '#293241'
                      }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: role.current
                            ? 'transparent'
                            : role.completed
                            ? 'transparent'
                            : 'transparent',
                          border: role.current
                            ? '1px solid #F07D60'
                            : role.completed
                            ? '1px solid #4A6A90'
                            : '1px solid rgba(74, 106, 144, 0.4)',
                          color: role.current 
                            ? '#F07D60'
                            : role.completed
                            ? '#4A6A90'
                            : isDarkMode ? '#94a3b8' : '#9E9E9E'
                        }}
                      >
                        {role.completed ? '✓' : role.level}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 style={{
                            color: isDarkMode ? '#e5e7eb' : (role.current || role.completed ? '#293241' : '#9E9E9E')
                          }}>
                            {role.name}
                          </h3>
                          <span 
                            className="text-sm"
                            style={{
                              color: role.current || role.completed ? '#EE6C4D' : '#9E9E9E'
                            }}
                          >
                            {role.multiplier}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                          {role.minCoins} {language === 'TR' ? 'GençCoin' : 'GenCoin'} {role.current && (language === 'TR' ? '(Mevcut Seviye)' : '(Current Level)')}
                        </p>
                      </div>
                    </div>
                    {index < roles.length - 1 && (
                      <div 
                        className="w-0.5 h-6 ml-6"
                        style={{
                          backgroundColor: role.completed ? '#3D5A80' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="rounded-xl shadow-sm p-6" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
            }}>
              <h2 className="mb-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{language === 'TR' ? 'Rozetler' : 'Badges'}</h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                    <div
                    key={index}
                    className="p-4 rounded-lg text-center transition-all"
                    style={{
                      border: '1px solid',
                      borderColor: badge.unlocked ? '#F07D60' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                      backgroundColor: 'transparent',
                      opacity: badge.unlocked ? 1 : 0.5
                    }}
                  >
                    <div className="flex justify-center mb-2">
                      <badge.icon 
                        className="w-8 h-8" 
                        style={{ color: badge.unlocked ? '#EE6C4D' : '#9E9E9E' }} 
                      />
                    </div>
                    <div className="text-sm mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{badge.name}</div>
                    <div className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl shadow-sm p-6" style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
            }}>
              <h2 className="mb-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{language === 'TR' ? 'Katkı İstatistikleri' : 'Contribution Statistics'}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                  <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Bilgi Alanı Makalesi' : 'Knowledge Area Articles'}</span>
                  <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>12</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                  <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Tartışma Başlattı' : 'Discussions Started'}</span>
                  <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>8</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                  <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Yorum Yaptı' : 'Comments Made'}</span>
                  <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{language === 'TR' ? 'Aldığı Beğeni' : 'Likes Received'}</span>
                  <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div 
            className="rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="sticky top-0 flex items-center justify-between p-6 border-b"
              style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                zIndex: 10
              }}
            >
              <h2 className="flex items-center gap-2" style={{ color: isDarkMode ? '#f7fafc' : '#293241' }}>
                <Edit className="w-6 h-6" style={{ color: '#EE6C4D' }} />
                {language === 'TR' ? 'Profili Düzenle' : 'Edit Profile'}
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="transition-all hover:opacity-70 active:scale-95"
                style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center ring-4 overflow-hidden relative"
                  style={{ 
                    backgroundColor: 'rgba(238, 108, 77, 0.1)',
                    ringColor: isDarkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(208, 208, 208, 0.5)'
                  }}
                >
                  {editPhotoUrl ? (
                    <img 
                      src={editPhotoUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12" style={{ color: '#EE6C4D' }} />
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-4 py-2 rounded-lg transition-all hover:opacity-80 flex items-center gap-2"
                  style={{ 
                    backgroundColor: isDarkMode ? '#334155' : 'rgba(224, 224, 224, 0.3)',
                    color: isDarkMode ? '#cbd5e0' : '#3D5A80'
                  }}
                >
                  <Upload className="w-4 h-4" />
                  {language === 'TR' ? 'Fotoğraf Değiştir' : 'Change Photo'}
                </button>
              </div>

              {/* Name Field */}
              <div>
                <label className="block mb-2 text-sm" style={{ color: isDarkMode ? '#cbd5e0' : '#3D5A80' }}>
                  {language === 'TR' ? 'Ad Soyad' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all"
                  style={{
                    borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#f7fafc' : '#293241'
                  }}
                  onFocus={(e) => e.target.style.borderColor = isDarkMode ? '#64748b' : '#D0D0D0'}
                  onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)'}
                  placeholder={language === 'TR' ? 'Adınızı girin' : 'Enter your name'}
                />
              </div>

              {/* Username Field */}
              <div>
                <label className="block mb-2 text-sm" style={{ color: isDarkMode ? '#cbd5e0' : '#3D5A80' }}>
                  {language === 'TR' ? 'Kullanıcı Adı' : 'Username'}
                </label>
                <div className="relative">
                  <span 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}
                  >
                    @
                  </span>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border-2 outline-none transition-all"
                    style={{
                      borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)',
                      backgroundColor: isDarkMode ? '#0f172a' : 'white',
                      color: isDarkMode ? '#f7fafc' : '#293241'
                    }}
                    onFocus={(e) => e.target.style.borderColor = isDarkMode ? '#64748b' : '#D0D0D0'}
                    onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)'}
                    placeholder={language === 'TR' ? 'kullaniciadi' : 'username'}
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div>
                <label className="block mb-2 text-sm" style={{ color: isDarkMode ? '#cbd5e0' : '#3D5A80' }}>
                  {language === 'TR' ? 'Bio' : 'Bio'}
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all resize-none"
                  style={{
                    borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#f7fafc' : '#293241',
                    minHeight: '100px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = isDarkMode ? '#64748b' : '#D0D0D0'}
                  onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)'}
                  placeholder={language === 'TR' ? 'Kendiniz hakkında birkaç şey yazın...' : 'Write something about yourself...'}
                  maxLength={200}
                />
                <div className="text-xs mt-1 text-right" style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}>
                  {editBio.length}/200
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div 
              className="sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t"
              style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                backgroundColor: isDarkMode ? '#1e293b' : 'white'
              }}
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-3 rounded-lg transition-all hover:opacity-80"
                style={{
                  backgroundColor: isDarkMode ? '#334155' : 'rgba(224, 224, 224, 0.3)',
                  color: isDarkMode ? '#cbd5e0' : '#3D5A80'
                }}
              >
                {language === 'TR' ? 'İptal' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-lg transition-all hover:opacity-90 flex items-center gap-2"
                style={{
                  backgroundColor: '#EE6C4D',
                  color: 'white'
                }}
              >
                <Save className="w-5 h-5" />
                {language === 'TR' ? 'Kaydet' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full"
            style={{ 
              backgroundColor: isDarkMode ? '#293241' : '#2a2a2a',
              border: '2px solid rgba(61, 90, 128, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern Modal Content */}
            <div className="p-8 space-y-6 text-center">
              {/* Logo/Icon Area */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                    boxShadow: '0 8px 20px rgba(61, 90, 128, 0.4)'
                  }}
                >
                  <Coins className="w-10 h-10" style={{ color: '#EE6C4D' }} />
                </div>
              </div>

              {/* Balance Info */}
              <p className="text-xl" style={{ color: 'white' }}>
                {language === 'TR' ? 'Mevcut Bakiye:' : 'Current Balance:'} <strong>{userCoins} GençCoin</strong>
              </p>

              {/* OK Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 rounded-xl transition-all hover:shadow-lg active:scale-95 relative overflow-hidden group"
                style={{ 
                  background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                  color: 'white',
                  border: '2px solid rgba(61, 90, 128, 0.5)'
                }}
              >
                <span className="relative z-10">OK</span>
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onClick={() => setShowConfirmModal(false)}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full"
            style={{ 
              backgroundColor: isDarkMode ? '#293241' : '#2a2a2a',
              border: '2px solid rgba(61, 90, 128, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern Modal Content */}
            <div className="p-8 space-y-6 text-center">
              {/* Logo/Icon Area */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                    boxShadow: '0 8px 20px rgba(61, 90, 128, 0.4)'
                  }}
                >
                  <Coins className="w-10 h-10" style={{ color: '#EE6C4D' }} />
                </div>
              </div>

              {/* Balance Info */}
              <p className="text-xl" style={{ color: 'white' }}>
                {language === 'TR' ? 'Mevcut Bakiye:' : 'Current Balance:'} <strong>{userCoins} GençCoin</strong>
              </p>

              {/* Transfer Info */}
              <p className="text-lg" style={{ color: 'white' }}>
                {language === 'TR' ? 'Aktarılacak Miktar:' : 'Amount to Transfer:'} <strong>{confirmAmount} GençCoin</strong>
              </p>
              <p className="text-lg" style={{ color: 'white' }}>
                {language === 'TR' ? 'Elde Edilecek GKK Puanı:' : 'GKK Points to Receive:'} <strong>{confirmGkkPoints} GKK Puan</strong>
              </p>

              {/* Cancel Button */}
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-4 rounded-xl transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#C8C8C8',
                  color: '#2a2a2a'
                }}
              >
                {language === 'TR' ? 'İptal' : 'Cancel'}
              </button>

              {/* Confirm Button */}
              <button
                onClick={async () => {
                  setShowConfirmModal(false);
                  setIsTransferring(true);
                  
                  // Simulate loading delay
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  
                  // Transfer işlemini gerçekleştir
                  if (onCoinUpdate) {
                    onCoinUpdate(-confirmAmount, 'transfer_to_gkk');
                  }
                  
                  // Set transferred amounts for success modal
                  setTransferredAmount(confirmAmount);
                  setTransferredGkkPoints(confirmGkkPoints);
                  
                  setIsTransferring(false);
                  setShowTransferSuccessModal(true);
                }}
                className="w-full py-4 rounded-xl transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#EE6C4D',
                  color: 'white'
                }}
              >
                {language === 'TR' ? 'Onayla' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Success Modal */}
      {showTransferSuccessModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)'
          }}
          onClick={() => setShowTransferSuccessModal(false)}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
            style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              border: `2px solid ${isDarkMode ? 'rgba(238, 108, 77, 0.3)' : 'rgba(238, 108, 77, 0.2)'}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative background */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 opacity-10"
              style={{
                background: 'radial-gradient(circle, #EE6C4D 0%, transparent 70%)',
                transform: 'translate(30%, -30%)'
              }}
            />

            {/* Modal Content */}
            <div className="p-8 space-y-6 text-center relative z-10">
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
                  style={{ 
                    background: 'linear-gradient(135deg, #EE6C4D 0%, #d45a3a 100%)',
                    boxShadow: '0 8px 20px rgba(238, 108, 77, 0.4)'
                  }}
                >
                  <Check className="w-12 h-12 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Success Message */}
              <h2 
                className="text-3xl mb-2"
                style={{ color: isDarkMode ? '#ffffff' : '#293241' }}
              >
                {language === 'TR' ? '🎉 Başarılı!' : '🎉 Success!'}
              </h2>

              {/* Transfer Info Card */}
              <div 
                className="rounded-2xl p-6 space-y-4"
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, rgba(238, 108, 77, 0.1) 0%, rgba(238, 108, 77, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(238, 108, 77, 0.08) 0%, rgba(238, 108, 77, 0.03) 100%)',
                  border: `1px solid ${isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.15)'}`
                }}
              >
                {/* Transferred Amount */}
                <div className="pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.15)' }}>
                  <p className="text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {language === 'TR' ? 'Aktarılan Miktar' : 'Transferred Amount'}
                  </p>
                  <p className="text-2xl" style={{ color: '#EE6C4D' }}>
                    <strong>{transferredAmount}</strong> GençCoin
                  </p>
                </div>

                {/* Received Points */}
                <div className="pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(238, 108, 77, 0.2)' : 'rgba(238, 108, 77, 0.15)' }}>
                  <p className="text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {language === 'TR' ? 'Elde Edilen GKK Puanı' : 'Received GKK Points'}
                  </p>
                  <p className="text-2xl" style={{ color: '#3D5A80' }}>
                    <strong>+{transferredGkkPoints}</strong> GKK Puan
                  </p>
                </div>

                {/* New Balance */}
                <div>
                  <p className="text-sm mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {language === 'TR' ? 'Yeni Bakiyeniz' : 'New Balance'}
                  </p>
                  <p className="text-xl" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    <strong>{userCoins}</strong> GençCoin
                  </p>
                </div>
              </div>

              {/* OK Button */}
              <button
                onClick={() => setShowTransferSuccessModal(false)}
                className="w-full py-4 rounded-xl transition-all hover:shadow-lg active:scale-95 relative overflow-hidden group"
                style={{ 
                  background: 'linear-gradient(135deg, #EE6C4D 0%, #d45a3a 100%)',
                  color: 'white',
                  border: '2px solid rgba(238, 108, 77, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  {language === 'TR' ? 'Harika!' : 'Great!'}
                </span>
                {/* Shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {isTransferring && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)'
          }}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full"
            style={{ 
              backgroundColor: isDarkMode ? '#293241' : '#2a2a2a',
              border: '2px solid rgba(61, 90, 128, 0.3)'
            }}
          >
            {/* Modern Modal Content */}
            <div className="p-8 space-y-6 text-center">
              {/* Loading Icon */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                    boxShadow: '0 8px 20px rgba(61, 90, 128, 0.4)'
                  }}
                >
                  <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#EE6C4D' }} />
                </div>
              </div>

              {/* Loading Message */}
              <h2 className="text-2xl" style={{ color: 'white' }}>
                {language === 'TR' ? 'Transfer Yapılıyor...' : 'Processing Transfer...'}
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {language === 'TR' ? 'Lütfen bekleyin...' : 'Please wait...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Amount Input Modal */}
      {showAmountInputModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onClick={() => setShowAmountInputModal(false)}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full"
            style={{ 
              backgroundColor: isDarkMode ? '#293241' : '#2a2a2a',
              border: '2px solid rgba(61, 90, 128, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern Modal Content */}
            <div className="p-8 space-y-6 text-center">
              {/* Logo/Icon Area */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                    boxShadow: '0 8px 20px rgba(61, 90, 128, 0.4)'
                  }}
                >
                  <Coins className="w-10 h-10" style={{ color: '#EE6C4D' }} />
                </div>
              </div>

              {/* Balance Info */}
              <p className="text-xl" style={{ color: 'white' }}>
                {language === 'TR' ? 'Mevcut Bakiye:' : 'Current Balance:'} <strong>{userCoins} GençCoin</strong>
              </p>

              {/* Amount Input */}
              <div className="relative">
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 outline-none transition-all"
                  style={{
                    borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)',
                    backgroundColor: isDarkMode ? '#0f172a' : 'white',
                    color: isDarkMode ? '#f7fafc' : '#293241'
                  }}
                  onFocus={(e) => e.target.style.borderColor = isDarkMode ? '#64748b' : '#D0D0D0'}
                  onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.2)'}
                  placeholder={language === 'TR' ? 'Aktarılacak miktarı girin' : 'Enter the amount to transfer'}
                />
                <span 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}
                >
                  GençCoin
                </span>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowAmountInputModal(false)}
                className="w-full py-4 rounded-xl transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#C8C8C8',
                  color: '#2a2a2a'
                }}
              >
                {language === 'TR' ? 'İptal' : 'Cancel'}
              </button>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  const amount = parseInt(inputAmount, 10);
                  if (isNaN(amount) || amount <= 0 || amount > userCoins) {
                    toast.error(
                      language === 'TR' ? 'Geçersiz miktar!' : 'Invalid amount!',
                      {
                        style: {
                          background: '#EE6C4D',
                          color: 'white',
                          border: '2px solid #d45a3a'
                        },
                        duration: 3000
                      }
                    );
                    return;
                  }
                  
                  setShowAmountInputModal(false);
                  setConfirmAmount(amount);
                  setConfirmGkkPoints(Math.floor(amount / 10));
                  setShowConfirmModal(true);
                }}
                className="w-full py-4 rounded-xl transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: '#EE6C4D',
                  color: 'white'
                }}
              >
                {language === 'TR' ? 'Onayla' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}