import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Akademik Mükemmellik',
    description: 'Alanında uzman akademisyen kadromuz ile dünya standartlarında eğitim sunuyoruz.'
  },
  {
    icon: BookOpen,
    title: 'Zengin Program Yelpazesi',
    description: 'Farklı disiplinlerde 100\'den fazla lisans ve lisansüstü program seçeneği.'
  },
  {
    icon: Users,
    title: 'Canlı Kampüs Yaşamı',
    description: 'Öğrenci kulüpleri, sosyal etkinlikler ve spor faaliyetleriyle zengin kampüs deneyimi.'
  },
  {
    icon: Award,
    title: 'Uluslararası Akreditasyon',
    description: 'Dünya çapında tanınan akreditasyonlarla global standartlarda diploma.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 text-4xl md:text-5xl mb-4">
            Neden Bizimle?
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Öğrencilerimize en iyi eğitim deneyimini sunmak için çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
