import { findMeetingSlot, getOccupiedSlots, getFreeSlots } from './task3';

describe('findMeetingSlot', () => {
  test('returns the earliest available meeting slot', () => {
    const schedules = [
      [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    const duration = 60;
    const expected = '12:15';
    const result = findMeetingSlot(schedules, duration);
    expect(result).toBe(expected);
  });

  test('returns null when no available meeting slot is found', () => {
    const schedules = [
      [['09:00', '10:00'], ['10:30', '12:00'], ['14:00', '17:30']]
    ];
    const duration = 190;
    const expected = null;
    const result = findMeetingSlot(schedules, duration);
    expect(result).toBe(expected);
  });
});

describe('getOccupiedSlots', () => {
  test('returns an array of occupied slots', () => {
    const schedules = [
      [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    const expected = [ '09:00;12:15', '13:30;17:30', '17:45;19:00' ];
    const result = getOccupiedSlots(schedules);
    expect(result).toEqual(expected);
  });
});

describe('getFreeSlots', () => {
  test('returns an object with the start of available slots and their durations', () => {
    const occupiedSlots = ['09:00;11:30', '13:30;16:00', '16:00;17:30', '17:45;19:00'];
    const startWorkingHours = '09:00';
    const endWorkingHours = '19:00';
    const expected = {
      '11:30': 120,
      '16:00': 0,
      '17:30': 15,
      '19:00': 0
    };
    const result = getFreeSlots(occupiedSlots, startWorkingHours, endWorkingHours);
    expect(result).toEqual(expected);
  });
});
