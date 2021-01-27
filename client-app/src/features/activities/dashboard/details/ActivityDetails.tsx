import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { LoadComponent } from '../../../../app/layout/LoadComponent';
import ActivityStore from '../../../../app/stores/activityStore'

// interface IProps {
//     // activity: IActivity;
//     setEditMode: (editMode: boolean) => void;
//     setSelectedActivity: (selectedActivity: IActivity | null) => void;
//     submitting: boolean;
// }

interface DetailsParam {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParam>> = ({ match, history }) => {
    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity, setEditMode, submitting, loadActivity, loading } = activityStore;
    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    // return <h1>Test Details</h1>;

    if (loading || !activity) { return <LoadComponent content='loading activity..' />; }



    return (
        <Card fluid>
            <Image src={`/asset/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity!.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' as={Link} to={`/manage/${activity.id}`} loading={submitting} onClick={() => setEditMode(true)} />
                    <Button basic color='grey' content='Cancel' onClick={
                        () => {

                            // setSelectedActivity(undefined);
                            history.push('/activities');
                        }
                    } />
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

export default observer(ActivityDetails);
