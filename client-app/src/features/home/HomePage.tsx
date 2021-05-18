import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react';
import modalStore from '../../app/stores/modalStore';
import { store, useStore } from '../../app/stores/store';
import userStore from '../../app/stores/userStore';
import LoginForm from '../users/LoginForm';
import Register from '../users/Register';

const HomePage = () => {
    const usersStores = useContext(userStore);
    const { modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='tiny' src='/asset/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                        Reactivities
                    </Header>
                {usersStores.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login!
                        </Button>
                            <Button onClick={() => modalStore.openModal(<Register />)} size='huge' inverted>
                                Register!
                             </Button>
                        </>
                    )}
            </Container>
        </Segment>
    )
}

export default observer(HomePage);
