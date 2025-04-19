import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageAnimation } from '../../utils/animations';
import {
    FaFire,
    FaEdit,
    FaComments,
    FaUsers,
    FaCalendarAlt
} from 'react-icons/fa';
import Header from './Header';

const Main = styled(motion.main)`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: calc(100vh - 80px);
`;

// Общая панель вкладок
const SubNav = styled.nav`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 2rem;
  overflow-x: auto;
`;

const SubNavLink = styled(NavLink)`
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

export function MainLayout({ children }) {
    return (
        <>
            <Header />
            <SubNav>
            </SubNav>
            <Main
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageAnimation}
            >
                {children}
            </Main>
        </>
    );
}

export default MainLayout;
