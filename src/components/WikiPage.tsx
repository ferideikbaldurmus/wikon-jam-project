import { BookOpen, Search, TrendingUp, Clock, Star, Eye, ArrowRight, User, X, Edit, Coins, ShieldAlert, MessageCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SearchHeader } from './SearchHeader';
import { getRolePermissions, calculateCoinReward } from '../utils/roleUtils';

interface WikiPageProps {
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
  userContributions?: Array<{
    id: number;
    type: 'wiki' | 'discuss';
    title: string;
    category: string;
    content: string;
    timestamp: Date;
  }>;
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
}

export function WikiPage({ language, onNavigate, onGoBack, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, userContributions = [], isDarkMode = false, setIsDarkMode }: WikiPageProps) {
  const t = useTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState(t.allCategories);
  const [selectedArticle, setSelectedArticle] = useState<typeof wikiArticles[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
  // Get role permissions
  const permissions = getRolePermissions(userRoleId);
  
  const quickEditSuggestions = language === 'TR' ? [
    'Bilgileri güncelledim, tarihi kaynak ekledim',
    'Eksik bilgileri tamamladım',
    'Yazım hatalarını düzelttim',
    'Yeni kaynak ve link ekledim'
  ] : [
    'Updated information, added historical source',
    'Completed missing information',
    'Fixed spelling errors',
    'Added new sources and links'
  ];

  const wikiArticles = [
    {
      id: 1,
      title: 'Selçuk Üniversitesi Kampüs Rehberi',
      category: t.campusLife,
      description: 'Selçuk Üniversitesi kampüsünde bulunan tüm birimler, yemekhaneler, kütüphaneler ve sosyal alanlar hakkında detaylı bilgiler.',
      views: 1250,
      lastUpdated: `2 ${t.daysAgo}`,
      rating: 4.8,
      contributors: 12,
      image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NDI2NTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Zeynep Kaya', role: 'Kaşif', content: 'Çok faydalı bir rehber olmuş, özellikle yeni gelen öğrenciler için harika!', time: '3 saat önce' },
        { id: 2, author: 'Ahmet Yılmaz', role: 'Gezgin', content: 'Kütüphane bilgileri eksik, güncelleme yapılabilir mi?', time: '1 gün önce' },
        { id: 3, author: 'Elif Demir', role: 'Konya Bilgesi', content: 'Merkez kütüphane çalışma saatleri güncellendi, 08:00-22:00 arası açık.', time: '2 gün önce' }
      ]
    },
    {
      id: 2,
      title: 'Konya\'da Öğrenci Evleri ve Barınma',
      category: t.accommodation,
      description: 'Konya\'daki uygun fiyatlı öğrenci evleri, KYK yurtları, özel yurtlar ve ev bulma ipuçları.',
      views: 2340,
      lastUpdated: `3 ${t.daysAgo}`,
      rating: 4.5,
      contributors: 18,
      image: 'https://images.unsplash.com/photo-1707901625904-a3d2a30777f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXBhcnRtZW50JTIwaG91c2luZ3xlbnwxfHx8fDE3NjQzNDQ1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Mustafa Öztürk', role: 'Seyyah', content: 'Meram bölgesindeki evler daha uygun fiyatlı, tavsiye ederim.', time: '5 saat önce' },
        { id: 2, author: 'Ayşe Çelik', role: 'Gezgin', content: 'KYK başvuruları ne zaman başlıyor?', time: '12 saat önce' },
        { id: 3, author: 'Mehmet Arslan', role: 'Kaşif', content: 'Selçuklu tarafı da eklenebilir, orada da iyi seçenekler var.', time: '1 gün önce' },
        { id: 4, author: 'Fatma Yıldız', role: 'Konya Bilgesi', content: 'Ev ararken mutlaka kontrat imzalayın, sözlü anlaşmalara güvenmeyin!', time: '3 gün önce' }
      ]
    },
    {
      id: 3,
      title: 'Üniversite Kayıt İşlemleri',
      category: t.academic,
      description: 'Yeni öğrenciler için kayıt işlemleri, gerekli belgeler ve adım adım kayıt süreci rehberi.',
      views: 890,
      lastUpdated: `5 ${t.daysAgo}`,
      rating: 4.9,
      contributors: 8,
      image: 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcmVnaXN0cmF0aW9uJTIwZGVza3xlbnwxfHx8fDE3NjQzNDQ1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Ali Kara', role: 'Yeni Gelen', content: 'Tam zamanında buldum, teşekkürler!', time: '2 saat önce' },
        { id: 2, author: 'Seda Aydın', role: 'Gezgin', content: 'Yabancı uyruklu öğrenciler için ayrı bilgi eklenebilir mi?', time: '1 gün önce' }
      ]
    },
    {
      id: 4,
      title: 'Part-Time İş Bulma Rehberi',
      category: t.career,
      description: 'Konya\'da öğrenciler için part-time iş fırsatları, iş bulma siteleri ve başvuru ipuçları.',
      views: 1680,
      lastUpdated: `1 ${t.weeksAgo}`,
      rating: 4.6,
      contributors: 15,
      image: 'https://images.unsplash.com/photo-1737712913555-1c3653b175d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0JTIwdGltZSUyMGpvYiUyMGNhZmV8ZW58MXx8fHwxNzY0MzQ0NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Burak Şahin', role: 'Kaşif', content: 'Kafeler genelde öğrenci dostu çalışma saatleri sunuyor.', time: '4 saat önce' },
        { id: 2, author: 'Canan Yılmaz', role: 'Gezgin', content: 'Online freelance işler de eklenebilir, ben öyle çalışıyorum.', time: '8 saat önce' },
        { id: 3, author: 'Deniz Kaya', role: 'Konya Bilgesi', content: 'İş ararken dikkat edilecek noktalar listesi harika olmuş!', time: '2 gün önce' }
      ]
    },
    {
      id: 5,
      title: 'Konya Ulaşım Rehberi',
      category: t.cityGuide,
      description: 'Konya\'daki toplu taşıma sistemi, KonKart kullanımı, öğrenci indirimli kartlar ve ulaşım güzergahları.',
      views: 3200,
      lastUpdated: `2 ${t.weeksAgo}`,
      rating: 4.7,
      contributors: 20,
      image: 'https://images.unsplash.com/photo-1642749775778-d7119dea366a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc3BvcnRhdGlvbiUyMGJ1c3xlbnwxfHx8fDE3NjQzMzEwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Emre Özkan', role: 'Gezgin', content: 'Tramvay haritası çok kullanışlı olmuş!', time: '1 saat önce' },
        { id: 2, author: 'Gizem Ak', role: 'Seyyah', content: 'Öğrenci kartı indirimi %50, bunu eklemek lazım.', time: '6 saat önce' },
        { id: 3, author: 'Hakan Demir', role: 'Kaşif', content: 'Gece otobusleri de var mı?', time: '1 gün önce' },
        { id: 4, author: 'İrem Yıldırım', role: 'Konya Bilgesi', content: 'Hafta sonu seferleri daha seyrek, onu da belirtmekte fayda var.', time: '3 gün önce' }
      ]
    },
    {
      id: 6,
      title: 'Kütüphane Kullanım Kılavuzu',
      category: t.academic,
      description: 'Üniversite kütüphanelerinde kitap bulma, kaynak tarama, çalışma alanları rezervasyonu ve daha fazlası.',
      views: 720,
      lastUpdated: `3 ${t.weeksAgo}`,
      rating: 4.4,
      contributors: 9,
      image: 'https://images.unsplash.com/photo-1706528010331-0f12582db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjBib29rc3xlbnwxfHx8fDE3NjQzNDQ1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      comments: [
        { id: 1, author: 'Kemal Acar', role: 'Gezgin', content: 'Online rezervasyon sistemi var mı?', time: '10 saat önce' },
        { id: 2, author: 'Leyla Kaya', role: 'Kaşif', content: 'Sessiz çalışma bölümleri çok iyi, sınav döneminde kurtarıyor!', time: '2 gün önce' }
      ]
    }
  ];

  const categories = [
    t.allCategories,
    t.academic,
    t.campusLife,
    t.accommodation,
    t.career,
    t.cityGuide
  ];

  return (
    // 60% - Background (E0FBFC)
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
        {/* Header with Back Button - 30% Text + 10% Brand */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="mb-2 flex items-center gap-3" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
              <BookOpen className="w-8 h-8" style={{ color: '#EE6C4D' }} />
              {t.knowledgeAreaTitle}
            </h1>
          </div>
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 transition-all hover:opacity-70 active:scale-95 flex-shrink-0"
            style={{ color: '#3D5A80' }}
          >
            <span>{language === 'TR' ? 'Geri' : 'Back'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-2">
          <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
            {t.knowledgeAreaDesc}
          </p>
        </div>

        {/* Category Filter - 10% Active */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-colors"
              style={category === selectedCategory ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : { 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                color: isDarkMode ? '#e5e7eb' : '#293241',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)'
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats - 60% White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
                <BookOpen className="w-6 h-6" style={{ color: '#3D5A80' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>{language === 'TR' ? 'Toplam Makale' : 'Total Articles'}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{language === 'TR' ? '248 Makale' : '248 Articles'}</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#98C1D9' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>{language === 'TR' ? 'Aktif Katkıcı' : 'Active Contributors'}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{language === 'TR' ? '89 Öğrenci' : '89 Students'}</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
                <Eye className="w-6 h-6" style={{ color: '#EE6C4D' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>{language === 'TR' ? 'Toplam Görüntülenme' : 'Total Views'}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>45.2K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid - 60% White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Contributions */}
          {userContributions
            .filter(contrib => {
              if (selectedCategory === t.allCategories) return true;
              
              const categoryMap: Record<string, string[]> = {
                [t.academic]: ['Akademik', 'Academic'],
                [t.campusLife]: ['Kampüs Yaşamı', 'Campus Life'],
                [t.accommodation]: ['Barınma', 'Accommodation'],
                [t.career]: ['Kariyer', 'Career'],
                [t.social || 'Sosyal']: ['Sosyal', 'Social'],
                [t.cityGuide]: ['Şehir Rehberi', 'City Guide']
              };
              
              return categoryMap[selectedCategory]?.includes(contrib.category);
            })
            .map((contrib) => {
              const categoryDisplayMap: Record<string, string> = {
                'Akademik': t.academic,
                'Academic': t.academic,
                'Kampüs Yaşamı': t.campusLife,
                'Campus Life': t.campusLife,
                'Barınma': t.accommodation,
                'Accommodation': t.accommodation,
                'Kariyer': t.career,
                'Career': t.career,
                'Sosyal': t.social || 'Sosyal',
                'Social': t.social || 'Sosyal',
                'Şehir Rehberi': t.cityGuide,
                'City Guide': t.cityGuide
              };
              
              return (
                <div
                  key={contrib.id}
                  className="rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1e293b' : 'white',
                    border: '2px solid #EE6C4D' 
                  }}
                >
                  {/* Image Banner with "NEW" Badge */}
                  <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-20 h-20" style={{ color: '#EE6C4D', opacity: 0.3 }} />
                    </div>
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <span className="px-3 py-1 rounded-full text-sm backdrop-blur-sm bg-white/90" style={{ 
                        color: '#3D5A80'
                      }}>
                        {categoryDisplayMap[contrib.category] || contrib.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm backdrop-blur-sm text-white" style={{ backgroundColor: '#EE6C4D' }}>
                        {language === 'TR' ? 'YENİ' : 'NEW'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                      {contrib.title}
                    </h3>
                    
                    <p className="mb-4 line-clamp-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {contrib.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {language === 'TR' ? 'Az önce' : 'Just now'}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {language === 'TR' ? 'Sen' : 'You'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          
          {/* Existing Articles */}
          {wikiArticles
            .filter(article => selectedCategory === t.allCategories || article.category === selectedCategory)
            .map((article) => (
            <div
              key={article.id}
              className="rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
              onClick={() => setSelectedArticle(article)}
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="px-3 py-1 rounded-full text-sm backdrop-blur-sm bg-white/90" style={{ 
                    color: '#3D5A80'
                  }}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 backdrop-blur-sm bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#EE6C4D' }} />
                    <span className="text-sm" style={{ color: '#293241' }}>{article.rating}</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {article.title}
                </h3>
                
                <p className="mb-4 line-clamp-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.lastUpdated}
                    </div>
                  </div>
                  <div>
                    {article.contributors} {t.contributors.toLowerCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <ImageWithFallback
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-sm group shadow-lg"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <X className="w-5 h-5 transition-all group-hover:rotate-90" style={{ color: '#293241' }} />
              </button>

              {/* Tags */}
              <div className="absolute top-4 left-4 flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm backdrop-blur-sm bg-white/90" style={{ 
                  color: '#3D5A80'
                }}>
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-1 backdrop-blur-sm bg-white/90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" style={{ color: '#EE6C4D' }} />
                  <span className="text-sm" style={{ color: '#293241' }}>{selectedArticle.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                {selectedArticle.title}
              </h2>

              {/* Full Description */}
              <div className="mb-6">
                <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{selectedArticle.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pb-4 border-b mb-4" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                <div className="flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{selectedArticle.views}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedArticle.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <User className="w-4 h-4" />
                  <span className="text-sm">{selectedArticle.contributors} {t.contributors.toLowerCase()}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="rounded-xl p-4 border mb-4" style={{ 
                backgroundColor: isDarkMode ? '#0f172a' : '#f9fafb',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
              }}>
                <h3 className="mb-2 text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {language === 'TR' ? 'Makale Bilgileri' : 'Article Information'}
                </h3>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {language === 'TR' 
                    ? `Bu makale ${selectedArticle.contributors} katkıcı tarafından oluşturulmuş ve ${selectedArticle.lastUpdated} güncellenmiştir. ${selectedArticle.views} kez görüntülenmiştir.`
                    : `This article has been created by ${selectedArticle.contributors} contributors and updated ${selectedArticle.lastUpdated}. It has been viewed ${selectedArticle.views} times.`
                  }
                </p>
              </div>

              {/* Contribute Button */}
              {!permissions.canEditDirectly && userRoleId < 2 && (
                <div className="mb-4 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', borderLeft: '4px solid #EE6C4D' }}>
                  <ShieldAlert className="w-5 h-5 mt-0.5" style={{ color: '#EE6C4D' }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: '#EE6C4D' }}>
                      {language === 'TR' ? 'Düzenleme Yetkisi Gerekli' : 'Edit Permission Required'}
                    </p>
                    <p className="text-sm" style={{ color: '#293241' }}>
                      {language === 'TR' 
                        ? 'Bilgi Alanı makalelerini düzenlemek için Seyyah (500+ coin) seviyesine ulaşmalısınız.' 
                        : 'You need to reach Traveler level (500+ coins) to edit Knowledge Area articles.'}
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
              
              {/* Düzenleme Alanı */}
              {permissions.canEditDirectly && isEditing && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    {language === 'TR' ? 'Makale İçeriğini Düzenle:' : 'Edit Article Content:'}
                  </label>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent min-h-[200px]"
                    style={{ 
                      borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.15)',
                      backgroundColor: isDarkMode ? '#0f172a' : 'white',
                      color: isDarkMode ? '#e5e7eb' : '#293241',
                      '--tw-ring-color': '#3D5A80'
                    } as React.CSSProperties}
                    placeholder={language === 'TR' 
                      ? 'Makalenize eklemeler ve düzenlemeler yapın...' 
                      : 'Add and edit your article...'}
                  />
                  
                  {/* Düzenleme Butonları */}
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => {
                        if (onCoinUpdate && editedContent.trim()) {
                          const coinAmount = calculateCoinReward(30, userRoleId);
                          onCoinUpdate(coinAmount, 'wiki_edit');
                          toast.success(
                            language === 'TR' 
                              ? `🎉 Makaleye katkı sağladın! +${coinAmount} GençCoin kazandın! (${permissions.multiplier}x çarpan)` 
                              : `🎉 You contributed to the article! Earned +${coinAmount} GençCoin! (${permissions.multiplier}x multiplier)`,
                            {
                              style: {
                                background: '#3D5A80',
                                color: '#E0FBFC',
                                border: '2px solid #98C1D9'
                              }
                            }
                          );
                          setIsEditing(false);
                          setEditedContent('');
                          setSelectedArticle(null);
                        }
                      }}
                      disabled={!editedContent.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#3D5A80' }}
                    >
                      <Coins className="w-5 h-5" />
                      <span>{language === 'TR' ? `Kaydet & +${calculateCoinReward(30, userRoleId)} Coin Kazan` : `Save & Earn +${calculateCoinReward(30, userRoleId)} Coins`}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedContent('');
                      }}
                      className="px-6 py-3 rounded-xl border-2 transition-all hover:shadow-lg"
                      style={{ 
                        borderColor: isDarkMode ? '#475569' : 'rgba(61, 90, 128, 0.15)',
                        color: isDarkMode ? '#e5e7eb' : '#293241',
                        backgroundColor: isDarkMode ? '#1e293b' : 'white'
                      }}
                    >
                      {language === 'TR' ? 'İptal' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Düzenleme Butonu */}
              {permissions.canEditDirectly && !isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedContent(selectedArticle.description);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:shadow-lg mb-6"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  <Edit className="w-5 h-5" />
                  <span>{language === 'TR' ? 'Makaleyi Düzenle' : 'Edit Article'}</span>
                </button>
              )}

              {/* Yorumlar Bölümü */}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                <h3 className="mb-4 flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: '#3D5A80' }} />
                  {language === 'TR' ? `Yorumlar (${selectedArticle.comments.length})` : `Comments (${selectedArticle.comments.length})`}
                </h3>

                {/* Yorum Listesi */}
                <div className="space-y-4">
                  {selectedArticle.comments.map((comment) => (
                    <div key={comment.id} className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' }}>
                      {/* Yorum Başlık */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                            background: 'linear-gradient(135deg, #D0D0D0 0%, #3D5A80 100%)'
                          }}>
                            <span className="text-white text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{comment.author}</span>
                            <span className="ml-2 px-2 py-0.5 rounded text-xs" style={{
                              backgroundColor: 'rgba(61, 90, 128, 0.1)',
                              color: '#3D5A80'
                            }}>
                              {comment.role}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{comment.time}</span>
                      </div>

                      {/* Yorum İçerik */}
                      <p style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}