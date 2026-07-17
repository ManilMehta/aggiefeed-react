import type { Activity } from '../types/activity';

const AGGIE_FEED_PUBLIC_ACTIVITY_URL =
  'https://aggiefeed.ucdavis.edu/api/v1/activity/public?s=0&l=25';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readString(record: UnknownRecord, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

function normalizeActivity(value: unknown): Activity | null {
  if (!isRecord(value)) {
    return null;
  }

  const actor = isRecord(value.actor)
    ? { displayName: readString(value.actor, 'displayName') }
    : undefined;

  const object = isRecord(value.object)
    ? { objectType: readString(value.object, 'objectType') }
    : undefined;

  return {
    id: readString(value, 'id'),
    _id: readString(value, '_id'),
    title: readString(value, 'title'),
    published: readString(value, 'published'),
    actor,
    object,
  };
}

export async function fetchActivities(): Promise<Activity[]> {
  const response = await fetch(AGGIE_FEED_PUBLIC_ACTIVITY_URL);

  if (!response.ok) {
    throw new Error(`AggieFeed request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('AggieFeed returned an unexpected response shape.');
  }

  return data
    .map(normalizeActivity)
    .filter((activity): activity is Activity => activity !== null);
}
