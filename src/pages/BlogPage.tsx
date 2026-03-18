import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const BlogPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Health & Wellness Blog</h1>
                    <p className="page-subtitle">Expert advice and insights for a healthier life</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="blog-grid">
                        <div className="blog-post">
                            <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800" alt="Health" className="blog-img" />
                            <h3>10 Tips for Better Mental Health</h3>
                            <p>Small changes in your daily routine can make a big difference...</p>
                        </div>
                        <div className="blog-post">
                            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800" alt="Nutrition" className="blog-img" />
                            <h3>The Power of Balanced Nutrition</h3>
                            <p>Understanding the basics of macros and micros for optimal energy...</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default BlogPage;
