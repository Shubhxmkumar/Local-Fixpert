import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Line, RiSendPlaneFill, RiRefreshLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";

const AiChatBot = ({ isOpen, onClose, onSubmit }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Fixperts AI. How can I help you find your next great read?",
      sender: "ai",
      loading: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user", loading: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Add temporary loading message
    setMessages((prev) => [
      ...prev,
      { text: "Thinking...", sender: "ai", loading: true },
    ]);

    try {
      const aiResponse = await onSubmit(inputValue);

      // Replace the last loading message with the real AI response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: aiResponse, sender: "ai", loading: false },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "ai",
          loading: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        text: "Hello! I'm Fixperts AI. How can I help you?",
        sender: "ai",
        loading: false,
      },
    ]);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      let i = 0;
      const responseText = "I'm thinking...";
      const typingInterval = setInterval(() => {
        if (i < responseText.length) {
          setTypingText(responseText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-8 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col"
          style={{ maxHeight: "70vh", minHeight: "400px" }}
        >
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <RiRobot2Line size={24} className="mr-2" />
              <h3 className="font-bold">Fixperts AI Assistant</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={resetConversation}
                className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
                title="Start new conversation"
              >
                <RiRefreshLine size={18} />
              </button>

              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
                title="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: message.sender === "user" ? 10 : -10,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  } ${message.loading ? "italic text-gray-500" : ""}`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-4"
          >
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about Services..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isTyping}
              />

              <button
                type="submit"
                className={`px-4 py-2 rounded-r-lg transition-colors ${
                  inputValue.trim() && !isTyping
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!inputValue.trim() || isTyping}
              >
                <RiSendPlaneFill size={20} />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Try: "Recommend me an Expert" or "what services you need?"
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiChatBot;
