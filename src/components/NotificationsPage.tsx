import { Bell, TrendingUp, MessageSquare, Trophy, Coins, CheckCircle, X, Award, UserPlus, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Language } from '../utils/translations';
import { SearchHeader } from './SearchHeader';

interface Notification {
  id: number;
  type: 'coin' | 'trending' | 'comment' | 'level' | 'achievement' | 'follow';
  icon: any;
  title: string;
  message: string;
  detailedContent?: string;
  time: string;
  read: boolean;
}

interface NotificationsPageProps {
  onNavigate?: (page: string) => void;
  onGoBack?: () => void;
  language: Language;
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

export function NotificationsPage({ onNavigate, onGoBack, language, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, isDarkMode = false, setIsDarkMode }: NotificationsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'comments' | 'rewards'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'coin',
      icon: Coins,
      title: 'GençCoin Kazandın!',
      message: 'Selçuk Üniversitesi Yemekhaneleri başlığına katkın için 50 GençCoin kazandın.',
      detailedContent: 'Selçuk Üniversitesi Yemekhaneleri başlığına yaptığın detaylı ve faydalı katkı için 50 GençCoin kazandın! Toplam coin bakiyen artık 450 oldu. Kaşif seviyesine ulaşmak için 550 coin daha topla.',
      time: '5 dakika önce',
      read: false
    },
    {
      id: 2,
      type: 'trending',
      icon: TrendingUp,
      title: 'Gönderin Trend Oldu!',
      message: '"Konya\'da En İyi Kahve Mekanları" başlığın 100+ beğeni aldı.',
      detailedContent: 'Tebrikler! "Konya\'da En İyi Kahve Mekanları" başlığın 100\'den fazla beğeni aldı ve trend listesine girdi. Bu başlık aynı zamanda en çok yorumlanan içerikler arasında 3. sırada yer alıyor. Devam et!',
      time: '1 saat önce',
      read: false
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageSquare,
      title: 'Yeni Yorum',
      message: 'Ahmet Yılmaz "Barınma Rehberi" başlığına yorum yaptı.',
      detailedContent: 'Ahmet Yılmaz: "Çok detaylı bir rehber olmuş, özellikle kira fiyatları konusunda gerçekçi bilgiler vermişsiniz. Teşekkürler! Meram bölgesi için de bilgi ekleyebilir misiniz?"',
      time: '2 saat önce',
      read: false
    },
    {
      id: 7,
      type: 'achievement',
      icon: Award,
      title: 'Yeni Başarı Kazanıldı!',
      message: 'İlk 10 katkı rozetini kazandın! 25 GençCoin bonus aldın.',
      detailedContent: 'Harika! İlk 10 katkını tamamlayarak "İlk Adımlar" rozetini kazandın. Bu özel rozet profil sayfanda görüntülenecek. Bonus olarak 25 GençCoin hesabına eklendi.',
      time: '3 saat önce',
      read: false
    },
    {
      id: 8,
      type: 'comment',
      icon: MessageSquare,
      title: 'Yeni Yorum',
      message: 'Zeynep Kaya "Part-Time İş Fırsatları" başlığına yorum yaptı.',
      detailedContent: 'Zeynep Kaya: "Kampüste çalışma imkanları hakkında bilgi paylaşımınız çok işime yaradı. İş başvurusu yapmadan önce nelere dikkat etmem gerektiğini öğrendim. Elinize sağlık!"',
      time: '4 saat önce',
      read: false
    },
    {
      id: 9,
      type: 'follow',
      icon: UserPlus,
      title: 'Yeni Takipçi',
      message: 'Mehmet Aydın ve 3 kişi daha seni takip etmeye başladı.',
      detailedContent: 'Mehmet Aydın, Ayşe Yıldız, Can Öztürk ve Selin Demir seni takip etmeye başladı. Kaliteli içeriklerinle topluluğa değer katmaya devam et!',
      time: '5 saat önce',
      read: false
    },
    {
      id: 10,
      type: 'coin',
      icon: Coins,
      title: 'GençCoin Kazandın!',
      message: 'Akademik Takvim başlığına katkın için 40 GençCoin kazandın.',
      detailedContent: 'Akademik Takvim başlığına yaptığın güncel ve doğru bilgi katkısı için 40 GençCoin kazandın. Bu tür güncel bilgiler topluluğumuza büyük değer katıyor!',
      time: '6 saat önce',
      read: false
    },
    {
      id: 11,
      type: 'trending',
      icon: TrendingUp,
      title: 'Yorumun Beğenildi!',
      message: 'Kampüs Etkinlikleri başlığındaki yorumun 50+ beğeni aldı.',
      detailedContent: 'Kampüs Etkinlikleri başlığında yaptığın yorum 50\'den fazla beğeni aldı! Yorumun diğer öğrenciler için çok faydalı olmuş.',
      time: '7 saat önce',
      read: false
    },
    {
      id: 12,
      type: 'comment',
      icon: MessageSquare,
      title: 'Yeni Yorum',
      message: 'Fatma Şahin "Konya Ulaşım Rehberi" başlığına yorum yaptı.',
      detailedContent: 'Fatma Şahin: "Tramvay saatleri ve güzergahlar hakkında verdiğiniz bilgiler tam aradığım şeydi. Kampüse nasıl gideceğimi artık çok daha iyi biliyorum. Teşekkürler!"',
      time: '8 saat önce',
      read: false
    },
    {
      id: 13,
      type: 'coin',
      icon: Coins,
      title: 'Bonus GençCoin!',
      message: 'Haftanın en aktif kullanıcısı oldun! 100 GençCoin bonus kazandın.',
      detailedContent: 'Tebrikler! Bu hafta platformda en aktif kullanıcı sendin. Toplamda 12 başlığa katkı yaptın ve 45 yorum aldın. Bonus olarak 100 GençCoin hesabına tanımlandı!',
      time: '10 saat önce',
      read: false
    },
    {
      id: 4,
      type: 'level',
      icon: Trophy,
      title: 'Seviye Atlama Yaklaşıyor!',
      message: 'Kaşif seviyesine ulaşmak için sadece 550 coin kaldı!',
      detailedContent: 'Harika ilerliyorsun! Kaşif seviyesine ulaşman için sadece 550 coin kaldı. Bu seviyeye ulaştığında özel rozetler, öncelikli destek ve ek özellikler kazanacaksın.',
      time: '3 saat önce',
      read: true
    },
    {
      id: 5,
      type: 'coin',
      icon: Coins,
      title: 'GençCoin Kazandın!',
      message: 'Kampüs Yaşamı kategorisine katkın için 30 GençCoin kazandın.',
      detailedContent: 'Kampüs Yaşamı kategorisine yaptığın katkı için 30 GençCoin kazandın. Bu coinleri Genç Kültür Kart puanına dönüştürebilir veya platformda özel özellikler için kullanabilirsin.',
      time: '1 gün önce',
      read: true
    },
    {
      id: 6,
      type: 'comment',
      icon: MessageSquare,
      title: 'Yeni Yorum',
      message: 'Elif Demir "Part-Time İş İlanları" başlığına yorum yaptı.',
      detailedContent: 'Elif Demir: "Paylaştığınız iş ilanları gerçekten güncel ve güvenilir. Özellikle kampüs içi çalışma imkanları benim için çok faydalı oldu. Devam edin!"',
      time: '1 gün önce',
      read: true
    }
  ]);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // 500ms sonra okundu işaretle
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }, 500);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'comments') return notification.type === 'comment';
    if (filter === 'rewards') return notification.type === 'coin' || notification.type === 'level' || notification.type === 'achievement';
    return true;
  });

  return (
    <>
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

        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onGoBack}
            className="mb-4 flex items-center gap-2 transition-all hover:opacity-70 active:scale-95 ml-auto"
            style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
          >
            <span>Geri</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-start justify-between mb-2">
              <h1 className="flex items-center gap-3" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                <Bell className="w-8 h-8" style={{ color: '#EE6C4D' }} />
                Bildirimler
              </h1>
              {unreadCount > 0 && (
                <span 
                  className="px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  {unreadCount} yeni
                </span>
              )}
            </div>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
              Tüm bildirimleriniz burada görüntülenir
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === 'all'
                  ? 'shadow-lg'
                  : 'bg-white hover:shadow-md'
              }`}
              style={filter === 'all' ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'}`,
                color: isDarkMode ? '#e5e7eb' : '#293241'
              }}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === 'unread'
                  ? 'shadow-lg'
                  : 'bg-white hover:shadow-md'
              }`}
              style={filter === 'unread' ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'}`,
                color: isDarkMode ? '#e5e7eb' : '#293241'
              }}
            >
              Okunmamış
            </button>
            <button
              onClick={() => setFilter('comments')}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === 'comments'
                  ? 'shadow-lg'
                  : 'bg-white hover:shadow-md'
              }`}
              style={filter === 'comments' ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'}`,
                color: isDarkMode ? '#e5e7eb' : '#293241'
              }}
            >
              Yorumlar
            </button>
            <button
              onClick={() => setFilter('rewards')}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === 'rewards'
                  ? 'shadow-lg'
                  : 'bg-white hover:shadow-md'
              }`}
              style={filter === 'rewards' ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'}`,
                color: isDarkMode ? '#e5e7eb' : '#293241'
              }}
            >
              Ödüller
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button 
              className="transition-all hover:opacity-80 active:scale-95 active:opacity-60 flex items-center gap-2"
              style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              <CheckCircle className="w-5 h-5" />
              Tümünü Okundu İşaretle
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="rounded-xl p-5 shadow-sm hover:shadow-md transition-all border-2 cursor-pointer"
                style={{
                  borderColor: notification.read 
                    ? (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)') 
                    : (isDarkMode ? 'rgba(255,255,255,0.2)' : '#D0D0D0'),
                  backgroundColor: notification.read 
                    ? (isDarkMode ? '#1e293b' : 'white') 
                    : (isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(224, 224, 224, 0.3)')
                }}
              >
                <div className="flex gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 
                        notification.type === 'coin' ? 'rgba(238, 108, 77, 0.1)' :
                        notification.type === 'trending' ? 'rgba(224, 224, 224, 0.3)' :
                        notification.type === 'comment' ? 'rgba(61, 90, 128, 0.1)' :
                        notification.type === 'achievement' ? 'rgba(238, 108, 77, 0.15)' :
                        notification.type === 'follow' ? 'rgba(224, 224, 224, 0.3)' :
                        'rgba(224, 224, 224, 0.3)'
                    }}
                  >
                    <notification.icon 
                      className="w-6 h-6"
                      style={{
                        color: 
                          notification.type === 'coin' ? '#EE6C4D' :
                          notification.type === 'trending' ? '#9E9E9E' :
                          notification.type === 'comment' ? '#3D5A80' :
                          notification.type === 'achievement' ? '#EE6C4D' :
                          notification.type === 'follow' ? '#9E9E9E' :
                          '#9E9E9E'
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                      {notification.title}
                    </h3>
                    <p className="mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {notification.message}
                    </p>
                    <span className="text-sm" style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}>
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedNotification && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(41, 50, 65, 0.8)' }}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 animate-scale-in"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
              style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <X className="w-5 h-5" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 
                    selectedNotification.type === 'coin' ? 'rgba(238, 108, 77, 0.1)' :
                    selectedNotification.type === 'trending' ? 'rgba(152, 193, 217, 0.15)' :
                    selectedNotification.type === 'comment' ? 'rgba(61, 90, 128, 0.1)' :
                    selectedNotification.type === 'achievement' ? 'rgba(238, 108, 77, 0.15)' :
                    selectedNotification.type === 'follow' ? 'rgba(152, 193, 217, 0.15)' :
                    'rgba(152, 193, 217, 0.15)'
                }}
              >
                <selectedNotification.icon 
                  className="w-10 h-10"
                  style={{
                    color: 
                      selectedNotification.type === 'coin' ? '#EE6C4D' :
                      selectedNotification.type === 'trending' ? '#9E9E9E' :
                      selectedNotification.type === 'comment' ? '#3D5A80' :
                      selectedNotification.type === 'achievement' ? '#EE6C4D' :
                      selectedNotification.type === 'follow' ? '#9E9E9E' :
                      '#9E9E9E'
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
              {selectedNotification.title}
            </h2>

            {/* Time */}
            <p className="text-center mb-6" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
              {selectedNotification.time}
            </p>

            {/* Detailed Content */}
            <div 
              className="rounded-xl p-6 mb-6"
              style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(240, 240, 240, 0.5)' }}
            >
              <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80', lineHeight: '1.8' }}>
                {selectedNotification.detailedContent || selectedNotification.message}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={closeModal}
              className="w-full py-4 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#3D5A80', color: 'white' }}
            >
              Anladım
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
