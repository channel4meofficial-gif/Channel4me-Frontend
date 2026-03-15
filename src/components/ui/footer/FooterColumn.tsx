import React from 'react';
import FooterLink from './FooterLink';

interface FooterColumnProps {
  title: string;
  links: { label: string; url: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>
        {links.map((link, index) => (
          <FooterLink key={index} href={link.url}>
            {link.label}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;