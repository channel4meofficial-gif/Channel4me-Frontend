import React from 'react';
import Header from '../../ui/header/header';
import Footer from '../../ui/footer/footer';
import '../../../styles/PublicLayout/publiclayout.css';

interface PublicLayoutProps {
    children: React.ReactNode;
    hideHeader?: boolean;
    hideFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
    children,
    hideHeader = false,
    hideFooter = false
}) => {
    return (
        <div className="public-layout">
            {!hideHeader && <Header />}
            <main className="main-content">
                {children}
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default PublicLayout;