export type ActivityActor = {
  displayName?: string;
};

export type ActivityObject = {
  objectType?: string;
};

export type Activity = {
  id?: string;
  _id?: string;
  title?: string;
  published?: string;
  actor?: ActivityActor;
  object?: ActivityObject;
};
