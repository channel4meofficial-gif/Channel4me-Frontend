import React from 'react';
import Header from '../ui/header';
import Footer from '../layout/footer/footer.txs';
import '../../styles/layout.css'; // Make sure this is imported

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
                {/* REMOVE the extra div and let children handle their own containers */}
                {children}
            </main>
            
            {!hideFooter && <Footer />}
        </div>
    );
};

export default PublicLayout;