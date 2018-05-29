import React, { Component } from 'react';
import {convertStringToArrayBuffer } from './utils';

export class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            account_password: '',
            key_password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const object = {};
        object[event.target.name] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        // here we will generate and prepare 
        // our data before sending to server
        event.preventDefault();
    }

    render() {
     return (
        <div className='green-background'>
            <div className='form-page'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Account password:
                        <input type='password' name='account_password' value={this.state.account_password} onChange={this.handleChange} />
                    </label>
                    <label>
                        Key password:
                        <input type='password' name='key_password' value={this.state.key_password} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Sign up' />
                </form>
            </div>
        </div>
     );
    }
}