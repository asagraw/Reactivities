import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { IActivity } from '../../app/models/activity';

interface IProps {
    setSelectedActivity: (selectedActivity: IActivity | null) => void;
    setEditMode: (editMode: boolean) => void;
}

export const NavBar: React.FC<IProps> = ({ setSelectedActivity, setEditMode }) => {
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <img src="/asset/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities' />
                    <Menu.Item>
                        <Button positive content="Create Activity" onClick={
                            () => {
                                setSelectedActivity(null);
                                setEditMode(true);
                            }
                        } />
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}
