import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'

// interface IProps {
//     setEditMode: (editMode: boolean) => void;
//     deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
//     submitting: boolean;
//     targetDel: string;
// }
const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, submitting, deleteActivity, target } = activityStore;
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`}
                                />
                                <Button floated='right' content='Delete' negative name={activity.id} onClick={(event) => {
                                    deleteActivity(event, activity.id);
                                }} loading={target === activity.id && submitting} />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
}

export default observer(ActivityList);
