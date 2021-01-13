import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { IActivity } from '../../../../app/models/activity'

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (selectedActivity: IActivity | null) => void;
    submitting: boolean;
}

export const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectedActivity, submitting }) => {
    return (
        <Card fluid>
            <Image src={`/asset/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)} loading={submitting} />
                    <Button basic color='grey' content='Cancel' onClick={
                        () => {
                            setSelectedActivity(null);
                        }
                    } />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
