import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    selectedActivity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, selectedActivity, createActivity, editActivity, submitting }) => {
    const InitializeActivity = () => {
        if (selectedActivity) {
            return selectedActivity;
        } else {
            const tempActivity: IActivity = {
                id: '', title: '', category: '', description: '', date: '', city: '', venue: ''
            };
            return tempActivity;
        }
    }
    const [activity, setActivity] = useState<IActivity>(InitializeActivity);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
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
}
