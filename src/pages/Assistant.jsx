import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { generateGeminiResponse } from '../services/gemini.js';

function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm Foliomate, your natively powered AI assistant. I can understand ANY query, write your professional bio, generate portfolio layout ideas, or even write code. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    // Call Gemini API
    const geminiReply = await generateGeminiResponse(input, messages);
    
    setMessages([...newMessages, { role: 'assistant', text: geminiReply }]);
    setIsTyping(false);
  };

  return (
    <div className="page-container ai-container">
      <div className="ai-header">
        <div className="ai-title">
          <Sparkles className="ai-icon" />
          <h2>Foliomate <span>Premium Assistant</span></h2>
        </div>
        <p>Your intelligent co-designer for writing and brainstorming.</p>
      </div>
      
      <div className="chat-window">
        <div className="chat-history">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              className={`message-wrapper ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="avatar">
                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-bubble" style={{whiteSpace: 'pre-wrap'}}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              className="message-wrapper assistant"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="avatar"><Bot size={20} /></div>
              <div className="message-bubble typing-indicator">
                <Loader2 className="spinning" size={18} /> Consulting Foliomate...
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
        
        <div className="chat-input-area">
          <div className="input-box">
            <input 
              type="text" 
              placeholder="Ask the AI wizard for suggestions..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="send-btn">
              <Send size={18} />
            </button>
          </div>
          <div className="input-footer">
            Foliomate may produce inaccurate information about people, places, or facts.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assistant;
