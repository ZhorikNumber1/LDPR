import styled from 'styled-components';

export const AdminPrimaryButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
    }
`;

export const AdminSecondaryButton = styled.button`
    background-color: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.grayDark};
    padding: 0.45rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
    }
`;
