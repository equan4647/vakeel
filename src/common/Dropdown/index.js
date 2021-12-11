import React, { useMemo, useRef } from 'react';
import { Image, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { SlidableModal } from '..';
import { ButtonView, Text } from '../../components';
import { countries } from '../../data/countries';
import { Colors, Fonts, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { Util } from '../../utils';

const Title = React.memo(({ title, required = false }) => (
  <Text style={styles.title}>{`${title}${required ? '*' : ''}`}</Text>
));

const Error = ({ errors, errorMessage, name }) => {
  if (errors[name] || errorMessage) {
    return (
      <Text style={styles.errorText}>
        {errors[name].message ?? errorMessage ?? 'invalid'}
      </Text>
    );
  }
  return null;
};

const ArrowDown = React.memo(() => (
  <Image
    source={Images.icons.arrowDown}
    style={{ marginRight: Metrics.ratio(15) }}
  />
));
const Dropdown = (props, ref) => {
  const { name: _name, title, control, errors, errorMessage } = props;
  const sheet = useRef();

  const name = useMemo(() => _name ?? Util.createSlug(title), [title, _name]);

  return (
    <Controller
      {...{ control, name }}
      render={({ onChange, value }) => {
        const focusStyle = {
          fontFamily: value ? Fonts.type.semiBold : Fonts.type.regular,
        };
        return (
          <>
            <Title {...props} />
            <ButtonView
              style={styles.container}
              onPress={() => sheet.current.open()}
            >
              <TextInput
                style={[styles.input, focusStyle]}
                placeholderTextColor={Colors.black}
                placeholder={strings('app.select')}
                editable={false}
                pointerEvents="none"
                value={value?.name}
              />
              <ArrowDown />
            </ButtonView>
            <Error {...{ errors, errorMessage, name }} />
            <SlidableModal
              ref={sheet}
              title={`Select ${title}`}
              data={countries}
              value={value}
              onSelect={val => {
                onChange(val);
                sheet.current.close();
              }}
            />
          </>
        );
      }}
    />
  );
};
export default React.forwardRef(Dropdown);
