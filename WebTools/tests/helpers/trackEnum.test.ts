import { test, expect, describe } from '@jest/globals';
import { Track, getAllTracks } from '../../src/helpers/trackEnum';

describe('Track enum', () => {
  test('getAllTracks returns array of numbers', () => {
    const tracks = getAllTracks();
    expect(tracks.length).toBeGreaterThan(0);
    tracks.forEach((t) => expect(typeof t).toBe('number'));
  });

  test('includes Command', () => {
    const tracks = getAllTracks();
    expect(tracks).toContain(Track.Command);
  });

  test('includes Sciences', () => {
    const tracks = getAllTracks();
    expect(tracks).toContain(Track.Sciences);
  });
});
