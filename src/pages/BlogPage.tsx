import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const BlogPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Healthcare Blog</h1>
                    <p className="page-subtitle">Insights, health tips, and platform updates</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-blog"></i>
                        <h2>Latest Articles</h2>
                        <p>This page is currently under development. Soon it will feature our blog feed with articles written by top medical professionals and our team.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default BlogPage;
