import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="not-found">
        <div>Khong thay trang ban yeu cau</div>
        <Link to="/" className="link-home">
            Go Home
        </Link>
    </div>
);

export default NotFound;