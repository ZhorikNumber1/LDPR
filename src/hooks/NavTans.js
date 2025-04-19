import styled from "styled-components";
import {NavLink} from "react-router-dom";

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
