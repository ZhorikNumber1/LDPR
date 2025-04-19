import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaChevronDown, FaSearch, FaPaperPlane } from 'react-icons/fa';
import { Card, CardTitle } from '../common/Card';
import { PrimaryButton, SecondaryButton } from '../common/Button';

// Стили для компонента чата
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  max-width: 1200px;
  margin: 0 auto;
  gap: 1.5rem;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const ChatTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
`;

const SelectorContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const SelectorButton = styled(SecondaryButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 200px;
  justify-content: space-between;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 10;
  width: 250px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const DropdownHeader = styled.div`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
`;

const SearchInput = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
  }
`;

const DropdownList = styled.ul`
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.grayLight};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ color }) => color || '#ccc'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const ChatContent = styled.div`
  display: flex;
  flex: 1;
  gap: 1.5rem;
`;

const MembersList = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow-y: auto;
`;

const MemberItem = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.grayLight};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const MemberName = styled.div`
  font-weight: 600;
`;

const MemberParty = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
`;

const MessagesList = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  position: relative;
  line-height: 1.4;

  &.user {
    margin-left: auto;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-top-right-radius: 0;
  }

  &.bot {
    margin-right: auto;
    background: ${({ theme }) => theme.colors.grayLight};
    border-top-left-radius: 0;
  }
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

const MessageForm = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SendButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
`;

// Данные о партиях и представителях
const PARTIES = [
    {
        id: 'ldpr',
        name: 'ЛДПР',
        color: '#1a5fb4',
        members: [
            { id: 'zhirinovsky', name: 'Жириновский В.В.', avatar: 'Ж', description: 'Лидер партии' },
            { id: 'slutsky', name: 'Слуцкий Л.Э.', avatar: 'С', description: 'Председатель комитета' },
        ]
    },
    {
        id: 'er',
        name: 'Единая Россия',
        color: '#1a8f3a',
        members: [
            { id: 'medvedev', name: 'Медведев Д.А.', avatar: 'М', description: 'Председатель партии' },
            { id: 'volodin', name: 'Володин В.В.', avatar: 'В', description: 'Председатель ГД' },
        ]
    },
    {
        id: 'kprf',
        name: 'КПРФ',
        color: '#cc0000',
        members: [
            { id: 'zyuganov', name: 'Зюганов Г.А.', avatar: 'З', description: 'Лидер партии' },
            { id: 'razin', name: 'Разин О.А.', avatar: 'Р', description: 'Депутат ГД' },
        ]
    },
];

// Заглушки ответов для разных представителей
const BOT_RESPONSES = {
    zhirinovsky: [
        "ЛДПР - единственная партия, которая говорит правду!",
        "Надо срочно принимать меры! Я уже внес законопроект.",
        "Этот вопрос требует немедленного вмешательства президента!",
        "Мы должны защитить интересы простых граждан!",
        "Вы предлагаете интересное решение, но сначала нужно разобраться с бюрократами!"
    ],
    slutsky: [
        "Как председатель комитета, я рассмотрю ваше предложение.",
        "ЛДПР всегда открыта для диалога с гражданами.",
        "Ваше обращение будет учтено в нашей работе."
    ],
    medvedev: [
        "Единая Россия всегда поддерживает инициативы граждан.",
        "Ваше предложение соответствует партийной линии.",
        "Мы рассмотрим ваш вопрос на ближайшем заседании."
    ],
    volodin: [
        "Государственная Дума приветствует гражданские инициативы.",
        "Ваше обращение будет направлено в соответствующий комитет.",
        "Мы работаем над улучшением законодательства."
    ],
    zyuganov: [
        "КПРФ поддерживает борьбу за права трудящихся!",
        "Ваше предложение будет рассмотрено на партийном съезде.",
        "Мы боремся против антинародной политики!"
    ],
    razin: [
        "Коммунисты всегда на стороне народа!",
        "Поддерживаю вашу инициативу!",
        "Будем добиваться рассмотрения вашего предложения."
    ]
};

