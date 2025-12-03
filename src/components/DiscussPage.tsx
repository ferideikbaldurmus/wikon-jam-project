import { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, TrendingUp, Clock, Search, ThumbsDown, AlertTriangle, Scale, Shield, X, Send, ArrowRight, Coins } from 'lucide-react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { toast } from 'sonner@2.0.3';
import { getRolePermissions, calculateCoinReward } from '../utils/roleUtils';

interface Comment {
  id: number;
  author: string;
  authorRole: string;
  content: string;
  time: string;
  ratings: {
    helpful: number;
    notHelpful: number;
    hateSpeech: number;
    biased: number;
    neutral: number;
  };
  userRating?: 'helpful' | 'notHelpful' | 'hateSpeech' | 'biased' | 'neutral';
}

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  trending: boolean;
  time: string;
  commentsList?: Comment[];
  userLiked?: boolean;
}

interface DiscussPageProps {
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

export function DiscussPage({ language, onNavigate, onGoBack, setLanguage, onMenuClick, onLogout, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, userContributions = [], isDarkMode = false, setIsDarkMode }: DiscussPageProps) {
  const t = useTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState(t.allCategories);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentCountInLastHour, setCommentCountInLastHour] = useState(0);
  
  // Get role permissions
  const permissions = getRolePermissions(userRoleId);
  
