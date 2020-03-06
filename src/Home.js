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
            </div>
        )
    }
}

export default Home;