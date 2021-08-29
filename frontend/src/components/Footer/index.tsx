import React from 'react';

import './style.css';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = React.memo(({}) => {
    return (
        <div className="footer-container">
            <footer>
                Copyright &copy; <time>{new Date().getFullYear()}</time> WebFilm, Marek Baranowski
            </footer>
        </div>
    );
});

export default Footer;
