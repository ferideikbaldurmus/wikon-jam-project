import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Merhaba! Ben Konya Genç WikiSözlük asistanıyım. Size nasıl yardımcı olabilirim?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'GençCoin nasıl kazanılır?',
    'Rol sistemi nasıl çalışır?',
    'Barınma bilgisi',
    'Etkinlikler nerede?'
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('coin') || lowerQuestion.includes('kazanılır')) {
      return 'GençCoin kazanmanın birkaç yolu var:\\n\\n• Wiki içeriği ekle (10-50 coin)\\n• Yorum yaz (5-20 coin)\\n• Arkadaş davet et (50 coin)\\n• Günlük giriş bonusu (5 coin)\\n\\nYaptığın katkıların kalitesi arttıkça kazandığın coin miktarı da artar!';
    } else if (lowerQuestion.includes('rol') || lowerQuestion.includes('seviye')) {
      return 'Rol sistemi 5 seviyeden oluşuyor:\\n\\n1. Yeni Gelen (Başlangıç)\\n2. Seyyah (100+ coin)\\n3. Gezgin (500+ coin)\\n4. Kaşif (1500+ coin)\\n5. Konya Bilgesi (5000+ coin)\\n\\nHer rol, coin kazanımında farklı çarpan bonusu sağlar!';
    } else if (lowerQuestion.includes('barınma') || lowerQuestion.includes('yurt') || lowerQuestion.includes('ev')) {
      return 'Barınma kategorisinde şunları bulabilirsin:\\n\\n• Yurt bilgileri ve değerlendirmeleri\\n• Kiralık ev ilanları\\n• Ev arkadaşı bulma\\n• Semt tavsiyeleri\\n• Kira fiyat aralıkları\\n\\nDaha fazlası için Barınma sekmesine göz atabilirsin!';
    } else if (lowerQuestion.includes('etkinlik') || lowerQuestion.includes('event')) {
      return 'Etkinlikler Ana Sayfa\'da ve Sosyal Yaşam kategorisinde bulunuyor. Konserler, konferanslar, workshoplar ve sosyal aktiviteleri takip edebilirsin!';
    } else {
      return 'Bu konuda daha detaylı bilgi için ilgili kategoriyi ziyaret edebilir veya aramayı kullanabilirsin. Başka nasıl yardımcı olabilirim?';
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Penceresi - 60% Beyaz arka plan */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[600px] border animate-in slide-in-from-bottom-5 duration-300" style={{ borderColor: 'rgba(61, 90, 128, 0.15)', zIndex: 1000 }}>
          {/* Header - 10% Brand Color */}
          <div className="p-4 rounded-t-2xl flex items-center justify-between" style={{ backgroundColor: '#3D5A80' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">AI Asistan</h3>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Her zaman çevrimiçi</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages - 60% Background */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'white' }}>
            {messages.map((message, index) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'text-white'
                        : 'bg-white shadow-sm border'
                    }`}
                    style={message.sender === 'user' ? { 
                      backgroundColor: '#3D5A80'
                    } : { 
                      borderColor: 'rgba(61, 90, 128, 0.15)',
                      color: '#293241'
                    }}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4" style={{ color: '#9E9E9E' }} />
                        <span className="text-xs" style={{ color: '#3D5A80' }}>AI Asistan</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : ''
                    }`} style={message.sender === 'bot' ? { color: '#9E9E9E' } : {}}>
                      {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Hızlı Sorular - Her bot mesajından sonra göster */}
                {message.sender === 'bot' && index === messages.length - 1 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs px-2" style={{ color: '#3D5A80' }}>Hızlı sorular:</p>
                    {quickQuestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left px-4 py-2 bg-white rounded-lg text-sm border transition-colors"
                        style={{ 
                          color: '#293241',
                          borderColor: 'rgba(61, 90, 128, 0.15)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(224, 224, 224, 0.3)';
                          e.currentTarget.style.borderColor = 'rgba(158, 158, 158, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.borderColor = 'rgba(61, 90, 128, 0.15)';
                        }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input - 60% Beyaz */}
          <div className="p-4 border-t bg-white rounded-b-2xl" style={{ borderColor: 'rgba(61, 90, 128, 0.15)' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
                style={{ 
                  borderColor: 'rgba(61, 90, 128, 0.15)',
                  color: '#293241',
                  '--tw-ring-color': '#EE6C4D'
                } as React.CSSProperties}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="w-10 h-10 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{ backgroundColor: '#EE6C4D' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - 10% Brand Color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 group"
        style={{ zIndex: 1000 }}
      >
        {/* Parlayan Arka Plan Efekti */}
        <div className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" style={{ backgroundColor: 'rgba(238, 108, 77, 0.5)' }}></div>
        
        {/* Ana Buton */}
        <div className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform" style={{ backgroundColor: '#EE6C4D' }}>
          {/* İç Parlama */}
          <div className="absolute inset-2 rounded-full opacity-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
          
          {/* İkon */}
          <div className="relative">
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Bot className="w-7 h-7 text-white" />
            )}
          </div>

          {/* Yeni Mesaj İndikatörü */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: '#3D5A80' }}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ 
            backgroundColor: '#293241',
            color: 'white'
          }}>
            AI Asistana Sor
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent" style={{ borderLeftColor: '#293241' }}></div>
          </div>
        )}
      </button>
    </>
  );
}