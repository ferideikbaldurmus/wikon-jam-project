import React, { useState } from 'react';
import { Heart, Coins, Users, Calendar } from 'lucide-react';
import { Language } from '../utils/translations';

interface SocialResponsibilityCardProps {
  title?: string;
  description?: string;
  reward?: number;
  participants?: number;
  date?: string;
  category?: string;
  language: Language;
  onJoin?: () => void;
}

export function SocialResponsibilityCard({ 
  title, 
  description, 
  reward = 0,
  participants = 0,
  date,
  category,
  language,
  onJoin
}: SocialResponsibilityCardProps) {
  const t = {
    TR: {
      defaultTitle: 'Sosyal Sorumluluk Projesi',
      defaultDesc: 'Topluma katkı sağlayan projelere katılın ve ödül kazanın.',
      reward: 'Ödül',
      participants: 'Katılımcı',
      join: 'Katıl',
      joined: 'Katıldınız'
    },
    EN: {
      defaultTitle: 'Social Responsibility Project',
      defaultDesc: 'Join community projects and earn rewards.',
      reward: 'Reward',
      participants: 'Participants',
      join: 'Join',
      joined: 'Joined'
    }
  }[language];

  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    onJoin?.();
  };

  return (
    <article 
      className="w-full max-w-sm p-5 rounded-xl transition-all hover:shadow-lg"
      style={{ 
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
        >
          <Heart className="w-6 h-6" style={{ color: '#10B981' }} />
        </div>
        <div className="flex-1">
          <h4 className="mb-1" style={{ color: '#293241' }}>
            {title || t.defaultTitle}
          </h4>
          {category && (
            <span 
              className="inline-block px-2 py-1 rounded text-xs mb-2"
              style={{ backgroundColor: 'rgba(61, 90, 128, 0.1)', color: '#3D5A80' }}
            >
              {category}
            </span>
          )}
          <p className="text-sm" style={{ color: '#3D5A80' }}>
            {description || t.defaultDesc}
          </p>
        </div>
      </div>

      {/* Info Row */}
      <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#3D5A80' }}>
        {participants > 0 && (
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{participants} {t.participants}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5" style={{ color: '#EE6C4D' }} />
          <div>
            <div className="text-xs" style={{ color: '#3D5A80' }}>{t.reward}</div>
            <div style={{ color: '#293241' }}>+{reward} Coin</div>
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={joined}
          className={`px-4 py-2 rounded-lg transition-all ${!joined ? 'hover:shadow-md' : ''}`}
          style={{ 
            backgroundColor: joined ? '#E5E7EB' : '#10B981',
            color: joined ? '#6B7280' : 'white',
            cursor: joined ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => {
            if (!joined) {
              e.currentTarget.style.backgroundColor = '#059669';
            }
          }}
          onMouseOut={(e) => {
            if (!joined) {
              e.currentTarget.style.backgroundColor = '#10B981';
            }
          }}
        >
          {joined ? t.joined : t.join}
        </button>
      </div>
    </article>
  );
}
