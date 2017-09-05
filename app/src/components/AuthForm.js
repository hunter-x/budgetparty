import React, { Component } from 'react'
import Translate    from 'react-translate-component';
const _t = Translate.translate;

export default class LoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.actionHandler(this.email.value, this.pw.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="auth-form__label">{_t('login.email')}</label>
          <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
        </div>
        <div className="form-group">
          <label className="auth-form__label">{_t('login.password')}</label>
          <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
        </div>
        {
          this.props.errorText &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">{_t('login.error')}</span>
            &nbsp;{this.props.errorText}
          </div>
        }
        <button type="submit" className="auth-form__button btn btn-primary">{this.props.buttonText}</button>
      </form>
    )
  }
}
