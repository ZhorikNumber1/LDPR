import React from 'react';
import { Card } from '../common/Card';
import styled from 'styled-components';

const ProfileCard = styled(Card)`
    text-align: center;
    padding: 1rem;
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
`;

const Name = styled.h3`
    margin: 0.5rem 0 0.25rem;
    font-size: 1.1rem;
`;

const Party = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: 0.9rem;
`;

export default function DeputyProfile({ deputy, onClick, style }) {
    return (
        <ProfileCard onClick={onClick} style={style}>
            <Avatar src={deputy.avatar} alt={deputy.name} />
            <Name>{deputy.name}</Name>
            <Party>Партия: {deputy.party}</Party>
        </ProfileCard>
    );
}
