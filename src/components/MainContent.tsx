import { Eye, ThumbsUp, MessageCircle, Clock, User, Coins, Edit, CheckCircle, XCircle, Award, TrendingUp, BookOpen, Sparkles, ArrowRight, LayoutGrid, GraduationCap, PartyPopper, Home, Briefcase, Map, X } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SearchHeader } from './SearchHeader';
import { toast } from 'sonner@2.0.3';

// 60-30-10 Color Rule Applied
const categories = [
  { id: 'all', label: 'Tümü', icon: LayoutGrid, color: '#3D5A80' },
  { id: 'academic', label: 'Akademik', icon: GraduationCap, color: '#3D5A80' },
  { id: 'social', label: 'Sosyal Yaşam', icon: PartyPopper, color: '#EE6C4D' },
  { id: 'housing', label: 'Barınma', icon: Home, color: '#98C1D9' },
  { id: 'career', label: 'Kariyer & Staj', icon: Briefcase, color: '#3D5A80' },
  { id: 'city', label: 'Şehir Rehberi', icon: Map, color: '#98C1D9' }
];

const contentItems = [
  {
    id: 1,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Alaaddin Tepesi',
    description: 'Konya\'nın merkezinde yer alan tarihi Alaaddin Tepesi, şehrin en önemli simgelerinden biridir. Selçuklu döneminden kalma Alaaddin Camii ve çevresindeki park alanıyla öğrencilerin sık��a ziyaret ettiği bir mekandır...',
    author: 'Mehmet Demir',
    authorRole: 'Konya Bilgesi',
    timeAgo: '2 saat önce',
    views: 245,
    likes: 67,
    comments: 12,
    verified: true,
    coinEarned: 15,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1639363900925-915d37bcdffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGwlMjBwYXJrfGVufDF8fHx8MTc2NDM0NTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Akademik',
    categoryId: 'academic',
    title: 'Yapay Zeka ve Makine Öğrenmesi Dersi',
    description: 'Bu dönem bu dersi aldım. Hoca gerçekten çok iyi anlatıyor, özellikle proje kısmı çok keyifli. Final sınavı biraz zorlayıcı olabilir ama proje notunuz iyiyse geçmek zor değil. Dersi almayı düşünenler mutlaka projeye önem versin...',
    author: 'Ayşe Kaya',
    authorRole: 'Kaşif',
    timeAgo: '5 saat önce',
    views: 189,
    likes: 45,
    comments: 28,
    verified: true,
    coinEarned: 20,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2xhc3N8ZW58MXx8fHwxNzY0MzQ0OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'KYK Yurtları - Başvuru Süreci',
    description: 'Kredi Yurtlar Kurumu (KYK) yurtlarına başvuru genellikle her yıl Ağustos ayında e-Devlet üzerinden yapılır. Başvuru sırasında dikkat edilmesi gereken önemli noktalar: 1) Gelir durumu belgeleri 2) Başarı belgesi 3) Tercih sıralaması...',
    author: 'Fatma Yıldız',
    authorRole: 'Gezgin',
    timeAgo: '1 gün önce',
    views: 512,
    likes: 89,
    comments: 34,
    verified: true,
    coinEarned: 25,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1683509303663-b8d913f61bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MzQ0OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'ASELSAN Staj Deneyimi',
    description: 'Geçen yaz ASELSAN\'da staj yaptım. Mülakat süreci 2 aşamalıydı - teknik ve İngilizce. Staj süresince gerçek projelerde çalışma fırsatı bulduk. Yemek ve servis imkanları var. Staj sonunda da işe alım yapıyorlar başarılı olanlara...',
    author: 'Can Özdemir',
    authorRole: 'Seyyah',
    timeAgo: '3 gün önce',
    views: 678,
    likes: 134,
    comments: 56,
    verified: true,
    coinEarned: 30,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1661475765552-9a0c80c8b44e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGludGVybnNoaXAlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MzQ0OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Akademik Ek İçerikler
  {
    id: 5,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Akademik',
    categoryId: 'academic',
    title: 'Kütüphane Kullanım Rehberi',
    description: 'Selçuk Üniversitesi Merkez Kütüphanesi 7/24 hizmet veriyor. Kitap ödünç alma, sessiz çalışma alanları, grup çalışma odaları ve online veritabanlarına erişim imkanı sunuyor...',
    author: 'Zeynep Arslan',
    authorRole: 'Gezgin',
    timeAgo: '8 saat önce',
    views: 342,
    likes: 78,
    comments: 15,
    verified: true,
    coinEarned: 18,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5fGVufDF8fHx8MTc2NDM0NTE4OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Akademik',
    categoryId: 'academic',
    title: 'Diferansiyel Denklemler Final Hazırlığı',
    description: 'Final haftası yaklaşıyor, diferansiyel için grup çalışması yapmak istiyorum. Perşembe akşamı kütüphanede buluşalım mı? Geçen yıl soruları elimde var...',
    author: 'Burak Yılmaz',
    authorRole: 'Seyyah',
    timeAgo: '12 saat önce',
    views: 156,
    likes: 34,
    comments: 42,
    verified: true,
    coinEarned: 22,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1627560985113-ab67e8031f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWN0dXJlJTIwaGFsbCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjQzNDQ5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 7,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Akademik',
    categoryId: 'academic',
    title: 'Erasmus+ Başvuru Süreci',
    description: 'Erasmus+ programına başvuru için not ortalamanızın en az 2.50 olması gerekiyor. Dil sertifikası, motivasyon mektubu ve transkript hazırlamalısınız...',
    author: 'Elif Çelik',
    authorRole: 'Konya Bilgesi',
    timeAgo: '1 gün önce',
    views: 523,
    likes: 145,
    comments: 67,
    verified: true,
    coinEarned: 35,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0MzQyODMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Akademik',
    categoryId: 'academic',
    title: 'Veri Yapıları Hoca Tavsiyesi',
    description: 'Veri yapıları dersini kimin hocasından alsam? Lab çalışmaları nasıl? Bu dersten kalma riski var mı?',
    author: 'Emre Şahin',
    authorRole: 'Yeni Gelen',
    timeAgo: '2 gün önce',
    views: 278,
    likes: 52,
    comments: 89,
    verified: true,
    coinEarned: 16,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2xhc3N8ZW58MXx8fHwxNzY0MzQ0OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Sosyal Yaşam İçerikleri
  {
    id: 9,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'En İyi Öğrenci Kafeler',
    description: 'Konya\'da öğrenciler için uygun fiyatlı ve güzel atmosfere sahip kafeler arıyorum. WiFi ve priz olması önemli...',
    author: 'Selin Korkmaz',
    authorRole: 'Seyyah',
    timeAgo: '4 saat önce',
    views: 298,
    likes: 73,
    comments: 54,
    verified: true,
    coinEarned: 24,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1758840734307-aed01ccec284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2FmZSUyMHNvY2lhbHxlbnwxfHx8fDE3NjQ0MTYzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 10,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'Konya Festivaller ve Etkinlikler',
    description: 'Konya\'da yıl boyunca düzenlenen önemli etkinlikler: Mevlana Festivali, Kültür ve Sanat Günleri, Öğrenci Baharı Şenlikleri...',
    author: 'Ahmet Kılıç',
    authorRole: 'Konya Bilgesi',
    timeAgo: '7 saat önce',
    views: 567,
    likes: 132,
    comments: 38,
    verified: true,
    coinEarned: 28,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1743791022256-40413c5f019b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBldmVudHxlbnwxfHx8fDE3NjQzNTA2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 11,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'Spor Salonları ve Öğrenci İndirimleri',
    description: 'Kampüs yakınlarında uygun fiyatlı spor salonu arıyorum. Öğrencilere özel indirim yapan yerler var mı?',
    author: 'Deniz Öztürk',
    authorRole: 'Gezgin',
    timeAgo: '10 saat önce',
    views: 223,
    likes: 56,
    comments: 47,
    verified: true,
    coinEarned: 21,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc2NDQxNjQwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 12,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'Öğrenci Kulüpleri ve Topluluklar',
    description: '50\'den fazla öğrenci kulübü aktif. Teknoloji, sanat, spor, sosyal sorumluluk alanlarında kulüplere katılabilirsiniz...',
    author: 'Ceren Aktaş',
    authorRole: 'Kaşif',
    timeAgo: '1 gün önce',
    views: 445,
    likes: 108,
    comments: 29,
    verified: true,
    coinEarned: 26,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0MzQyODMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 13,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'Ekonomik Restoran Önerileri',
    description: 'Uygun fiyatlı ve kaliteli yemek yiyebileceğimiz restoranlar önerisi. 100-150 TL arası bütçe düşünüyorum...',
    author: 'Kerem Bulut',
    authorRole: 'Seyyah',
    timeAgo: '2 gün önce',
    views: 387,
    likes: 82,
    comments: 91,
    verified: true,
    coinEarned: 23,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NjQzNTU2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 14,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Sosyal Yaşam',
    categoryId: 'social',
    title: 'Sinema ve AVM İndirimleri',
    description: 'M1 Konya ve Kulesite AVM\'de öğrencilere özel %25-40 sinema indirimi. Matine seansları daha uygun...',
    author: 'İpek Demir',
    authorRole: 'Gezgin',
    timeAgo: '3 gün önce',
    views: 512,
    likes: 119,
    comments: 44,
    verified: true,
    coinEarned: 20,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1595879171931-4ca27febc4bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjByZXRhaWx8ZW58MXx8fHwxNzY0NDEwMDc0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Barınma İçerikleri
  {
    id: 15,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'Ev Arkadaşı Arıyorum - Meram',
    description: '2+1 daire, bir oda boş. Meram kampüsüne 10 dk. Kira 4000 TL, faturalar dahil 5000 TL civarı...',
    author: 'Gizem Polat',
    authorRole: 'Gezgin',
    timeAgo: '6 saat önce',
    views: 167,
    likes: 28,
    comments: 36,
    verified: true,
    coinEarned: 18,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG91c2luZyUyMHJvb218ZW58MXx8fHwxNzY0NDE2Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 16,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'Özel Yurtlar Karşılaştırması',
    description: 'Konya\'da 100+ özel yurt. Fiyatlar 3500-8000 TL arası. En popüler yurtlar: Kent Yurt, Başkent, Selçuklu...',
    author: 'Oğuz Kaplan',
    authorRole: 'Kaşif',
    timeAgo: '9 saat önce',
    views: 634,
    likes: 142,
    comments: 78,
    verified: true,
    coinEarned: 32,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1683509303663-b8d913f61bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MzQ0OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 17,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'Ev Kiralarken Dikkat Edilecekler',
    description: 'İlk defa ev tutacağım. Sözleşme, depozito, emlakçı, faturalar konusunda deneyimli arkadaşlar yardımcı olabilir mi?',
    author: 'Yasemin Kurt',
    authorRole: 'Yeni Gelen',
    timeAgo: '14 saat önce',
    views: 289,
    likes: 67,
    comments: 83,
    verified: true,
    coinEarned: 27,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1654506012740-09321c969dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0NDE2Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 18,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'Kampüse Yakın Semtler',
    description: 'Selçuk Üniversitesi\'ne yakın popüler semtler: Meram, Bosna Hersek, Yazır. Ulaşım ve market açısından değerlendirme...',
    author: 'Onur Tekin',
    authorRole: 'Konya Bilgesi',
    timeAgo: '2 gün önce',
    views: 723,
    likes: 165,
    comments: 52,
    verified: true,
    coinEarned: 29,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1662890592067-572513393441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG91dGRvb3J8ZW58MXx8fHwxNzY0NDE2Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 19,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Barınma',
    categoryId: 'housing',
    title: 'Yurtta İnternet Hızı Sorunu',
    description: 'Yurtta internet çok yavaş, özellikle akşamları. Online derslere giremiyorum. Aynı sorunu yaşayan var mı?',
    author: 'Berk Aydın',
    authorRole: 'Seyyah',
    timeAgo: '3 gün önce',
    views: 198,
    likes: 45,
    comments: 67,
    verified: true,
    coinEarned: 19,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG91c2luZyUyMHJvb218ZW58MXx8fHwxNzY0NDE2Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Kariyer & Staj Ek İçerikler
  {
    id: 20,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'CV Hazırlama Rehberi',
    description: 'Etkili CV için: Kişisel bilgiler, eğitim, deneyim, projeler, yetenekler. Maksimum 2 sayfa, ATS uyumlu şablonlar...',
    author: 'Ece Yavuz',
    authorRole: 'Kaşif',
    timeAgo: '5 saat önce',
    views: 456,
    likes: 112,
    comments: 41,
    verified: true,
    coinEarned: 26,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1698047681432-006d2449c631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN1bWUlMjBjdiUyMGRvY3VtZW50fGVufDF8fHx8MTc2NDM5MzkzNnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 21,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'Yazılım Stajı Portfolio Önerileri',
    description: 'Yazılım stajı için portfolio hazırlıyorum. GitHub projeleri, teknolojiler, kendi web sitesi konusunda önerileriniz neler?',
    author: 'Alper Çetin',
    authorRole: 'Gezgin',
    timeAgo: '11 saat önce',
    views: 334,
    likes: 76,
    comments: 94,
    verified: true,
    coinEarned: 28,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1702047129200-89734f555f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjQzNzg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 22,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'Mülakat Teknikleri ve Hazırlık',
    description: 'İş mülakatlarında başarı: Şirket araştırması, yaygın sorular, STAR yöntemi, kılık kıyafet, vücut dili...',
    author: 'Mert Koç',
    authorRole: 'Konya Bilgesi',
    timeAgo: '1 gün önce',
    views: 589,
    likes: 148,
    comments: 63,
    verified: true,
    coinEarned: 33,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1758520144426-edf40a58f299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBpbnRlcnZpZXclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0NDE1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 23,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'Part-time İş İmkanları',
    description: 'Okulla birlikte çalışabileceğim part-time iş arıyorum. Hafta sonu uygun. Konya\'da öğrencilere uygun pozisyonlar?',
    author: 'Sevgi Aksoy',
    authorRole: 'Seyyah',
    timeAgo: '2 gün önce',
    views: 412,
    likes: 89,
    comments: 76,
    verified: true,
    coinEarned: 24,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1758840734307-aed01ccec284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY2FmZSUyMHNvY2lhbHxlbnwxfHx8fDE3NjQ0MTYzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 24,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Kariyer & Staj',
    categoryId: 'career',
    title: 'Networking ve LinkedIn Kullanımı',
    description: 'Profesyonel network oluşturma: LinkedIn profil optimizasyonu, sektör etkinlikleri, kariyer fuarları, mezunlarla iletişim...',
    author: 'Beste Özkan',
    authorRole: 'Gezgin',
    timeAgo: '4 gün önce',
    views: 498,
    likes: 125,
    comments: 38,
    verified: true,
    coinEarned: 27,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1702047129200-89734f555f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjQzNzg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  // Şehir Rehberi Ek İçerikler
  {
    id: 25,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Mevlana Müzesi Ziyaret İpuçları',
    description: 'Hafta sonu Mevlana Müzesini gezmeyi planlıyorum. Giriş ücreti, öğrenci indirimi, süre, çevre gezilecek yerler hakkında bilgi?',
    author: 'Kaan Doğan',
    authorRole: 'Gezgin',
    timeAgo: '7 saat önce',
    views: 312,
    likes: 71,
    comments: 48,
    verified: true,
    coinEarned: 22,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1623667882762-53c53e826c42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMG1vc3F1ZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQ0MTYzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 26,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Toplu Taşıma Rehberi',
    description: 'Konya toplu taşıma: Tramvay ve otobüsler. KonKart ile %50 öğrenci indirimi. Hatlar: Alaaddin-Karatay, Alaaddin-Meram...',
    author: 'Tuğba Şen',
    authorRole: 'Kaşif',
    timeAgo: '13 saat önce',
    views: 567,
    likes: 134,
    comments: 56,
    verified: true,
    coinEarned: 29,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1662890592067-572513393441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG91dGRvb3J8ZW58MXx8fHwxNzY0NDE2Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 27,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Hafta Sonu Kaçamak Yerleri',
    description: 'Konya çevresinde hafta sonları gidilecek doğa yerleri? Sille, Çatalhöyük, bisiklet parkurları...',
    author: 'Cem Yalçın',
    authorRole: 'Seyyah',
    timeAgo: '1 gün önce',
    views: 289,
    likes: 63,
    comments: 72,
    verified: true,
    coinEarned: 21,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1662890592067-572513393441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMG91dGRvb3J8ZW58MXx8fHwxNzY0NDE2Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 28,
    type: 'wiki',
    contentType: 'Bilgi Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Acil Durum ve Sağlık Hizmetleri',
    description: 'Acil numaralar: 112 Ambulans, 110 İtfaiye, 155 Polis. Selçuk Üniversitesi Hastanesi 7/24 hizmet. Kampüste sağlık merkezi...',
    author: 'Hakan Avcı',
    authorRole: 'Konya Bilgesi',
    timeAgo: '2 gün önce',
    views: 423,
    likes: 98,
    comments: 27,
    verified: true,
    coinEarned: 25,
    tagColor: '#3D5A80',
    image: 'https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0MzQyODMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 29,
    type: 'discussion',
    contentType: 'Yorum Alanı',
    category: 'Şehir Rehberi',
    categoryId: 'city',
    title: 'Konya\'ya Yeni Geldim - Tavsiyeler?',
    description: 'Yeni geldim Konya\'ya. Şehri tanımak, yerel yemekler, hava durumu, gardırop, güvenlik konusunda tavsiyeler?',
    author: 'Pınar Özgür',
    authorRole: 'Yeni Gelen',
    timeAgo: '3 gün önce',
    views: 198,
    likes: 52,
    comments: 104,
    verified: true,
    coinEarned: 20,
    tagColor: '#98C1D9',
    image: 'https://images.unsplash.com/photo-1639363900925-915d37bcdffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGwlMjBwYXJrfGVufDF8fHx8MTc2NDM0NTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

interface MainContentProps {
  onNavigate: (page: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  onGoBack?: () => void;
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

export function MainContent({ onNavigate, language, setLanguage, onMenuClick, onLogout, onGoBack, profileName, profileUsername, currentCoins, onCoinUpdate, userRoleId = 1, userContributions = [], isDarkMode = false, setIsDarkMode }: MainContentProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('popular');
  const [contentFilter, setContentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof contentItems[0] | null>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{[key: number]: Array<{id: number, author: string, text: string, timeAgo: string}>}>({
    1: [
      { id: 1, author: 'Zeynep Aydın', text: 'Burası gerçekten çok güzel bir yer, özellikle akşamları yürüyüş yapmak için harika!', timeAgo: '1 saat önce' },
      { id: 2, author: 'Ali Yılmaz', text: 'Hafta sonu ailece gittik, çocuklar çok eğlendi. Tavsiye ederim.', timeAgo: '3 saat önce' }
    ],
    2: [
      { id: 1, author: 'Burak Demir', text: 'Bu dersi ben de aldım, gerçekten çok faydalı oldu kariyer açısından.', timeAgo: '2 saat önce' }
    ]
  });
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<{[key: number]: number}>({});
  const t = useTranslation(language);

  return (
    // 60% - Background (E0FBFC)
    <main className="flex-1 p-2 sm:p-4 lg:p-8 min-h-screen" style={{ 
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff'
    }}>
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
          
        </div>
      </div>

      {/* Modern Categories - 10% Accent Colors */}
      <div className="mb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mx-[0px] my-[-20px] px-[0px] py-[10px]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative overflow-hidden rounded-xl p-3 transition-all hover:scale-105 ${
                activeCategory === category.id
                  ? 'shadow-lg'
                  : 'border hover:shadow-md'
              }`}
              style={activeCategory === category.id ? {
                backgroundColor: '#3D5A80'
              } : { 
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
              }}
            >
              <div className="relative flex flex-col items-center gap-1.5">
                <category.icon className={`w-5 h-5 ${
                  activeCategory === category.id ? 'text-white' : ''
                }`} style={activeCategory !== category.id ? { color: isDarkMode ? '#94a3b8' : '#3D5A80' } : {}} />
                <span className={`text-xs text-center ${
                  activeCategory === category.id ? 'text-white' : ''
                }`} style={activeCategory !== category.id ? { color: isDarkMode ? '#e5e7eb' : '#293241' } : {}}>
                  {category.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Filters & Tabs - 30% Text + 10% Active */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">


          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('new')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'new'
                  ? 'border shadow-sm'
                  : 'border hover:shadow-sm'
              }`}
              style={activeTab === 'new' ? {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(224, 224, 224, 0.3)',
                color: isDarkMode ? '#e5e7eb' : isDarkMode ? '#e5e7eb' : '#3D5A80',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(158, 158, 158, 0.4)'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                color: isDarkMode ? '#94a3b8' : isDarkMode ? '#94a3b8' : '#293241'
              }}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Yeni</span>
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'popular'
                  ? 'border shadow-sm'
                  : 'border hover:shadow-sm'
              }`}
              style={activeTab === 'popular' ? {
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(224, 224, 224, 0.3)',
                color: isDarkMode ? '#e5e7eb' : isDarkMode ? '#e5e7eb' : '#3D5A80',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(158, 158, 158, 0.4)'
              } : {
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                backgroundColor: isDarkMode ? '#1e293b' : 'white',
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                color: isDarkMode ? '#94a3b8' : isDarkMode ? '#94a3b8' : '#293241'
              }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Popüler</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Content Cards - 60% White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Contributions */}
        {userContributions
          .filter(contrib => {
            const categoryMap: Record<string, string> = {
              'Akademik': 'academic',
              'Academic': 'academic',
              'Kampüs Yaşamı': 'social',
              'Campus Life': 'social',
              'Barınma': 'housing',
              'Accommodation': 'housing',
              'Kariyer': 'career',
              'Career': 'career',
              'Sosyal': 'social',
              'Social': 'social',
              'Şehir Rehberi': 'city',
              'City Guide': 'city'
            };
            const contribCategoryId = categoryMap[contrib.category] || 'all';
            return activeCategory === 'all' || contribCategoryId === activeCategory;
          })
          .filter(contrib => contentFilter === 'all' || contrib.type === contentFilter)
          .filter(contrib => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return contrib.title.toLowerCase().includes(query) || 
                   contrib.content.toLowerCase().includes(query) ||
                   contrib.category.toLowerCase().includes(query);
          })
          .map((contrib) => {
            const categoryDisplayMap: Record<string, string> = {
              'Akademik': language === 'TR' ? 'Akademik' : 'Academic',
              'Academic': language === 'TR' ? 'Akademik' : 'Academic',
              'Kampüs Yaşamı': language === 'TR' ? 'Kampüs Yaşamı' : 'Campus Life',
              'Campus Life': language === 'TR' ? 'Kampüs Yaşamı' : 'Campus Life',
              'Barınma': language === 'TR' ? 'Barınma' : 'Accommodation',
              'Accommodation': language === 'TR' ? 'Barınma' : 'Accommodation',
              'Kariyer': language === 'TR' ? 'Kariyer' : 'Career',
              'Career': language === 'TR' ? 'Kariyer' : 'Career',
              'Sosyal': language === 'TR' ? 'Sosyal Yaşam' : 'Social Life',
              'Social': language === 'TR' ? 'Sosyal Yaşam' : 'Social Life',
              'Şehir Rehberi': language === 'TR' ? 'Şehir Rehberi' : 'City Guide',
              'City Guide': language === 'TR' ? 'Şehir Rehberi' : 'City Guide'
            };
            
            return (
              <div
                key={`user-contrib-${contrib.id}`}
                className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                style={{ 
                  backgroundColor: isDarkMode ? '#1e293b' : 'white',
                  backgroundColor: isDarkMode ? '#1e293b' : 'white',
                  borderColor: '#EE6C4D',
                  borderWidth: '2px',
                  boxShadow: '0 2px 8px rgba(238, 108, 77, 0.2)'
                }}
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    {contrib.type === 'wiki' ? (
                      <BookOpen className="w-20 h-20" style={{ color: '#EE6C4D', opacity: 0.3 }} />
                    ) : (
                      <MessageCircle className="w-20 h-20" style={{ color: '#EE6C4D', opacity: 0.3 }} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Tags on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-white shadow-lg backdrop-blur-sm" style={{ backgroundColor: '#3D5A80' }}>
                        {contrib.type === 'wiki' ? <BookOpen className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                        <span>{contrib.type === 'wiki' ? (language === 'TR' ? 'Bilgi Alanı' : 'Knowledge Area') : (language === 'TR' ? 'Yorum Alanı' : 'Comment Area')}</span>
                      </span>
                      <span className="text-sm backdrop-blur-sm bg-white/90 px-3 py-1.5 rounded-xl" style={{ color: '#3D5A80' }}>{categoryDisplayMap[contrib.category] || contrib.category}</span>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl text-white text-sm backdrop-blur-sm" style={{ backgroundColor: '#EE6C4D' }}>
                      {language === 'TR' ? 'YENİ' : 'NEW'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title - 30% Text */}
                  <h3 className="mb-3 transition-colors flex items-center justify-between" style={{ color: isDarkMode ? '#e5e7eb' : isDarkMode ? '#e5e7eb' : '#293241' }}>
                    {contrib.title}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" style={{ color: '#98C1D9' }} />
                  </h3>

                  {/* Description - 30% Text */}
                  <p className="mb-4 line-clamp-2" style={{ color: isDarkMode ? '#94a3b8' : isDarkMode ? '#94a3b8' : '#3D5A80' }}>{contrib.content}</p>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center ring-2" style={{ 
                        background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                        ringColor: 'rgba(61, 90, 128, 0.2)'
                      }}>
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : isDarkMode ? '#e5e7eb' : '#293241' }}>{profileName || (language === 'TR' ? 'Sen' : 'You')}</span>
                          <CheckCircle className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>
                          <span>{language === 'TR' ? 'Yazar' : 'Author'}</span>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{language === 'TR' ? 'Az önce' : 'Just now'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}>
                        <Eye className="w-4 h-4" />
                        <span>0</span>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          const newLikedContribs = new Set(likedItems);
                          const contribKey = `contrib-${contrib.id}`;
                          const isLiked = newLikedContribs.has(contribKey as any);
                          
                          if (isLiked) {
                            newLikedContribs.delete(contribKey as any);
                            setLikeCounts({
                              ...likeCounts,
                              [contribKey]: (likeCounts[contribKey] || 0) - 1
                            });
                          } else {
                            newLikedContribs.add(contribKey as any);
                            setLikeCounts({
                              ...likeCounts,
                              [contribKey]: (likeCounts[contribKey] || 0) + 1
                            });
                          }
                          setLikedItems(newLikedContribs);
                        }}
                        className="flex items-center gap-1.5 hover:opacity-70 transition-all cursor-pointer"
                        style={{ color: likedItems.has(`contrib-${contrib.id}` as any) ? (isDarkMode ? '#e5e7eb' : '#293241') : (isDarkMode ? '#94a3b8' : '#98C1D9') }}
                      >
                        <ThumbsUp 
                          className="w-4 h-4 transition-all"
                          fill={likedItems.has(`contrib-${contrib.id}` as any) ? (isDarkMode ? '#e5e7eb' : '#293241') : 'none'}
                        />
                        <span>{likeCounts[`contrib-${contrib.id}`] || 0}</span>
                      </div>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Create a temporary item for this contribution
                          const tempItem = {
                            id: contrib.id,
                            type: contrib.type,
                            contentType: contrib.type === 'wiki' ? 'Bilgi Alanı' : 'Yorum Alanı',
                            category: contrib.category,
                            categoryId: contrib.category.toLowerCase(),
                            title: contrib.title,
                            description: contrib.content,
                            author: profileName || 'Ahmet Yılmaz',
                            authorRole: 'Gezgin',
                            timeAgo: 'Az önce',
                            views: 0,
                            likes: 0,
                            comments: 0,
                            verified: true,
                            coinEarned: contrib.type === 'wiki' ? 100 : 20,
                            tagColor: '#3D5A80',
                            image: 'https://images.unsplash.com/photo-1639363900925-915d37bcdffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGwlMjBwYXJrfGVufDF8fHx8MTc2NDM0NTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080'
                          };
                          setSelectedItem(tempItem);
                        }}
                        className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer" 
                        style={{ color: isDarkMode ? '#94a3b8' : '#98C1D9' }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>

                  {/* Coin Badge */}
                  <div className="mt-3 flex items-center gap-2 justify-end">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)' }}>
                      <Coins className="w-4 h-4" style={{ color: '#EE6C4D' }} />
                      <span className="text-sm" style={{ color: '#EE6C4D' }}>
                        +{contrib.type === 'wiki' ? '100' : '20'} GençCoin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        
        {/* Existing Content Items */}
        {contentItems
          .filter(item => activeCategory === 'all' || item.categoryId === activeCategory)
          .filter(item => contentFilter === 'all' || item.type === contentFilter)
          .filter(item => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return item.title.toLowerCase().includes(query) || 
                   item.description.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query);
          })
          .sort((a, b) => {
            if (activeTab === 'popular') {
              // Sort by popularity (views + likes * 2 + comments * 3)
              const scoreA = a.views + (a.likes * 2) + (a.comments * 3);
              const scoreB = b.views + (b.likes * 2) + (b.comments * 3);
              return scoreB - scoreA;
            }
            // Default: sort by newest (id descending)
            return b.id - a.id;
          })
          .map((item) => (
          <div
            key={item.id}
            className="group border rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            style={{ 
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              backgroundColor: isDarkMode ? '#1e293b' : 'white',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.2)' : isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(61, 90, 128, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)';
            }}
          >
            {/* Image Banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Tags on Image */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-white shadow-lg backdrop-blur-sm" style={{ backgroundColor: item.tagColor }}>
                    {item.type === 'wiki' ? <BookOpen className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    <span>{item.contentType}</span>
                  </span>
                  <span className="text-sm backdrop-blur-sm bg-white/90 px-3 py-1.5 rounded-xl" style={{ color: '#3D5A80' }}>{item.category}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title - 30% Text */}
              <h3 
                className="mb-3 transition-colors flex items-center justify-between cursor-pointer hover:opacity-70" 
                style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}
                onClick={() => setSelectedItem(item)}
              >
                {item.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" style={{ color: '#98C1D9' }} />
              </h3>

              {/* Description - 30% Text */}
              <p className="mb-4 line-clamp-2" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{item.description}</p>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center ring-2" style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                    ringColor: 'rgba(61, 90, 128, 0.2)'
                  }}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{item.author}</span>
                      <span className="px-2 py-0.5 text-xs rounded-lg border whitespace-nowrap" style={{
                        background: 'linear-gradient(90deg, rgba(224, 224, 224, 0.3), rgba(240, 240, 240, 0.3))',
                        color: isDarkMode ? '#e5e7eb' : '#3D5A80',
                        borderColor: 'rgba(208, 208, 208, 0.5)'
                      }}>
                        {item.authorRole}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: '#98C1D9' }}>{item.timeAgo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newLikedItems = new Set(likedItems);
                      const isLiked = newLikedItems.has(item.id);
                      
                      if (isLiked) {
                        newLikedItems.delete(item.id);
                        setLikeCounts({
                          ...likeCounts,
                          [item.id]: (likeCounts[item.id] || item.likes) - 1
                        });
                      } else {
                        newLikedItems.add(item.id);
                        setLikeCounts({
                          ...likeCounts,
                          [item.id]: (likeCounts[item.id] || item.likes) + 1
                        });
                      }
                      setLikedItems(newLikedItems);
                    }}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-all cursor-pointer" 
                    style={{ color: likedItems.has(item.id) ? (isDarkMode ? '#e5e7eb' : '#293241') : (isDarkMode ? '#94a3b8' : '#3D5A80') }}
                  >
                    <ThumbsUp 
                      className="w-4 h-4 transition-all" 
                      fill={likedItems.has(item.id) ? (isDarkMode ? '#e5e7eb' : '#293241') : 'none'}
                    />
                    <span className="text-sm">{likeCounts[item.id] || item.likes}</span>
                  </div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer" 
                    style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{comments[item.id]?.length || item.comments}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Yorum Bölümü */}
            {openComments === item.id && (
              <div className="border-t p-5" style={{ 
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)', 
                backgroundColor: isDarkMode ? '#0f172a' : '#F9FAFF' 
              }}>
                <h4 className="mb-4 flex items-center gap-2" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  <MessageCircle className="w-5 h-5" style={{ color: '#3D5A80' }} />
                  Yorumlar ({comments[item.id]?.length || 0})
                </h4>

                {/* Mevcut Yorumlar */}
                <div className="space-y-3 mb-4">
                  {comments[item.id]?.map((comment) => (
                    <div key={comment.id} className="rounded-xl p-4 border" style={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : 'white',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
                    }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                          background: 'linear-gradient(135deg, #98C1D9 0%, #3D5A80 100%)'
                        }}>
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{comment.author}</span>
                            <span className="text-xs" style={{ color: '#98C1D9' }}>{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Yeni Yorum Ekleme Formu */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                    background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)'
                  }}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder={language === 'TR' ? 'Yorumunuzu yazın...' : 'Write your comment...'}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        backgroundColor: isDarkMode ? '#0f172a' : 'white',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                        color: isDarkMode ? '#e5e7eb' : '#293241',
                        '--tw-ring-color': '#EE6C4D'
                      } as React.CSSProperties}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && commentText.trim()) {
                          const newComment = {
                            id: (comments[item.id]?.length || 0) + 1,
                            author: profileName || 'Sen',
                            text: commentText,
                            timeAgo: language === 'TR' ? 'Az önce' : 'Just now'
                          };
                          setComments({
                            ...comments,
                            [item.id]: [...(comments[item.id] || []), newComment]
                          });
                          setCommentText('');
                          
                          // Award coins for commenting
                          if (onCoinUpdate) {
                            onCoinUpdate(10, 'home_comment');
                            toast.success(
                              language === 'TR' 
                                ? '🎉 Yorum eklendi! +10 GençCoin kazandın!' 
                                : '🎉 Comment added! Earned +10 GençCoin!',
                              {
                                style: {
                                  background: '#3D5A80',
                                  color: '#E0FBFC',
                                  border: '2px solid #98C1D9'
                                }
                              }
                            );
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (commentText.trim()) {
                          const newComment = {
                            id: (comments[item.id]?.length || 0) + 1,
                            author: profileName || 'Sen',
                            text: commentText,
                            timeAgo: language === 'TR' ? 'Az önce' : 'Just now'
                          };
                          setComments({
                            ...comments,
                            [item.id]: [...(comments[item.id] || []), newComment]
                          });
                          setCommentText('');
                          
                          // Award coins for commenting
                          if (onCoinUpdate) {
                            onCoinUpdate(10, 'home_comment');
                            toast.success(
                              language === 'TR' 
                                ? '🎉 Yorum eklendi! +10 GençCoin kazandın!' 
                                : '🎉 Comment added! Earned +10 GençCoin!',
                              {
                                style: {
                                  background: '#3D5A80',
                                  color: '#E0FBFC',
                                  border: '2px solid #98C1D9'
                                }
                              }
                            );
                          }
                        }
                      }}
                      className="px-6 py-3 rounded-xl text-white transition-all hover:shadow-lg flex items-center gap-2"
                      style={{ backgroundColor: '#3D5A80' }}
                    >
                      <span>{language === 'TR' ? 'Gönder' : 'Send'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
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
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-white shadow-lg backdrop-blur-sm" style={{ backgroundColor: selectedItem.tagColor }}>
                  {selectedItem.type === 'wiki' ? <BookOpen className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                  <span>{selectedItem.contentType}</span>
                </span>
                <span className="text-sm backdrop-blur-sm bg-white/90 px-3 py-1.5 rounded-xl" style={{ color: '#3D5A80' }}>{selectedItem.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                {selectedItem.title}
              </h2>

              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center ring-2" style={{ 
                  background: 'linear-gradient(135deg, #3D5A80 0%, #293241 100%)',
                  ringColor: 'rgba(61, 90, 128, 0.2)'
                }}>
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{selectedItem.author}</span>
                    <span className="px-2 py-0.5 text-xs rounded-lg border" style={{
                      background: 'linear-gradient(90deg, rgba(224, 224, 224, 0.3), rgba(240, 240, 240, 0.3))',
                      color: isDarkMode ? '#e5e7eb' : '#3D5A80',
                      borderColor: 'rgba(208, 208, 208, 0.5)'
                    }}>
                      {selectedItem.authorRole}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: '#98C1D9' }}>{selectedItem.timeAgo}</span>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6">
                <p style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{selectedItem.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pb-4 border-b" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.1)' }}>
                <div className="flex items-center gap-1.5" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{selectedItem.views}</span>
                </div>
                <div 
                  onClick={() => {
                    const newLikedItems = new Set(likedItems);
                    const isLiked = newLikedItems.has(selectedItem.id);
                    
                    if (isLiked) {
                      newLikedItems.delete(selectedItem.id);
                      setLikeCounts({
                        ...likeCounts,
                        [selectedItem.id]: (likeCounts[selectedItem.id] || selectedItem.likes) - 1
                      });
                    } else {
                      newLikedItems.add(selectedItem.id);
                      setLikeCounts({
                        ...likeCounts,
                        [selectedItem.id]: (likeCounts[selectedItem.id] || selectedItem.likes) + 1
                      });
                    }
                    setLikedItems(newLikedItems);
                  }}
                  className="flex items-center gap-1.5 hover:opacity-70 transition-all cursor-pointer" 
                  style={{ color: likedItems.has(selectedItem.id) ? (isDarkMode ? '#e5e7eb' : '#293241') : (isDarkMode ? '#94a3b8' : '#3D5A80') }}
                >
                  <ThumbsUp 
                    className="w-4 h-4 transition-all" 
                    fill={likedItems.has(selectedItem.id) ? (isDarkMode ? '#e5e7eb' : '#293241') : 'none'}
                  />
                  <span className="text-sm">{likeCounts[selectedItem.id] || selectedItem.likes}</span>
                </div>
                <div 
                  onClick={() => {
                    const commentForm = document.getElementById(`comment-form-${selectedItem.id}`);
                    if (commentForm) {
                      commentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      const textarea = commentForm.querySelector('textarea');
                      if (textarea) {
                        setTimeout(() => textarea.focus(), 300);
                      }
                    }
                  }}
                  className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer" 
                  style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{comments[selectedItem.id]?.length || selectedItem.comments}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ml-auto" style={{
                  background: 'linear-gradient(90deg, rgba(238, 108, 77, 0.1), rgba(238, 108, 77, 0.05))',
                  color: '#EE6C4D',
                  borderColor: 'rgba(238, 108, 77, 0.3)'
                }}>
                  <Coins className="w-4 h-4" />
                  <span className="text-sm">+{selectedItem.coinEarned}</span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <h3 className="mb-4" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>
                  {language === 'TR' ? 'Yorumlar' : 'Comments'}
                </h3>
                
                {comments[selectedItem.id] && comments[selectedItem.id].length > 0 && (
                  <div className="space-y-3 mb-6">
                    {comments[selectedItem.id].map((comment) => (
                      <div key={comment.id} className="rounded-xl p-4 border" style={{ 
                        backgroundColor: isDarkMode ? '#0f172a' : '#F9FAFF',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
                      }}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                            background: 'linear-gradient(135deg, #98C1D9 0%, #3D5A80 100%)'
                          }}>
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm" style={{ color: isDarkMode ? '#e5e7eb' : '#293241' }}>{comment.author}</span>
                              <span className="text-xs" style={{ color: '#98C1D9' }}>{comment.timeAgo}</span>
                            </div>
                            <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Comment Form */}
                <div id={`comment-form-${selectedItem.id}`} className="mt-4">
                    <div className="rounded-xl p-4 border" style={{ 
                      backgroundColor: isDarkMode ? '#0f172a' : 'white',
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)' 
                    }}>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                          background: 'linear-gradient(135deg, #98C1D9 0%, #3D5A80 100%)'
                        }}>
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={language === 'TR' ? 'Yorumunuzu yazın...' : 'Write your comment...'}
                            className="w-full px-3 py-2 rounded-lg border resize-none outline-none transition-all"
                            style={{
                              backgroundColor: isDarkMode ? '#1e293b' : 'white',
                              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)',
                              color: isDarkMode ? '#e5e7eb' : '#293241',
                              minHeight: '80px'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3D5A80'}
                            onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(61, 90, 128, 0.15)'}
                          />
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                              {language === 'TR' ? '+10 GençCoin kazanacaksınız' : 'You will earn +10 GenCoin'}
                            </span>
                            <button
                              onClick={() => {
                                if (!commentText.trim()) {
                                  toast.error(language === 'TR' ? 'Lütfen bir yorum yazın!' : 'Please write a comment!');
                                  return;
                                }
                                
                                const newComment = {
                                  id: Date.now(),
                                  author: profileName || 'Kullanıcı',
                                  text: commentText,
                                  timeAgo: language === 'TR' ? 'Az önce' : 'Just now'
                                };
                                
                                setComments({
                                  ...comments,
                                  [selectedItem.id]: [...(comments[selectedItem.id] || []), newComment]
                                });
                                
                                setCommentText('');
                                
                                if (onCoinUpdate) {
                                  onCoinUpdate(10, 'comment');
                                }
                                
                                toast.success(
                                  language === 'TR' ? '🎉 Yorumunuz eklendi! +10 GençCoin' : '🎉 Comment added! +10 GenCoin',
                                  {
                                    style: {
                                      background: '#3D5A80',
                                      color: 'white',
                                      border: '2px solid #EE6C4D'
                                    },
                                    duration: 3000
                                  }
                                );
                              }}
                              className="px-4 py-2 rounded-lg transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
                              style={{
                                backgroundColor: '#EE6C4D',
                                color: 'white'
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                              {language === 'TR' ? 'Gönder' : 'Send'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </main>
  );
}