  const quickCommentSuggestions = language === 'TR' ? [
    'Çok faydalı bilgi, teşekkürler!',
    'Bende benzer deneyim yaşadım',
    'Bu konuda daha fazla bilgi paylaşabilir misin?',
    'Harika öneri, deneyeceğim!'
  ] : [
    'Very useful information, thanks!',
    'I had a similar experience',
    'Can you share more information on this?',
    'Great suggestion, will try it!'
  ];

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: 'Selçuk Üniversitesi\'nde en iyi yemek nereden yenir?',
      author: 'Ahmet Yılmaz',
      authorRole: 'Gezgin',
      content: 'Kampüste ve çevresinde öğrencilere uygun fiyatlı ve lezzetli yemek yerleri arıyorum. Önerilerinizi bekliyorum!',
      category: 'Kampüs Yaşamı',
      likes: 45,
      comments: 23,
      trending: true,
      time: '2 saat önce',
      commentsList: [
        {
          id: 1,
          author: 'Mehmet Çelik',
          authorRole: 'Kaşif',
          content: 'Kampüs içinde en iyi seçenek öğrenci yemekhanesi. Hem uygun fiyatlı hem de porsiyon doyurucu. Özellikle öğle yemeği saatlerinde kalabalık oluyor ama beklemeye değer.',
          time: '1 saat önce',
          ratings: { helpful: 12, notHelpful: 2, hateSpeech: 0, biased: 1, neutral: 8 }
        },
        {
          id: 2,
          author: 'Ayşe Demir',
          authorRole: 'Gezgin',
          content: 'Kampüs dışında Alaaddin Tepesi yakınlarındaki lokantalara bakabilirsin. Fiyatlar biraz yüksek ama lezzet garantili.',
          time: '30 dakika önce',
          ratings: { helpful: 8, notHelpful: 1, hateSpeech: 0, biased: 2, neutral: 5 }
        },
        {
          id: 3,
          author: 'Can Özkan',
          authorRole: 'Seyyah',
          content: 'Kantine gitmeyin boşa para. Kalitesiz ve pahalı.',
          time: '15 dakika önce',
          ratings: { helpful: 2, notHelpful: 5, hateSpeech: 1, biased: 8, neutral: 1 }
        }
      ]
    },
    {
      id: 2,
      title: 'Part-time iş arayanlar için tavsiyeler',
      author: 'Elif Demir',
      authorRole: 'Kaşif',
      content: 'Ders saatlerime uyan part-time iş arıyorum. Hangi sektörlerde çalışmak daha mantıklı?',
      category: 'Kariyer',
      likes: 67,
      comments: 34,
      trending: true,
      time: '5 saat önce',
      commentsList: [
        {
          id: 1,
          author: 'Zeynep Aydın',
          authorRole: 'Konya Bilgesi',
          content: 'Kafe ve restoranlar genelde öğrenci saatlerine uygun çalışma imkanı sunuyor. Özellikle akşam vardiyaları ders saatlerinizle çakışmaz. Ayrıca bahşiş geliri de ekstra motivasyon sağlar.',
          time: '3 saat önce',
          ratings: { helpful: 25, notHelpful: 1, hateSpeech: 0, biased: 0, neutral: 15 }
        },
        {
          id: 2,
          author: 'Burak Yıldız',
          authorRole: 'Gezgin',
          content: 'Online freelance işlere bakmanı öneririm. Saati kendin belirliyorsun ve evden çalışabiliyorsun. Upwork gibi platformları deneyebilirsin.',
          time: '2 saat önce',
          ratings: { helpful: 18, notHelpful: 0, hateSpeech: 0, biased: 1, neutral: 12 }
        }
      ]
    },
    {
      id: 3,
      title: 'KYK yurtları hakkında bilgi',
      author: 'Mehmet Kaya',
      authorRole: 'Seyyah',
      content: 'KYK başvurusu yaptım, ne zaman sonuç açıklanır? Başvuru sürecinde dikkat edilmesi gerekenler neler?',
      category: 'Barınma',
      likes: 28,
      comments: 15,
      trending: false,
      time: '8 saat önce',
      commentsList: [
        {
          id: 1,
          author: 'Elif Yılmaz',
          authorRole: 'Konya Bilgesi',
          content: 'Sonuçlar genelde Eylül başında açıklanıyor. YÖK sisteminden takip edebilirsin.',
          time: '5 saat önce',
          ratings: { helpful: 15, notHelpful: 0, hateSpeech: 0, biased: 0, neutral: 8 }
        },
        {
          id: 2,
          author: 'Ahmet Demir',
          authorRole: 'Gezgin',
          content: 'Belgeleri tam ve eksiksiz yüklediğinden emin ol. Ben geçen sene eksik belgeden geri dönmüştüm.',
          time: '3 saat önce',
          ratings: { helpful: 12, notHelpful: 0, hateSpeech: 0, biased: 1, neutral: 6 }
        }
      ]
    },
    {
      id: 4,
      title: 'Konya\'da gezilecek yerler önerileri',
      author: 'Ayşe Yıldız',
      authorRole: 'Gezgin',
      content: 'Hafta sonları gezebileceğim tarihi ve kültürel mekanlar arıyorum. Sizin favorileriniz neler?',
      category: 'Şehir Rehberi',
      likes: 52,
      comments: 41,
      trending: true,
      time: '1 gün önce',
      commentsList: [
        {
          id: 1,
          author: 'Fatma Aksoy',
          authorRole: 'Konya Bilgesi',
          content: 'Mevlana Müzesi kesinlikle görülmeli! Ayrıca Karatay Medresesi ve İnce Minare de çok güzel.',
          time: '18 saat önce',
          ratings: { helpful: 28, notHelpful: 0, hateSpeech: 0, biased: 0, neutral: 12 }
        },
        {
          id: 2,
          author: 'Can Yılmaz',
          authorRole: 'Kaşif',
          content: 'Alaaddin Tepesi akşam yürüyüşü için harika. Manzara muhteşem!',
          time: '15 saat önce',
          ratings: { helpful: 22, notHelpful: 1, hateSpeech: 0, biased: 0, neutral: 10 }
        },
        {
          id: 3,
          author: 'Seda Öztürk',
          authorRole: 'Gezgin',
          content: 'Sille köyüne gitmeyi unutma, çok huzurlu bir yer.',
          time: '12 saat önce',
          ratings: { helpful: 19, notHelpful: 0, hateSpeech: 0, biased: 1, neutral: 9 }
        }
      ]
    },
    {
      id: 5,
      title: 'Üniversite kulüpleri hakkında',
      author: 'Can Öztürk',
      authorRole: 'Yeni Gelen',
      content: 'Hangi kulüplere üye olmalıyım? Sosyal aktivitelere katılmak istiyorum.',
      category: 'Sosyal',
      likes: 19,
      comments: 12,
      trending: false,
      time: '1 gün önce',
      commentsList: [
        {
          id: 1,
          author: 'Merve Kaya',
          authorRole: 'Kaşif',
          content: 'Fotoğrafçılık kulübü çok aktif, sürekli etkinlik yapıyorlar. Tavsiye ederim!',
          time: '20 saat önce',
          ratings: { helpful: 10, notHelpful: 0, hateSpeech: 0, biased: 0, neutral: 5 }
        },
        {
          id: 2,
          author: 'Barış Yılmaz',
          authorRole: 'Gezgin',
          content: 'Tiyatro kulübüne katıl, hem eğlenceli hem de özgüven kazandırıyor.',
          time: '16 saat önce',
          ratings: { helpful: 8, notHelpful: 1, hateSpeech: 0, biased: 0, neutral: 4 }
        }
      ]
    },
    {
      id: 6,
      title: 'Sınav döneminde çalışma taktikleri',
      author: 'Zeynep Aksoy',
      authorRole: 'Kaşif',
      content: 'Sınav döneminde en verimli şekilde nasıl çalışabiliriz? Deneyimli arkadaşların fikirlerini merak ediyorum.',
      category: 'Akademik',
      likes: 83,
      comments: 56,
      trending: true,
      time: '2 gün önce',
      commentsList: [
        {
          id: 1,
          author: 'Deniz Acar',
          authorRole: 'Konya Bilgesi',
          content: 'Pomodoro tekniği bana çok yardımcı oluyor. 25 dk çalış, 5 dk ara. Konsantrasyon artıyor.',
          time: '1 gün önce',
          ratings: { helpful: 35, notHelpful: 2, hateSpeech: 0, biased: 0, neutral: 18 }
        },
        {
          id: 2,
          author: 'Ece Yıldırım',
          authorRole: 'Kaşif',
          content: 'Grup çalışması yapın, birbirinize soru sorun. Ben böyle çalışıyorum.',
          time: '1 gün önce',
          ratings: { helpful: 20, notHelpful: 5, hateSpeech: 0, biased: 1, neutral: 12 }
        },
        {
          id: 3,
          author: 'Furkan Aksoy',
          authorRole: 'Gezgin',
          content: 'Uyku düzenini bozma, dinlenmiş kafayla çalışmak daha verimli.',
          time: '20 saat önce',
          ratings: { helpful: 28, notHelpful: 1, hateSpeech: 0, biased: 0, neutral: 15 }
        }
      ]
    }
  ]);

  const categories = [
    t.allCategories,
    t.academic,
    t.campusLife,
    t.accommodation,
    t.career,
    t.social,
    t.cityGuide
  ];

  const ratingOptions = [
    { id: 'helpful', label: t.helpful, icon: ThumbsUp, color: '#9E9E9E', bgColor: 'rgba(224, 224, 224, 0.3)', activeBg: 'rgba(208, 208, 208, 0.5)' },
    { id: 'notHelpful', label: t.notHelpful, icon: ThumbsDown, color: '#EE6C4D', bgColor: 'rgba(238, 108, 77, 0.1)', activeBg: 'rgba(238, 108, 77, 0.2)' }
  ];

  // Filtreleme fonksiyonu
  const filteredDiscussions = selectedCategory === t.allCategories
    ? discussions
    : discussions.filter(discussion => discussion.category === selectedCategory);

  const handleRateComment = (discussionId: number, commentId: number, rating: string) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId && discussion.commentsList) {
        return {
          ...discussion,
          commentsList: discussion.commentsList.map(comment => {
            if (comment.id === commentId) {
              const newRatings = { ...comment.ratings };
              
              // Toggle logic: if already selected, deselect it
              if (comment.userRating === rating) {
                // Deselect: decrease count and clear userRating
                newRatings[rating as keyof typeof newRatings] = Math.max(0, newRatings[rating as keyof typeof newRatings] - 1);
                
                return {
                  ...comment,
                  ratings: newRatings,
                  userRating: undefined
                };
              } else {
                // New selection: remove old rating if exists, add new one
                if (comment.userRating) {
                  newRatings[comment.userRating] = Math.max(0, newRatings[comment.userRating] - 1);
                }
                
                // Add new rating
                const ratingKey = rating as keyof typeof newRatings;
                newRatings[ratingKey] = newRatings[ratingKey] + 1;
                
                return {
                  ...comment,
                  ratings: newRatings,
                  userRating: rating as any
                };
              }
            }
            return comment;
          })
        };
      }
      return discussion;
    }));
  };

  const handleLikeDiscussion = (discussionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        // Toggle like
        if (discussion.userLiked) {
          return {
            ...discussion,
            likes: Math.max(0, discussion.likes - 1),
            userLiked: false
          };
        } else {
          return {
            ...discussion,
            likes: discussion.likes + 1,
            userLiked: true
          };
        }
      }
      return discussion;
    }));
  };

  const handleAddComment = (discussionId: number) => {
    if (!newComment.trim()) return;
    
    // Check if user has permission to comment
    if (!permissions.canComment) {
      toast.error(
        language === 'TR' 
          ? '⚠️ Yorum yapma yetkiniz yok!' 
          : '⚠️ You do not have permission to comment!',
        {
          style: {
            background: '#EE6C4D',
            color: 'white'
          }
        }
      );
      return;
    }

    // Check hourly comment limit for Newcomers
    if (permissions.maxCommentsPerHour > 0 && commentCountInLastHour >= permissions.maxCommentsPerHour) {
      toast.error(
        language === 'TR' 
          ? `⚠️ Saatlik yorum limitine ulaştınız (${permissions.maxCommentsPerHour}/saat). Lütfen bir süre bekleyin veya rolünüzü yükseltin.` 
          : `⚠️ You've reached your hourly comment limit (${permissions.maxCommentsPerHour}/hour). Please wait or upgrade your role.`,
        {
          style: {
            background: '#EE6C4D',
            color: 'white'
          }
        }
      );
      return;
    }
    
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        const newCommentObj: Comment = {
          id: (discussion.commentsList?.length || 0) + 1,
          author: 'Sen',
          authorRole: 'Gezgin',
          content: newComment,
          time: 'Şimdi',
          ratings: { helpful: 0, notHelpful: 0, hateSpeech: 0, biased: 0, neutral: 0 }
        };
        
        // Calculate coin reward with multiplier
        const coinAmount = calculateCoinReward(10, userRoleId);
        
        // Award coins for adding a comment
        if (onCoinUpdate) {
          onCoinUpdate(coinAmount, 'discuss_comment');
          toast.success(
            language === 'TR' 
              ? `🎉 Yorum eklendi! +${coinAmount} GençCoin kazandın! (${permissions.multiplier}x çarpan)` 
              : `🎉 Comment added! Earned +${coinAmount} GençCoin! (${permissions.multiplier}x multiplier)`,
            {
              style: {
                background: '#3D5A80',
                color: '#E0FBFC',
                border: '2px solid #D0D0D0'
              }
            }
          );
        }
        
        // Update comment count for rate limiting
        if (permissions.maxCommentsPerHour > 0) {
          setCommentCountInLastHour(prev => prev + 1);
          // Reset after 1 hour
          setTimeout(() => {
            setCommentCountInLastHour(prev => Math.max(0, prev - 1));
          }, 3600000);
        }
        
        return {
          ...discussion,
          commentsList: [...(discussion.commentsList || []), newCommentObj],
          comments: discussion.comments + 1
        };
      }
      return discussion;
    }));
    setNewComment('');
  };

  const selectedDiscussionData = discussions.find(d => d.id === selectedDiscussion);

  return (
    <div className="flex-1 p-2 sm:p-4 lg:p-8 min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
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
              <MessageSquare className="w-8 h-8" style={{ color: '#EE6C4D' }} />
              {t.commentArea}
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
            {t.commentAreaDesc}
          </p>
        </div>

        {/* New Discussion Button */}


        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors text-sm"
              style={category === selectedCategory ? {
                backgroundColor: '#3D5A80',
                color: 'white'
              } : { 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                color: isDarkMode ? '#e5e7eb' : '#293241',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.15)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                <MessageSquare className="w-6 h-6" style={{ color: '#3D5A80' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{t.totalDiscussions}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>1.2K {t.topics}</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                <MessageCircle className="w-6 h-6" style={{ color: '#3D5A80' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{t.totalComments}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>8.5K {t.comments}</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#3D5A80' }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{t.activeUsers}</div>
                <div style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>320 {t.students}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
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
                  className="rounded-xl shadow-sm overflow-hidden"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1e293b' : 'white',
                    border: '2px solid #EE6C4D' 
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-sm" style={{
                          backgroundColor: 'rgba(61, 90, 128, 0.1)',
                          color: '#3D5A80'
                        }}>
                          {categoryDisplayMap[contrib.category] || contrib.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#EE6C4D' }}>
                          {language === 'TR' ? 'YENİ' : 'NEW'}
                        </span>
                      </div>
                      <span className="text-sm flex items-center gap-1" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                        <Clock className="w-4 h-4" />
                        {language === 'TR' ? 'Az önce' : 'Just now'}
                      </span>
                    </div>
                    
                    <h3 
                      className="mb-2 cursor-pointer hover:opacity-70 transition-opacity" 
                      style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}
                      onClick={() => setSelectedDiscussion(contrib.id)}
                    >
                      {contrib.title}
                    </h3>
                    
                    <p className="mb-4" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                      {contrib.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{profileName || 'Sen'}</span>
                        <span className="px-2 py-0.5 rounded text-xs" style={{
                          backgroundColor: 'rgba(61, 90, 128, 0.1)',
                          color: '#3D5A80'
                        }}>
                          {language === 'TR' ? 'Yazar' : 'Author'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-5 h-5" />
                          <span>0</span>
                        </div>
                        <div 
                          className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setSelectedDiscussion(contrib.id)}
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          
          {/* Existing Discussions */}
          {filteredDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="rounded-xl shadow-sm overflow-hidden"
              style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)' 
              }}
            >
              <div 
                className="p-6 cursor-pointer transition-colors"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => setSelectedDiscussion(selectedDiscussion === discussion.id ? null : discussion.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-sm" style={{
                      backgroundColor: 'rgba(61, 90, 128, 0.1)',
                      color: '#3D5A80'
                    }}>
                      {discussion.category}
                    </span>
                    {discussion.trending && (
                      <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1" style={{
                        backgroundColor: 'rgba(238, 108, 77, 0.1)',
                        color: '#EE6C4D'
                      }}>
                        <TrendingUp className="w-3 h-3" />
                        {t.trend}
                      </span>
                    )}
                  </div>
                  <span className="text-sm flex items-center gap-1" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                    <Clock className="w-4 h-4" />
                    {discussion.time}
                  </span>
                </div>
                
                <h3 className="mb-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {discussion.title}
                </h3>
                
                <p className="mb-4" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {discussion.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{discussion.author}</span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{
                      backgroundColor: 'rgba(61, 90, 128, 0.1)',
                      color: '#3D5A80'
                    }}>
                      {discussion.authorRole}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                    <div 
                      className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
                      onClick={(e) => handleLikeDiscussion(discussion.id, e)}
                      style={discussion.userLiked ? { color: '#3D5A80' } : {}}
                    >
                      <ThumbsUp className="w-5 h-5" style={discussion.userLiked ? { fill: '#3D5A80' } : {}} />
                      <span>{discussion.likes}</span>
                    </div>
                    <div 
                      className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDiscussion(selectedDiscussion === discussion.id ? null : discussion.id);
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{discussion.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {selectedDiscussion === discussion.id && (
                <div className="border-t p-6" style={{ 
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)',
                  backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(240, 240, 240, 0.5)'
                }}>
                  <h4 className="mb-4 flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                    <MessageCircle className="w-5 h-5" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }} />
                    Yorumlar ({discussion.commentsList?.length || 0})
                  </h4>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {discussion.commentsList && discussion.commentsList.length > 0 ? (
                      discussion.commentsList.map((comment) => (
                        <div key={comment.id} className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
                          {/* Comment Header */}
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
                                  {comment.authorRole}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>{comment.time}</span>
                          </div>

                          {/* Comment Content */}
                          <p className="mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{comment.content}</p>

                          {/* Rating System */}
                          <div className="border-t pt-3" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                            <p className="text-xs mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>Bu yorumu değerlendir:</p>
                            <div className="flex flex-wrap gap-2">
                              {ratingOptions.map((option) => {
                                const Icon = option.icon;
                                const isActive = comment.userRating === option.id;
                                const count = comment.ratings[option.id as keyof typeof comment.ratings];
                                
                                return (
                                  <button
                                    key={option.id}
                                    onClick={() => handleRateComment(discussion.id, comment.id, option.id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                                    style={isActive ? {
                                      backgroundColor: option.activeBg,
                                      color: option.color,
                                      border: `2px solid ${option.color}`
                                    } : {
                                      backgroundColor: option.bgColor,
                                      color: option.color,
                                      border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61, 90, 128, 0.1)'
                                    }}
                                  >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{option.label}</span>
                                    {count > 0 && (
                                      <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs" style={{
                                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(61, 90, 128, 0.1)'
                                      }}>
                                        {count}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 rounded-lg" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
                        <MessageCircle className="w-12 h-12 mx-auto mb-2" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E', opacity: 0.3 }} />
                        <p style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>Henüz yorum yapılmamış</p>
                        <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E', opacity: 0.7 }}>İlk yorumu sen yap!</p>
                      </div>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="rounded-lg p-4 shadow-sm" style={{ backgroundColor: isDarkMode ? '#0f172a' : 'white' }}>
                    {/* Hazır Yorum Önerileri */}
                    <div className="mb-4">
                      <p className="text-xs mb-2 px-2" style={{ color: '#3D5A80' }}>
                        {language === 'TR' ? 'Hızlı yorumlar:' : 'Quick comments:'}
                      </p>
                      <div className="space-y-2">
                        {quickCommentSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setNewComment(suggestion)}
                            className="w-full text-left px-4 py-2 rounded-lg text-sm border transition-colors"
                            style={{ 
                              backgroundColor: newComment === suggestion 
                                ? (isDarkMode ? 'rgba(61, 90, 128, 0.2)' : 'rgba(61, 90, 128, 0.1)')
                                : (isDarkMode ? '#1e293b' : 'white'),
                              color: isDarkMode ? '#e5e7eb' : '#293241',
                              borderColor: newComment === suggestion 
                                ? '#3D5A80' 
                                : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)')
                            }}
                            onMouseEnter={(e) => {
                              if (newComment !== suggestion) {
                                e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(61, 90, 128, 0.1)' : 'rgba(224, 224, 224, 0.3)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (newComment !== suggestion) {
                                e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : 'white';
                              }
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(discussion.id);
                          }
                        }}
                        placeholder="Yorumunuzu yazın..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                          backgroundColor: isDarkMode ? '#1e293b' : 'white',
                          color: isDarkMode ? '#e5e7eb' : '#293241',
                          '--tw-ring-color': '#EE6C4D'
                        } as React.CSSProperties}
                      />
                      <button
                        onClick={() => handleAddComment(discussion.id)}
                        disabled={!newComment.trim()}
                        className="px-2 md:px-4 py-2 text-white rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:opacity-90 flex-shrink-0"
                        style={{ backgroundColor: '#3D5A80' }}
                      >
                        <Send className="w-4 h-4" />
                        <span className="hidden md:inline">Gönder</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}