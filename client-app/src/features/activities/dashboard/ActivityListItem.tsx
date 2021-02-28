import { format } from 'date-fns';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore'

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, submitting, deleteActivity, target } = activityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group key={activity.id}>
                    <Item>
                        <Item.Image size='tiny' circular src='/asset/user.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hsted by Ash
                        </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`}
                />
            </Segment>
        </Segment.Group>
    )
};

export default ActivityListItem;
