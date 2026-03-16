import React from 'react';

interface FooterContactProps {
  email: string;
  phone: string;
  address: string;
}

const FooterContact: React.FC<FooterContactProps> = ({ email, phone, address }) => {
  return (
    <div className="footer-contact">
      <h4>Contact Us</h4>
      <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
      <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
      <p>Address: {address}</p>
    </div>
  );
};

export default FooterContact;