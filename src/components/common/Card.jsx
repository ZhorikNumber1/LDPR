import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1.5rem;
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const Card = ({ children, ...props }) => {
    return (
        <CardContainer
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {children}
        </CardContainer>
    );
};

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.black};
`;