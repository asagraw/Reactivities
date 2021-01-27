import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'

// interface IProps {
//     activities: IActivity[];
//     // selectActivity: (id: string) => void;
//     // selectedActivity: IActivity;
//     // editMode: boolean;
//     setEditMode: (editMode: boolean) => void;
//     setSelectedActivity: (selectedActivity: IActivity | null) => void;
//     // createActivity: (activity: IActivity) => void;
//     // editActivity: (activity: IActivity) => void;
//     deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
//     submitting: boolean;
//     targetDel: string;
// };

const ActivityDashboard = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
