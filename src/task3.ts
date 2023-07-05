import * as moment from 'moment';

/**
 * Finds the earliest available slot.
 * @param businessmenCalendars Three dimentional array of businessmen schedules
 * @param duration the duration of the new meeting.
 * @returns A string for the earliest start meeting, e.g:"09:15"
 */
const findMeetingSlot = (businessmenCalendars: string[][][], duration: number): string | null => {
  try {
    const occupiedSlots: string[] = getOccupiedSlots(businessmenCalendars);
    const [startBusinessWork, endBusinessWork] = [moment("09:00", "HH:mm"), moment("19:00", "HH:mm")];
    const freeSlots = getFreeSlots(occupiedSlots, startBusinessWork.format("HH:ss"), endBusinessWork.format("HH:ss"));
    for (let freeSlot in freeSlots) {
      if (freeSlots[freeSlot] >= duration) {
        return freeSlot;
      }
    }
    return null;
  }
  catch (error: any) {
    console.error(error?.message || 'An error occured ..');
    return null;
  }
}

/**
 * 
 * @param schedules 
 * @returns array of occupied slots (shared between all businessmen)
 */
const getOccupiedSlots = (schedules: string[][][]): string[] => {
  const calendar: string[][] = schedules.flat().sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;

  })
  let result: string[] = [];
  for (let i: number = 0; i < calendar.length; i++) {
    let start: string = calendar[i][0];
    let end: string = calendar[i][1];
    for (let j: number = i + 1; j < calendar.length; j++) {
      if (calendar[j][0] <= end && end <= calendar[j][1]) {
        end = calendar[j][1];
      } else {
        i = j - 1;
        break;
      }
    }

    const slotInfo = `${start};${end}`;// "9:00;11:30"
    if (result.indexOf(slotInfo) == -1)
      result.push(slotInfo)
  }
  return result;
}

/**
 * 
 * @param occupiedSlots List of occupied slots, e.g: ["09:12;11:14"]
 * @param startWorkingHours Optional parameter, e.g:"08:00"
 * @param endWorkingHours "Optional parameter, e.g:"19:00"
 * @returns An Object holds the start of available slot and the duration in minutes, e.g: {"13:03":120}
 */
const getFreeSlots = (occupiedSlots: string[], startWorkingHours: string = "09:00", endWorkingHours: string = "19:00"): any => {
  const freeSlots = {};
  const firstSlot = occupiedSlots[0].split(';');
  if (firstSlot[0] !== startWorkingHours) {
    freeSlots[startWorkingHours] = moment(firstSlot[0], "HH:mm").diff(moment(startWorkingHours, "HH:mm"), 'minutes')
  }

  for (let i = 0; i < occupiedSlots.length; i++) {
    const firstSlot = occupiedSlots[i].split(';')[1];
    let secondSlot = endWorkingHours;
    if (i < occupiedSlots.length - 1)
      secondSlot = occupiedSlots[i + 1].split(';')[0];

    freeSlots[firstSlot] =
      moment(secondSlot, "HH:mm").diff(moment(firstSlot, "HH:mm"), 'minutes')

  }
  return freeSlots
}
export {
  findMeetingSlot,
  getOccupiedSlots,
  getFreeSlots
}

// let schedules = [
//   [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
//   [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
//   [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
// ];

// console.log(`Result :`, findMeetingSlot(schedules, 60));

