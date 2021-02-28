import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { Item, Label, Segment } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import ActivityListItem from './ActivityListItem'

// interface IProps {
//     setEditMode: (editMode: boolean) => void;
//     deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
//     submitting: boolean;
//     targetDel: string;
// }
const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem activity={activity} key={activity.id} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </Fragment>


    )
}

export default observer(ActivityList);
