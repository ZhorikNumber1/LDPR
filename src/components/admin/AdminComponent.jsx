import React, { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import { Card, CardTitle } from '../common/Card';
import { PrimaryButton } from '../common/Button';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PetitionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PetitionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PetitionImage = styled.div`
  height: 160px;
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
  margin-bottom: 1rem;
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

function AdminComponent() {
    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        setPetitions([
            {
                id: 1,
                title: 'Бесплатный интернет в парках',
                description: 'Просьба обеспечить Wi-Fi в городских парках.',
                votes: 2430,
                deputies: [],
                image: 'https://source.unsplash.com/random/400x300/?wifi',
            },
            {
                id: 2,
                title: 'Ремонт дорог на Ленинской',
                description: 'Необходимо срочно отремонтировать дорогу на улице Ленинской.',
                votes: 1580,
                deputies: ['Иванова (СП)'],
                image: 'https://source.unsplash.com/random/400x300/?road',
            },
            {
                id: 3,
                title: 'Новая школа в микрорайоне Здоровье',
                description: 'Строительство школы до конца 2025 года.',
                votes: 3125,
                deputies: ['Петров (ЕДР)', 'Сидоров (ЯБЛОКО)'],
                image: 'https://source.unsplash.com/random/400x300/?school',
            },
        ]);
    }, []);

    const handleTake = (id) => {
        const currentDeputy = 'ТекущийДепутат (СП)';
        setPetitions(prev =>
            prev.map(p =>
                p.id === id && !p.deputies.includes(currentDeputy)
                    ? { ...p, deputies: [...p.deputies, currentDeputy] }
                    : p
            )
        );
    };

    return (
        <MainLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Топ обращений для депутатов</h2>
                <p>Выберите обращение и возьмите его в работу.</p>
            </motion.div>

            <PetitionsGrid>
                {petitions.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: p.id * 0.1 }}
                    >
                        <PetitionCard>
                            <PetitionImage image={p.image} />
                            <PetitionContent>
                                <CardTitle>{p.title}</CardTitle>
                                <PetitionDescription>{p.description}</PetitionDescription>
                                <PetitionStats>
                                    <VotesCount>{p.votes.toLocaleString()} голосов</VotesCount>
                                    {p.deputies.length > 0 ? (
                                        <DeputiesList>В работе: {p.deputies.join(', ')}</DeputiesList>
                                    ) : (
                                        <PrimaryButton onClick={() => handleTake(p.id)}>
                                            Взять в работу
                                        </PrimaryButton>
                                    )}
                                </PetitionStats>
                            </PetitionContent>
                        </PetitionCard>
                    </motion.div>
                ))}
            </PetitionsGrid>
        </MainLayout>
    );
}

export default AdminComponent;
