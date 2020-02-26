import React from 'react';
import fire from './config/firebase'

class Home extends React.Component {

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h2>You are logged in</h2>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Home;