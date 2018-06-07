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
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            account_password: '',
            key_password: '',
            error: '',
            success: '',
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

            const formData = new FormData();
            formData.append('username',  username);
            formData.append('accountPassword', accountPassword);
            formData.append('privateKey', privateKeyPEM);
            formData.append('publicKey', publicKeyPEM);

            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) this.setState({ success: 'Success! Now you can log in.'})
            else this.setState({error: 'Something wrong happened!'});
        })
        .catch((err) => console.error(err));
        event.preventDefault();
    }

    render() {
     return (
        <div className='green-background'>
            <div className='form-page'>
                <span className='error-line'>{this.state.error}</span>
                <span className='success-line'>{this.state.success}</span>
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