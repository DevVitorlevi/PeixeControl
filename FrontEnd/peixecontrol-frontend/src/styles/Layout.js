import styled from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
`;

export const ContentWrapper = styled.main`
    flex: 1;
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    justify-content: ${({ isDesktop }) => (isDesktop ? 'flex-start' : 'center')};
    align-items: ${({ isDesktop }) => (isDesktop ? 'flex-start' : 'center')};
    padding: 20px;

    // No desktop o conteúdo fica com margem para a sidebar
    margin-left: ${({ isDesktop }) => (isDesktop ? '250px' : '0')};

    // Limita o tamanho do conteúdo no desktop para não ficar esticado
    > div {
        width: 100%;
        max-width: 1200px;
    }
`;
