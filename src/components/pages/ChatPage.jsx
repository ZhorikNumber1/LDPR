import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import {
    FaUsers,
    FaChevronDown,
    FaSearch,
    FaPaperPlane,
    FaComments,
    FaFire,
    FaEdit,
    FaCalendarAlt
} from 'react-icons/fa';
import {Card, CardTitle} from '../common/Card';
import {PrimaryButton, SecondaryButton} from '../common/Button';
import {NavLink} from 'react-router-dom';

const HomePageLayout = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

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
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};
`;

const ChatTitle = styled.h2`
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.5rem;
`;

const SelectorContainer = styled.div`
    position: relative;
`;

const SelectorButton = styled(SecondaryButton)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 250px;
    justify-content: space-between;
`;

const Dropdown = styled(motion.div)`
    position: absolute;
    right: 0;
    background: ${({theme}) => theme.colors.white};
    border-radius: 8px;
    box-shadow: ${({theme}) => theme.shadows.medium};
    z-index: 10;
    width: 300px;
    overflow: hidden;
    margin-top: 0.5rem;
`;

const DropdownHeader = styled.div`
    padding: 0.75rem 1rem;
    background: ${({theme}) => theme.colors.primaryLight};
    color: ${({theme}) => theme.colors.primaryDark};
    font-weight: 600;
`;

const SearchInput = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};

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
    transition: background ${({theme}) => theme.transitions.fast};

    &:hover {
        background: ${({theme}) => theme.colors.grayLight};
    }

    &.active {
        background: ${({theme}) => theme.colors.primaryLight};
    }
`;

const PartyAvatar = styled.div`
    min-width: 32px;
    min-height: 32px;
    border-radius: 50%;
    background-color: ${({color}) => color || '#ccc'};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
`;

const MessagesContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colors.white};
    border-radius: 8px;
    box-shadow: ${({theme}) => theme.shadows.small};
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
        background: ${({theme}) => theme.colors.primary};
        color: white;
        border-top-right-radius: 0;
    }

    &.bot {
        margin-right: auto;
        background: ${({theme}) => theme.colors.grayLight};
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
    border-top: 1px solid ${({theme}) => theme.colors.gray};
    gap: 0.5rem;
`;

const MessageInput = styled.input`
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid ${({theme}) => theme.colors.gray};
    border-radius: 4px;
    font-size: 1rem;
    transition: all ${({theme}) => theme.transitions.fast};

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({theme}) => theme.colors.primaryLight};
    }
`;

