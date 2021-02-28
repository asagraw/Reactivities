import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityStore from '../../../../app/stores/activityStore'
import { ActivityDetailedChat } from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

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
    const { selectedActivity: activity, loadActivity } = activityStore;
    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    // return <h1>Test Details</h1>;
    // if (loading || !activity) { return <LoadComponent content='loading activity..' />; }
    if (!activity || activity === undefined) { return <h2>Activity Not found</h2> }



    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar />
            </GridColumn>
        </Grid>
    )
};

export default observer(ActivityDetails);
