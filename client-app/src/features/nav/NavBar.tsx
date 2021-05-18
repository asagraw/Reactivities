import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import userStore from '../../app/stores/userStore';


const NavBar = () => {
    const activityStore = useContext(ActivityStore);
    const { setEditMode, setSelectedActivity } = activityStore;
    const usersStores = useContext(userStore);
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header as={NavLink} exact to="/">
                        <img src="/asset/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities' as={NavLink} to="/activities" />
                    <Menu.Item>
                        <Button positive content="Create Activity" as={NavLink} to="/createActivity" onClick={
                            () => {
                                setSelectedActivity(undefined);
                                setEditMode(true);
                            }
                        } />
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={usersStores.user?.image || '/asset/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={usersStores.user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${usersStores.user?.username}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={usersStores.logout} text='logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
};

export default observer(NavBar);
