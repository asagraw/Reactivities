import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParam {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity, setEditMode, createActivity, submitting, editActivity, loadActivity, setSelectedActivity } = activityStore;
    const [activity, setActivity] = useState<IActivity>({
        id: '', title: '', category: '', description: '', date: '', city: '', venue: ''
    });

    useEffect(() => {
        if (match.params.id && selectedActivity?.id.length === 0) {
            loadActivity(match.params.id).then(() => selectedActivity && setActivity(selectedActivity));
        }

        return () => {
            setSelectedActivity(undefined);
        }

        // const load = async () => {
        //     if (match.params.id) {
        //         await loadActivity(match.params.id);
        //         console.log(selectedActivity?.id);
        //         selectedActivity && setActivity(selectedActivity);
        //         setEditMode(true);
        //         console.log("activty" + activity.id);
        //     }

        // };
        // load();
    }, [loadActivity, setSelectedActivity, selectedActivity, match.params.id]);

    // const InitializeActivity = () => {
    //     if (selectedActivity) {
    //         return selectedActivity;
    //     } else {
    //         const tempActivity: IActivity = {
    //             id: '', title: '', category: '', description: '', date: '', city: '', venue: ''
    //         };
    //         return tempActivity;
    //     }
    // }


    const handleSubmit = () => {
        if (activity.id.length === 0) {

            (async () => {
                let newActivity = {
                    ...activity,
                    id: uuid()
                }
                await createActivity(newActivity);
                history.push(`/activities/${newActivity.id}`)
            })();
        } else {
            (async () => {
                await editActivity(activity);
                history.push(`/activities/${activity.id}`);
            })();
        }
    }
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' value={activity.category} placeholder='Category' />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' value={activity.date} placeholder='Date' />
                <Form.Input onChange={handleInputChange} name='city' value={activity.city} placeholder='City' />
                <Form.Input onChange={handleInputChange} name='venue' value={activity.venue} placeholder='Venue' />
                <Button content='Submit' positive floated='right' loading={submitting} />
                <Button content='Cancel' floated='right' onClick={() => setEditMode(false)} />
            </Form>
        </Segment>
    )
};

export default observer(ActivityForm);
