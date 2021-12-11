import { COMMUNICATION_MEDIUM, COST_TYPE } from '../config/Constants';
import { Images } from '../theme';

export default [
  {
    id: 5,
    userid: 1,
    message: 'Kidney function, liver function',
    datetime: '2021-01-02 12:12:00',
    isMine: true,
    isRead: true,
  },
  {
    id: 6,
    userid: 2,
    message: 'Wow.',
    datetime: '2021-01-02 12:14:00',
    isMine: false,
  },
  {
    id: 7,
    userid: 2,
    message: 'So what is going on?',
    datetime: '2021-01-02 12:15:00',
    isMine: false,
  },
  {
    id: 8,
    userid: 1,
    message:
      'We had a meth addict in here this morning who was biologically younger',
    datetime: '2021-01-02 12:30:00',
    isMine: true,
    isRead: true,
  },
  {
    id: 9,
    userid: 2,
    message: 'Wow.',
    datetime: '2021-01-02 12:35:00',
    isMine: false,
  },
  {
    id: 10,
    userid: 2,
    message: 'So what is going on?',
    datetime: '2021-01-02 12:45:00',
    isMine: false,
  },
  {
    id: 11,
    userid: 1,
    message:
      'We had a meth addict in here this morning who was biologically younger',
    datetime: '2021-01-02 12:50:00',
    isMine: true,
    isRead: true,
  },
];
export const inviteData = {
  isMine: true,
  accepted: true,
  costType: COST_TYPE.PAID,
  fee: 5.0,
  consultancyType: COMMUNICATION_MEDIUM.VIDEO,
  // status: 'accepted',
  topicName: 'Air Pollution',
  time: '24 Nov, 2021, 7:30 PM',
  datetime: '2021-01-02 12:12:00',
  isRead: true,
};