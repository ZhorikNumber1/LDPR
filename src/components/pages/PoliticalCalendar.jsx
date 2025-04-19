import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaFire, FaEdit, FaComments, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import MainLayout from '../layout/MainLayout';

const PageLayout = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
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

const Container = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: 2rem 0;
`;

const CalendarBox = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    h2 {
        margin: 0;
        font-size: 1.75rem;
        color: ${({ theme }) => theme.colors.primaryDark};
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid ${({ theme }) => theme.colors.grayLight};
    border-radius: 8px;
    overflow: hidden;
`;

const Cell = styled.div`
    min-height: 100px;
    padding: 0.75rem;
    border-right: 1px solid ${({ theme }) => theme.colors.grayLight};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayLight};
    background: ${({ isHeader, theme }) =>
            isHeader ? theme.colors.primary : theme.colors.white};
    color: ${({ isHeader, theme }) =>
            isHeader ? theme.colors.white : theme.colors.text};
    font-weight: ${({ isHeader }) => (isHeader ? '600' : '400')};
    position: relative;
    &:nth-child(7n) {
        border-right: none;
    }
    &:nth-last-child(-n+7) {
        border-bottom: none;
    }
`;

const DayNumber = styled.div`
    font-size: 1rem;
    margin-bottom: 0.25rem;
`;

const Event = styled.div`
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    box-shadow: ${({ theme }) => theme.shadows.small};
`;

const ExportButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem auto 0;
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.small};
    transition: background 0.2s;
    &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
    }
`;

export default function PoliticalCalendar() {
    const [date] = useState(new Date());
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const blanks = (firstDay + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const cells = [
        ...Array(blanks).fill(null),
        ...Array.from({ length: days }, (_, i) => i + 1),
    ];

    // Мокируем события для граждан
    const eventsMap = {
        5: ['Публичные слушания ЖКХ'],
        12: ['Выборы в муниципальный совет'],
        18: ['Открытый митинг за чистый парк'],
        23: ['Информационная встреча по реформе ЖКХ'],
    };

    const weekdays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

    return (
        <MainLayout>
            <PageLayout>
                {/* ** теперь header tabs одинаковый с HomePage ** */}
                <NavTabs>
                    <Tab to="/" end>
                        <FaFire /> Главная
                    </Tab>
                    <Tab to="/create-path">
                        <FaEdit /> Создать петицию
                    </Tab>
                    <Tab to="/chat">
                        <FaComments /> Чат с партиями
                    </Tab>
                    <Tab to="/parts">
                        <FaUsers /> Статистика партий
                    </Tab>
                    <Tab to="/calendar">
                        <FaCalendarAlt /> Календарь событий
                    </Tab>
                </NavTabs>

                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CalendarBox>
                            <Header>
                                <FaCalendarAlt size={28} />
                                <h2>
                                    Политический календарь —{' '}
                                    {date.toLocaleString('ru', {
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </h2>
                            </Header>

                            <Grid>
                                {weekdays.map(d => (
                                    <Cell key={d} isHeader>
                                        {d}
                                    </Cell>
                                ))}
                                {cells.map((day, idx) => (
                                    <Cell key={idx}>
                                        {day && (
                                            <>
                                                <DayNumber>{day}</DayNumber>
                                                {eventsMap[day]?.map((ev, i) => (
                                                    <Event key={i}>{ev}</Event>
                                                ))}
                                            </>
                                        )}
                                    </Cell>
                                ))}
                            </Grid>
                        </CalendarBox>
                    </motion.div>

                    <ExportButton>
                        <FaDownload /> Экспортировать в мой календарь
                    </ExportButton>
                </Container>
            </PageLayout>
        </MainLayout>
    );
}
