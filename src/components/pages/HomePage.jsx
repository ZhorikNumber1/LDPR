import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Card, CardTitle, CardContent } from '../common/Card';
import { PrimaryButton, SecondaryButton } from '../common/Button';
import {
    FaFire,
    FaEdit,
    FaComments,
    FaUsers,
    FaLightbulb,
    FaTimes,
    FaThumbsUp,
    FaFileAlt,
    FaCalendarAlt
} from 'react-icons/fa';
import {TextAreaInput} from "../common/Input.jsx";

// Стили для новой структуры
const HomePageLayout = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;


const NavTabs = styled.nav`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    margin-bottom: 2rem;
    overflow-x: auto;
`;

const Tab = styled(NavLink)`
    padding: 1rem 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.grayDark};
    border-bottom: 3px solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
        color: ${({ theme }) => theme.colors.primary};
        border-bottom-color: ${({ theme }) => theme.colors.primary};
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
    color: ${({ theme }) => theme.colors.primary};
`;

const PetitionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

const PetitionCard = styled(Card)`
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: ${({ theme }) => theme.shadows.medium};
    }
`;

const PetitionImage = styled.div`
    height: 160px;
    background-color: ${({ theme }) => theme.colors.grayLight};
    border-radius: 8px 8px 0 0;
    background-image: ${({ image }) => `url(${image})`};
    background-size: cover;
    background-position: center;
`;

const PetitionContent = styled.div`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

// Добавляем стили для модального окна
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grayDark};
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModalImage = styled.div`
  height: 300px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ModalDescription = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ModalStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;


const PetitionTitle = styled.h3`
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.black};
`;

const PetitionDescription = styled.p`
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
`;

const PetitionStats = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
`;

const VotesCount = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    padding: 0.15rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
`;

const PetitionCategory = styled.span`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.grayDark};
`;

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
        votes: 2087,
        category: 'Здоровье',
        image: categoryImages['Здравоохранение'],
    },
];


function HomePage() {
    const [selectedPetition, setSelectedPetition] = useState(null);

    // Функция для открытия модалки
    const openModal = (petition) => {
        setSelectedPetition(petition);
    };

    // Функция для закрытия модалки
    const closeModal = () => {
        setSelectedPetition(null);
    };

    return (
        <HomePageLayout>
            {/* Навигационные табы */}
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

            {/* Секция с топом петиций */}
            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: petition.id * 0.1 }}
                            onClick={() => openModal(petition)}
                            style={{ cursor: 'pointer' }}
                        >
                            <PetitionCard>
                                <PetitionImage image={petition.image} />
                                <PetitionContent>
                                    <PetitionTitle>{petition.title}</PetitionTitle>
                                    <PetitionDescription>{petition.description}</PetitionDescription>
                                    <PetitionStats>
                                        <VotesCount>{petition.votes.toLocaleString()} голосов</VotesCount>
                                        <PetitionCategory>{petition.category}</PetitionCategory>
                                    </PetitionStats>
                                </PetitionContent>
                            </PetitionCard>
                        </motion.div>
                    ))}
                </PetitionsGrid>
                <AnimatePresence>
                    {selectedPetition && (
                        <ModalOverlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        >
                            <ModalContent
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <CloseButton onClick={closeModal}>
                                    <FaTimes />
                                </CloseButton>

                                <ModalImage image={selectedPetition.image} />

                                <ModalBody>
                                    <ModalTitle>{selectedPetition.title}</ModalTitle>
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

                                    <ModalStats>
                                        <VotesCount>{selectedPetition.votes.toLocaleString()} голосов</VotesCount>
                                        <PetitionCategory>{selectedPetition.category}</PetitionCategory>
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