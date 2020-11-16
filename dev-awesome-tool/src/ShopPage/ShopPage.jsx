import React from 'react';

import { userService, authenticationService } from '../services';

class ShopPage extends React.Component {
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
                <h1>Shop page!</h1>
                <p>Products displayed here </p>
            </div>
        );
    }
}

export { ShopPage };