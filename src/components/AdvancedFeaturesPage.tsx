import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { SearchHeader } from './SearchHeader';
import { ModerationList } from './ModerationList';
import { RevisionHistoryModal } from './RevisionHistoryModal';
import { CustomField } from './CustomField';
import { EditModeWrapper } from './EditModeWrapper';
import { SocialResponsibilityCard } from './SocialResponsibilityCard';
import { ValidationSimulation } from './ValidationSimulation';
import { toast } from 'sonner@2.0.3';

interface AdvancedFeaturesPageProps {
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
}

export function AdvancedFeaturesPage({
  language,
  onNavigate,
  onGoBack,
  setLanguage,
  onMenuClick,
  onLogout,
  profileName,
  profileUsername,
  currentCoins,
  onCoinUpdate,
  userRoleId = 1
}: AdvancedFeaturesPageProps) {
  const t = useTranslation(language);

  // Moderation List State
  const [modItems, setModItems] = useState([
    { 
      id: 'm1', 
      title: language === 'TR' ? 'Selçuklu Tarihi makalesinde düzenleme' : 'Edit in Seljuk History article',
      user: 'ayse_demir', 
      type: language === 'TR' ? 'Düzenleme' : 'Edit',
      timestamp: '2 ' + (language === 'TR' ? 'saat önce' : 'hours ago')
    },
    { 
      id: 'm2', 
      title: language === 'TR' ? 'Yeni barınma seçenekleri makalesi' : 'New housing options article',
      user: 'mehmet_k', 
      type: language === 'TR' ? 'Yeni Makale' : 'New Article',
      timestamp: '5 ' + (language === 'TR' ? 'saat önce' : 'hours ago')
    },
  ]);

  // Revision History State
  const [revOpen, setRevOpen] = useState(false);
  const revisions = [
    { 
      id: 'r1', 
      summary: language === 'TR' ? 'Başvuru tarihini güncelledim' : 'Updated application date',
      author: 'ali_yilmaz', 
      date: '2025-11-28 14:30',
      onPreview: () => toast.info(language === 'TR' ? 'Ön izleme açılıyor...' : 'Opening preview...')
    },
    { 
      id: 'r2', 
      summary: language === 'TR' ? 'Konaklama bilgilerini ekledim' : 'Added accommodation info',
      author: 'zeynep_a', 
      date: '2025-11-27 10:15',
      onPreview: () => toast.info(language === 'TR' ? 'Ön izleme açılıyor...' : 'Opening preview...')
    },
  ];

  // Custom Fields State
  const [deadline, setDeadline] = useState('');
  const [courseLink, setCourseLink] = useState('');

  return (
    <div className="flex-1 p-2 sm:p-4 lg:p-8" style={{ backgroundColor: 'white' }}>
      {/* Search Header */}
      <SearchHeader
        language={language}
        setLanguage={setLanguage}
        onMenuClick={onMenuClick}
        onLogout={onLogout}
        profileName={profileName}
        profileUsername={profileUsername}
        currentCoins={currentCoins}
        userRoleId={userRoleId}
      />

      <div className="max-w-7xl mx-auto mt-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-2" style={{ color: '#293241' }}>
            {language === 'TR' ? 'Gelişmiş Özellikler' : 'Advanced Features'}
          </h1>
          <p style={{ color: '#3D5A80' }}>
            {language === 'TR' 
              ? 'Platform yönetimi ve içerik kontrolü için gelişmiş araçlar.' 
              : 'Advanced tools for platform management and content control.'}
          </p>
        </div>

        <div className="space-y-8">
          {/* Moderation List */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Moderasyon Listesi' : 'Moderation List'}
            </h2>
            <ModerationList
              items={modItems}
              language={language}
              onApprove={(item) => {
                toast.success(language === 'TR' ? `${item.title} onaylandı!` : `${item.title} approved!`);
                setModItems(prev => prev.filter(i => i.id !== item.id));
                onCoinUpdate?.(10, 'moderation');
              }}
              onReject={(item) => {
                toast.error(language === 'TR' ? `${item.title} reddedildi.` : `${item.title} rejected.`);
                setModItems(prev => prev.filter(i => i.id !== item.id));
              }}
            />
          </section>

          {/* Revision History */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Sürüm Geçmişi' : 'Revision History'}
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: '1px solid rgba(61, 90, 128, 0.1)' }}>
              <p className="mb-4" style={{ color: '#3D5A80' }}>
                {language === 'TR' 
                  ? 'Makalelerin eski sürümlerini görüntüleyin ve geri yükleyin.' 
                  : 'View and restore previous versions of articles.'}
              </p>
              <button
                onClick={() => setRevOpen(true)}
                className="px-4 py-2 rounded-lg transition-all hover:shadow-md"
                style={{ backgroundColor: '#3D5A80', color: 'white' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#293241'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3D5A80'}
              >
                {language === 'TR' ? 'Geçmişi Görüntüle' : 'View History'}
              </button>
            </div>
            <RevisionHistoryModal
              open={revOpen}
              onClose={() => setRevOpen(false)}
              revisions={revisions}
              language={language}
              onRestore={(r) => {
                toast.success(language === 'TR' ? `Sürüm geri yüklendi: ${r.summary}` : `Version restored: ${r.summary}`);
                setRevOpen(false);
              }}
            />
          </section>

          {/* Custom Fields */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Özel Alanlar' : 'Custom Fields'}
            </h2>
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: '1px solid rgba(61, 90, 128, 0.1)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomField
                  label={language === 'TR' ? 'Son Başvuru Tarihi' : 'Application Deadline'}
                  type="date"
                  value={deadline}
                  onChange={setDeadline}
                  required
                />
                <CustomField
                  label={language === 'TR' ? 'Ders Notu Linki' : 'Course Notes Link'}
                  type="link"
                  value={courseLink}
                  onChange={setCourseLink}
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>

          {/* Edit Mode Wrapper */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Düzenleme Modu' : 'Edit Mode'}
            </h2>
            <EditModeWrapper
              language={language}
              onSave={() => toast.success(language === 'TR' ? 'Değişiklikler kaydedildi!' : 'Changes saved!')}
              onCancel={() => toast.info(language === 'TR' ? 'Değişiklikler iptal edildi.' : 'Changes cancelled.')}
            >
              <div>
                <h4 className="text-lg mb-2" style={{ color: '#293241' }}>
                  {language === 'TR' ? 'Örnek Makale Başlığı' : 'Sample Article Title'}
                </h4>
                <p style={{ color: '#3D5A80' }}>
                  {language === 'TR'
                    ? 'Bu alan düzenleme modunda aktif hale gelir. Kullanıcılar içeriği güncelleyebilir.'
                    : 'This area becomes active in edit mode. Users can update the content.'}
                </p>
              </div>
            </EditModeWrapper>
          </section>

          {/* Social Responsibility Cards */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Sosyal Sorumluluk Projeleri' : 'Social Responsibility Projects'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SocialResponsibilityCard
                title={language === 'TR' ? 'Alaeddin Tepesi Temizliği' : 'Alaeddin Hill Cleanup'}
                description={language === 'TR' 
                  ? 'Şehir merkezindeki parkta düzenlenecek temizlik etkinliği.' 
                  : 'Cleanup event at the city center park.'}
                reward={50}
                participants={23}
                date={language === 'TR' ? '30 Kasım' : 'Nov 30'}
                category={language === 'TR' ? 'Çevre' : 'Environment'}
                language={language}
                onJoin={() => {
                  toast.success(language === 'TR' ? 'Projeye katıldınız! +50 Coin' : 'Joined project! +50 Coins');
                  onCoinUpdate?.(50, 'social_project');
                }}
              />
              <SocialResponsibilityCard
                title={language === 'TR' ? 'Kitap Bağışı Kampanyası' : 'Book Donation Campaign'}
                description={language === 'TR' 
                  ? 'Yoksul çocuklar için kitap toplama etkinliği.' 
                  : 'Book collection event for underprivileged children.'}
                reward={30}
                participants={45}
                date={language === 'TR' ? '5 Aralık' : 'Dec 5'}
                category={language === 'TR' ? 'Eğitim' : 'Education'}
                language={language}
                onJoin={() => {
                  toast.success(language === 'TR' ? 'Projeye katıldınız! +30 Coin' : 'Joined project! +30 Coins');
                  onCoinUpdate?.(30, 'social_project');
                }}
              />
              <SocialResponsibilityCard
                title={language === 'TR' ? 'Öğrenci Mentorluk' : 'Student Mentorship'}
                description={language === 'TR' 
                  ? 'Yeni öğrencilere rehberlik programı.' 
                  : 'Mentorship program for new students.'}
                reward={100}
                participants={12}
                date={language === 'TR' ? 'Devam Eden' : 'Ongoing'}
                category={language === 'TR' ? 'Kariyer' : 'Career'}
                language={language}
                onJoin={() => {
                  toast.success(language === 'TR' ? 'Projeye katıldınız! +100 Coin' : 'Joined project! +100 Coins');
                  onCoinUpdate?.(100, 'social_project');
                }}
              />
            </div>
          </section>

          {/* Validation Simulation */}
          <section>
            <h2 className="mb-4" style={{ color: '#293241' }}>
              {language === 'TR' ? 'Yayın Validasyonu' : 'Publication Validation'}
            </h2>
            <ValidationSimulation
              language={language}
              requiredRole={4}
              userRole={userRoleId}
              checks={[
                language === 'TR' ? 'Boş alan kontrolü' : 'Empty field check',
                language === 'TR' ? 'Bağlantı geçerliliği' : 'Link validity',
                language === 'TR' ? 'Karakter limiti' : 'Character limit',
                language === 'TR' ? 'Spam kontrolü' : 'Spam check',
                language === 'TR' ? 'Küfür filtresi' : 'Profanity filter'
              ]}
              onPublish={() => {
                toast.success(language === 'TR' ? 'İçerik başarıyla yayınlandı!' : 'Content published successfully!');
                onCoinUpdate?.(25, 'publish_content');
              }}
              onBackToEdit={() => {
                toast.info(language === 'TR' ? 'Düzenleme moduna dönülüyor...' : 'Returning to edit mode...');
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
