import { useState, useEffect } from 'react';
import { Mail, CreditCard, ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle, X, FileText } from 'lucide-react';
import { Language } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import konyaTeknikImg from 'figma:asset/4df7725baccf52b099534594e29de5aec1e1a441.png';
import konyaCampusImg from 'figma:asset/50d65059519d372fda1581bb1cfb6046ad205387.png';
import selcukUniImg from 'figma:asset/e587de9d1b8a3cde6d22f17c384286d93dc19eb4.png';
import necmettinUniImg from 'figma:asset/b8e5b2035bd8ee2c869306ceb4f5e22b583e8d8f.png';
import ktoKaratayImg from 'figma:asset/45691a384cc68a49a8a00a00e1cbd2e1c456ce1a.png';
import wikonLogo from 'figma:asset/0a378843eba8bccbd182b0b7d3cf119990350456.png';
import wIcon from 'figma:asset/32deb0cb615a0b1d090f6bec7ab40ad1abdce1a6.png';
import newWIcon from 'figma:asset/e6e99ba25cf8bc96a66b22f0e12e92d4e3d79f1e.png';
import wIconLatest from 'figma:asset/326bc93d2976d25e125523c19ee2627a14042c99.png';

interface AuthPageProps {
  onLogin: () => void;
  onRegister?: (firstName: string, lastName: string, email: string, cardID: string) => void;
  language: Language;
  isDarkMode: boolean;
}

type AuthMode = 'main' | 'card' | 'email';

