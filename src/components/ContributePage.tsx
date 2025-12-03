import { Plus, BookOpen, MessageSquare, FileText, Link, Coins, ArrowRight, PenLine, ShieldAlert, Upload, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { toast } from 'sonner@2.0.3';
import { getRolePermissions, calculateCoinReward } from '../utils/roleUtils';

interface ContributePageProps {
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
  onAddContribution?: (type: 'wiki' | 'discuss', title: string, category: string, content: string) => void;
  userRoleId?: number;
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

export function ContributePage({ onNavigate, onGoBack, language, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, onAddContribution, userRoleId = 1, isDarkMode = false, setIsDarkMode }: ContributePageProps) {
  const t = useTranslation(language);
  const [contributionType, setContributionType] = useState<'wiki' | 'discuss'>('wiki');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(language === 'TR' ? 'Akademik' : 'Academic');
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get role permissions
  const permissions = getRolePermissions(userRoleId);

  const coinRewards = [
    { action: 'Yeni Bilgi Alanı Makalesi', coins: 100, multiplier: true },
    { action: 'Makale Güncelleme', coins: 30, multiplier: true },
    { action: 'Yeni Tartışma Başlatma', coins: 20, multiplier: true },
    { action: 'Tartışmaya Yorum', coins: 10, multiplier: true },
    { action: 'Beğeni Alma (her 10 beğeni)', coins: 5, multiplier: false }
  ].map(reward => ({
    ...reward,
    actualCoins: reward.multiplier ? calculateCoinReward(reward.coins, userRoleId) : reward.coins
  }));

  const recentContributions = [
    { user: 'Ahmet Yılmaz', action: 'Selçuk Üniversitesi Kampüs Rehberi', type: 'wiki', coins: 100, time: '10 dk önce' },
    { user: 'Elif Demir', action: 'Part-time iş arayanlar için tavsiyeler', type: 'discuss', coins: 20, time: '25 dk önce' },
    { user: 'Mehmet Kaya', action: 'Konya Ulaşım Rehberi güncellendi', type: 'wiki', coins: 30, time: '1 saat önce' }
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
              <PenLine className="w-8 h-8" style={{ color: '#EE6C4D' }} />
              Katkı Yap
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
            Bilgini paylaş, GençCoin kazan ve topluluğa katkıda bulun
          </p>
        </div>

        {/* Contribution Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setContributionType('wiki')}
            className="p-6 rounded-xl border-2 transition-all"
            style={contributionType === 'wiki' ? {
              borderColor: '#3D5A80',
              backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.2)' : 'rgba(61, 90, 128, 0.05)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            } : {
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
              backgroundColor: isDarkMode ? '#1e293b' : 'white'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={contributionType === 'wiki' ? {
                  backgroundColor: '#3D5A80'
                } : {
                  backgroundColor: 'rgba(61, 90, 128, 0.1)'
                }}
              >
                <BookOpen className="w-8 h-8"
                  style={{ color: contributionType === 'wiki' ? 'white' : '#3D5A80' }}
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  Bilgi Alanı Makalesi
                </h3>
                <p className="mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Detaylı, güvenilir ve faydalı bilgi makaleleri oluştur
                </p>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5" style={{ color: '#EE6C4D' }} />
                  <span style={{ color: '#EE6C4D' }}>30-100 GençCoin</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setContributionType('discuss')}
            className="p-6 rounded-xl border-2 transition-all"
            style={contributionType === 'discuss' ? {
              borderColor: '#3D5A80',
              backgroundColor: isDarkMode ? 'rgba(61, 90, 128, 0.2)' : 'rgba(61, 90, 128, 0.05)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            } : {
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
              backgroundColor: isDarkMode ? '#1e293b' : 'white'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={contributionType === 'discuss' ? {
                  backgroundColor: '#3D5A80'
                } : {
                  backgroundColor: 'rgba(61, 90, 128, 0.1)'
                }}
              >
                <MessageSquare className="w-8 h-8"
                  style={{ color: contributionType === 'discuss' ? 'white' : '#3D5A80' }}
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  Yorum Alanı Tartışması
                </h3>
                <p className="mb-3" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  Deneyimlerini paylaş, soru sor ve tartışmalara katıl
                </p>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5" style={{ color: '#EE6C4D' }} />
                  <span style={{ color: '#EE6C4D' }}>10-20 GençCoin</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Contribution Form */}
        <div className="rounded-xl shadow-sm p-8 mb-8" style={{ 
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
        }}>
          <h2 className="mb-6" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
            {contributionType === 'wiki' ? 'Yeni Bilgi Alanı Makalesi' : 'Yeni Tartışma Başlat'}
          </h2>

          {/* Role Permission Warning */}
          {((contributionType === 'wiki' && !permissions.canEditDirectly && userRoleId < 2) || 
            (contributionType === 'discuss' && !permissions.canCreateTopic && userRoleId < 3)) && (
            <div className="mb-6 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', borderLeft: '4px solid #EE6C4D' }}>
              <ShieldAlert className="w-5 h-5 mt-0.5" style={{ color: '#EE6C4D' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#EE6C4D' }}>
                  {language === 'TR' ? 'Yetki Gerekli' : 'Permission Required'}
                </p>
                <p className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {contributionType === 'wiki' 
                    ? (language === 'TR' 
                      ? 'Bilgi Alanı makalesi oluşturmak için Seyyah (500+ coin) seviyesine ulaşmalısınız.' 
                      : 'You need to reach Traveler level (500+ coins) to create Knowledge Area articles.')
                    : (language === 'TR'
                      ? 'Yeni tartışma başlatmak için Gezgin (5000+ coin) seviyesine ulaşmalısınız.'
                      : 'You need to reach Explorer level (5000+ coins) to start new discussions.')
                  }
                </p>
                <button
                  onClick={() => onNavigate?.('roles')}
                  className="mt-2 text-sm underline"
                  style={{ color: '#EE6C4D' }}
                >
                  {language === 'TR' ? 'Roller sayfasına git →' : 'Go to Roles page →'}
                </button>
              </div>
            </div>
          )}

          <form className="space-y-6">
            {/* Category */}
            <div>
              <label className="block mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                Kategori
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              >
                <option value={language === 'TR' ? 'Akademik' : 'Academic'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.academic}</option>
                <option value={language === 'TR' ? 'Kampüs Yaşamı' : 'Campus Life'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.campusLife}</option>
                <option value={language === 'TR' ? 'Barınma' : 'Accommodation'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.accommodation}</option>
                <option value={language === 'TR' ? 'Kariyer' : 'Career'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.career}</option>
                <option value={language === 'TR' ? 'Sosyal' : 'Social'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.social}</option>
                <option value={language === 'TR' ? 'Şehir Rehberi' : 'City Guide'} style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', color: isDarkMode ? '#e5e7eb' : '#293241', padding: '8px' }}>{t.cityGuide}</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                Başlık
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={contributionType === 'wiki' ? 'Makale başlığını girin' : 'Tartışma konusunu girin'}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                İçerik
              </label>
              <textarea
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={contributionType === 'wiki' ? 'Makale içeriğini detaylı bir şekilde yazın...' : 'Düşüncelerinizi paylaşın...'}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                style={{
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                  backgroundColor: isDarkMode ? '#0f172a' : 'white',
                  color: isDarkMode ? '#e5e7eb' : '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              ></textarea>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(61, 90, 128, 0.02)', border: '1px solid', borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)' }}>
              <button 
                type="button" 
                className="p-2 rounded transition-colors" 
                style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)'}
                title="Link Ekle"
                onClick={() => {
                  const url = prompt('Link URL\'si girin:');
                  if (url) {
                    const text = prompt('Link metni girin:', 'Link');
                    if (text) {
                      setContent(prev => prev + `\n\n[${text}](${url})\n`);
                      toast.success('Link eklendi!', {
                        style: {
                          background: '#3D5A80',
                          color: 'white'
                        },
                        duration: 2000
                      });
                    }
                  }
                }}
              >
                <Link className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
              </button>
              <button 
                type="button" 
                className="p-2 rounded transition-colors" 
                style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(61, 90, 128, 0.05)'}
                title="Bilgisayardan Yükle"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                <Upload className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const fileList = Array.from(files);
                    setUploadedFiles(prev => [...prev, ...fileList]);
                    
                    // Dosya bilgilerini içeriğe ekle
                    let fileInfo = '\n\n### Yüklenen Dosyalar:\n';
                    fileList.forEach(file => {
                      fileInfo += `- 📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)\n`;
                    });
                    setContent(prev => prev + fileInfo);
                    
                    toast.success(`${fileList.length} dosya yüklendi!`, {
                      style: {
                        background: '#3D5A80',
                        color: 'white'
                      },
                      duration: 2000
                    });
                  }
                }}
              />
            </div>
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-4 rounded-lg border" style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(61, 90, 128, 0.02)'
              }}>
                <h4 className="mb-2 flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  <FileText className="w-4 h-4" style={{ color: '#3D5A80' }} />
                  Yüklenen Dosyalar ({uploadedFiles.length})
                </h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg" 
                      style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'white' }}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" style={{ color: '#3D5A80' }} />
                        <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{file.name}</span>
                        <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-red-100"
                        onClick={() => {
                          setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                          toast.success('Dosya kaldırıldı', {
                            style: {
                              background: '#3D5A80',
                              color: 'white'
                            },
                            duration: 2000
                          });
                        }}
                      >
                        <X className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between">
              <div style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                Bu katkı için kazanacağınız coin: 
                <span className="ml-2" style={{ color: '#EE6C4D' }}>
                  {contributionType === 'wiki' ? '100 GençCoin' : '20 GençCoin'}
                </span>
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-lg transition-all hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: isDarkMode ? '#3D5A80' : '#3D5A80',
                  color: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  
                  // Check permissions first
                  if (contributionType === 'wiki' && !permissions.canEditDirectly && userRoleId < 2) {
                    toast.error(
                      language === 'TR' 
                        ? '⚠️ Bilgi Alanı makalesi oluşturmak için Seyyah (Rol 2) seviyesine ulaşmalısınız!' 
                        : '⚠️ You need to reach Traveler (Role 2) level to create Knowledge Area articles!',
                      {
                        style: {
                          background: '#EE6C4D',
                          color: 'white'
                        }
                      }
                    );
                    return;
                  }

                  if (contributionType === 'discuss' && !permissions.canCreateTopic && userRoleId < 3) {
                    toast.error(
                      language === 'TR' 
                        ? '⚠️ Yeni tartışma başlatmak için Gezgin (Rol 3) seviyesine ulaşmalısınız!' 
                        : '⚠️ You need to reach Explorer (Role 3) level to start new discussions!',
                      {
                        style: {
                          background: '#EE6C4D',
                          color: 'white'
                        }
                      }
                    );
                    return;
                  }
                  
                  if (!title.trim() || !content.trim()) {
                    toast.error(
                      language === 'TR' 
                        ? 'Lütfen başlık ve içerik alanlarını doldurun!' 
                        : 'Please fill in title and content fields!',
                      {
                        style: {
                          background: '#EE6C4D',
                          color: 'white'
                        }
                      }
                    );
                    return;
                  }

                  const baseCoinAmount = contributionType === 'wiki' ? 100 : 20;
                  const coinAmount = calculateCoinReward(baseCoinAmount, userRoleId);
                  
                  // Add contribution to the list
                  if (onAddContribution) {
                    onAddContribution(contributionType, title, category, content);
                  }
                  
                  // Update coins with multiplier
                  if (onCoinUpdate) {
                    onCoinUpdate(coinAmount, contributionType === 'wiki' ? 'wiki_create' : 'discuss_create');
                  }
                  
                  // Show success message with multiplier info
                  toast.success(
                    language === 'TR' 
                      ? `🎉 ${contributionType === 'wiki' ? 'Makale' : 'Tartışma'} yayınlandı! +${coinAmount} GençCoin kazandın! (${permissions.multiplier}x çarpan)` 
                      : `🎉 ${contributionType === 'wiki' ? 'Article' : 'Discussion'} published! Earned +${coinAmount} GençCoin! (${permissions.multiplier}x multiplier)`,
                    {
                      style: {
                        background: '#3D5A80',
                        color: '#E0FBFC',
                        border: '2px solid #D0D0D0'
                      }
                    }
                  );
                  
                  // Clear form
                  setTitle('');
                  setContent('');
                  setCategory(language === 'TR' ? 'Akademik' : 'Academic');
                }}
              >
                Yayınla
              </button>
            </div>
          </form>
        </div>

        {/* Coin Rewards Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl shadow-sm p-6" style={{ 
            backgroundColor: isDarkMode ? '#1e293b' : 'white',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
          }}>
            <h3 className="mb-4 flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
              <Coins className="w-6 h-6" style={{ color: '#EE6C4D' }} />
              GençCoin Kazanma Tablosu
            </h3>
            <div className="space-y-3">
              {coinRewards.map((reward, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b last:border-0"
                  style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
                >
                  <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{reward.action}</span>
                  <div className="flex items-center gap-2">
                    {reward.multiplier ? (
                      <>
                        <span className="text-xs line-through" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80', opacity: 0.5 }}>{reward.coins}</span>
                        <span style={{ color: '#EE6C4D' }}>{reward.actualCoins} coin</span>
                        <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>({permissions.multiplier}x)</span>
                      </>
                    ) : (
                      <span style={{ color: '#EE6C4D' }}>{reward.coins} coin</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl shadow-sm p-6" style={{ 
            backgroundColor: isDarkMode ? '#1e293b' : 'white',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
          }}>
            <h3 className="mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
              Son Katkılar
            </h3>
            <div className="space-y-3">
              {recentContributions.map((contrib, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 py-2 border-b last:border-0"
                  style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: contrib.type === 'wiki' ? 'rgba(61, 90, 128, 0.1)' : 'rgba(224, 224, 224, 0.3)'
                    }}
                  >
                    {contrib.type === 'wiki' ? (
                      <BookOpen className="w-4 h-4" style={{ color: '#3D5A80' }} />
                    ) : (
                      <MessageSquare className="w-4 h-4" style={{ color: '#9E9E9E' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{contrib.user}</div>
                    <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{contrib.action}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: '#EE6C4D' }}>+{contrib.coins} coin</span>
                      <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{contrib.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}