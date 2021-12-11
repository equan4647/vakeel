import PropTypes from 'prop-types';
import React from 'react';

import { Text, Image, ButtonView } from '../../components';
import { DataHandler } from '../../utils';
import { adEngagement } from '../../data';
import { strings } from '../../utils/i18n';
import { Images } from '../../theme';
import styles from './styles';

const Selection = ({ onSelect }) => {
  const [value, setValue] = React.useState(adEngagement[0]);

  const onPress = () => {
    DataHandler.getDropDownModalRef().show({
      onItemSelected: item => {
        setValue(item);
        onSelect(item);
      },
      hideSearch: true,
      data: adEngagement,
      idKey: 'id',
      titleKey: 'title',
      selectedItem: value,
      title: strings('app.engagment'),
    });
  };

  return (
    <ButtonView onPress={onPress} style={styles.container}>
      <Text style={[styles.rightTitleTextStyle]}>{`Last ${value.title}`}</Text>
      <Image style={styles.rightArrow} source={Images.icons.arrowDown} />
    </ButtonView>
  );
};

Selection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  idKey: PropTypes.string,
  titleKey: PropTypes.string,
};
Selection.defaultProps = {
  data: [],
  idKey: 'id',
  titleKey: 'title',
};

export default Selection;
