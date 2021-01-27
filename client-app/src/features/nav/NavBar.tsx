import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';


const NavBar = () => {
    const activityStore = useContext(ActivityStore);
    const { setEditMode, setSelectedActivity } = activityStore;
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
                </Container>
            </Menu>
        </div>
    )
};

export default observer(NavBar);
