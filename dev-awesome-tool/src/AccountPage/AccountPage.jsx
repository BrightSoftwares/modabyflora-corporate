import React from 'react';

import { userService, authenticationService } from '../services';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            orders: null
        };
    }

    componentDidMount() {
        userService.getAll().then(orders => this.setState({ orders }));
    }

    render() {
        const { currentUser, orders } = this.state;
        return (
            <div className="card testimonial-card">
            
                <div className="card-up card-image" style={{backgroundImage: "url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%286%29.jpg)"}}>
                    <div className="rgba-black-strong h-100 p-3 white-text">
                        <p className="font-weight-normal mb-0">React Howards</p>
                        <p className="small mb-0">Front-end Developer</p>
                    </div>
                </div>
    
                <div className="avatar mx-auto white">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2823%29.jpg" className="rounded-circle img-responsive" style={{ height: '150px' }} ></img>
                </div>
    
                <div className="card-body px-3 py-4">
                <div className="row">
                    <div className="col-sm-4 text-center">
                        <p className="font-weight-bold mb-0">2400</p>
                        <p className="small text-uppercase mb-0">Sales</p>
                    </div>
                    <div className="col-sm-4 text-center border-left border-right">
                        <p className="font-weight-bold mb-0">15000</p>
                        <p className="small text-uppercase mb-0">Followers</p>
                    </div>
                    <div className="col-sm-4 text-center">
                        <p className="font-weight-bold mb-0">38</p>
                        <p className="small text-uppercase mb-0">Products</p>
                    </div>
                </div>
                </div>
      
              </div>
        );
    }
}

export { AccountPage };