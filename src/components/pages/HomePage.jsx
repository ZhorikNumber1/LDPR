import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Card, CardTitle, CardContent } from '../common/Card';
import { PrimaryButton } from '../common/Button';
import {FaFire, FaEdit, FaComments, FaUsers} from 'react-icons/fa';

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

// Тестовые данные для петиций
const mockPetitions = [
    {
        id: 1,
        title: 'Запретить повышение тарифов ЖКХ в 2023 году',
        description: 'Предлагаем заморозить тарифы на жилищно-коммунальные услуги до стабилизации экономической ситуации в стране.',
        votes: 12543,
        category: 'Социальная политика',
        image: 'https://source.unsplash.com/random/400x300/?protest'
    },
    {
        id: 2,
        title: 'Вернуть прямые выборы мэров городов',
        description: 'Требуем восстановления демократического института прямых выборов глав муниципальных образований.',
        votes: 8765,
        category: 'Спорт',
        image: 'https://source.unsplash.com/random/400x300/?election'
    },
    {
        id: 3,
        title: 'Остановить вырубку городских парков',
        description: 'Необходимо принять срочные меры по сохранению зеленых зон в городах и ужесточить наказание за незаконную вырубку.',
        votes: 15321,
        category: 'Экология',
        image: 'https://source.unsplash.com/random/400x300/?park'
    },
    {
        id: 4,
        title: 'Повысить финансирование здравоохранения',
        description: 'Требуем увеличения бюджета на медицину до 10% ВВП для улучшения качества медицинского обслуживания.',
        votes: 21087,
        category: 'Здравоохранение',
        image: 'https://source.unsplash.com/random/400x300/?hospital'
    },
];

function HomePage() {
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
            </NavTabs>

            {/* Секция с топом петиций */}
            <ContentSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SectionHeader>
                    <SectionTitle>Лента предложений</SectionTitle>
                    <PrimaryButton as={NavLink} to="/">
                        Все петиции
                    </PrimaryButton>
                </SectionHeader>

                <PetitionsGrid>
                    {mockPetitions.map((petition) => (
                        <motion.div
                            key={petition.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: petition.id * 0.1 }}
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
            </ContentSection>
        </HomePageLayout>
    );
}

export default HomePage;