## WiKon;
Konya’daki üniversite öğrencilerinin bilgi ve deneyimlerini tek bir dijital platformda buluşturan,
Wiki + Sözlük hibrit yapısına sahip, oyunlaştırılmış bir öğrenci bilgi paylaşım platformudur.

Bu proje; öğrencilerin ders notları, mekan önerileri, barınma rehberleri, etkinlikler, burslar, staj ve şehir yaşamına dair içerikleri başlıklar altında paylaşmasını sağlar.
Objektif bilgiler Wiki alanında, kişisel deneyimler ise Sözlük (yorum) alanında sunulur.

Kullanıcılar yaptıkları katkılar karşılığında GençCoin kazanır, seviyelerini yükseltir ve bu coin’leri Konya Genç Kültür Kart puanına dönüştürerek gerçek hayatta somut ödüllere çevirebilir.

## Proje Vizyonu:

Konya’da yaşayan üniversite öğrencilerinin kolektif aklıyla büyüyen, yaşayan, üreten ve sürekli güncel kalan bir dijital bilgi evreni oluşturmak.

## Projenin Amacı:

Wikipedia’nın yapılandırılmış bilgi modelini,
Ekşi Sözlük’ün dinamik tartışma kültürüyle birleştirerek:

- Öğrencilerin bilgi üretmesini teşvik etmek

- Katkıları oyunlaştırma sistemiyle ödüllendirmek

- GençCoin kazandırmak

- Coin’leri Konya Genç Kültür Kart puan sistemine dönüştürerek somut değere çevirmek

## Özellikler

- **Kullanıcı Rolleri**: Katkı puanlarına göre otomatik yükselen kullanıcı seviyeleri (Yeni Gelen, Seyyah, Gezgin, Kaşif, Konya Bilgesi)
- **Wiki Sayfaları**: Kültürel ve tarihi bilgilerin paylaşıldığı wiki sistemi
- **Tartışma Forumları**: Kullanıcıların konular hakkında tartışabildiği forum alanı
- **Puan Sistemi**: Katkı ve aktivitelerle kazanılan puanlar
- **Liderlik Tablosu**: En aktif kullanıcıların gösterildiği sıralama
- **Genç Kültür Kartı Entegrasyonu**: Kart sahipleri için özel avantajlar
- **Karanlık/Açık Tema**: Kullanıcı tercihine göre tema seçeneği
- **AI Chatbot**: Yardım ve bilgi almak için yapay zeka destekli sohbet botu

## Teknolojiler

- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Bileşenleri
- Vite

## Başlangıç

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak açık temada başlar. Tema tercihi kullanıcı tarafından değiştirilebilir ve localStorage'da saklanır.

## Kullanıcı Rolleri ve Puan Sistemi

- **Yeni Gelen**: 0-499 puan
- **Seyyah**: 500-4999 puan
- **Gezgin**: 5000-24999 puan
- **Kaşif**: 25000-99999 puan
- **Konya Bilgesi**: 100000+ puan

Kullanıcılar içerik paylaşarak, tartışmalara katılarak ve diğer etkileşimlerle puan kazanırlar.