const ChatPage = () => {
    const [selectedParty, setSelectedParty] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showPartyDropdown, setShowPartyDropdown] = useState(false);
    const [showMemberDropdown, setShowMemberDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Фильтрация партий по поиску
    const filteredParties = PARTIES.filter(party =>
        party.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Фильтрация членов партии по поиску
    const filteredMembers = selectedParty?.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Отправка сообщения
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedMember) return;

        // Добавляем сообщение пользователя
        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        // Имитация ответа бота
        setTimeout(() => {
            const responses = BOT_RESPONSES[selectedMember.id];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const botMessage = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, botMessage]);
        }, 1000 + Math.random() * 2000); // Случайная задержка 1-3 сек
    };

    // Автопрокрутка к новым сообщениям
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Выбор партии
    const handleSelectParty = (party) => {
        setSelectedParty(party);
        setSelectedMember(null);
        setShowPartyDropdown(false);
        setMessages([]);
        setSearchTerm('');
    };

    // Выбор представителя
    const handleSelectMember = (member) => {
        setSelectedMember(member);
        setShowMemberDropdown(false);
        setMessages([]);
        setSearchTerm('');
    };

    return (
        <Card>
            <CardTitle>Политический чат</CardTitle>
            <ChatContainer>
                <ChatHeader>
                    <ChatTitle>
                        {selectedMember
                            ? `Чат с ${selectedMember.name} (${selectedParty.name})`
                            : 'Выберите представителя для общения'}
                    </ChatTitle>

                    <SelectorContainer>
                        <SelectorButton
                            type="button"
                            onClick={() => setShowPartyDropdown(!showPartyDropdown)}
                        >
                            {selectedParty ? selectedParty.name : 'Выберите партию'}
                            <FaChevronDown size={14} />
                        </SelectorButton>

                        <SelectorButton
                            type="button"
                            onClick={() => selectedParty && setShowMemberDropdown(!showMemberDropdown)}
                            disabled={!selectedParty}
                        >
                            {selectedMember ? selectedMember.name : 'Выберите представителя'}
                            <FaChevronDown size={14} />
                        </SelectorButton>
                    </SelectorContainer>
                </ChatHeader>

                <AnimatePresence>
                    {showPartyDropdown && (
                        <Dropdown
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DropdownHeader>Политические партии</DropdownHeader>
                            <SearchInput>
                                <FaSearch size={14} />
                                <input
                                    type="text"
                                    placeholder="Поиск партии..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </SearchInput>
                            <DropdownList>
                                {filteredParties.map(party => (
                                    <DropdownItem
                                        key={party.id}
                                        onClick={() => handleSelectParty(party)}
                                        className={selectedParty?.id === party.id ? 'active' : ''}
                                    >
                                        <Avatar color={party.color}>{party.name.charAt(0)}</Avatar>
                                        <div>
                                            <div>{party.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                                {party.members.length} представителей
                                            </div>
                                        </div>
                                    </DropdownItem>
                                ))}
                            </DropdownList>
                        </Dropdown>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showMemberDropdown && (
                        <Dropdown
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{ right: 'auto', left: 0 }}
                        >
                            <DropdownHeader>Представители {selectedParty?.name}</DropdownHeader>
                            <SearchInput>
                                <FaSearch size={14} />
                                <input
                                    type="text"
                                    placeholder="Поиск представителя..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </SearchInput>
                            <DropdownList>
                                {filteredMembers.map(member => (
                                    <DropdownItem
                                        key={member.id}
                                        onClick={() => handleSelectMember(member)}
                                        className={selectedMember?.id === member.id ? 'active' : ''}
                                    >
                                        <Avatar color={selectedParty.color}>{member.avatar}</Avatar>
                                        <div>
                                            <div>{member.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{member.description}</div>
                                        </div>
                                    </DropdownItem>
                                ))}
                            </DropdownList>
                        </Dropdown>
                    )}
                </AnimatePresence>

                <ChatContent>
                    {selectedParty && (
                        <MembersList>
                            {selectedParty.members.map(member => (
                                <MemberItem
                                    key={member.id}
                                    onClick={() => handleSelectMember(member)}
                                    className={selectedMember?.id === member.id ? 'active' : ''}
                                >
                                    <Avatar color={selectedParty.color}>{member.avatar}</Avatar>
                                    <div>
                                        <MemberName>{member.name}</MemberName>
                                        <MemberParty>{member.description}</MemberParty>
                                    </div>
                                </MemberItem>
                            ))}
                        </MembersList>
                    )}

                    <MessagesContainer>
                        <MessagesList>
                            {selectedMember ? (
                                messages.length > 0 ? (
                                    <>
                                        {messages.map(message => (
                                            <Message
                                                key={message.id}
                                                className={message.sender}
                                            >
                                                <MessageInfo>
                                                    {message.sender === 'bot' && (
                                                        <Avatar color={selectedParty.color}>
                                                            {selectedMember.avatar}
                                                        </Avatar>
                                                    )}
                                                    {message.sender === 'bot' && selectedMember.name}
                                                    <MessageTime>{message.time}</MessageTime>
                                                </MessageInfo>
                                                {message.text}
                                            </Message>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </>
                                ) : (
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        color: '#666',
                                        textAlign: 'center'
                                    }}>
                                        <FaComments size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                        <h3>Начните диалог с {selectedMember.name}</h3>
                                        <p>Задайте вопрос или поделитесь своим предложением</p>
                                    </div>
                                )
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: '#666',
                                    textAlign: 'center'
                                }}>
                                    <FaUser size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <h3>Выберите представителя для общения</h3>
                                    <p>Выберите партию и представителя из списка</p>
                                </div>
                            )}
                        </MessagesList>

                        {selectedMember && (
                            <MessageForm onSubmit={handleSubmit}>
                                <MessageInput
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={`Напишите сообщение ${selectedMember.name}...`}
                                />
                                <SendButton type="submit">
                                    <FaPaperPlane /> Отправить
                                </SendButton>
                            </MessageForm>
                        )}
                    </MessagesContainer>
                </ChatContent>
            </ChatContainer>
        </Card>
    );
};

export default ChatPage;