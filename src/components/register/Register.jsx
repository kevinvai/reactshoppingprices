import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { register } from '../../utils/apicalls';
import LoadingCircle from '../loading/LoadingCircle';
import { store } from 'react-notifications-component';
import { registerFailed, registerSuccess } from '../../utils/notifications';
import 'tachyons';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false
    };
  }
  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };
    register(newUser)
      .then(user => {
        if (user) {
          this.setState({ isLoading: false });
          store.addNotification(registerSuccess);
          this.props.history.push('/signin');
        }
      })
      .catch(err => {
        console.log('error =>', err);
        store.addNotification(registerFailed);
        this.setState({ isLoading: false });
      });
    this.setState({ isLoading: true });
  };
  render() {
    return (
      <>
        {this.state.isLoading && <LoadingCircle />}
        <article
          className={
            this.state.isLoading
              ? 'o-50 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'
              : 'br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'
          }
        >
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f1 fw6 ph0 mh0'>Register</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='name'>
                    Name
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='text'
                    name='name'
                    id='name'
                    onChange={this.onNameChange}
                  />
                </div>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='email'
                    name='email-address'
                    id='email-address'
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSubmitSignIn}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
              <div className='lh-copy mt3'>
                <Link to='/signin' className='f6 link dim black db pointer'>
                  Already registered? Sign in here!
                </Link>
              </div>
            </div>
          </main>
        </article>
      </>
    );
  }
}

export default withRouter(Register);
