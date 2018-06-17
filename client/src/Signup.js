import React, { Component } from 'react';
import { 
    generateRSAKeys, 
    deriveKeyFromPassword,
    exportPublicKey,
    wrapPrivateKey,
    sha512,
    exportPrivateKeyInPEMFormat,
    exportPublicKeyInPEMFormat,
} from './crypto';
import { convertStringToArrayBuffer } from './utils';

export class Signup extends Component {
    state = { 
        username: '', 
        account_password: '', 
        key_password: '',

        // for simple UX later 
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
        generateRSAKeys.then(async (key) => {
            const pubKey = key.publicKey;
            const privKey = key.privateKey;

            // create AES key
            const hashedPassword = await sha512(keyPassword);
            const salt = hashedPassword.substr(0, 64);
            const aesKey = await deriveKeyFromPassword(keyPassword, salt);

            const iv = new Uint8Array(convertStringToArrayBuffer(hashedPassword.substr(64)));
            const encryptedPrivateKey = await wrapPrivateKey(privKey, aesKey, iv);

            const exportedPubKey = await exportPublicKey(pubKey);
            const privateKeyPEM = exportPrivateKeyInPEMFormat(encryptedPrivateKey);
            const publicKeyPEM = exportPublicKeyInPEMFormat(exportedPubKey);

            const data = {
                username,
                accountPassword,
                privateKey: privateKeyPEM,
                publicKey: publicKeyPEM,
            }

            try {
                const response = await fetch('http://localhost:3001/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) this.setState({ success: 'Success! Now you can log in.'})
                else this.setState({ error: 'Something wrong happened!' });
            } catch(err) {
                console.error(err);
                this.setState({ error: err.message });
            }
        })
        .catch((err) => console.error(err));
        event.preventDefault();
    }

    render() {
     return (
        <div className='green-background'>
            <div className='container-fluid h-100'>
                <div className='row h-100'>
                    <div className='col-md-6 mx-auto align-self-center'>
                        <div className='card card-body'>
                            <h3 className='text-center mb-4'>Sign-up</h3>
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
                                    <input type='submit' className='btn btn-lg btn-primary btn-block' value='Sign up' />
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