const SendButton = styled(PrimaryButton)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
`;

// Данные о партиях
const PARTIES = [
    {
        id: 'ldpr',
        name: 'ЛДПР',
        color: '#1a5fb4',
        description: 'Либерально-демократическая партия России'
    },
    {
        id: 'er',
        name: 'Единая Россия',
        color: '#1a8f3a',
        description: 'Партия власти'
    },
    {
        id: 'kprf',
        name: 'КПРФ',
        color: '#cc0000',
        description: 'Коммунистическая партия Российской Федерации'
    },
    {
        id: 'sr',
        name: 'Справедливая Россия',
        color: '#ff6600',
        description: 'Социал-демократическая партия'
    },
    {
        id: 'np',
        name: 'Новые люди',
        color: '#00a2ff',
        description: 'Либеральная партия'
    }
];

// Ответы партий
const PARTY_RESPONSES = {
    ldpr: [
        "ЛДПР всегда выступает за сильную Россию!",
        "Мы поддерживаем вашу инициативу и внесем ее на рассмотрение.",
        "Этот вопрос требует немедленного решения!",
        "Наши депутаты уже работают над подобными предложениями.",
        "ЛДПР - единственная партия, которая говорит правду!"
    ],
    er: [
        "Единая Россия рассмотрит ваше предложение.",
        "Ваша инициатива соответствует нашим программным целям.",
        "Мы поддерживаем конструктивные предложения граждан.",
        "Ваше обращение будет направлено в соответствующий комитет.",
        "Благодарим за вашу активную гражданскую позицию."
    ],
    kprf: [
        "КПРФ поддерживает народные инициативы!",
        "Мы боремся за права трудящихся!",
        "Ваше предложение будет рассмотрено на партийном съезде.",
        "Коммунисты всегда на стороне народа!",
        "Этот вопрос мы поднимем на ближайшем заседании ГД."
    ],
    sr: [
        "Справедливая Россия за социальную справедливость!",
        "Ваше предложение соответствует нашим принципам.",
        "Мы поддерживаем инициативы граждан.",
        "Рассмотрим ваше предложение на партийном заседании.",
        "Спасибо за ваше участие в политической жизни страны."
    ],
    np: [
        "Новые люди поддерживают прогрессивные инициативы!",
        "Ваше предложение интересно и заслуживает внимания.",
        "Мы за современные решения актуальных проблем.",
        "Наши эксперты изучат ваше предложение.",
        "Благодарим за вашу активность и новые идеи."
    ]
};

const ChatPage = () => {
    const [selectedParty, setSelectedParty] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Фильтрация партий по поиску
    const filteredParties = PARTIES.filter(party =>
        party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        party.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Отправка сообщения
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedParty) return;

        // Добавляем сообщение пользователя
        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        // Имитация ответа партии
        setTimeout(() => {
            const responses = PARTY_RESPONSES[selectedParty.id];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const botMessage = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            };

            setMessages(prev => [...prev, botMessage]);
        }, 1000 + Math.random() * 2000); // Случайная задержка 1-3 сек
    };

    // Автопрокрутка к новым сообщениям
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    // Выбор партии
    const handleSelectParty = (party) => {
        setSelectedParty(party);
        setShowDropdown(false);
        setMessages([]);
        setSearchTerm('');
    };
    const NavTabs = styled.nav`
        display: flex;
        border-bottom: 1px solid ${({theme}) => theme.colors.gray};
        margin-bottom: 2rem;
        overflow-x: auto;
    `;

    const Tab = styled(NavLink)`
        padding: 1rem 1.5rem;
        font-weight: 600;
        color: ${({theme}) => theme.colors.grayDark};
        border-bottom: 3px solid transparent;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
        transition: all ${({theme}) => theme.transitions.fast};

        &:hover {
            color: ${({theme}) => theme.colors.primary};
        }

        &.active {
            color: ${({theme}) => theme.colors.primary};
            border-bottom-color: ${({theme}) => theme.colors.primary};
        }
    `;
    return (
        <HomePageLayout>
            <NavTabs>
                <Tab to="/" end>
                    <FaFire/> Главная
                </Tab>
                <Tab to="/create-path">
                    <FaEdit/> Создать петицию
                </Tab>
                <Tab to="/chat">
                    <FaComments/> Чат с партиями
                </Tab>
                <Tab to="/parts">
                    <FaUsers/> Статистика партий
                </Tab>
                <Tab to="/calendar">
                    <FaCalendarAlt /> Календарь событий
                </Tab>
            </NavTabs>
            <Card
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <CardTitle>Политический чат</CardTitle>
                <ChatContainer>
                    <ChatHeader>
                        <ChatTitle>
                            {selectedParty
                                ? `Чат с партией "${selectedParty.name}"`
                                : 'Выберите партию для общения'}
                        </ChatTitle>

                        <SelectorContainer>
                            <SelectorButton
                                type="button"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {selectedParty ? (
                                    <>
                                        <PartyAvatar color={selectedParty.color}>
                                            {selectedParty.name.charAt(0)}
                                        </PartyAvatar>
                                        {selectedParty.name}
                                    </>
                                ) : (
                                    <>
                                        <FaUsers/>
                                        Выберите партию
                                    </>
                                )}
                                <FaChevronDown size={14}/>
                            </SelectorButton>
                        </SelectorContainer>
                    </ChatHeader>

                    <AnimatePresence>
                        {showDropdown && (
                            <Dropdown
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.2}}
                            >
                                <DropdownHeader>Политические партии</DropdownHeader>
                                <SearchInput>
                                    <FaSearch size={14}/>
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
                                            <PartyAvatar color={party.color}>
                                                {party.name.charAt(0)}
                                            </PartyAvatar>
                                            <div>
                                                <div>{party.name}</div>
                                                <div style={{fontSize: '0.8rem', color: '#666'}}>
                                                    {party.description}
                                                </div>
                                            </div>
                                        </DropdownItem>
                                    ))}
                                </DropdownList>
                            </Dropdown>
                        )}
                    </AnimatePresence>

                    <MessagesContainer>
                        <MessagesList>
                            {selectedParty ? (
                                messages.length > 0 ? (
                                    <>
                                        {messages.map(message => (
                                            <Message
                                                key={message.id}
                                                className={message.sender}
                                            >
                                                <MessageInfo>
                                                    {message.sender === 'bot' && (
                                                        <PartyAvatar color={selectedParty.color}>
                                                            {selectedParty.name.charAt(0)}
                                                        </PartyAvatar>
                                                    )}
                                                    {message.sender === 'bot' && selectedParty.name}
                                                    <MessageTime>{message.time}</MessageTime>
                                                </MessageInfo>
                                                {message.text}
                                            </Message>
                                        ))}
                                        <div ref={messagesEndRef}/>
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
                                        <FaComments size={48} style={{marginBottom: '1rem', opacity: 0.5}}/>
                                        <h3>Начните диалог с партией "{selectedParty.name}"</h3>
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
                                    <FaUsers size={48} style={{marginBottom: '1rem', opacity: 0.5}}/>
                                    <h3>Выберите партию для общения</h3>
                                    <p>Выберите политическую партию из списка, чтобы начать диалог</p>
                                </div>
                            )}
                        </MessagesList>

                        {selectedParty && (
                            <MessageForm onSubmit={handleSubmit}>
                                <MessageInput
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={`Напишите сообщение партии "${selectedParty.name}"...`}
                                />
                                <SendButton type="submit">
                                    <FaPaperPlane/> Отправить
                                </SendButton>
                            </MessageForm>
                        )}
                    </MessagesContainer>
                </ChatContainer>
            </Card>
        </HomePageLayout>
    );
};

export default ChatPage;