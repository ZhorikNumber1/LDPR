import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem 2rem;
    box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const NavItems = styled.ul`
    display: flex;
    gap: 2rem;
`;

const NavItem = styled.li`
    position: relative;
`;

const StyledNavLink = styled(NavLink)`
    padding: 0.5rem 1rem;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
        color: ${({ theme }) => theme.colors.grayLight};
    }

    &.active {
        font-weight: bold;
    }

    &.active::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 3px;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <Nav>
                <Logo>Петиции РФ</Logo>
                <NavItems>
                    <NavItem>
                        <StyledNavLink to="/" end>Главная</StyledNavLink>
                    </NavItem>
                    <NavItem>
                        <StyledNavLink to="/create-path">Создать петицию</StyledNavLink>
                    </NavItem>
                    <NavItem>
                        <StyledNavLink to="/chat">Чат с партиями</StyledNavLink>
                    </NavItem>
                    <NavItem>
                        <StyledNavLink to="/parts">Статистика партий</StyledNavLink>
                    </NavItem>
                    <NavItem>
                        <StyledNavLink to="/calendar">Календарь событий</StyledNavLink>
                    </NavItem>
                </NavItems>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;
