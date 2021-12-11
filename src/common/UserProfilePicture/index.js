import React from 'react';
import { View, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonView, Text, ImageViewHttpRound } from '../../components';
import { Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const UserProfilePicture = ({ isEdit, style, image }) => {
  return (
    <View style={[styles.image, style]}>
      <ImageViewHttpRound
        url={image}
        style={styles.image}
        // source={image}
        size={80}
        // cache="reload"
        // placeholderSource={Images.images.guestProfile}

        // placeholderStyle={{ backgroundColor: 'red' }}
      />

      {isEdit ? (
        <ButtonView style={styles.editButtonStyle}>
          <Image source={Images.icons.editOverlay} />

          <Text style={styles.editTextStyle}>{strings('app.edit')}</Text>
        </ButtonView>
      ) : null}
    </View>
  );
};

UserProfilePicture.propTypes = {
  style: ViewPropTypes.style,
  isEdit: PropTypes.bool,
  image: PropTypes.string,
};
UserProfilePicture.defaultProps = { isEdit: true };

export default UserProfilePicture;
