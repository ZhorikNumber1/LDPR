import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Card, CardContent, CardTitle} from '../common/Card';

const AccountContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const Avatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
`;

const UserName = styled.h2`
    color: ${({theme}) => theme.colors.primary};
`;

const SectionTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({theme}) => theme.colors.primary};
`;

const PetitionList = styled.ul`
    display: grid;
    gap: 1rem;
`;

const PetitionItem = styled.li`
    padding: 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PetitionTitle = styled.span`
    font-weight: 600;
`;

const PetitionStatus = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    background-color: ${({status, theme}) =>
            status === 'approved' ? theme.colors.primaryLight :
                    status === 'rejected' ? '#ffcdd2' : theme.colors.gray};
    color: ${({status, theme}) =>
            status === 'approved' ? theme.colors.white :
                    status === 'rejected' ? '#c62828' : theme.colors.black};
`;

function AccountPage() {
    // Заглушка данных - в реальном приложении эти данные будут приходить с бэкенда
    const user = {
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        petitions: [
            {id: 1, title: 'За улучшение дорожного покрытия', status: 'approved', date: '2023-05-15'},
            {id: 2, title: 'Против повышения налогов', status: 'pending', date: '2023-06-02'},
            {id: 3, title: 'За строительство парка', status: 'rejected', date: '2023-04-10'},
        ]
    };

    return (
        <>
            <AccountContainer>
                <motion.section
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <Card>
                        <CardTitle>Личный кабинет</CardTitle>
                        <CardContent>
                            <UserInfo>
                                <Avatar>{user.name.charAt(0)}</Avatar>
                                <div>
                                    <UserName>{user.name}</UserName>
                                    <p>{user.email}</p>
                                </div>
                            </UserInfo>

                            <SectionTitle>Мои петиции</SectionTitle>
                            <PetitionList>
                                {user.petitions.map(petition => (
                                    <PetitionItem key={petition.id}>
                                        <PetitionTitle>{petition.title}</PetitionTitle>
                                        <PetitionStatus status={petition.status}>
                                            {petition.status === 'approved' ? 'Одобрена' :
                                                petition.status === 'rejected' ? 'Отклонена' : 'На рассмотрении'}
                                        </PetitionStatus>
                                    </PetitionItem>
                                ))}
                            </PetitionList>
                        </CardContent>
                    </Card>
                </motion.section>
            </AccountContainer>
        </>
    );
}

export default AccountPage;