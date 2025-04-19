import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import { pageAnimation } from '../../utils/animations';

const Main = styled(motion.main)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 80px);
`;

function MainLayout({ children }) {
    return (
        <>
            <Header />
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