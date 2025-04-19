import {useState} from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';
import {NavLink} from 'react-router-dom';
import {Card, CardTitle} from '../common/Card';
import {PrimaryButton} from '../common/Button';
import {FaFire, FaEdit, FaComments, FaUsers, FaTimes, FaCalendarAlt} from 'react-icons/fa';

const HomePageLayout = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

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

const ContentSection = styled(motion.section)`
    margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({theme}) => theme.colors.primary};
`;

const PetitionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const PetitionCard = styled(Card)`
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const PetitionImage = styled.div`
    height: 160px;
    background-color: ${({theme}) => theme.colors.grayLight};
    background-image: url(${({src}) => src});
    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
`;

const PetitionContent = styled.div`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const PetitionDescription = styled.p`
    color: ${({theme}) => theme.colors.grayDark};
    font-size: 0.9rem;
    flex: 1;
    margin: 0.5rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const PetitionStats = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const VotesCount = styled.div`
    background-color: ${({theme}) => theme.colors.primaryLight};
    color: ${({theme}) => theme.colors.primaryDark};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
`;

const PetitionCategory = styled.span`
    font-size: 0.8rem;
    color: ${({theme}) => theme.colors.grayDark};
`;

// Подбираем картинку под категорию
const categoryImages = {
    'Социальная политика': 'https://picsum.photos/seed/social/400/300',
    'Спорт':               'https://picsum.photos/seed/sport/400/300',
    'Экология':            'https://picsum.photos/seed/nature/400/300',
    'Здравоохранение':     'https://picsum.photos/seed/health/400/300',
};

const mockPetitions = [
    {
        id: 1,
        title: 'Запретить повышение тарифов ЖКХ в 2023 году',
        description:
            'Предлагаем заморозить тарифы на жилищно-коммунальные услуги до стабилизации экономической ситуации в стране.',
        votes: 12543,
        category: 'Социальная политика',
        image: categoryImages['Социальная политика'],
    },
    {
        id: 2,
        title: 'Вернуть прямые выборы мэров городов',
        description:
            'Требуем восстановления демократического института прямых выборов глав муниципальных образований.',
        votes: 8765,
        category: 'Спорт',
        image: categoryImages['Спорт'],
    },
    {
        id: 3,
        title: 'Остановить вырубку городских парков',
        description:
            'Необходимо принять срочные меры по сохранению зеленых зон в городах и ужесточить наказание за незаконную вырубку.',
        votes: 15321,
        category: 'Экология',
        image: categoryImages['Экология'],
    },
    {
        id: 4,
        title: 'Повысить финансирование здравоохранения',
        description:
            'Требуем увеличения бюджета на медицину до 10% ВВП для улучшения качества медицинского обслуживания.',
        votes: 21087,
        category: 'Здравоохранение',
        image: categoryImages['Здравоохранение'],
    },
];

function HomePage() {
    const [selectedPetition, setSelectedPetition] = useState(null);

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
                    <FaCalendarAlt/> Календарь событий
                </Tab>
            </NavTabs>

            <ContentSection
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <SectionHeader>
                    <SectionTitle>Лента предложений</SectionTitle>
                    <PrimaryButton as={NavLink} to="/admin">
                        Админ панель
                    </PrimaryButton>
                </SectionHeader>

                <PetitionsGrid>
                    {mockPetitions.map((petition) => (
                        <motion.div
                            key={petition.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3, delay: petition.id * 0.1}}
                            onClick={() => setSelectedPetition(petition)}
                        >
                            <PetitionCard>
                                <PetitionImage src={petition.image}/>
                                <PetitionContent>
                                    <CardTitle>{petition.title}</CardTitle>
                                    <PetitionDescription>
                                        {petition.description}
                                    </PetitionDescription>
                                    <PetitionStats>
                                        <VotesCount>
                                            {petition.votes.toLocaleString()} голосов
                                        </VotesCount>
                                        <PetitionCategory>
                                            {petition.category}
                                        </PetitionCategory>
                                    </PetitionStats>
                                </PetitionContent>
                            </PetitionCard>
                        </motion.div>
                    ))}
                </PetitionsGrid>

                <AnimatePresence>
                    {selectedPetition && (
                        <ModalOverlay
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setSelectedPetition(null)}
                        >
                            <ModalContent
                                initial={{y: 50, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: 50, opacity: 0}}
                                transition={{type: 'spring', damping: 25}}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <CloseButton onClick={() => setSelectedPetition(null)}>
                                    <FaTimes/>
                                </CloseButton>
                                <ModalImage image={selectedPetition.image}/>
                                <ModalBody>
                                    <ModalTitle>{selectedPetition.title}</ModalTitle>
<<<<<<< HEAD
                                    <ModalDescription>{selectedPetition.description}</ModalDescription>

                                    {/* Добавленные элементы */}
                                    <div style={{ margin: '1.5rem 0' }}>
                                        {!selectedPetition.hasVoted ? (
                                            <div style={{ marginBottom: '1rem'}}>
                                            <PrimaryButton
                                                onClick={() => {
                                                    setSelectedPetition(prev => ({
                                                        ...prev,
                                                        votes: prev.votes + 1,
                                                        hasVoted: true
                                                    }));
                                                }}
                                                style={{ marginRight: '1rem' }}
                                            >
                                                <FaThumbsUp /> Поддержать
                                            </PrimaryButton>
                                            </div>
                                        ) : (
                                            <div style={{ color: '#1a8f3a', marginBottom: '1rem' }}>
                                                Вы поддержали эту петицию!
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                            {!selectedPetition.showImprovement ? (
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            showImprovement: true,
                                                            showCounterProposal: false // Закрываем контр-петицию если открыто
                                                        }));
                                                    }}
                                                >
                                                    <FaLightbulb /> Предложить улучшение
                                                </SecondaryButton>
                                            ) : (
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            showImprovement: false
                                                        }));
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <FaTimes /> Скрыть улучшение
                                                </SecondaryButton>
                                            )}

                                            {!selectedPetition.showCounterProposal ? (
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            showCounterProposal: true,
                                                            showImprovement: false // Закрываем улучшение если открыто
                                                        }));
                                                    }}
                                                >
                                                    <FaFileAlt /> Контр-петиция
                                                </SecondaryButton>
                                            ) : (
                                                <SecondaryButton
                                                    onClick={() => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            showCounterProposal: false
                                                        }));
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <FaTimes /> Скрыть контр-петицию
                                                </SecondaryButton>
                                            )}
                                        </div>

                                        {selectedPetition.showImprovement && (
                                            <>
                                                <TextAreaInput
                                                    label="Ваше предложение по улучшению"
                                                    value={selectedPetition.improvementText || ''}
                                                    onChange={(e) => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            improvementText: e.target.value
                                                        }));
                                                    }}
                                                    style={{ marginTop: '1rem' }}
                                                />
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                    <PrimaryButton
                                                        onClick={() => {
                                                            // Логика отправки предложения
                                                            setSelectedPetition(prev => ({
                                                                ...prev,
                                                                improvementSubmitted: true,
                                                                showImprovement: false
                                                            }));
                                                        }}
                                                        disabled={!selectedPetition.improvementText}
                                                    >
                                                        Отправить улучшение
                                                    </PrimaryButton>
                                                </div>
                                            </>
                                        )}

                                        {selectedPetition.showCounterProposal && (
                                            <>
                                                <TextAreaInput
                                                    label="Ваша контр-петиция"
                                                    value={selectedPetition.counterProposalText || ''}
                                                    onChange={(e) => {
                                                        setSelectedPetition(prev => ({
                                                            ...prev,
                                                            counterProposalText: e.target.value
                                                        }));
                                                    }}
                                                    style={{ marginTop: '1rem' }}
                                                />
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                    <PrimaryButton
                                                        onClick={() => {
                                                            // Логика отправки контр-петиции
                                                            setSelectedPetition(prev => ({
                                                                ...prev,
                                                                counterProposalSubmitted: true,
                                                                showCounterProposal: false
                                                            }));
                                                        }}
                                                        disabled={!selectedPetition.counterProposalText}
                                                    >
                                                        Отправить контр-петицию
                                                    </PrimaryButton>
                                                </div>
                                            </>
                                        )}

                                        {selectedPetition.improvementSubmitted && (
                                            <div style={{
                                                color: '#1a8f3a',
                                                marginTop: '1rem',
                                                padding: '1rem',
                                                background: '#f0f9f0',
                                                borderRadius: '4px'
                                            }}>
                                                Ваше предложение по улучшению было отправлено!
                                            </div>
                                        )}

                                        {selectedPetition.counterProposalSubmitted && (
                                            <div style={{
                                                color: '#1a8f3a',
                                                marginTop: '1rem',
                                                padding: '1rem',
                                                background: '#f0f9f0',
                                                borderRadius: '4px'
                                            }}>
                                                Ваша контр-петиция была отправлена!
                                            </div>
                                        )}
                                    </div>

=======
                                    <ModalDescription>
                                        {selectedPetition.description}
                                    </ModalDescription>
>>>>>>> d7e299e (PoliticalCalendar and HomePage)
                                    <ModalStats>
                                        <VotesCount>
                                            {selectedPetition.votes.toLocaleString()} голосов
                                        </VotesCount>
                                        <PetitionCategory>
                                            {selectedPetition.category}
                                        </PetitionCategory>
                                    </ModalStats>
                                </ModalBody>
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </AnimatePresence>

            </ContentSection>
        </HomePageLayout>
    );
}

export default HomePage;
