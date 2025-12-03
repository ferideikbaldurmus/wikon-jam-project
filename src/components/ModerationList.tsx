import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Language } from '../utils/translations';

interface ModerationItem {
  id: string;
  title: string;
  user: string;
  type: string;
  category?: string;
  timestamp?: string;
}

interface ModerationListProps {
  items?: ModerationItem[];
  onApprove?: (item: ModerationItem) => void;
  onReject?: (item: ModerationItem) => void;
  language: Language;
}

export function ModerationList({ items = [], onApprove, onReject, language }: ModerationListProps) {
  const t = {
    TR: {
      title: 'Bekleyen Onaylar',
      subtitle: 'Kaşif / Konya Bilgesi rolleri için görünür.',
      empty: 'Onay bekleyen işlem bulunmuyor.',
      approve: 'Onayla',
      reject: 'Reddet'
    },
    EN: {
      title: 'Pending Approvals',
      subtitle: 'Visible for Curious Explorer / Konya Wise roles.',
      empty: 'No pending approvals.',
      approve: 'Approve',
      reject: 'Reject'
    }
  }[language];

  return (
    <section className="bg-white rounded-xl shadow-sm p-6" style={{ border: '1px solid rgba(61, 90, 128, 0.1)' }}>
      <div className="flex items-center gap-3 mb-2">
        <AlertCircle className="w-5 h-5" style={{ color: '#EE6C4D' }} />
        <h3 className="text-lg" style={{ color: '#293241' }}>{t.title}</h3>
      </div>
      <p className="text-sm mb-6" style={{ color: '#3D5A80' }}>{t.subtitle}</p>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="text-center py-12" style={{ color: '#98C1D9' }}>
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div>{t.empty}</div>
          </div>
        )}

        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-start justify-between p-4 rounded-lg transition-all hover:shadow-md"
            style={{ border: '1px solid rgba(61, 90, 128, 0.15)', backgroundColor: '#FAFBFC' }}
          >
            <div className="flex-1">
              <div className="mb-1" style={{ color: '#293241' }}>{item.title}</div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#3D5A80' }}>
                <span>@{item.user}</span>
                <span>•</span>
                <span>{item.type}</span>
                {item.timestamp && (
                  <>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onApprove?.(item)}
                className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-md flex items-center gap-2"
                style={{ backgroundColor: '#10B981', color: 'white' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
              >
                <CheckCircle className="w-4 h-4" />
                {t.approve}
              </button>
              <button
                onClick={() => onReject?.(item)}
                className="px-4 py-2 rounded-lg text-sm transition-all hover:shadow-md flex items-center gap-2"
                style={{ backgroundColor: '#EF4444', color: 'white' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
              >
                <XCircle className="w-4 h-4" />
                {t.reject}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
