# Wikon

Kültür ve tarih içerikli sosyal platform. Kullanıcıların bilgi paylaşımı yapabildiği, tartışmalara katılabildiği ve katkılarıyla puan kazanabildiği interaktif bir web uygulaması.

## Özellikler

- **Kullanıcı Rolleri**: Katkı puanlarına göre otomatik yükselen kullanıcı seviyeleri (Yeni Gelen, Seyyah, Gezgin, Kaşif, Konya Bilgesi)
- **Wiki Sayfaları**: Kültürel ve tarihi bilgilerin paylaşıldığı wiki sistemi
- **Tartışma Forumları**: Kullanıcıların konular hakkında tartışabildiği forum alanı
- **Puan Sistemi**: Katkı ve aktivitelerle kazanılan puanlar
- **Liderlik Tablosu**: En aktif kullanıcıların gösterildiği sıralama
- **Genç Kültür Kartı Entegrasyonu**: Kart sahipleri için özel avantajlar
- **Karanlık/Açık Tema**: Kullanıcı tercihine göre tema seçeneği
- **Dil Desteği**: Çoklu dil desteği
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