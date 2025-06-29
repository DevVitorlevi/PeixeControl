import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Sidebar from '../components/SideBar';
import { LayoutContainer, ContentWrapper } from '../styles/Layout';

export default function Layout({ children }) {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <LayoutContainer>
            {isDesktop && <Sidebar />}
            <ContentWrapper isDesktop={isDesktop}>
                {children}
            </ContentWrapper>
        </LayoutContainer>
    );
}
