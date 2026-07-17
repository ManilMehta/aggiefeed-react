import type { Activity } from '../types/activity';

export type RootStackParamList = {
  ActivityList: undefined;
  ActivityDetail: {
    activity: Activity;
  };
};
