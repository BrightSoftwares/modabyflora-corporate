import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../services';
import { withRouter } from 'react-router-dom';

class LoginPageNoRouter extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            // this.props.history.push('/index.html');
            window.location.href = "/index.html";
        }
    }

    render() {
        return (
            <div className="col-md-6">
                <p className="h4 mb-4">Se connecter</p>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Le nom d\'utilisateur est requis'),
                        password: Yup.string().required('Le mot de passe est requis')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    // this.props.history.push(from);
                                    console.log("Redirecting to " + from);
                                    window.location.href = from.pathname;
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Nom d'utilisateur/E-mail</label>
                                <Field name="username" type="text" className={'mb-4 form-control' + (errors.username && touched.username ? ' is-invalid' : '')}  placeholder="Email" />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <Field name="password" type="password" className={'mb4 form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="d-flex justify-content-around">
                                <div>
                                    <div className="custom-control custom-checkbox">
                                        <Field type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                                        <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Se souvenir de moi</label>
                                    </div>
                                </div>
                                <div>
                                    <a href="/forgotpassword">Mot de passe oublié?</a>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-info btn-block my-4" disabled={isSubmitting}>Se connecter</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            <div><a href="/forgotpassword">Mot de passe oublié?</a></div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }

                            <p>Pas de compte? 
                                <a href="/register">Créer-en un</a>
                            </p>
                        </Form>
                    )}
                />
            </div>
        )
    }
}

let LoginPage = withRouter(LoginPageNoRouter)

export { LoginPage }; 