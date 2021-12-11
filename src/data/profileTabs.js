import { PROFILE_TABS } from '../config/Constants';
import { strings } from '../utils/i18n';

const profileData = [
  {
    id: PROFILE_TABS.PERSONAL_INFO,
    title: strings('app.personal_info'),
    data: [
      { title: 'Email', value: 'mohsen.s@mail.com' },
      { title: 'Phone', value: '+1 222 6669' },
      { title: 'Date of Birth', value: '25 June, 1993' },
    ],
  },
  {
    id: PROFILE_TABS.EDUCATION,
    title: strings('app.education'),
    data: [
      {
        school: 'Harvard University',
        degree: 'BA in Communications Arts',
        from: '2012',
        to: '2016',
      },
      {
        school: 'Groton School',
        degree: 'High School Diploma',
        from: '2009',
        to: '2011',
      },
      {
        school: 'Winsor School',
        degree: 'Middle School',
        from: '2003',
        to: '2008',
      },
    ],
  },
  {
    id: PROFILE_TABS.EMPLOYMENT_INFO,
    title: strings('app.employment_info'),
    data: {
      experience: '5 years',
      company: 'Glassdoor',
      jobTitle: 'Sr. UX Designer',
      from: 'Mar 2018',
      to: 'Present',
    },
  },
  {
    id: PROFILE_TABS.RECREATIONAL_ACTIVITIES,
    title: strings('app.recreational_activities'),
    data: {
      hobbies: 'Gaming, Movies, Novels, Eating Out',
      interests:
        'Games, Technology, Desi?gns, Cars, Bikes, Sports, Health & Wellness',
    },
  },
  {
    id: PROFILE_TABS.MEDICAL_INFO,
    title: strings('app.medical_info'),
    data: [
      { diagonosis: 'Diabetes', from: '2019', to: 'Present' },
      { diagonosis: 'Asthama', from: '2018', to: '2019' },
    ],
  },
];

export default profileData;
