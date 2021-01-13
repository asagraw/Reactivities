import React, { SyntheticEvent } from 'react'
import { Item, Image, Button, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    targetDel: string;
}
export const ActivityList: React.FC<IProps> = ({ activities, selectActivity, setEditMode, deleteActivity, submitting, targetDel }) => {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => {
                                    selectActivity(activity.id)
                                    setEditMode(false);
                                }
                                } />
                                <Button floated='right' content='Delete' negative name={activity.id} onClick={(event) => {
                                    deleteActivity(event, activity.id);
                                }} loading={targetDel === activity.id && submitting} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
}
