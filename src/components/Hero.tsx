import { BookOpen, TrendingUp, Coins, Menu, User } from 'lucide-react';
import { Language } from '../utils/translations';

interface HeroProps {
  onExploreClick: () => void;
  onNavigate: (page: string) => void;
  onMenuClick?: () => void;
  language: Language;
}

export function Hero({ onExploreClick, onNavigate, onMenuClick, language }: HeroProps) {

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20">
        <div>
          <div className="flex justify-center items-center h-16 gap-4 relative px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#3D5A80' }}>
            {/* Hamburger Menu Button - Sadece Mobil */}
            <div className="absolute left-4 lg:hidden">
              <button 
                onClick={onMenuClick}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                style={{ backgroundColor: 'rgba(41, 50, 65, 0.3)' }}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Stats - Text Only - 30% Text Color */}
            <div className="flex items-center gap-6 text-white" style={{ opacity: 0.95 }}>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 opacity-70" />
                <span className="text-sm opacity-90">2,847 {language === 'TR' ? 'İçerik' : 'Content'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 opacity-70" />
                <span className="text-sm opacity-90">1,234 {language === 'TR' ? 'Kullanıcı' : 'Users'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 opacity-70" />
                <span className="text-sm opacity-90">+156 {language === 'TR' ? 'Bu Hafta' : 'This Week'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 opacity-70" />
                <span className="text-sm opacity-90">45.2K Coin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content - 10% Brand Gradient */}
      <div className="relative h-[40vh]" style={{ background: 'linear-gradient(135deg, #3D5A80 0%, #293241 50%, #3D5A80 100%)' }}>
      </div>
    </div>
  );
}
