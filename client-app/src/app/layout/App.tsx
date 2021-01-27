import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadComponent } from './LoadComponent';
import ActivityStore from '../stores/activityStore'
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/details/ActivityDetails';

// interface IState {
//   activities: IActivity[]
// }

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const activityStore = useContext(ActivityStore);

  // const [activities, setActivities] = useState<IActivity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);
  // const [targetDel, setTargetDel] = useState('');


  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities.filter(a => a.id === id)[0])
  // }

  // const handleCreateActivity = (activity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.create(activity).then(() => {
  //     setActivities([...activities, activity]);
  //     setSelectedActivity(activity);
  //     setEditMode(false);
  //   }).then(() => setSubmitting(false));
  // }

  // const handleEditActivity = (activity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.update(activity).then(() => {
  //     // setSubmitting(true);
  //     setActivities([...activities.filter(a => a.id !== activity.id), activity]);
  //     setSelectedActivity(activity);
  //     setEditMode(false);
  //   }).then(() => setSubmitting(false));
  // }

  // const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  //   setTargetDel(event.currentTarget.name);
  //   setSubmitting(true);
  //   agent.Activities.delete(id, activities.filter(a => a.id === id)[0]).then(() => {
  //     // setSubmitting(true);
  //     setActivities([...activities.filter(a => a.id !== id)]);
  //   }).then(() => setSubmitting(false));
  // }

  useEffect(() => {
    // agent.Activities.list()
    //   .then(response => {
    //     let activities: IActivity[] = [];
    //     response.forEach(activity => {
    //       activity.date = activity.date.split('.')[0];
    //       activities.push(activity);
    //     });
    //     setActivities(activities);
    //   }).then(() => setLoading(false));
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loading) {
    return <LoadComponent content="lading activities" />
  }

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route path="/(.+)" render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path="/activities" component={ActivityDashboard} />
            <Route exact path="/activities/:id" component={ActivityDetails} />
            <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
          </Container>
        </Fragment>
      )} />

    </Fragment>
  );
}

export default withRouter(observer(App));
