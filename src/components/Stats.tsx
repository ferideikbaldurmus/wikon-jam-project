const stats = [
  { value: '50,000+', label: 'Öğrenci' },
  { value: '6', label: 'Kampüs' },
  { value: '100+', label: 'Bölüm' },
  { value: '95%', label: 'Mezun İstihdamı' }
];

export function Stats() {
  return (
    <section className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-white text-4xl md:text-5xl mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
