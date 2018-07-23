import React, { Component } from 'react';

export class Login extends Component {
    state = { 
        username: '', 
        account_password: '', 
        key_password: '',
        error: '', 
        success: '', 
    }

    handleChange = (event) => {
        const object = {};
        object[event.target.name] = event.target.value;
        this.setState(object);
    }

    handleSubmit = (event) => {
        this.setState({ success: '', error: ''});

        const keyPassword = this.state.key_password;
        const accountPassword = this.state.account_password;
        const username = this.state.username;
        event.preventDefault();
    }

    render() {
     return (
        <div className='green-background'>
            <div className='container-fluid h-100'>
                <div className='row h-100'>
                    <div className='col-md-6 mx-auto align-self-center'>
                        <div className='card card-body'>
                            <h3 className='text-center mb-4'>Login</h3>
                            <form onSubmit={this.handleSubmit}>
                                {this.state.error &&
                                    <div className='alert alert-danger' role='alert'>
                                        {this.state.error}
                                    </div>
                                }
                                {this.state.success &&
                                    <div className='alert alert-success' role='alert'>
                                        {this.state.success}
                                    </div>
                                }
                                <div className="form-group">
                                    <label> Username:</label>
                                    <input type='text' className='form-control' name='username' value={this.state.username} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Account password:</label>
                                    <input type='password' className='form-control' name='account_password' value={this.state.account_password} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Key password:</label>
                                    <input type='password' className='form-control' name='key_password' value={this.state.key_password} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <input type='submit' className='btn btn-lg btn-primary btn-block' value='Login' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
    }
}