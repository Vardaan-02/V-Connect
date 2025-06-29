import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { format } from "date-fns";
import {
  Send,
  Loader2,
  MinimizeIcon,
  MaximizeIcon,
  Bot,
  User,
} from "lucide-react";
import { BugModel } from "./Three/bug";
import { FeatureSpotlight } from "@ui/components/ui/featureSpotLight";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    append,
    setInput,
  } = useChat();

  const prompts = [
    "What Is This?",
    "Tech Stack Used?",
    "Creator?",
    "Features?",
  ];

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setIsTyping(true);
    append({ role: "user", content: input });
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: input }] }),
    });
    setInput("");
    const data = await response.json();
    append({ role: 'assistant', content: data.message.content });
    setIsTyping(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="fixed bottom-4 left-18 z-50">
      <FeatureSpotlight
        title="AI Assistant"
        description={
          isOpen
            ? "I'm here to help! Ask me anything."
            : "Click to chat with your AI assistant"
        }
        position="top"
      >
        <div
          className={`w-24 h-24 transition-transform duration-300 ${isOpen ? "scale-90" : "scale-100 hover:scale-110"}`}
          style={{ cursor: "pointer" }}
        >
          <Canvas
            onClick={toggleChat}
            className="bg-transparent rounded-full"
            camera={{ position: [0, 0, 5] }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} />
            <BugModel scale={1.5} />
          </Canvas>
        </div>
      </FeatureSpotlight>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "auto",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-32 left-4 w-84 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-indigo-900 via-gray-900 to-black border border-indigo-500/20">
              <div className="px-4 py-3 bg-black/30 backdrop-blur-sm border-b border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium text-indigo-100">PearlBot</span>
                </div>
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? (
                    <MaximizeIcon className="w-4 h-4 text-indigo-300" />
                  ) : (
                    <MinimizeIcon className="w-4 h-4 text-indigo-300" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="bg-black/20 backdrop-blur-sm"
                  >
                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div>
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-400">
                              <svg
                                className="mx-auto mb-4 w-12 h-12 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.84L3 20l1.09-3.633A8.963 8.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                              </svg>
                              <p className="text-lg">Start a conversation!</p>
                              <p className="text-sm text-gray-500">
                                Send a message to begin chatting.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center h-full">
                            <div className="space-y-2">
                              <div className="flex justify-center space-x-2">
                                {prompts.slice(0, 2).map((prompt, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handlePromptClick(prompt)}
                                    className="px-3 py-1 m-1 bg-gray-700 text-white text-xs rounded-full hover:bg-gray-600 transition-colors duration-200 h-auto w-auto"
                                  >
                                    {prompt}
                                  </button>
                                ))}
                              </div>
                              <div className="flex justify-center space-x-2">
                                {prompts.slice(2, 4).map((prompt, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handlePromptClick(prompt)}
                                    className="px-3 py-1 m-1 bg-gray-700 text-white text-xs rounded-full hover:bg-gray-600 transition-colors duration-200 h-auto w-auto"
                                  >
                                    {prompt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        messages.map((message, index) => (
                          <motion.div
                            key={index}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  message.role === "user"
                                    ? "bg-indigo-600"
                                    : "bg-gray-700"
                                }`}
                              >
                                {message.role === "user" ? (
                                  <User className="w-4 h-4 text-white" />
                                ) : (
                                  <Bot className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div
                                className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                              >
                                <div
                                  className={`px-4 py-2 rounded-2xl ${
                                    message.role === "user"
                                      ? "bg-indigo-600 text-white rounded-br-none"
                                      : "bg-gray-800 text-gray-100 rounded-bl-none"
                                  }`}
                                >
                                  {message.content}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                  {format(new Date(), "HH:mm")}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}  
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-2 text-gray-400"
                        >
                          <Bot className="w-8 h-8 p-1.5 bg-gray-700 rounded-full" />
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                delay: 0,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                delay: 0.2,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                delay: 0.4,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="p-4 bg-black/30 border-t border-indigo-500/20"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={input}
                          onChange={handleInputChange}
                          className="flex-1 bg-gray-900/50 text-white placeholder-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
                          placeholder="Type your message..."
                        />
                        <button
                          type="submit"
                          disabled={isTyping || !input.trim()}
                          className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {isTyping ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </form>
            
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
