import { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Flag, Shield, Star, Swords, Users, 
  Calendar, MessageCircle, X, Send, Sparkles, 
  BrainCircuit, CheckCircle2, XCircle, Loader2, PlayCircle
} from 'lucide-react';
import './App.css';

const callGeminiAPI = async (payload) => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// --- COMPONENTS ---

// 1. Trợ lý ảo Chatbot Component
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào bạn! Mình là trợ lý AI. Bạn có câu hỏi nào về Lịch sử Đảng giai đoạn 1930 - 1945 không?' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const payload = {
      contents: [
        // Chuyển lịch sử chat thành định dạng API (chỉ lấy text đơn giản do model yêu cầu contents chặt chẽ)
        // Trong trường hợp thực tế cần map role 'user' và 'model'. Ở đây để an toàn ta gửi text của user + system prompt.
        { parts: [{ text: userText }] }
      ],
      systemInstruction: {
        parts: [{
          text: "Bạn là một giảng viên lịch sử tâm huyết và am hiểu về lịch sử Đảng Cộng sản Việt Nam. Trách nhiệm của bạn là giải đáp các câu hỏi của sinh viên về giai đoạn 1930 - 1945 (thành lập Đảng, Xô viết Nghệ Tĩnh, phong trào 1936-1939, Cách mạng tháng 8). Hãy trả lời thật ngắn gọn, súc tích (dưới 150 chữ), chính xác, sử dụng tiếng Việt chuẩn mực."
        }]
      }
    };

    try {
      const result = await callGeminiAPI(payload);
      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi không có câu trả lời vào lúc này.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Đã xảy ra lỗi kết nối. Vui lòng thử lại sau. (" + error.message + ")" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-[0_0_20px_rgba(236,19,37,0.5)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="absolute top-2 right-2 w-3 h-3 text-gold" />
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gold/30 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-dark text-gold p-4 flex justify-between items-center border-b border-gold/50">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-lg">Trợ lý Lịch sử AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-light hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-parchment flex flex-col gap-3 font-body text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-dark shadow-sm border border-gold/20 rounded-bl-none chat-content'
                }`}>
                  {msg.role === 'assistant' && <Sparkles className="inline-block w-3 h-3 text-gold mr-1 mb-1" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm border border-gold/20 flex gap-1">
                  <div className="w-2 h-2 bg-primary/50 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gold/20 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Hỏi về Cách mạng tháng Tám..." 
              className="flex-1 px-3 py-2 bg-light border border-dark/10 rounded-lg focus:outline-none focus:border-primary/50 font-body text-sm"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-gold text-dark rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// 2. Trình tạo câu hỏi trắc nghiệm (Quiz Generator) Component
const QuizGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setErrorMsg("");
    setQuizData([]);
    setUserAnswers({});

    const payload = {
      contents: [
        { 
          parts: [{ text: "Tạo 3 câu hỏi trắc nghiệm khách quan về Lịch sử Đảng Cộng sản Việt Nam, chỉ tập trung vào giai đoạn 1930 - 1945 (ví dụ: hội nghị thành lập, Xô viết Nghệ Tĩnh, CMT8). Mỗi câu có 4 đáp án." }] 
        }
      ],
      systemInstruction: {
        parts: [{
          text: "Bạn là một chuyên gia ra đề thi trắc nghiệm môn Lịch sử Đảng."
        }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              question: { type: "STRING", description: "Nội dung câu hỏi" },
              options: { type: "ARRAY", items: { type: "STRING" }, description: "4 lựa chọn đáp án" },
              correctAnswerIndex: { type: "INTEGER", description: "Vị trí của đáp án đúng (từ 0 đến 3)" },
              explanation: { type: "STRING", description: "Giải thích ngắn gọn tại sao đáp án đó đúng" }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    };

    try {
      const result = await callGeminiAPI(payload);
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        const parsedData = JSON.parse(textResponse);
        setQuizData(parsedData);
      } else {
        setErrorMsg("Không thể phân tích dữ liệu từ AI. Vui lòng thử lại.");
      }
    } catch (error) {
      setErrorMsg("Đã xảy ra lỗi khi tạo câu hỏi: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = (qIndex, optIndex) => {
    if (userAnswers[qIndex] !== undefined) return; // Đã trả lời rồi thì khóa lại
    setUserAnswers({ ...userAnswers, [qIndex]: optIndex });
  };

  return (
    <section className="py-16 bg-surface border-t-8 border-gold/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNkNGFmMzciLz48L3N2Zz4=')]"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <BrainCircuit className="text-gold w-12 h-12 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gold mb-4 uppercase flex items-center justify-center gap-2">
            <Sparkles className="text-primary w-6 h-6" />
            Kiểm tra kiến thức AI
            <Sparkles className="text-primary w-6 h-6" />
          </h2>
          <p className="font-body text-light text-lg mb-8">
            Hệ thống AI sẽ tự động tổng hợp nội dung chương 1 và tạo ra các câu hỏi trắc nghiệm ngẫu nhiên để bạn ôn tập.
          </p>
          
          <button 
            onClick={handleGenerateQuiz}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-red-700 text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(236,19,37,0.4)] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Đang thiết lập đề thi...</>
            ) : (
              <><Sparkles className="w-5 h-5 text-gold" /> Bắt đầu ôn tập</>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-500/20 text-red-200 p-4 rounded text-center mb-8 border border-red-500/50">
            {errorMsg}
          </div>
        )}

        {quizData.length > 0 && (
          <div className="space-y-8 animate-slide-up">
            {quizData.map((quiz, qIndex) => {
              const isAnswered = userAnswers[qIndex] !== undefined;
              const isCorrect = userAnswers[qIndex] === quiz.correctAnswerIndex;

              return (
                <div key={qIndex} className="bg-light p-6 md:p-8 rounded-xl shadow-xl border-l-4 border-primary relative">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-gold text-dark font-display font-bold text-xl flex items-center justify-center rounded-full border-4 border-surface shadow-md">
                    {qIndex + 1}
                  </span>
                  <h4 className="font-display font-bold text-xl text-dark mb-6 ml-4">
                    {quiz.question}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.options.map((opt, oIndex) => {
                      let btnClass = "text-left p-4 rounded-lg border-2 transition-all font-body text-sm md:text-base ";
                      
                      if (!isAnswered) {
                        btnClass += "border-dark/10 bg-white hover:border-primary/50 hover:bg-primary/5";
                      } else {
                        if (oIndex === quiz.correctAnswerIndex) {
                          btnClass += "border-green-500 bg-green-50 text-green-900"; // Correct answer styling
                        } else if (oIndex === userAnswers[qIndex]) {
                          btnClass += "border-red-500 bg-red-50 text-red-900"; // Wrong selected styling
                        } else {
                          btnClass += "border-dark/10 bg-white opacity-50"; // Unselected wrong options
                        }
                      }

                      return (
                        <button 
                          key={oIndex}
                          onClick={() => handleSelectAnswer(qIndex, oIndex)}
                          disabled={isAnswered}
                          className={btnClass}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex-shrink-0 bg-dark/10 text-dark rounded flex items-center justify-center font-bold text-xs">
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <span>{opt}</span>
                            {isAnswered && oIndex === quiz.correctAnswerIndex && <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />}
                            {isAnswered && oIndex === userAnswers[qIndex] && oIndex !== quiz.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-600 ml-auto" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`mt-6 p-4 rounded font-body text-sm ${isCorrect ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-100 text-red-900 border border-red-200'}`}>
                      <strong className="block mb-1 flex items-center gap-2">
                        {isCorrect ? <><CheckCircle2 className="w-4 h-4" /> Tuyệt vời! Bạn đã trả lời đúng.</> : <><XCircle className="w-4 h-4" /> Rất tiếc, câu trả lời chưa chính xác.</>}
                      </strong>
                      <p><span className="font-bold text-dark">Giải thích:</span> {quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  
  // Trạng thái quản lý cửa sổ Video Modal
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });

  // Hàm mở video: bạn có thể thay đổi URL truyền vào để đổi video YouTube
  // Lưu ý: Dùng định dạng link embed của YouTube (vd: https://www.youtube.com/embed/VIDEO_ID)
  const openVideo = (url, title) => {
    setVideoModal({ isOpen: true, url, title });
  };

  const closeVideo = () => {
    setVideoModal({ isOpen: false, url: '', title: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-dark shadow-lg border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Star className="text-gold h-6 w-6 fill-current" />
              <span className="font-display font-bold text-gold text-xl md:text-2xl tracking-wider">
                LỊCH SỬ ĐẢNG
              </span>
            </div>
            <div className="flex gap-4">
              <a href="#phan1" className="text-light hover:text-gold transition-colors font-body text-sm font-medium">PHẦN 1</a>
              <a href="#phan2" className="text-light hover:text-gold transition-colors font-body text-sm font-medium">PHẦN 2</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 md:py-32 overflow-hidden border-b-8 border-primary bg-dark">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Bạn có thể thay src bằng link .gif thật hoặc video dạng hình động (ví dụ: cờ búa liềm bay phấp phới) */}
          <img 
            src="https://i.makeagif.com/media/10-26-2020/0AAwg8.gif" 
            alt="Background động Lịch sử Đảng" 
            className="w-full h-full object-cover opacity-40 animate-slow-zoom"
          />
          {/* Lớp phủ gradient giúp chữ nổi bật hơn trên nền hình động */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/60 to-dark/95"></div>
          {/* Giữ lại pattern chấm bi mờ tạo hiệu ứng cổ điển */}
          <div className="absolute inset-0 hero-pattern opacity-20"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full border border-primary/50 mb-6">
            <Flag className="text-primary h-6 w-6 mr-2" />
            <span className="text-primary font-bold tracking-widest text-sm">CHƯƠNG 1 (1930 - 1945)</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gold leading-tight mb-6 drop-shadow-lg uppercase">
            Đảng Cộng sản Việt Nam ra đời<br />
            <span className="text-light text-3xl md:text-4xl lg:text-5xl block mt-4">& lãnh đạo đấu tranh giành chính quyền</span>
          </h1>
          <p className="font-body text-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Bước ngoặt vĩ đại trong lịch sử cách mạng Việt Nam, mở ra kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#phan1" className="bg-primary text-light px-8 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(236,19,37,0.5)]">
              Tìm hiểu Phần 1
            </a>
            <a href="#phan2" className="bg-transparent border-2 border-gold text-gold px-8 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-gold hover:text-dark transition-colors">
              Khám phá Phần 2
            </a>
          </div>
        </div>
      </header>

      {/* Phần 1 */}
      <section id="phan1" className="py-20 bg-parchment relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">
              Phần 1: Đảng Cộng sản Việt Nam ra đời
            </h2>
            <p className="font-body text-dark/70 text-lg max-w-3xl mx-auto">
              Sự ra đời của Đảng Cộng sản Việt Nam (tháng 2/1930) và Cương lĩnh chính trị đầu tiên.
            </p>
            <div className="h-1 w-24 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-light p-6 md:p-8 rounded-lg shadow-xl border-t-4 border-primary">
              <h3 className="font-display text-2xl font-bold text-dark mb-4 flex items-center gap-3">
                <Calendar className="text-primary" /> Hội nghị thành lập Đảng
              </h3>
              
              {/* Nút bật video tư liệu */}
              <button 
                onClick={() => openVideo('https://www.youtube.com/embed/7FtGvLISpIk', 'Hội nghị thành lập Đảng')}
                className="mb-6 inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full font-body text-sm font-bold transition-colors shadow-sm"
              >
                <PlayCircle size={18} />
                Xem video tư liệu
              </button>

              <div className="space-y-5 font-body text-dark/90">
                {/* 1. Ý nghĩa */}
                <div className="bg-white p-4 rounded-lg border border-dark/10 shadow-sm hover:border-primary/30 transition-colors">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs shrink-0">1</span> 
                    Ý nghĩa bao quát
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-dark/80">
                    <li>Là một <strong>tất yếu lịch sử</strong>.</li>
                    <li>Là kết quả của quá trình chuẩn bị kỹ lưỡng về tư tưởng, chính trị và tổ chức.</li>
                    <li>Đánh dấu <strong>bước ngoặt vĩ đại</strong> của cách mạng Việt Nam.</li>
                  </ul>
                </div>

                {/* 2. Bối cảnh */}
                <div className="bg-white p-4 rounded-lg border border-dark/10 shadow-sm hover:border-primary/30 transition-colors">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs shrink-0">2</span> 
                    Bối cảnh lịch sử
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-dark/80">
                    <li><strong>Hoàn cảnh:</strong> Ách thống trị tàn bạo của Pháp làm mâu thuẫn dân tộc vô cùng gay gắt.</li>
                    <li><strong>Bế tắc đường lối:</strong> Các phong trào yêu nước (từ lập trường phong kiến đến tư sản, tiểu tư sản) đều thất bại.</li>
                    <li><strong>Nguyên nhân:</strong> Thiếu đường lối đúng đắn và giai cấp lãnh đạo tiên tiến.</li>
                  </ul>
                </div>

                {/* 3. Chuẩn bị */}
                <div className="bg-white p-4 rounded-lg border border-dark/10 shadow-sm hover:border-primary/30 transition-colors">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs shrink-0">3</span> 
                    Sự chuẩn bị của Nguyễn Ái Quốc
                  </h4>
                  <div className="space-y-2 text-sm text-dark/80">
                    <p><strong>• Bước ngoặt (7/1920):</strong> Đọc Luận cương của Lênin, xác định con đường cứu nước là cách mạng vô sản.</p>
                    <p><strong>• Tư tưởng & Chính trị:</strong> Truyền bá chủ nghĩa Mác - Lênin; xác định Giải phóng dân tộc gắn liền với giải phóng giai cấp; "công nông là gốc".</p>
                    <p><strong>• Tổ chức:</strong> Lập Hội VN Cách mạng thanh niên (6/1925), xuất bản báo, đào tạo cán bộ, phát động "Vô sản hóa" (1928).</p>
                  </div>
                </div>

                {/* 4. Hội nghị */}
                <div className="bg-white p-4 rounded-lg border border-dark/10 shadow-sm hover:border-primary/30 transition-colors">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs shrink-0">4</span> 
                    Hội nghị thành lập Đảng (2/1930)
                  </h4>
                  <div className="space-y-2 text-sm text-dark/80">
                    <p><strong>• Lý do triệu tập:</strong> Năm 1929, 3 tổ chức cộng sản ra đời dẫn đến nguy cơ phân tán, chia rẽ.</p>
                    <p><strong>• Diễn biến:</strong> Lãnh tụ Nguyễn Ái Quốc triệu tập Hội nghị hợp nhất tại Hương Cảng, Trung Quốc (6/1 - 7/2/1930).</p>
                    <p><strong>• Quyết định:</strong> Hợp nhất thành <strong>Đảng Cộng sản Việt Nam</strong>. Thông qua Cương lĩnh chính trị đầu tiên.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface p-6 md:p-8 rounded-lg shadow-xl border-t-4 border-gold">
              <h3 className="font-display text-2xl font-bold text-gold mb-4 flex items-center gap-3">
                <BookOpen className="text-gold" /> Cương lĩnh chính trị đầu tiên
              </h3>

              {/* Nút bật video tư liệu */}
              <button 
                onClick={() => openVideo('https://www.youtube.com/embed/l1LsIR_vX58', 'Cương lĩnh chính trị đầu tiên')}
                className="mb-6 inline-flex items-center gap-2 bg-gold/10 text-gold hover:bg-gold hover:text-dark px-4 py-2 rounded-full font-body text-sm font-bold transition-colors shadow-sm"
              >
                <PlayCircle size={18} />
                Xem video tư liệu
              </button>

              <div className="space-y-4 font-body text-light">
                <p className="italic mb-4 text-light">
                  Các văn kiện Chánh cương vắn tắt và Sách lược vắn tắt được thông qua tại Hội nghị hợp nhất chính là Cương lĩnh chính trị đầu tiên của Đảng. Cương lĩnh đã vạch ra đường lối cơ bản cho cách mạng Việt Nam với các nội dung cốt lõi:
                </p>

                <div className="bg-dark/50 p-4 rounded border border-gold/20">
                  <strong className="text-gold block mb-1">Phương hướng chiến lược:</strong>
                  Thực hiện "tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản". Đây là tư tưởng cốt lõi, xác định mục tiêu độc lập dân tộc gắn liền với chủ nghĩa xã hội.
                </div>

                <div className="bg-dark/50 p-4 rounded border border-gold/20">
                  <strong className="text-gold block mb-2">Nhiệm vụ cách mạng:</strong>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-light">
                    <li><strong className="text-light">Chính trị:</strong> Đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến, làm cho nước Nam được hoàn toàn độc lập, lập ra chính phủ công nông binh.</li>
                    <li><strong className="text-light">Kinh tế:</strong> Tịch thu toàn bộ sản nghiệp lớn của tư bản đế quốc Pháp giao cho Chính phủ, tịch thu ruộng đất của đế quốc làm của công chia cho dân cày nghèo, mở mang công nghiệp và nông nghiệp, thi hành luật ngày làm tám giờ.</li>
                    <li><strong className="text-light">Xã hội:</strong> Dân chúng được tự do tổ chức, nam nữ bình quyền, phổ thông giáo dục theo công nông hóa.</li>
                  </ul>
                </div>

                <div className="bg-dark/50 p-4 rounded border border-gold/20">
                  <strong className="text-gold block mb-1">Lực lượng cách mạng:</strong>
                  Nhấn mạnh sự đoàn kết toàn dân tộc. Giai cấp công nhân và nông dân là lực lượng cơ bản, là "gốc" của cách mạng. Phải thu phục được đại bộ phận giai cấp mình, đồng thời phải hết sức liên lạc với tiểu tư sản, trí thức, trung nông... để kéo họ đi vào phe vô sản; đối với phú nông, trung, tiểu địa chủ và tư bản An Nam mà chưa rõ mặt phản cách mạng thì lợi dụng hoặc làm cho họ đứng trung lập.
                </div>

                <div className="bg-dark/50 p-4 rounded border border-gold/20">
                  <strong className="text-gold block mb-1">Vai trò lãnh đạo:</strong>
                  Cách mạng thắng lợi là nhờ sự lãnh đạo của Đảng, Đảng là đội tiên phong của vô sản giai cấp.
                </div>

                <div className="bg-dark/50 p-4 rounded border border-gold/20">
                  <strong className="text-gold block mb-1">Quan hệ quốc tế:</strong>
                  Cách mạng Việt Nam là một bộ phận của cách mạng vô sản thế giới, phải liên lạc mật thiết với những dân tộc bị áp bức và vô sản giai cấp thế giới.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 2 */}
      <section id="phan2" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">
              Phần 2: Đảng lãnh đạo đấu tranh giành chính quyền
            </h2>
            <p className="font-body text-dark/70 text-lg font-bold tracking-widest">
              ( 1930 - 1945 )
            </p>
            <div className="h-1 w-24 bg-gold mx-auto mt-6"></div>
          </div>

          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary before:via-gold before:to-primary">
            
            {/* Giai đoạn 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-light bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Swords className="text-light w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-lg shadow-xl border-t-4 border-primary transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                  <h4 className="font-display font-bold text-xl lg:text-2xl text-dark">Cao trào cách mạng & Phục hồi</h4>
                  <span className="font-body text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">1930 - 1935</span>
                </div>
                
                {/* Nút bật video tư liệu */}
                <button 
                  onClick={() => openVideo('https://www.youtube.com/embed/DWYNONhLa38', 'Cao trào cách mạng 1930 - 1931')}
                  className="mb-5 inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded text-sm font-bold transition-colors"
                >
                  <PlayCircle size={16} /> Xem clip tư liệu
                </button>

                {/* Hình ảnh minh họa */}
                <img 
                  src="https://cdn.nhandan.vn/images/22f099ca8bc7ae81aa2a8d3416a84bf8c9f0799f0314b2408892979adb2b810ca00aaa2341c4ef6cf646fe9f2edba98c7b90039ce2bdb94053fcb33b55087238d0bed7a0628d21f8d0cceed6c58ecfc248b9382a8c3d1e37736b78a1be2bbad7/5f6a5d98dba55ee2dfe4df1b5e44ae7e.jpg.webp" 
                  alt="Xô viết Nghệ Tĩnh" 
                  className="w-full h-48 md:h-64 object-cover rounded-lg mb-6 shadow-md border-2 border-primary/20" 
                />

                <div className="space-y-4 font-body text-dark/90 text-sm">
                  {/* Box 1: Phong trào 30-31 */}
                  <div className="bg-dark/5 p-4 rounded-lg border border-dark/10 hover:border-primary/30 transition-colors">
                    <h5 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="bg-primary text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">1</span>
                      Phong trào 1930 - 1931
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-dark/80">
                      <li><strong>Bối cảnh:</strong> Khủng hoảng kinh tế 1929-1933, Pháp khủng bố trắng sau khởi nghĩa Yên Bái làm mâu thuẫn thêm gay gắt.</li>
                      <li><strong>Diễn biến:</strong> Bùng nổ tháng 4-5/1930. Đỉnh cao là <strong>Xô viết Nghệ Tĩnh</strong> (9/1930) làm tan rã chính quyền địch, lập chính quyền Xô viết. Cuối năm bị đàn áp.</li>
                      <li><strong>Ý nghĩa:</strong> Khẳng định năng lực lãnh đạo của Đảng, rèn luyện đội ngũ. Là <strong>cuộc diễn tập đầu tiên</strong> chuẩn bị cho Cách mạng Tháng Tám.</li>
                    </ul>
                  </div>

                  {/* Box 2: Luận cương */}
                  <div className="bg-dark/5 p-4 rounded-lg border border-dark/10 hover:border-primary/30 transition-colors">
                    <h5 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="bg-primary text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">2</span>
                      Luận cương chính trị (10/1930)
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-dark/80">
                      <li><strong>Điểm tích cực:</strong> Xác định rõ tính chất cách mạng (tư sản dân quyền tiến lên XHCN), động lực chính (công - nông) và điều kiện thắng lợi (Đảng lãnh đạo).</li>
                      <li><strong>Hạn chế:</strong> Chưa đặt GPDT lên hàng đầu (nặng về đấu tranh giai cấp); đánh giá sai khả năng của tiểu tư sản, tư sản dân tộc do chịu ảnh hưởng "tả" khuynh.</li>
                    </ul>
                  </div>

                  {/* Box 3: Khôi phục */}
                  <div className="bg-dark/5 p-4 rounded-lg border border-dark/10 hover:border-primary/30 transition-colors">
                    <h5 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="bg-primary text-white w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">3</span>
                      Khôi phục phong trào (1932 - 1935)
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-dark/80">
                      <li><strong>Hoàn cảnh:</strong> Kẻ thù khủng bố "tiêu diệt cộng sản". Các chiến sĩ kiên trung biến nhà tù thành trường học.</li>
                      <li><strong>Phục hồi:</strong> Đảng vạch ra <i>Chương trình hành động</i> (6/1932) để gây dựng lại cơ sở bí mật.</li>
                      <li><strong>Đại hội Đảng lần I (3/1935):</strong> Tại Ma Cao. Đánh dấu sự phục hồi hệ thống tổ chức Đảng và phong trào cách mạng quần chúng.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Giai đoạn 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-light bg-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                <Users className="text-dark w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-surface p-6 rounded-lg shadow-xl border-t-4 border-gold transition-transform hover:-translate-y-1">
                <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                  <h4 className="font-display font-bold text-xl lg:text-2xl text-gold">Phong trào dân chủ 1936 - 1939</h4>
                  <span className="font-body text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">1936 - 1939</span>
                </div>
                
                {/* Nút bật video tư liệu */}
                <button 
                  onClick={() => openVideo('https://www.youtube.com/embed/K8b7h1mAZEc', 'Phong trào dân chủ 1936 - 1939')}
                  className="mb-5 inline-flex items-center gap-2 bg-gold/10 text-gold hover:bg-gold hover:text-dark px-3 py-1.5 rounded text-sm font-bold transition-colors"
                >
                  <PlayCircle size={16} /> Xem clip tư liệu
                </button>

                {/* Hình ảnh minh họa */}
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Phan_%C4%90%C4%83ng_L%C6%B0u_during_the_democratic_movement_of_1936-1939_in_Hue.jpg" 
                  alt="Mít tinh khu Đấu Xảo 1938" 
                  className="w-full h-48 md:h-64 object-cover rounded-lg mb-6 shadow-md border-2 border-gold/20" 
                />

                <div className="space-y-4 font-body text-light text-sm">
                  {/* Box 1: Bối cảnh */}
                  <div className="bg-white/5 p-4 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                    <h5 className="font-bold text-gold mb-2 flex items-center gap-2">
                      <span className="bg-gold text-dark w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">1</span>
                      Bối cảnh lịch sử
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-light">
                      <li><strong>Thế giới:</strong> Chủ nghĩa phát xít đe dọa hòa bình. Mặt trận nhân dân Pháp lên nắm quyền, nới lỏng chính sách thuộc địa.</li>
                      <li><strong>Trong nước:</strong> Nhân dân khốn khổ, ngột ngạt có nguyện vọng bức thiết đòi quyền sống, tự do, dân chủ.</li>
                    </ul>
                  </div>

                  {/* Box 2: Chủ trương */}
                  <div className="bg-white/5 p-4 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                    <h5 className="font-bold text-gold mb-2 flex items-center gap-2">
                      <span className="bg-gold text-dark w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">2</span>
                      Chủ trương chiến lược mới
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-light">
                      <li><strong>Kẻ thù trước mắt:</strong> Bọn phản động thuộc địa và tay sai.</li>
                      <li><strong>Nhiệm vụ:</strong> Chống phát xít; đòi tự do, dân chủ, cơm áo, hòa bình (chưa đặt giành độc lập lên hàng đầu).</li>
                      <li><strong>Mặt trận:</strong> Lập <i>Mặt trận Dân chủ Đông Dương</i> tập hợp mọi lực lượng.</li>
                      <li><strong>Phương pháp:</strong> Kết hợp công khai, hợp pháp với bí mật, bất hợp pháp.</li>
                    </ul>
                  </div>

                  {/* Box 3: Phong trào */}
                  <div className="bg-white/5 p-4 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                    <h5 className="font-bold text-gold mb-2 flex items-center gap-2">
                      <span className="bg-gold text-dark w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">3</span>
                      Các phong trào tiêu biểu
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-light">
                      <li><strong>Đông Dương Đại hội (1936):</strong> Vận động thu thập "dân nguyện", lập Ủy ban hành động.</li>
                      <li><strong>Đón rước (1937):</strong> Lợi dụng phái viên Pháp sang Đông Dương để biểu tình.</li>
                      <li><strong>Báo chí & Nghị trường:</strong> Báo Tin tức, Dân chúng... Ứng cử vào Viện dân biểu để vạch trần bọn phản động.</li>
                    </ul>
                  </div>

                  {/* Box 4: Ý nghĩa */}
                  <div className="bg-white/5 p-4 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                    <h5 className="font-bold text-gold mb-2 flex items-center gap-2">
                      <span className="bg-gold text-dark w-5 h-5 rounded-full inline-flex items-center justify-center text-xs shrink-0">4</span>
                      Ý nghĩa lịch sử
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-light">
                      <li>Xây dựng được đội quân chính trị quần chúng hàng triệu người. Đảng phát triển mạnh mẽ (Tác phẩm <i>Tự chỉ trích</i>).</li>
                      <li>Tích lũy kinh nghiệm đấu tranh công khai - bí mật. Là <strong>cuộc diễn tập lần thứ hai</strong> cho Cách mạng Tháng Tám.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Quiz Section */}
      <QuizGenerator />

      {/* Summary Banner */}
      <section className="bg-primary py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Shield className="text-gold w-12 h-12 mx-auto mb-4" />
          <h2 className="font-display text-2xl md:text-3xl text-light font-bold mb-4">
            Ý NGHĨA LỊCH SỬ
          </h2>
          <p className="font-body text-light text-lg md:text-xl italic">
            "Đảng Cộng sản Việt Nam ra đời là sản phẩm của sự kết hợp chủ nghĩa Mác - Lênin với phong trào công nhân và phong trào yêu nước Việt Nam. Thắng lợi của Cách mạng Tháng Tám năm 1945 là minh chứng vĩ đại cho đường lối đúng đắn đó."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-8 border-t border-dark relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Star className="text-primary h-8 w-8 mx-auto mb-4 fill-current" />
          <h3 className="font-display text-gold text-xl font-bold mb-2">TÀI LIỆU HỌC TẬP LỊCH SỬ ĐẢNG</h3>
          <p className="font-body text-light text-sm">
            Tài liệu tham khảo phục vụ học tập, nghiên cứu tư tưởng và lịch sử Cách mạng Việt Nam.
          </p>
          <div className="mt-6 font-body text-light text-xs">
            © {new Date().getFullYear()} Thiết kế dựa trên yêu cầu giáo trình Lịch sử Đảng Cộng sản Việt Nam. Tích hợp AI Gemini.
          </div>
        </div>
      </footer>

      {/* AI Chatbot Assistant */}
      <ChatAssistant />

      {/* Video Modal Overlay */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-slide-up">
          <div className="bg-dark border border-gold/50 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative">
            
            {/* Thanh Header của Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gold/20 bg-surface">
              <div className="flex items-center gap-2 text-gold font-display font-bold text-xl">
                <PlayCircle className="text-primary" />
                {videoModal.title}
              </div>
              <button 
                onClick={closeVideo}
                className="text-light hover:text-white bg-dark hover:bg-primary p-2 rounded-full transition-colors border border-transparent hover:border-red-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Trình phát Video YouTube (Tỷ lệ 16:9) */}
            <div className="relative pt-[56.25%] bg-black">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src={videoModal.url} 
                title={videoModal.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}