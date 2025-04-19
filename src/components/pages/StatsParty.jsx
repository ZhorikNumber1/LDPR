import {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {
    FaChartLine,
    FaChartBar,
    FaChartPie,
    FaCalendarAlt,
    FaChevronDown,
    FaSearch, FaFire, FaEdit, FaComments, FaUsers
} from 'react-icons/fa';
import {Card, CardTitle} from '../common/Card';
import {PrimaryButton, SecondaryButton} from '../common/Button';
import {NavLink} from 'react-router-dom';

const PreviewSection = styled(motion.div)`
    background-color: ${({theme}) => theme.colors.grayLight};
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
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


// Стили для страницы
const StatsPageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const StatsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const StatsTitle = styled.h2`
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const TimeFilter = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
`;

const HomePageLayout = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const StatCardTitle = styled.h3`
    font-size: 1rem;
    color: ${({theme}) => theme.colors.grayDark};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors.primary};
    margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
    font-size: 0.9rem;
    color: ${({positive, theme}) => positive ? theme.colors.primary : '#e53935'};
    display: flex;
    align-items: center;
`;

const ChartContainer = styled.div`
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: ${({theme}) => theme.shadows.small};
`;

const PartiesTable = styled.div`
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: ${({theme}) => theme.shadows.small};
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    font-weight: 600;
    padding: 1rem 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 1rem 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.grayLight};
    align-items: center;
`;

const PartyInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const PartyColor = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({color}) => color};
`;

// Заглушки данных
const PARTY_STATS = [
    {
        id: 'er',
        name: 'Единая Россия',
        color: '#1a8f3a',
        petitions: 1245,
        change: 12,
        approved: 632,
        rejected: 213
    },
    {
        id: 'kprf',
        name: 'КПРФ',
        color: '#cc0000',
        petitions: 876,
        change: -5,
        approved: 421,
        rejected: 187
    },
    {
        id: 'ldpr',
        name: 'ЛДПР',
        color: '#1a5fb4',
        petitions: 765,
        change: 8,
        approved: 387,
        rejected: 156
    },
    {
        id: 'sr',
        name: 'Справедливая Россия',
        color: '#ff6600',
        petitions: 543,
        change: 3,
        approved: 276,
        rejected: 98
    },
    {
        id: 'np',
        name: 'Новые люди',
        color: '#00a2ff',
        petitions: 321,
        change: 15,
        approved: 187,
        rejected: 42
    }
];

const TOTAL_STATS = {
    totalPetitions: 3750,
    approved: 1903,
    rejected: 696,
    pending: 1151,
    change: 7
};

// Простой компонент графика (заглушка)
const SimpleChart = () => {
    return (
        <div style={{
            height: '300px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
        }}>
            <div style={{
                width: '60px',
                height: '80%',
                background: 'linear-gradient(to top, #1a5fb4, #4a8ad4)',
                borderRadius: '4px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    width: '100%',
                    textAlign: 'center'
                }}>Неделя
                </div>
            </div>
            <div style={{
                width: '60px',
                height: '100%',
                background: 'linear-gradient(to top, #1a5fb4, #4a8ad4)',
                borderRadius: '4px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    width: '100%',
                    textAlign: 'center'
                }}>Месяц
                </div>
            </div>
            <div style={{
                width: '60px',
                height: '65%',
                background: 'linear-gradient(to top, #1a5fb4, #4a8ad4)',
                borderRadius: '4px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    width: '100%',
                    textAlign: 'center'
                }}>Квартал
                </div>
            </div>
        </div>
    );
};

const StatsParty = () => {
    const [timeRange, setTimeRange] = useState('month');

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
            <StatsPageContainer>
                <PreviewSection
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <StatsHeader
                    >
                        <StatsTitle>
                            <FaChartBar/> Статистика партий
                        </StatsTitle>
                        <TimeFilter>
                            <SecondaryButton
                                active={timeRange === 'week'}
                                onClick={() => setTimeRange('week')}
                            >
                                Неделя
                            </SecondaryButton>
                            <SecondaryButton
                                active={timeRange === 'month'}
                                onClick={() => setTimeRange('month')}
                            >
                                Месяц
                            </SecondaryButton>
                            <SecondaryButton
                                active={timeRange === 'quarter'}
                                onClick={() => setTimeRange('quarter')}
                            >
                                Квартал
                            </SecondaryButton>
                        </TimeFilter>
                    </StatsHeader>

                    <StatsGrid>
                        <StatCard>
                            <StatCardTitle><FaChartLine/> Всего петиций</StatCardTitle>
                            <StatValue>{TOTAL_STATS.totalPetitions.toLocaleString()}</StatValue>
                            <StatChange positive={TOTAL_STATS.change > 0}>
                                {TOTAL_STATS.change > 0 ? '↑' : '↓'} {Math.abs(TOTAL_STATS.change)}% за период
                            </StatChange>
                        </StatCard>

                        <StatCard>
                            <StatCardTitle><FaChartPie/> Одобрено</StatCardTitle>
                            <StatValue>{TOTAL_STATS.approved.toLocaleString()}</StatValue>
                            <div style={{fontSize: '0.9rem', color: '#666'}}>
                                {Math.round(TOTAL_STATS.approved / TOTAL_STATS.totalPetitions * 100)}% от общего числа
                            </div>
                        </StatCard>

                        <StatCard>
                            <StatCardTitle><FaChartPie/> Отклонено</StatCardTitle>
                            <StatValue>{TOTAL_STATS.rejected.toLocaleString()}</StatValue>
                            <div style={{fontSize: '0.9rem', color: '#666'}}>
                                {Math.round(TOTAL_STATS.rejected / TOTAL_STATS.totalPetitions * 100)}% от общего числа
                            </div>
                        </StatCard>

                        <StatCard>
                            <StatCardTitle><FaCalendarAlt/> На рассмотрении</StatCardTitle>
                            <StatValue>{TOTAL_STATS.pending.toLocaleString()}</StatValue>
                            <div style={{fontSize: '0.9rem', color: '#666'}}>
                                {Math.round(TOTAL_STATS.pending / TOTAL_STATS.totalPetitions * 100)}% от общего числа
                            </div>
                        </StatCard>
                    </StatsGrid>

                    <ChartContainer>
                        <StatCardTitle><FaChartBar/> Динамика подачи петиций</StatCardTitle>
                        <SimpleChart/>
                    </ChartContainer>

                    <PartiesTable>
                        <StatCardTitle><FaChartPie/> Статистика по партиям</StatCardTitle>

                        <TableHeader>
                            <div>Партия</div>
                            <div>Петиций</div>
                            <div>Одобрено</div>
                            <div>Отклонено</div>
                        </TableHeader>

                        {PARTY_STATS.map(party => (
                            <TableRow key={party.id}>
                                <PartyInfo>
                                    <PartyColor color={party.color}/>
                                    <div>{party.name}</div>
                                </PartyInfo>
                                <div>
                                    {party.petitions.toLocaleString()}
                                    <StatChange positive={party.change > 0}>
                                        {party.change > 0 ? '↑' : '↓'} {Math.abs(party.change)}%
                                    </StatChange>
                                </div>
                                <div>{party.approved.toLocaleString()}</div>
                                <div>{party.rejected.toLocaleString()}</div>
                            </TableRow>
                        ))}
                    </PartiesTable>
                </PreviewSection>
            </StatsPageContainer>
        </HomePageLayout>
    );
};

export default StatsParty;