import React from 'react';

import { userService, authenticationService } from '../services';

class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>Checkout page !!! </p>
                <h3>Users from secure api end point:</h3>
                { users &&
                    <ul>
                        {users.results.map(user =>
                            <li key={user.id}>{user.title} {user.description}</li>
                        )}
                    </ul>
                }

            </div>
        );
    }
}

export { CheckoutPage };