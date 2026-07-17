import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

import { fetchActivities } from './aggieFeed';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('fetchActivities returns normalized activity data', async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify([
        {
          _id: 'database-id',
          actor: { displayName: 'UC Davis Engineering' },
          id: 'activity-id',
          object: { objectType: 'notification' },
          published: '2026-07-09T18:00:30.043Z',
          title: 'Three UC Davis Student Teams Earn Sandia Engineering Design Awards',
          unusedField: 'ignored by the app',
        },
      ]),
      { status: 200 },
    );

  const activities = await fetchActivities();

  assert.deepEqual(activities, [
    {
      _id: 'database-id',
      actor: { displayName: 'UC Davis Engineering' },
      id: 'activity-id',
      object: { objectType: 'notification' },
      published: '2026-07-09T18:00:30.043Z',
      title: 'Three UC Davis Student Teams Earn Sandia Engineering Design Awards',
    },
  ]);
});

test('fetchActivities keeps missing nested fields optional', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify([{ id: 'activity-id', title: 'Missing nested data' }]), {
      status: 200,
    });

  const activities = await fetchActivities();

  assert.deepEqual(activities, [
    {
      _id: undefined,
      actor: undefined,
      id: 'activity-id',
      object: undefined,
      published: undefined,
      title: 'Missing nested data',
    },
  ]);
});

test('fetchActivities throws when the API returns an error status', async () => {
  globalThis.fetch = async () => new Response('Server error', { status: 500 });

  await assert.rejects(
    fetchActivities(),
    /AggieFeed request failed with status 500/,
  );
});

test('fetchActivities throws when the API response is not an array', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: 'not a list' }), { status: 200 });

  await assert.rejects(
    fetchActivities(),
    /AggieFeed returned an unexpected response shape/,
  );
});
