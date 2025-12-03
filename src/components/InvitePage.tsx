import { UserPlus, Copy, Mail, Link2, Users, Gift, Check, Share2, Facebook, Twitter, MessageCircle, Coins, TrendingUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { toast } from 'sonner@2.0.3';

interface InvitePageProps {
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

export function InvitePage({ onNavigate, onGoBack, language, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, isDarkMode = false, setIsDarkMode }: InvitePageProps) {
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [invitesSent, setInvitesSent] = useState(12);
  const [recentInvites, setRecentInvites] = useState([
    { name: 'Zeynep Kaya', status: 'active' as const, date: '2 gün önce', coins: 50 },
    { name: 'Mehmet Çelik', status: 'active' as const, date: '5 gün önce', coins: 50 },
    { name: 'Ayşe Yılmaz', status: 'pending' as const, date: '1 hafta önce', coins: 0 },
    { name: 'Can Demir', status: 'active' as const, date: '2 hafta önce', coins: 50 }
  ]);

  const referralLink = 'https://konyagencwikisozluk.com/ref/ahmetyilmaz42';
  
  const activeInvites = recentInvites.filter(inv => inv.status === 'active').length;
  const totalCoinsEarned = recentInvites.reduce((sum, inv) => sum + inv.coins, 0);
  
  const inviteStats = [
    {
      icon: Users,
      label: 'Toplam Davet',
      value: invitesSent.toString(),
      color: '#3D5A80',
      bgColor: 'rgba(61, 90, 128, 0.1)',
      description: 'Gönderilen davet sayısı'
    },
    {
      icon: TrendingUp,
      label: 'Aktif Kullanıcı',
      value: activeInvites.toString(),
      color: '#9E9E9E',
      bgColor: 'rgba(224, 224, 224, 0.3)',
      description: 'Kayıt olan arkadaşlar'
    },
    {
      icon: Coins,
      label: 'Kazanılan Coin',
      value: totalCoinsEarned.toString(),
      color: '#EE6C4D',
      bgColor: 'rgba(238, 108, 77, 0.1)',
      description: 'Davetlerden kazanç'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback method
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        console.error('Kopyalama başarısız:', err2);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      // Extract name from email (everything before @)
      const emailName = emailInput.split('@')[0];
      const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      
      // Add new invite to the list
      const newInvite = {
        name: formattedName,
        status: 'pending' as const,
        date: 'Az önce',
        coins: 0
      };
      
      setRecentInvites([newInvite, ...recentInvites]);
      setInvitesSent(invitesSent + 1);
      setEmailInput('');
      
      // Award coins for sending an invite
      if (onCoinUpdate) {
        onCoinUpdate(15, 'invite_sent');
        toast.success(
          language === 'TR' 
            ? '🎉 Davet gönderildi! +15 GençCoin kazandın!' 
            : '🎉 Invite sent! Earned +15 GençCoin!',
          {
            style: {
              background: '#3D5A80',
              color: '#E0FBFC',
              border: '2px solid #D0D0D0'
            }
          }
        );
      }
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
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
            <UserPlus className="w-8 h-8" style={{ color: '#EE6C4D' }} />
            Arkadaşlarını Davet Et
          </h1>
        </div>
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 transition-all hover:opacity-70 active:scale-95 flex-shrink-0"
          style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
        >
          <span>Geri</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-2">
        <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
          Arkadaşlarını davet et, hem sen hem de onlar GençCoin kazansın!
        </p>
      </div>

      {/* Davet İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {inviteStats.map((stat, index) => (
          <div key={index} className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(61, 90, 128, 0.1)' }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.15)' : stat.bgColor }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="flex-1">
                <div className="text-2xl mb-1" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{stat.label}</div>
              </div>
            </div>
            <p className="text-xs mt-3" style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}>{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Davet Bilgi Kartı */}
      <div 
        className="rounded-xl p-6 mb-8 border-2" 
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(30, 41, 59, 0.3) 100%)'
            : 'linear-gradient(135deg, rgba(240, 240, 240, 0.5) 0%, rgba(224, 224, 224, 0.3) 100%)',
          borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(61, 90, 128, 0.2)'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#3D5A80' }}>
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>Davet Bonusu Kazan!</h3>
            <p className="mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
              Her başarılı davet için <span style={{ color: '#EE6C4D' }}>50 GençCoin</span> kazan. 
              Arkadaşın kayıt olup ilk katkısını yaptığında bonus aktif olur.
            </p>
            <div className="flex flex-wrap gap-2">
              <span 
                className="px-3 py-1 rounded-full text-sm border"
                style={{ 
                  backgroundColor: isDarkMode ? '#334155' : 'white',
                  color: isDarkMode ? '#e2e8f0' : '#293241', 
                  borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(61, 90, 128, 0.2)' 
                }}
              >
                ✨ Her davet = 50 Coin
              </span>
              <span 
                className="px-3 py-1 rounded-full text-sm border"
                style={{ 
                  backgroundColor: isDarkMode ? '#334155' : 'white',
                  color: isDarkMode ? '#e2e8f0' : '#293241', 
                  borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(61, 90, 128, 0.2)' 
                }}
              >
                🎯 Sınırsız davet hakkı
              </span>
              <span 
                className="px-3 py-1 rounded-full text-sm border"
                style={{ 
                  backgroundColor: isDarkMode ? '#334155' : 'white',
                  color: isDarkMode ? '#e2e8f0' : '#293241', 
                  borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(61, 90, 128, 0.2)' 
                }}
              >
                🚀 Hızlı coin kazanımı
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Referans Linki */}
        <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(61, 90, 128, 0.1)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(61, 90, 128, 0.1)' }}
            >
              <Link2 className="w-5 h-5" style={{ color: '#3D5A80' }} />
            </div>
            <h2 style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>Referans Linkin</h2>
          </div>
          
          <p className="text-sm mb-4" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
            Bu özel linki paylaşarak arkadaşlarını platforma davet et
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 border rounded-lg text-sm"
              style={{ 
                backgroundColor: isDarkMode ? '#334155' : 'rgba(240, 240, 240, 0.5)',
                borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(61, 90, 128, 0.15)',
                color: isDarkMode ? '#e2e8f0' : '#293241'
              }}
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 text-white rounded-lg transition-opacity hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: '#3D5A80' }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Kopyala</span>
                </>
              )}
            </button>
          </div>

          {/* Sosyal Medya Paylaşım */}
          <div className="pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
            <p className="text-sm mb-3" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>Sosyal medyada paylaş:</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => {
                  const newInvite = {
                    name: 'Facebook Kullanıcısı',
                    status: 'pending' as const,
                    date: 'Az önce',
                    coins: 0
                  };
                  setRecentInvites([newInvite, ...recentInvites]);
                  setInvitesSent(invitesSent + 1);
                  toast.success('🎉 Facebook\'ta paylaşıldı!', {
                    style: { background: '#3D5A80', color: '#E0FBFC', border: '2px solid #D0D0D0' }
                  });
                }}
                className="px-2 py-2 text-white rounded-lg transition-opacity hover:opacity-90 flex items-center justify-center gap-1 text-xs sm:text-sm"
                style={{ backgroundColor: '#3D5A80' }}
              >
                <Facebook className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">Facebook</span>
              </button>
              <button 
                onClick={() => {
                  const newInvite = {
                    name: 'Twitter Kullanıcısı',
                    status: 'pending' as const,
                    date: 'Az önce',
                    coins: 0
                  };
                  setRecentInvites([newInvite, ...recentInvites]);
                  setInvitesSent(invitesSent + 1);
                  toast.success('🎉 Twitter\'da paylaşıldı!', {
                    style: { background: '#3D5A80', color: '#E0FBFC', border: '2px solid #D0D0D0' }
                  });
                }}
                className="px-2 py-2 text-white rounded-lg transition-opacity hover:opacity-90 flex items-center justify-center gap-1 text-xs sm:text-sm"
                style={{ backgroundColor: '#D0D0D0' }}
              >
                <Twitter className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">Twitter</span>
              </button>
              <button 
                onClick={() => {
                  const newInvite = {
                    name: 'WhatsApp Kullanıcısı',
                    status: 'pending' as const,
                    date: 'Az önce',
                    coins: 0
                  };
                  setRecentInvites([newInvite, ...recentInvites]);
                  setInvitesSent(invitesSent + 1);
                  toast.success('🎉 WhatsApp\'ta paylaşıldı!', {
                    style: { background: '#3D5A80', color: '#E0FBFC', border: '2px solid #D0D0D0' }
                  });
                }}
                className="px-2 py-2 text-white rounded-lg transition-opacity hover:opacity-90 flex items-center justify-center gap-1 text-xs sm:text-sm"
                style={{ backgroundColor: '#EE6C4D' }}
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* E-posta ile Davet */}
        <div className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(61, 90, 128, 0.1)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(224, 224, 224, 0.3)' }}
            >
              <Mail className="w-5 h-5" style={{ color: '#9E9E9E' }} />
            </div>
            <h2 style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>E-posta ile Davet</h2>
          </div>

          <p className="text-sm mb-4" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
            Arkadaşlarının e-posta adreslerini girerek doğrudan davet gönder
          </p>

          <form onSubmit={handleSendEmail} className="mb-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ornek@email.com"
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 min-w-0"
                style={{
                  backgroundColor: isDarkMode ? '#334155' : 'white',
                  borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(61, 90, 128, 0.15)',
                  color: isDarkMode ? '#e2e8f0' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-3 text-white rounded-lg transition-opacity hover:opacity-90 flex items-center gap-2 flex-shrink-0"
                style={{ backgroundColor: '#3D5A80' }}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Gönder</span>
              </button>
            </div>
          </form>

          <div className="rounded-lg p-4" style={{ backgroundColor: isDarkMode ? '#334155' : 'rgba(224, 224, 224, 0.3)' }}>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#9E9E9E' }} />
              <div>
                <p className="text-sm mb-1" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  E-posta davetleri kişiselleştirilmiş olarak gönderilir
                </p>
                <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Arkadaşların senin adına özel bir davet mesajı alacak
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Son Davetler */}
      <div className="rounded-xl shadow-sm overflow-hidden" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(61, 90, 128, 0.1)' }}>
        <div className="p-6 border-b" style={{ borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
          <h2 className="flex items-center gap-2" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
            <Users className="w-6 h-6" style={{ color: '#3D5A80' }} />
            Davet Geçmişin
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: isDarkMode ? '#334155' : 'rgba(240, 240, 240, 0.5)' }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#94a3b8' : '#293241' }}>
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#94a3b8' : '#293241' }}>
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#94a3b8' : '#293241' }}>
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider" style={{ color: isDarkMode ? '#94a3b8' : '#293241' }}>
                  Kazanılan Coin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
              {recentInvites.map((invite, index) => (
                <tr 
                  key={index} 
                  className="transition-colors"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1e293b' : 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : 'white';
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #D0D0D0 0%, #3D5A80 100%)' }}
                      >
                        <span className="text-white text-sm">
                          {invite.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>{invite.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {invite.status === 'active' ? (
                      <span 
                        className="px-3 py-1 rounded-full text-sm inline-flex items-center gap-1"
                        style={{ backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(208, 208, 208, 0.5)', color: '#3D5A80' }}
                      >
                        <Check className="w-3 h-3" />
                        Aktif
                      </span>
                    ) : (
                      <span 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', color: '#EE6C4D' }}
                      >
                        Beklemede
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {invite.date}
                  </td>
                  <td className="px-6 py-4">
                    {invite.coins > 0 ? (
                      <span className="flex items-center gap-1" style={{ color: '#EE6C4D' }}>
                        <Coins className="w-4 h-4" />
                        {invite.coins}
                      </span>
                    ) : (
                      <span style={{ color: isDarkMode ? '#64748b' : '#9E9E9E', opacity: 0.5 }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentInvites.length === 0 && (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-3" style={{ color: isDarkMode ? '#64748b' : '#9E9E9E', opacity: 0.3 }} />
            <p style={{ color: isDarkMode ? '#64748b' : '#9E9E9E' }}>Henüz davet göndermedin</p>
            <p className="text-sm" style={{ color: isDarkMode ? '#64748b' : '#9E9E9E', opacity: 0.7 }}>Yukarıdaki yöntemlerle arkadaşlarını davet etmeye başla!</p>
          </div>
        )}
      </div>
    </main>
  );
}