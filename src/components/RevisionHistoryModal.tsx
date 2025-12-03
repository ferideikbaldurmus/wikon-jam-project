import { X, Eye, RotateCcw, Clock, User } from 'lucide-react';
import { Language } from '../utils/translations';

interface Revision {
  id: string;
  summary: string;
  author: string;
  date: string;
  onPreview?: () => void;
}

interface RevisionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  revisions?: Revision[];
  onRestore?: (revision: Revision) => void;
  language: Language;
}

export function RevisionHistoryModal({ 
  open, 
  onClose, 
  revisions = [], 
  onRestore,
  language 
}: RevisionHistoryModalProps) {
  const t = {
    TR: {
      title: 'Sürüm Geçmişi',
      close: 'Kapat',
      preview: 'Görüntüle',
      restore: 'Geri Yükle',
      empty: 'Henüz revizyon bulunmuyor.',
      warning: 'Eski bir sürüme geri döndüğünüzde mevcut değişiklikler kaybolacaktır.'
    },
    EN: {
      title: 'Revision History',
      close: 'Close',
      preview: 'Preview',
      restore: 'Restore',
      empty: 'No revisions yet.',
      warning: 'Restoring an old version will overwrite current changes.'
    }
  }[language];

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(41, 50, 65, 0.7)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1px solid rgba(61, 90, 128, 0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(61, 90, 128, 0.1)' }}>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: '#EE6C4D' }} />
            <h3 className="text-xl" style={{ color: '#293241' }}>{t.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: '#3D5A80' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning */}
        <div className="px-6 pt-4">
          <div 
            className="p-3 rounded-lg flex items-start gap-3 text-sm"
            style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', color: '#3D5A80' }}
          >
            <div className="w-5 h-5 flex-shrink-0" style={{ color: '#EE6C4D' }}>⚠️</div>
            <span>{t.warning}</span>
          </div>
        </div>

        {/* Revisions List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {revisions.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#98C1D9' }}>
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div>{t.empty}</div>
            </div>
          ) : (
            <div className="space-y-3">
              {revisions.map((revision) => (
                <div
                  key={revision.id}
                  className="p-4 rounded-lg transition-all hover:shadow-md"
                  style={{ border: '1px solid rgba(61, 90, 128, 0.15)', backgroundColor: '#FAFBFC' }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="mb-2" style={{ color: '#293241' }}>
                        {revision.summary}
                      </div>
                      <div className="flex items-center gap-3 text-sm" style={{ color: '#3D5A80' }}>
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          <span>{revision.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{revision.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {revision.onPreview && (
                        <button
                          onClick={revision.onPreview}
                          className="px-3 py-2 rounded-lg text-sm transition-all hover:shadow-md flex items-center gap-2"
                          style={{ 
                            border: '1px solid rgba(61, 90, 128, 0.2)',
                            color: '#3D5A80',
                            backgroundColor: 'white'
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          {t.preview}
                        </button>
                      )}
                      <button
                        onClick={() => onRestore?.(revision)}
                        className="px-3 py-2 rounded-lg text-sm transition-all hover:shadow-md flex items-center gap-2"
                        style={{ backgroundColor: '#F59E0B', color: 'white' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D97706'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F59E0B'}
                      >
                        <RotateCcw className="w-4 h-4" />
                        {t.restore}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
