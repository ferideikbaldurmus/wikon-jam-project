import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white text-lg mb-4">Üniversite Portal</h3>
            <p className="text-gray-400 mb-4">
              Türkiye'nin önde gelen üniversitelerinde kaliteli eğitim için doğru adres.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Akademik Takvim</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Bölümler</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Kütüphane</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Kariyer Merkezi</a></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h3 className="text-white text-lg mb-4">Öğrenci Kaynakları</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Öğrenci Bilgi Sistemi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">E-Posta</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Burslar</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Yurtlar</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Merkez Kampüs, Konya, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+90 (332) XXX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@universite.edu.tr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Üniversite Portal. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
