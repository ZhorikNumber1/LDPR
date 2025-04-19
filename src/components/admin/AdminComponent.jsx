import React, { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import DeputyProfile from './DeputyProfile';
import { Card, CardTitle } from '../common/Card';
import { AdminPrimaryButton, AdminSecondaryButton } from './AdminButton';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Container = styled.div`
    display: flex;
    gap: 1rem;
`;

const Sidebar = styled.aside`
    width: 280px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 1rem;
    flex-shrink: 0;
`;

const PartySelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin-top: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.grayLight};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.white};
`;

const NavLinks = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    gap: 0.5rem;
`;

const NavButton = styled(AdminSecondaryButton)`
    width: 100%;
    text-align: left;
    &.active {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        color: ${({ theme }) => theme.colors.primaryDark};
        font-weight: bold;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const Controls = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
`;

const SearchWrapper = styled.div`
    position: relative;
    flex: 1;
    max-width: 300px;

    svg {
        position: absolute;
        top: 50%;
        left: 0.75rem;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.colors.grayDark};
    }

    input {
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 2.5rem;
        border: 1px solid ${({ theme }) => theme.colors.grayLight};
        border-radius: 4px;
        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.primary};
        }
    }
`;

const Select = styled.select`
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.grayLight};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.white};
`;

const PetitionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
`;

const PetitionCard = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PetitionImage = styled.div`
    height: 140px;
    background-color: ${({ theme }) => theme.colors.grayLight};
    background-image: ${({ image }) => `url(${image})`};
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
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: 0.9rem;
    flex: 1;
    margin: 0.5rem 0 1rem;
`;

const PetitionStats = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.grayDark};
`;

const VotesCount = styled.span`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-weight: 600;
`;

const DeputiesList = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondaryDark};
`;

export default function AdminComponent() {
    const currentDeputy = {
        name: 'Иванов Иван',
        party: 'ЛДПР',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    const parties = ['Все партии', 'ЛДПР', 'СП', 'ЕР', 'ЯБЛОКО'];
    const [view, setView] = useState('top');
    const [partyFilter, setPartyFilter] = useState('Все партии');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');
    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        setPetitions([
            {
                id: 1,
                title: 'Бесплатный интернет в парках',
                description: 'Просьба обеспечить Wi-Fi в городских парках.',
                votes: 2430,
                category: 'Инфраструктура',
                deputies: [],
                image: 'https://source.unsplash.com/random/400x300/?wifi',
            },
            {
                id: 2,
                title: 'Ремонт дорог на Ленинской',
                description: 'Необходимо срочно отремонтировать дорогу на улице Ленинской.',
                votes: 1580,
                category: 'Дорожное хозяйство',
                deputies: ['Иванова (СП)'],
                image: 'https://source.unsplash.com/random/400x300/?road',
            },
            {
                id: 3,
                title: 'Новая школа в Здоровье',
                description: 'Строительство школы до конца 2025 года.',
                votes: 3125,
                category: 'Образование',
                deputies: ['Петров (ЕР)', 'Сидоров (ЯБЛОКО)'],
                image: 'https://source.unsplash.com/random/400x300/?school',
            },
        ]);
    }, []);

    const filtered = petitions
        .filter(p =>
            (partyFilter === 'Все партии'
                ? true
                : p.deputies.some(d => d.includes(`(${partyFilter})`)))
        )
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter(p => (categoryFilter === 'all' ? true : p.category === categoryFilter))
        .sort((a, b) => (sortOrder === 'asc' ? a.votes - b.votes : b.votes - a.votes));

    const topList = filtered;
    const mineList = filtered.filter(p => p.deputies.includes(currentDeputy.name));
    const listToShow = view === 'top' ? topList : mineList;

    return (
        <MainLayout>
            <Container>
                <Sidebar>
                    <DeputyProfile deputy={currentDeputy} />

                    <PartySelect
                        value={partyFilter}
                        onChange={e => setPartyFilter(e.target.value)}
                    >
                        {parties.map(p => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </PartySelect>

                    <NavLinks>
                        <NavButton
                            className={view === 'top' ? 'active' : ''}
                            onClick={() => setView('top')}
                        >
                            Топ‑обращения
                        </NavButton>
                        <NavButton
                            className={view === 'mine' ? 'active' : ''}
                            onClick={() => setView('mine')}
                        >
                            Мои обращения
                        </NavButton>
                    </NavLinks>
                </Sidebar>

                <Content>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Controls>
                            <SearchWrapper>
                                <FaSearch />
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </SearchWrapper>

                            <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                                <option value="all">Все категории</option>
                                <option value="Инфраструктура">Инфраструктура</option>
                                <option value="Дорожное хозяйство">Дорожное хозяйство</option>
                                <option value="Образование">Образование</option>
                            </Select>

                            <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                                <option value="desc">По убыванию голосов</option>
                                <option value="asc">По возрастанию голосов</option>
                            </Select>
                        </Controls>
                    </motion.div>

                    <PetitionsGrid>
                        {listToShow.map(p => (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: p.id * 0.1 }}>
                                <PetitionCard>
                                    <PetitionImage image={p.image} />
                                    <PetitionContent>
                                        <CardTitle>{p.title}</CardTitle>
                                        <PetitionDescription>{p.description}</PetitionDescription>
                                        <PetitionStats>
                                            <VotesCount>{p.votes.toLocaleString()} голосов</VotesCount>
                                            {p.deputies.includes(currentDeputy.name) ? (
                                                <DeputiesList>В работе: {p.deputies.join(', ')}</DeputiesList>
                                            ) : (
                                                <AdminPrimaryButton
                                                    onClick={() =>
                                                        setPetitions(prev =>
                                                            prev.map(item =>
                                                                item.id === p.id
                                                                    ? { ...item, deputies: [...item.deputies, currentDeputy.name] }
                                                                    : item
                                                            )
                                                        )
                                                    }
                                                >
                                                    Взять в работу
                                                </AdminPrimaryButton>
                                            )}
                                        </PetitionStats>
                                    </PetitionContent>
                                </PetitionCard>
                            </motion.div>
                        ))}
                    </PetitionsGrid>
                </Content>
            </Container>
        </MainLayout>
    );
}
