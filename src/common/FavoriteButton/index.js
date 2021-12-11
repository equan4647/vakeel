import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Images, Metrics, Colors } from '../../theme';
import { ButtonView } from '../../components';
import styles from './styles';
import { useUserRole } from '../../utils/CustomHooks';

const FavoriteButton = props => {
  const { favorite, border, circle, onPressFavorite, style } = props;

  const isGuest = useUserRole();

  const containerStyle = circle ? styles.circle : border ? styles.border : {};

  return (
    <View style={[containerStyle, style]}>
      <ButtonView
        debounceTime={300}
        onPress={() => onPressFavorite?.(favorite)}
        hitSlop={Metrics.hitSlop}
      >
        <Image
          source={Images.icons.heart}
          style={{
            tintColor:
              favorite && !isGuest ? Colors.primary : Colors.lightBlueGrey,
          }}
        />
      </ButtonView>
    </View>
  );
};

FavoriteButton.propTypes = {
  favorite: PropTypes.bool.isRequired,
  border: PropTypes.bool,
  circle: PropTypes.bool,
  onPressFavorite: PropTypes.func,
  style: ViewPropTypes.style,
};
FavoriteButton.defaultProps = {
  favorite: false,
  border: false,
  circle: false,
  style: {},
  onPressFavorite: () => {},
};

// export default React.memo(FavoriteButton, (prevProps, nextProps) => {
//   return prevProps.favorite === nextProps.favorite;
// });

export default FavoriteButton;
