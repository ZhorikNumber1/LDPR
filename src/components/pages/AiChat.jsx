import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PrimaryButton } from '../common/Button';
import { Input } from '../common/Input';
import { CardContent } from '../common/Card';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.grayLight};
  border-radius: 4px;
`;

const Message = styled(motion.div)`
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
`;

const UserMessage = styled(Message)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  margin-left: auto;
`;

const BotMessage = styled(Message)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin-right: auto;
`;

const BotName = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
  display: block;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
`;

function AiChat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Здравствуйте! Я Владимир Жириновский. Чем могу помочь?',
            sender: 'bot'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Добавляем сообщение пользователя
        const newUserMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        // Имитация ответа бота
        setTimeout(() => {
            const botResponses = [
                'ЛДПР - сила! Россия должна быть великой державой!',
                'Вы предлагаете интересное решение, но сначала нужно разобраться с бюрократами!',
                'Надо срочно принимать меры! Я уже внес законопроект по этому вопросу.',
                'Этот вопрос требует немедленного вмешательства президента!',
                'Мы должны защитить интересы простых граждан!'
            ];

            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const newBotMessage = {
                id: messages.length + 2,
                text: randomResponse,
                sender: 'bot'
            };

            setMessages(prev => [...prev, newBotMessage]);
        }, 1000);
    };

    return (
        <CardContent>
            <ChatContainer>
                <MessagesContainer>
                    {messages.map(message => (
                        message.sender === 'user' ? (
                            <UserMessage
                                key={message.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {message.text}
                            </UserMessage>
                        ) : (
                            <BotMessage
                                key={message.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BotName>Владимир Жириновский:</BotName>
                                {message.text}
                            </BotMessage>
                        )
                    ))}
                    <div ref={messagesEndRef} />
                </MessagesContainer>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Напишите сообщение..."
                        style={{ flex: 1 }}
                    />
                    <PrimaryButton type="submit">Отправить</PrimaryButton>
                </Form>
            </ChatContainer>
        </CardContent>
    );
}

export default AiChat;