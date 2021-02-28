import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, GridColumn, Header, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid'
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOption } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

interface DetailsParam {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity, setEditMode, createActivity, submitting, editActivity, loadActivity, setSelectedActivity } = activityStore;
    const [activity, setActivity] = useState<IActivity>({
        id: '', title: '', category: '', description: '', date: null, city: '', venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('the activity title is required'),
        description: Yup.string().required('the activity decription is required'),
        category: Yup.string().required(),
        date: Yup.string().required('the date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (match.params.id && activity?.id.length === 0) {
            loadActivity(match.params.id).then(() => selectedActivity && setActivity(selectedActivity));
        }

        return () => {
            setSelectedActivity(undefined);
        }
    }, [loadActivity, setSelectedActivity, selectedActivity, match.params.id]);

    const handleFormSubmit = (activity: IActivity) => {
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
    // const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = event.currentTarget;
    //     setActivity({ ...activity, [name]: value });
    // }
    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <Header content='Activity Details' sub color='teal' />
                    <Formik enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)} validationSchema={validationSchema}>
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit} className='ui form'>
                                <MyTextInput name='title' placeholder='Title' />

                                <MyTextArea row={3} name='description' placeholder='Description' />
                                <MySelectInput name='category' placeholder='Category' options={categoryOption} />
                                <MyDateInput
                                    name='date'
                                    placeholderText='Date'
                                    showTimeSelect
                                    timeCaption='time'
                                    dateFormat='MMMM d, yyyy h:mm aa' />
                                <Header content='Location Details' sub color='teal' />
                                <MyTextInput name='city' placeholder='City' />
                                <MyTextInput name='venue' placeholder='Venue' />
                                <Button
                                    disabled={submitting}
                                    content='Submit' positive floated='right' loading={submitting} />
                                <Button content='Cancel' floated='right' onClick={() => setEditMode(false)} />
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </GridColumn>
        </Grid>
    )
};

export default observer(ActivityForm);
