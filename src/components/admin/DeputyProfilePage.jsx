import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MainLayout from '../../components/layout/MainLayout';
import { Card, CardTitle } from '../../components/common/Card';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    cursor: pointer;

    svg { margin-right: 0.5rem; }
`;

const Avatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 1rem;
    display: block;
`;

const Name = styled.h2`
    text-align: center;
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 1.6rem;
`;

const Party = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.grayDark};
    margin: 0.25rem 0 1rem;
    font-size: 0.95rem;
`;

const Bio = styled.p`
    line-height: 1.6;
    margin-bottom: 1.5rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.grayLight};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const DEPUTIES = {
    zhirinovsky: {
        id: 'zhirinovsky',
        name: 'Владимир Жириновский',
        party: 'ЛДПР',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vladimir_Zhirinovsky_%28cropped%29.jpg/150px-Vladimir_Zhirinovsky_%28cropped%29.jpg',
        bio: 'Основатель и многолетний лидер партии ЛДПР. Родился 25 апреля 1946 г. в Алма-Ате...'
    }
};

export default function DeputyProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const deputy = location.state?.deputy || DEPUTIES[id];

    if (!deputy) {
        return (
            <MainLayout>
                <Container>Депутат не найден</Container>
            </MainLayout>
        );
    }

    const stats = {
        petitions: 5,
        inProgress: 2,
        votes: 12456
    };

    return (
        <MainLayout>
            <Container>
                <BackButton onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Назад
                </BackButton>
                <Card>
                    <Avatar src={deputy.avatar} alt={deputy.name} />
                    <Name>{deputy.name}</Name>
                    <Party>Партия: {deputy.party}</Party>
                    <Bio>{deputy.bio}</Bio>

                    <Stats>
                        <StatItem>
                            <StatNumber>{stats.petitions}</StatNumber>
                            <StatLabel>Обращений</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatNumber>{stats.inProgress}</StatNumber>
                            <StatLabel>В работе</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatNumber>{stats.votes.toLocaleString()}</StatNumber>
                            <StatLabel>Голоса</StatLabel>
                        </StatItem>
                    </Stats>
                </Card>
            </Container>
        </MainLayout>
    );
}
