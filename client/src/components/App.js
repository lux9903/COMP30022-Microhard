import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userAction';
import { Spinner } from 'react-bootstrap';
import Main from './Navigation/Main';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    render() {
        const { isFetching } = this.props.user;

        if (isFetching) {
            return (
                <div className='app-loading'>
                    <Spinner animation='border' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return <Main />;
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(App);
