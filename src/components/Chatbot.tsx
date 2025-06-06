
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with any questions about our products, shipping, returns, or anything else. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, and express delivery takes 1-2 business days. You can track your order anytime!';
    }
    
    if (message.includes('return') || message.includes('refund')) {
      return 'We have a 30-day return policy. Items must be in original condition. You can start a return from your account or contact our customer service team for assistance.';
    }
    
    if (message.includes('size') || message.includes('sizing')) {
      return 'Each product page has a detailed size guide. If you\'re between sizes, we generally recommend sizing up. You can always exchange for a different size if needed!';
    }
    
    if (message.includes('payment') || message.includes('pay')) {
      return 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely with industry-standard encryption.';
    }
    
    if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return 'You can reach our support team via live chat, email at support@eliteshop.com, or phone at 1-800-ELITE-SHOP. We\'re available Mon-Fri 9AM-6PM EST.';
    }
    
    if (message.includes('order') || message.includes('track')) {
      return 'You can track your order by logging into your account and visiting the "Order History" section. You\'ll also receive tracking information via email once your order ships.';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Thanks for reaching out. I\'m here to help with any questions about our products, orders, shipping, or anything else. What can I help you with?';
    }
    
    if (message.includes('thanks') || message.includes('thank')) {
      return 'You\'re very welcome! Is there anything else I can help you with today?';
    }
    
    return 'I\'d be happy to help you with that! For specific product questions, shipping info, returns, or account issues, you can also visit our FAQ page or contact our customer service team directly. Is there anything specific I can assist you with?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black hover:bg-gray-800 text-white shadow-lg z-50"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-black">
              <Bot className="h-5 w-5" />
              Customer Support Chat
            </DialogTitle>
          </DialogHeader>
          
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-black" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-black border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs mt-1 block ${
                          message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-black" />
                      </div>
                      <div className="bg-gray-100 text-black border border-gray-200 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border-gray-300"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="icon"
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;
