import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
    <div className='green-background'>
        <div className='intro'>
            <h1>End-to-end encrypted chat</h1><br />
            <Link to="/signup">Signup</Link> or
            <Link to="/login">Login</Link>
        </div>
    </div>
);