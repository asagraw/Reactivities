import { IActivity } from "./../models/activity";
import { format } from "date-fns";
import {
  action,
  computed,
  makeObservable,
  observable,
  configure,
  runInAction,
} from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  constructor() {
    makeObservable(this);
  }
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loading = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    // return Array.from(this.activityRegistry.values())
    //   .slice()
    //   .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = format(activity.date!, "dd MMM yyyy h:mm aa");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loading = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        // activity.date = activity.date.split(".")[0];
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
      });
      this.loading = false;
      console.log(
        this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
      );
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      // runInAction(() => {
      //   this.loading = true;
      // });
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          this.selectedActivity = activity;
          // this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          // this.loading = false;
        });
        // this.loading = false;
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.submitting = false;
      this.editMode = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
      this.editMode = false;
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id, this.activityRegistry.get(id));
      this.activityRegistry.delete(id);
      this.submitting = false;
      this.target = "";
    } catch (error) {
      this.submitting = false;
      this.target = "";
      console.log(error);
    }
  };
  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  };

  @action setSelectedActivity = (activity: IActivity | undefined) => {
    this.selectedActivity = activity!;
  };
}

export default createContext(new ActivityStore());
