import React from 'react';
import { View, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { ButtonView, Loader, Text } from '../../components';
import { AppStyles, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import { AddressUtil } from '../../DataUtils';
import { NavigationService, Util } from '../../utils';
import { useDispatch } from 'react-redux';
import { requestDeleteAddress } from '../../ducks/addresses/actions';
import styles from './styles';

const DefaultTag = React.memo(() => (
  <View style={styles.defaultContainer}>
    <Text style={styles.defaultTextStyle}>
      {strings('app.default_address')}
    </Text>
  </View>
));

const ActionButton = ({ title, onPress, style }) => {
  return (
    <ButtonView
      hitSlop={Metrics.hitSlop}
      onPress={onPress}
      style={[styles.actionButton, style]}
    >
      <Text style={styles.actionButtonTextStyle}>{title}</Text>
    </ButtonView>
  );
};

const AddressItem = props => {
  const { data, isSelected, editable, style, onPress, badge } = props;

  const Container = onPress ? ButtonView : View;
  const isDefault = AddressUtil.isDefault(data);
  const dispatch = useDispatch();

  const onPressEdit = () => NavigationService.navigate('AddAddress', { data });

  const onPressDelete = () => {
    Util.showAlertConfirm(
      strings('app.are_you_sure'),
      strings('messages.delete_address_assert'),
      strings('app.delete'),
      () => dispatch(requestDeleteAddress({ id: AddressUtil.id(data) }))
    );
  };

  return (
    <Container {...{ style }} onPress={() => onPress?.(AddressUtil.id(data))}>
      <View style={[AppStyles.row]}>
        <Image
          source={Images.icons.locationBlack}
          style={styles.locationIconStyle}
          resizeMode="contain"
        />
        <View style={styles.subContainer}>
          {Util.isNotEmpty(AddressUtil.label(data)) && (
            <Text style={styles.label}>{AddressUtil.label(data)}</Text>
          )}

          <View style={AppStyles.spreadRowAligned}>
            <Text
              numberOfLines={2}
              style={{ maxWidth: onPress ? '88%' : '100%' }}
            >
              {AddressUtil.address(data)}
            </Text>
            {isSelected ? <Image source={Images.icons.selected} /> : null}
          </View>
          {isDefault && badge ? <DefaultTag /> : null}
          {editable ? (
            <View style={AppStyles.row}>
              <ActionButton
                title={strings('app.edit').toUpperCase()}
                onPress={onPressEdit}
              />

              <ActionButton
                title={strings('app.delete').toUpperCase()}
                style={styles.delete}
                onPress={onPressDelete}
              />
            </View>
          ) : null}
        </View>
      </View>
      <Loader type="DELETE_ADDRESS" />
    </Container>
  );
};

AddressItem.propTypes = {
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  editable: PropTypes.bool,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  badge: PropTypes.bool,
};
AddressItem.defaultProps = {
  data: {},
  isSelected: false,
  editable: true,
  badge: true,
};
export default React.memo(AddressItem);
