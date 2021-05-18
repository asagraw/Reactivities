import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadComponent } from './LoadComponent';
import ActivityStore from '../stores/activityStore'
import userStore from '../stores/userStore'
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';

// interface IState {
//   activities: IActivity[]
// }


const App: React.FC<RouteComponentProps> = ({ location }) => {

  const activityStore = useContext(ActivityStore);
  const usersStore = useContext(userStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  useEffect(() => {
    if (usersStore.token) {
      usersStore.getUser().finally(() => usersStore.setAppLoaded());
    } else {
      usersStore.setAppLoaded();
    }
  }, [usersStore])

  if (!usersStore.appLoaded) {
    return <LoadComponent content='Loading app..' />
  }

  if (activityStore.loading) {
    return <LoadComponent content="loading activities" />
  }

  return (
    <>
      <ToastContainer position='bottom-right' />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route path="/(.+)" render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route exact path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      )} />

    </>
  );
}

export default withRouter(observer(App));
