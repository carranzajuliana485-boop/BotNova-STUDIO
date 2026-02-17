import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface QuickReply {
  label: string;
  value: string;
}

const quickReplies: QuickReply[] = [
  { label: '💻 Páginas Web', value: 'cuéntame sobre páginas web' },
  { label: '🤖 Chatbots IA', value: 'información sobre chatbots' },
  { label: '💰 Precios', value: 'cuánto cuesta' },
  { label: '⏱️ Tiempo', value: 'tiempo de desarrollo' },
];

const botResponses: Record<string, string> = {
  default: '¡Hola! Soy Nova, el asistente virtual de BotNova Studio. ¿En qué puedo ayudarte hoy?',
  greeting: '¡Hola! 👋 Bienvenido a BotNova Studio. Soy Nova, tu asistente virtual. ¿Te gustaría conocer más sobre nuestros servicios de desarrollo web o chatbots inteligentes?',
  web: '**Desarrollo Web Avanzado** 🚀\n\nCreamos sitios web modernos, rápidos y optimizados que destacan tu marca. Nuestros servicios incluyen:\n\n✅ Diseño UI/UX profesional\n✅ 100% Responsive (móvil, tablet, desktop)\n✅ Optimización SEO incluida\n✅ Carga ultra rápida\n✅ Panel de administración intuitivo\n\n¿Te gustaría recibir una cotización personalizada?',
  chatbot: '**Chatbots Inteligentes con IA** 🤖\n\nDesarrollamos bots conversacionales que atienden a tus clientes 24/7:\n\n✅ IA avanzada con procesamiento de lenguaje natural\n✅ Soporte multilenguaje\n✅ Integración con WhatsApp, Messenger, web y más\n✅ Análisis de conversaciones en tiempo real\n✅ Escalabilidad ilimitada\n\n¡Reduce costos y mejora la experiencia de tus clientes!',
  price: '**Precios Personalizados** 💎\n\nCada proyecto es único, por eso creamos presupuestos a tu medida. Los factores que consideramos:\n\n📊 Complejidad del proyecto\n🎨 Diseño personalizado requerido\n⚙️ Funcionalidades específicas\n🔧 Integraciones necesarias\n\n**¡Buena noticia!** Ofrecemos una consulta inicial gratuita. ¿Te gustaría agendar una llamada para discutir tu proyecto?',
  time: '**Tiempos de Entrega** ⏱️\n\nNuestros plazos estándar son:\n\n🌐 **Página Web Informativa**: 2-3 semanas\n🛒 **E-commerce**: 4-6 semanas\n🤖 **Chatbot Básico**: 1-2 semanas\n🤖 **Chatbot Avanzado con IA**: 3-4 semanas\n\nTrabajamos con metodología ágil para entregas rápidas sin sacrificar calidad.',
  contact: '**¡Hablemos!** 📞\n\nPuedes contactarnos por:\n\n📧 Email: contacto@botnova.studio\n📱 Teléfono: +1 (234) 567-890\n💬 WhatsApp: Haz clic en el botón verde\n\nNuestro equipo está listo para ayudarte a transformar tu negocio digital.',
  thanks: '¡Con gusto! 😊 Si tienes más preguntas, aquí estoy para ayudarte. También puedes contactar directamente con nuestro equipo humano si lo prefieres.',
  fallback: 'Entiendo tu consulta. Para darte la mejor información, te sugiero hablar directamente con uno de nuestros especialistas. ¿Te gustaría que te contactemos?',
};

function getBotResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('hola') || lowerMsg.includes('buenos días') || lowerMsg.includes('buenas')) {
    return botResponses.greeting;
  }
  if (lowerMsg.includes('web') || lowerMsg.includes('página') || lowerMsg.includes('sitio')) {
    return botResponses.web;
  }
  if (lowerMsg.includes('chatbot') || lowerMsg.includes('bot')) {
    return botResponses.chatbot;
  }
  if (lowerMsg.includes('precio') || lowerMsg.includes('costo') || lowerMsg.includes('cuánto') || lowerMsg.includes('presupuesto')) {
    return botResponses.price;
  }
  if (lowerMsg.includes('tiempo') || lowerMsg.includes('plazo') || lowerMsg.includes('cuándo') || lowerMsg.includes('duración')) {
    return botResponses.time;
  }
  if (lowerMsg.includes('contacto') || lowerMsg.includes('llamar') || lowerMsg.includes('email') || lowerMsg.includes('teléfono')) {
    return botResponses.contact;
  }
  if (lowerMsg.includes('gracias') || lowerMsg.includes('ok') || lowerMsg.includes('perfecto')) {
    return botResponses.thanks;
  }
  
  return botResponses.fallback;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: botResponses.default,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (value: string) => {
    handleSend(value);
  };

  const formatMessage = (text: string) => {
    // Simple markdown-like formatting
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="font-bold text-cyan-400 mt-2 mb-1">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('✅') || line.startsWith('📊') || line.startsWith('🎨') || 
          line.startsWith('⚙️') || line.startsWith('🔧') || line.startsWith('📧') || 
          line.startsWith('📱') || line.startsWith('💬') || line.startsWith('🌐') || 
          line.startsWith('🛒') || line.startsWith('🤖') || line.startsWith('📞') ||
          line.startsWith('⏱️')) {
        return (
          <p key={i} className="text-sm my-1">
            {line}
          </p>
        );
      }
      if (line === '') {
        return <br key={i} />;
      }
      return (
        <p key={i} className="text-sm my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-shadow"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0a0f1a]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)]"
          >
            <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.2)]">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 p-4 flex items-center justify-between border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0f1a]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Nova Assistant</h3>
                    <p className="text-xs text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Powered by AI
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-600'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/30'
                          : 'glass-card'
                      }`}
                    >
                      <div className="text-sm text-gray-200">
                        {formatMessage(message.text)}
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass-card rounded-2xl p-3">
                      <div className="flex gap-1">
                        <motion.span
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t border-cyan-500/10">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.value)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors whitespace-nowrap"
                    >
                      {reply.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-cyan-500/20">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-white/5 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-shadow"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Contact Options */}
                <div className="flex justify-center gap-4 mt-3">
                  <motion.a
                    href="mailto:contacto@botnova.studio"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="tel:+1234567890"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