export function AuthPage({ onLogin, onRegister, language, isDarkMode }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authMode, setAuthMode] = useState<AuthMode>('main');
  const [showPassword, setShowPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Form states
  const [cardID, setCardID] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const slides = [
    { image: konyaTeknikImg },
    { image: konyaCampusImg },
    { image: selcukUniImg },
    { image: necmettinUniImg },
    { image: ktoKaratayImg }
  ];

  // Auto-carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const eduTrRegex = /^[^\s@]+@[^\s@]+\.edu\.tr$/;
    return eduTrRegex.test(email);
  };

  const validateID = (id: string): boolean => {
    // Genç Kültür Kart ID format: 12 digits
    const idRegex = /^\d{12}$/;
    return idRegex.test(id.replace(/\s/g, ''));
  };

  const validatePassword = (pwd: string): { 
    hasNumber: boolean; 
    hasSymbol: boolean; 
    hasLetter: boolean;
    minLength: boolean;
  } => {
    return {
      hasNumber: /\d/.test(pwd),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      hasLetter: /[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(pwd),
      minLength: pwd.length >= 8
    };
  };

  const isPasswordValid = (pwd: string): boolean => {
    const validation = validatePassword(pwd);
    return validation.hasNumber && validation.hasSymbol && validation.hasLetter && validation.minLength;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(name);
  };

  // Form handlers
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateID(cardID) && validateName(cardHolderName)) {
      // Kart sahibinin adını parçalara ayır
      const names = cardHolderName.trim().split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';
      
      if (isLogin) {
        // Giriş yapıyorsa anasayfaya git
        // Kart ile giriş yapıldığında kart sahibinin adını kullan
        if (onRegister) {
          onRegister(firstName, lastName, '', cardID);
        }
        onLogin();
      } else {
        // Kayıt olduysa giriş sayfasına dön
        setIsLogin(true);
        setAuthMode('main');
        // Form alanlarını temizle
        setCardID('');
        setCardHolderName('');
        setTermsAccepted(false);
        
        // Kart ile kayıt olunduğunda kart sahibinin adını kullan
        if (onRegister) {
          onRegister(firstName, lastName, '', cardID);
        }
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && isPasswordValid(password)) {
      if (!isLogin) {
        if (validateName(firstName) && validateName(lastName)) {
          // Kayıt olduysa giriş sayfasına dön
          setIsLogin(true);
          setAuthMode('main');
          // Form alanlarını temizle
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setTermsAccepted(false);
          if (onRegister) {
            onRegister(firstName, lastName, email, cardID);
          }
        }
      } else {
        // Giriş yapıyorsa anasayfaya git
        onLogin();
      }
    }
  };

  const formatID = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatID(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 12) {
      setCardID(formatted);
    }
  };

  // Check if forms are valid
  const isCardFormValid = validateID(cardID) && validateName(cardHolderName) && (isLogin || termsAccepted);
  const isEmailFormValid = validateEmail(email) && isPasswordValid(password) && 
    (isLogin || (validateName(firstName) && validateName(lastName) && termsAccepted));

  const passwordValidation = validatePassword(password);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#F5F5F5' }}>
      {/* Left Side - Slideshow Section */}
      <div className="relative overflow-hidden lg:w-1/2 min-h-[300px] lg:min-h-screen" style={{ backgroundColor: '#3D5A80' }}>
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ 
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0
            }}
          >
            <ImageWithFallback
              src={slide.image}
              alt="WiKon Background"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[2]" style={{ 
          background: 'linear-gradient(135deg, rgba(61, 90, 128, 0.5) 0%, rgba(41, 50, 65, 0.6) 100%)'
        }}></div>

        {/* Content */}
        <div className="relative z-[3] flex flex-col justify-center items-center h-full px-8 py-12 text-white text-center">

          
          <h1 className="text-3xl lg:text-5xl mb-3 lg:mb-4 flex items-center justify-center gap-2 lg:gap-3">
            <img src={wIconLatest} alt="W" className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
            <span className="text-white px-[-50px] text-[40px] font-normal font-[Aboreto] not-italic mt-[15px] mr-[0px] mb-[0px] ml-[-7px]">iKon</span>
          </h1>
          
          <p className="text-sm lg:text-lg max-w-lg opacity-90 px-4 mb-6 lg:mb-10" style={{ color: 'white' }}>
            {language === 'TR' 
              ? 'Her katkının değer olduğu, Konya\'yı öğrencilerle birlikte büyüten dijital topluluk platformu.'
              : 'Every contribution is valuable, a digital community platform that grows Konya with students.'}
          </p>

          {/* Slide Indicators */}
          <div className="flex gap-2 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: currentSlide === index ? '32px' : '8px',
                  backgroundColor: currentSlide === index ? '#9E9E9E' : 'rgba(240, 240, 240, 0.6)'
                }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Forms Section */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center px-4 py-6 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          
          {/* Main Screen - Choose Login Method */}
          {authMode === 'main' && (
            <div className="space-y-5">
              {/* Tabs */}
              <div className="flex gap-2 p-1 rounded-2xl" style={{ backgroundColor: isDarkMode ? '#334155' : '#E8E8E8' }}>
                <button
                  onClick={() => setIsLogin(true)}
                  className="flex-1 py-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: isLogin ? '#3D5A80' : 'transparent',
                    color: isLogin ? 'white' : (isDarkMode ? '#94a3b8' : '#3D5A80')
                  }}
                >
                  {language === 'TR' ? 'Giriş Yap' : 'Sign In'}
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                  }}
                  className="flex-1 py-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: !isLogin ? '#3D5A80' : 'transparent',
                    color: !isLogin ? 'white' : (isDarkMode ? '#94a3b8' : '#3D5A80')
                  }}
                >
                  {language === 'TR' ? 'Kayıt Ol' : 'Register'}
                </button>
              </div>

              {/* Title */}
              <div className="text-center py-2">
                <h2 className="text-xl mb-1" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  {isLogin 
                    ? (language === 'TR' ? 'Hesabına Giriş Yap' : 'Sign In to Your Account')
                    : (language === 'TR' ? 'Hesap Oluştur' : 'Create Account')}
                </h2>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {language === 'TR' ? 'Giriş yönteminizi seçin' : 'Choose your login method'}
                </p>
              </div>

              {/* Login Method Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setAuthMode('card')}
                  className="w-full py-5 px-6 rounded-2xl flex items-center justify-between transition-all hover:brightness-110 shadow-lg"
                  style={{ backgroundColor: '#3D5A80', color: 'white' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(240, 240, 240, 0.3)' }}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-base">
                        {language === 'TR' ? 'Genç Kültür Kart' : 'Youth Culture Card'}
                      </div>
                      <div className="text-xs opacity-80">
                        {language === 'TR' ? 'Kart bilgilerinle giriş yap' : 'Login with card info'}
                      </div>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>

                <button
                  onClick={() => setAuthMode('email')}
                  className="w-full py-5 px-6 rounded-2xl flex items-center justify-between transition-all"
                  style={{ backgroundColor: '#E8E8E8', color: '#293241' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D0D0D0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E8E8E8'}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-base">
                        {language === 'TR' ? 'Öğrenci E-postası ve Şifre' : 'Student Email & Password'}
                      </div>
                      <div className="text-xs opacity-80">
                        {language === 'TR' ? '.edu.tr e-postası ve şifre ile giriş' : 'Login with .edu.tr email and password'}
                      </div>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

              {/* Info */}
              <div className="rounded-xl p-4">
                <p className="text-xs text-center" style={{ color: isDarkMode ? 'white' : '#293241' }}>
                  {language === 'TR' 
                    ? 'Her katkın GençCoin kazandırır. Coin\'lerini Genç Kültür Kart puanına dönüştür!'
                    : 'Every contribution earns GençCoin. Convert your coins to Youth Culture Card points!'}
                </p>
              </div>
            </div>
          )}

          {/* Card Login/Register Screen */}
          {authMode === 'card' && (
            <div className="space-y-5">
              {/* Back Button */}
              <button
                onClick={() => setAuthMode('main')}
                className="flex items-center gap-2 transition-all hover:opacity-70"
                style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
              >
                <ArrowLeft className="w-5 h-5" />
                {language === 'TR' ? 'Geri' : 'Back'}
              </button>

              {/* Title */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: isDarkMode ? '#334155' : 'white' }}>
                  <CreditCard className="w-8 h-8" style={{ color: '#3D5A80' }} />
                </div>
                <h2 className="text-xl mb-2" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  {isLogin 
                    ? (language === 'TR' ? 'Genç Kültür Kart ile Giriş' : 'Login with Youth Culture Card')
                    : (language === 'TR' ? 'Genç Kültür Kart ile Kayıt' : 'Register with Youth Culture Card')}
                </h2>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {language === 'TR' ? 'Kart bilgilerinizi girin' : 'Enter your card information'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleCardSubmit} className="space-y-4">
                {/* Card Holder Name */}
                <div>
                  <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                    {language === 'TR' ? 'Kart Sahibinin Adı Soyadı' : 'Card Holder Name'}
                  </label>
                  <input
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    placeholder={language === 'TR' ? 'Adınız Soyadınız' : 'Your Full Name'}
                    className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent text-lg"
                    style={{ 
                      borderColor: validateName(cardHolderName) || !cardHolderName ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                      backgroundColor: isDarkMode ? '#1e293b' : 'white',
                      color: isDarkMode ? '#e2e8f0' : '#293241',
                      '--tw-ring-color': '#EE6C4D'
                    } as React.CSSProperties}
                  />
                  {cardHolderName && !validateName(cardHolderName) && (
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#EE6C4D' }}>
                      <XCircle className="w-3 h-3" />
                      {language === 'TR' ? 'Geçerli bir ad soyad girin (en az 2 karakter, sadece harf)' : 'Enter a valid name (min 2 chars, letters only)'}
                    </p>
                  )}
                </div>

                {/* Card ID */}
                <div>
                  <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                    {language === 'TR' ? 'Genç Kültür Kart ID' : 'Youth Culture Card ID'}
                  </label>
                  <input
                    type="text"
                    value={cardID}
                    onChange={handleIDChange}
                    placeholder="1234 5678 9012"
                    className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent tracking-wider text-lg"
                    style={{ 
                      borderColor: validateID(cardID) || !cardID ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                      backgroundColor: isDarkMode ? '#1e293b' : 'white',
                      color: isDarkMode ? '#e2e8f0' : '#293241',
                      '--tw-ring-color': '#EE6C4D'
                    } as React.CSSProperties}
                  />
                  {cardID && !validateID(cardID) && (
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#EE6C4D' }}>
                      <XCircle className="w-3 h-3" />
                      {language === 'TR' ? 'Geçerli bir Kart ID girin (12 rakam)' : 'Enter a valid Card ID (12 digits)'}
                    </p>
                  )}
                  {cardID && validateID(cardID) && (
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                      <CheckCircle2 className="w-3 h-3" />
                      {language === 'TR' ? 'Kart ID geçerli' : 'Card ID is valid'}
                    </p>
                  )}
                </div>

                {/* Info */}
                <div className="rounded-xl p-4" style={{ backgroundColor: isDarkMode ? '#334155' : 'white' }}>
                  <p className="text-xs" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                    {language === 'TR' 
                      ? 'Genç Kültür Kart ID bilginizi kartınızın üzerinde bulabilirsiniz.'
                      : 'You can find your Youth Culture Card ID on your card.'}
                  </p>
                </div>

                {/* Terms Checkbox (Register only) */}
                {!isLogin && (
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '2px solid #475569' : '2px solid white' }}>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer mt-0.5 flex-shrink-0 border-2"
                      style={{ 
                        accentColor: '#EE6C4D',
                        backgroundColor: isDarkMode ? '#1e293b' : 'white',
                        borderColor: isDarkMode ? '#475569' : '#E8E8E8'
                      }}
                    />
                    <span className="text-xs" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                      {language === 'TR' ? (
                        <>
                          <button type="button" onClick={() => setShowTermsModal(true)} className="underline" style={{ color: '#3D5A80' }}>Kullanım Şartları</button>
                          {' ve '}
                          <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline" style={{ color: '#3D5A80' }}>Gizlilik Politikası</button>
                          'nı kabul ediyorum.
                        </>
                      ) : (
                        <>
                          I accept the{' '}
                          <button type="button" onClick={() => setShowTermsModal(true)} className="underline" style={{ color: '#3D5A80' }}>Terms of Service</button>
                          {' and '}
                          <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline" style={{ color: '#3D5A80' }}>Privacy Policy</button>.
                        </>
                      )}
                    </span>
                  </label>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isCardFormValid}
                  className="w-full py-5 rounded-2xl text-white transition-all text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  {isLogin 
                    ? (language === 'TR' ? 'Giriş Yap' : 'Sign In')
                    : (language === 'TR' ? 'Kayıt Ol' : 'Register')}
                </button>
              </form>
            </div>
          )}

          {/* Email Login/Register Screen */}
          {authMode === 'email' && (
            <div className="space-y-5">
              {/* Back Button */}
              <button
                onClick={() => setAuthMode('main')}
                className="flex items-center gap-2 transition-all hover:opacity-70"
                style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}
              >
                <ArrowLeft className="w-5 h-5" />
                {language === 'TR' ? 'Geri' : 'Back'}
              </button>

              {/* Title */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: isDarkMode ? '#334155' : 'white' }}>
                  <Mail className="w-8 h-8" style={{ color: '#3D5A80' }} />
                </div>
                <h2 className="text-xl mb-2" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  {isLogin 
                    ? (language === 'TR' ? 'E-posta ile Giriş' : 'Login with Email')
                    : (language === 'TR' ? 'E-posta ile Kayıt' : 'Register with Email')}
                </h2>
                <p className="text-sm" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }}>
                  {language === 'TR' ? 'Üniversite e-posta adresinizi kullanın' : 'Use your university email address'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Name Fields (Register only) */}
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                        {language === 'TR' ? 'Ad' : 'First Name'}
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={language === 'TR' ? 'Adınız' : 'Your name'}
                        className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: validateName(firstName) || !firstName ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                          backgroundColor: isDarkMode ? '#1e293b' : 'white',
                          color: isDarkMode ? '#e2e8f0' : '#293241',
                          '--tw-ring-color': '#EE6C4D'
                        } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                        {language === 'TR' ? 'Soyad' : 'Last Name'}
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={language === 'TR' ? 'Soyadınız' : 'Last name'}
                        className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: validateName(lastName) || !lastName ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                          backgroundColor: isDarkMode ? '#1e293b' : 'white',
                          color: isDarkMode ? '#e2e8f0' : '#293241',
                          '--tw-ring-color': '#EE6C4D'
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                    {language === 'TR' ? 'Üniversite E-posta' : 'University Email'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@edu.tr"
                    className="w-full px-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent text-lg"
                    style={{ 
                      borderColor: validateEmail(email) || !email ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                      backgroundColor: isDarkMode ? '#1e293b' : 'white',
                      color: isDarkMode ? '#e2e8f0' : '#293241',
                      '--tw-ring-color': '#EE6C4D'
                    } as React.CSSProperties}
                  />
                  {email && !validateEmail(email) && (
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#EE6C4D' }}>
                      <XCircle className="w-3 h-3" />
                      {language === 'TR' ? 'Geçerli bir .edu.tr uzantılı e-posta adresi girin' : 'Enter a valid .edu.tr email address'}
                    </p>
                  )}
                  {email && validateEmail(email) && (
                    <p className="text-xs mt-1 flex items-center gap-1" style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}>
                      <CheckCircle2 className="w-3 h-3" />
                      {language === 'TR' ? 'E-posta geçerli' : 'Email is valid'}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm mb-2 block" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                    {language === 'TR' ? 'Şifre' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-4 pr-12 rounded-xl border-2 focus:outline-none focus:ring-2 focus:border-transparent text-lg"
                      style={{ 
                        borderColor: isPasswordValid(password) || !password ? (isDarkMode ? '#475569' : 'white') : '#EE6C4D',
                        backgroundColor: isDarkMode ? '#1e293b' : 'white',
                        color: isDarkMode ? '#e2e8f0' : '#293241',
                        '--tw-ring-color': '#EE6C4D'
                      } as React.CSSProperties}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                      style={{ color: isDarkMode ? '#94a3b8' : '#9E9E9E' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs" style={{ color: passwordValidation.minLength ? (isDarkMode ? '#94a3b8' : '#9E9E9E') : '#EE6C4D' }}>
                        {passwordValidation.minLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {language === 'TR' ? 'En az 8 karakter' : 'At least 8 characters'}
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: passwordValidation.hasLetter ? (isDarkMode ? '#94a3b8' : '#9E9E9E') : '#EE6C4D' }}>
                        {passwordValidation.hasLetter ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {language === 'TR' ? 'En az bir harf' : 'At least one letter'}
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: passwordValidation.hasNumber ? (isDarkMode ? '#94a3b8' : '#9E9E9E') : '#EE6C4D' }}>
                        {passwordValidation.hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {language === 'TR' ? 'En az bir rakam' : 'At least one number'}
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: passwordValidation.hasSymbol ? (isDarkMode ? '#94a3b8' : '#9E9E9E') : '#EE6C4D' }}>
                        {passwordValidation.hasSymbol ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {language === 'TR' ? 'En az bir özel karakter (!@#$%...)' : 'At least one special character (!@#$%...)'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms Checkbox (Register only) */}
                {!isLogin && (
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white', border: isDarkMode ? '2px solid #475569' : '2px solid white' }}>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer mt-0.5 flex-shrink-0"
                      style={{ accentColor: '#EE6C4D' }}
                    />
                    <span className="text-xs" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                      {language === 'TR' ? (
                        <>
                          <button type="button" onClick={() => setShowTermsModal(true)} className="underline" style={{ color: '#3D5A80' }}>Kullanım Şartları</button>
                          {' ve '}
                          <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline" style={{ color: '#3D5A80' }}>Gizlilik Politikası</button>
                          'nı kabul ediyorum.
                        </>
                      ) : (
                        <>
                          I accept the{' '}
                          <button type="button" onClick={() => setShowTermsModal(true)} className="underline" style={{ color: '#3D5A80' }}>Terms of Service</button>
                          {' and '}
                          <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline" style={{ color: '#3D5A80' }}>Privacy Policy</button>.
                        </>
                      )}
                    </span>
                  </label>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isEmailFormValid}
                  className="w-full py-5 rounded-2xl text-white transition-all text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#EE6C4D' }}
                >
                  {isLogin 
                    ? (language === 'TR' ? 'Giriş Yap' : 'Sign In')
                    : (language === 'TR' ? 'Kayıt Ol' : 'Register')}
                </button>
              </form>
            </div>
          )}
          
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: isDarkMode ? '#475569' : '#E0FBFC' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: isDarkMode ? '#334155' : '#E0FBFC' }}>
                  <FileText className="w-5 h-5" style={{ color: '#3D5A80' }} />
                </div>
                <h3 className="text-xl" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  {language === 'TR' ? 'Kullanım Şartları' : 'Terms of Service'}
                </h3>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-6 h-6" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
              <div className="space-y-4 text-sm">
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>1. {language === 'TR' ? 'Genel Kurallar' : 'General Rules'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'WİKON platformuna kayıt olarak, Konya\'daki üniversite öğrencilerine yönelik dijital bir topluluk platformuna katılmış olursunuz. Platform kullanımı sırasında saygılı ve yapıcı bir dil kullanmanız beklenmektedir.'
                      : 'By registering on the WİKON platform, you join a digital community platform for university students in Konya. You are expected to use respectful and constructive language while using the platform.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>2. {language === 'TR' ? 'İçerik Kuralları' : 'Content Guidelines'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Platformda paylaştığınız içerikler telif haklarına uygun olmalı, yanıltıcı bilgi içermemeli ve başkalarının haklarına saygı göstermelidir. Uygunsuz içerikler moderatörler tarafından kaldırılabilir.'
                      : 'Content you share on the platform must comply with copyright laws, not contain misleading information, and respect the rights of others. Inappropriate content may be removed by moderators.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>3. {language === 'TR' ? 'GençCoin Sistemi' : 'GençCoin System'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Platformdaki katkılarınız karşılığında GençCoin kazanırsınız. Bu coin\'ler Genç Kültür Kart puanına dönüştürülebilir. Sistemi kötüye kullanma girişimleri hesabınızın askıya alınmasına neden olabilir.'
                      : 'You earn GençCoin for your contributions on the platform. These coins can be converted to Youth Culture Card points. Attempts to abuse the system may result in account suspension.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>4. {language === 'TR' ? 'Hesap Güvenliği' : 'Account Security'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Hesap güvenliğinizden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayın ve güvenli bir şifre kullanın. Hesabınızda şüpheli bir aktivite fark ederseniz derhal bizimle iletişime geçin.'
                      : 'You are responsible for your account security. Do not share your password with anyone and use a secure password. Contact us immediately if you notice suspicious activity on your account.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>5. {language === 'TR' ? 'Değişiklikler' : 'Changes'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Bu kullanım şartları zaman zaman güncellenebilir. Önemli değişiklikler olduğunda size bildirimde bulunacağız. Platformu kullanmaya devam ederek güncellenmiş şartları kabul etmiş olursunuz.'
                      : 'These terms of service may be updated from time to time. We will notify you of significant changes. By continuing to use the platform, you accept the updated terms.'}
                  </p>
                </section>
              </div>
            </div>
            <div className="p-6 border-t" style={{ borderColor: isDarkMode ? '#475569' : '#E0FBFC' }}>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="w-full py-3 rounded-xl text-white transition-all hover:brightness-110"
                style={{ backgroundColor: '#EE6C4D' }}
              >
                {language === 'TR' ? 'Anladım' : 'I Understand'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" style={{ backgroundColor: isDarkMode ? '#1e293b' : 'white' }}>
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: isDarkMode ? '#475569' : '#E0FBFC' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: isDarkMode ? '#334155' : '#E0FBFC' }}>
                  <FileText className="w-5 h-5" style={{ color: '#3D5A80' }} />
                </div>
                <h3 className="text-xl" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
                  {language === 'TR' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                </h3>
              </div>
              <button onClick={() => setShowPrivacyModal(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-6 h-6" style={{ color: isDarkMode ? '#94a3b8' : '#3D5A80' }} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1" style={{ color: isDarkMode ? '#e2e8f0' : '#293241' }}>
              <div className="space-y-4 text-sm">
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>1. {language === 'TR' ? 'Toplanan Veriler' : 'Data Collection'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'WİKON platformunda kayıt olurken adınız, soyadınız, üniversite e-posta adresiniz ve/veya Genç Kültür Kart bilgileriniz toplanır. Bu bilgiler platformun işleyişi için gereklidir.'
                      : 'When registering on the WİKON platform, we collect your first name, last name, university email address and/or Youth Culture Card information. This information is necessary for the operation of the platform.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>2. {language === 'TR' ? 'Verilerin Kullanımı' : 'Data Usage'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Toplanan veriler sadece platform hizmetlerini sunmak, kullanıcı deneyimini iyileştirmek ve GençCoin-Genç Kültür Kart entegrasyonunu sağlamak için kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz.'
                      : 'Collected data is used only to provide platform services, improve user experience, and enable GençCoin-Youth Culture Card integration. Your data is not shared with third parties.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>3. {language === 'TR' ? 'Veri Güvenliği' : 'Data Security'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Verilerinizin güvenliği bizim için önceliklidir. Modern şifreleme teknolojileri ve güvenlik önlemleri kullanarak verilerinizi koruyoruz. Ancak internet üzerinden veri iletiminin %100 güvenli olmadığını unutmayın.'
                      : 'Your data security is our priority. We protect your data using modern encryption technologies and security measures. However, remember that data transmission over the internet is not 100% secure.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>4. {language === 'TR' ? 'Çerezler' : 'Cookies'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'Platform deneyiminizi iyileştirmek için çerezler kullanıyoruz. Bu çerezler oturum bilgilerinizi saklar ve tercihlerinizi hatırlar. Tarayıcı ayarlarından çerezleri yönetebilirsiniz.'
                      : 'We use cookies to improve your platform experience. These cookies store your session information and remember your preferences. You can manage cookies through your browser settings.'}
                  </p>
                </section>
                <section>
                  <h4 className="mb-2" style={{ color: '#3D5A80' }}>5. {language === 'TR' ? 'Haklarınız' : 'Your Rights'}</h4>
                  <p style={{ color: isDarkMode ? '#cbd5e1' : '#293241' }}>
                    {language === 'TR' 
                      ? 'KVKK kapsamında verilerinize erişme, düzeltme, silme ve aktarma haklarına sahipsiniz. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.'
                      : 'Under GDPR, you have the right to access, correct, delete and transfer your data. You can contact us to exercise these rights.'}
                  </p>
                </section>
              </div>
            </div>
            <div className="p-6 border-t" style={{ borderColor: isDarkMode ? '#475569' : '#E0FBFC' }}>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-3 rounded-xl text-white transition-all hover:brightness-110"
                style={{ backgroundColor: '#EE6C4D' }}
              >
                {language === 'TR' ? 'Anladım' : 'I Understand'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}