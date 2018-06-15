import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
    <div className='green-background'>
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                <div className='col-md-6 mx-auto align-self-center'>
                    <div class="jumbotron">
                        <h1 className='text-center mb-4'>End-to-end encrypted chat</h1><br />
                        <Link className='btn btn-danger' to='/signup'>Signup</Link> or  
                        <Link className='btn btn-primary' to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);