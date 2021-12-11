import { useSelector } from 'react-redux';
import React from 'react';

import { SellerDetailCard, ParallaxScrollViewWithTabs } from '../../common';
import { PROFILE_TABS } from '../../config/Constants';
import { profileTabsData } from '../../data';
import { NavigationService } from '../../utils';
import { UserUtil } from '../../DataUtils';
import styles from './styles';

import RecreationalActivities from './RecreationalActivities';
import EmploymentInfo from './EmploymentInfo';
import PersonalInfo from './PersonalInfo';
import MedicalInfo from './MedicalInfo';
import Education from './Education';

import { getUser } from '../../ducks/auth/selectors';

const ViewProfile = ({ navigation }) => {
  const userData = useSelector(getUser);
  const {
    email,
    dob,
    education,
    employment_info,
    medical_info,
    recreational_activities,
  } = userData;

  NavigationService.setTitle(navigation, '');

  const renderHeaderBottomContent = () => (
    <SellerDetailCard style={styles.content} data={userData} />
  );

  const personal_info_data = [
    { title: 'Email', value: email },
    { title: 'Phone', value: UserUtil.fullPhoneNumber(userData) || '- -' },
    { title: 'Date of Birth', value: dob || '- -' },
  ];

  const renderTabItem = item => {
    switch (item.id) {
      case PROFILE_TABS.PERSONAL_INFO:
        return <PersonalInfo data={personal_info_data} />;
      case PROFILE_TABS.EDUCATION:
        return <Education data={education} />;
      case PROFILE_TABS.EMPLOYMENT_INFO:
        return <EmploymentInfo data={employment_info} />;
      case PROFILE_TABS.RECREATIONAL_ACTIVITIES:
        return <RecreationalActivities data={recreational_activities} />;
      case PROFILE_TABS.MEDICAL_INFO:
        return <MedicalInfo data={medical_info} />;
      default:
        break;
    }
  };

  return (
    <ParallaxScrollViewWithTabs
      data={profileTabsData}
      renderHeaderBottomContent={renderHeaderBottomContent}
      labelKey="title"
      renderTabItem={renderTabItem}
      customHeader={false}
    />
  );
};

export default ViewProfile;

/*
 const navigateToEdit = () => NavigationService.navigate('EditProfile');
footerView={renderFooter}
const renderFooter = () => {
    return (
      <>
        <HorizontalTitle
          title={strings('app.my_topics')}
          rightTitle={strings('app.see_all')}
          containerStyle={styles.content}
          barStyle={styles.content}
          bar
          onPress={() =>
            NavigationService.navigate('SeeAllTopics', {
              title: strings('app.topics'),
            })
          }
        />

        <TopicsCarousel
          data={TopicsData.list}
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
          onItemPress={() =>
            NavigationService.push('ViewTopic', { isMine: true })
          }
        />
      </>
    );
  };
*/
/*
  NavigationService.setOptionsHeader(navigation, '', {
    [strings('app.edit_profile')]: navigateToEdit,
  });
  */
