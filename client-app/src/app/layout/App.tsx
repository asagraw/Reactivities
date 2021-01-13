import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadComponent } from './LoadComponent';

// interface IState {
//   activities: IActivity[]
// }

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [targetDel, setTargetDel] = useState('');


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      // setSubmitting(true);
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTargetDel(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(id, activities.filter(a => a.id === id)[0]).then(() => {
      // setSubmitting(true);
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      }).then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadComponent content="lading activities" />
  }

  return (
    <Fragment>
      <NavBar setSelectedActivity={setSelectedActivity} setEditMode={setEditMode} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectActivity} selectedActivity={selectedActivity!} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} createActivity={handleCreateActivity} editActivity={handleEditActivity} deleteActivity={handleDeleteActivity} submitting={submitting} targetDel={targetDel} />
      </Container>
    </Fragment>
  );
}

export default App;
