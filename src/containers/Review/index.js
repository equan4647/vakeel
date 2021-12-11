import React from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';

import { TextInput, AppButton, StarRating } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { NavigationService, Util, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import styles from './styles';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import ReviewUtil from '../../DataUtils/ReviewUtil';
import { Loader } from '../../components';

export default ({ navigation, route }) => {
  const reviewData = route.params?.reviewData ?? null;
  const data = !Util.isEmpty(reviewData) ? reviewData : null;

  const submitRating = route.params?.submitRating;

  NavigationService.setHeader(
    navigation,
    data ? strings('app.update_review') : strings('app.write_a_review')
  );

  const initialValues = {
    description: ReviewUtil.getReview(data),
    rating: ReviewUtil.getRating(data),
  };

  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.review),
    defaultValues: initialValues,
  });

  const descriptionProps = useInputProps(formObj, 'description');
  const ratingProps = useInputProps(formObj, 'rating');

  //submit
  const submit = formObj.handleSubmit(submitRating);

  return (
    <View style={[AppStyles.container, styles.container]}>
      <ScrollView>
        {
          <Controller
            control={ratingProps.control}
            name={ratingProps.name}
            render={({ onChange, value }) => (
              <StarRating
                title={strings('app.rating_required')}
                onPress={onChange}
                rating={value}
                size={STAR_SIZE.XXLARGE}
                type={RATING_TYPE.RATING_INPUT}
              />
            )}
          />
        }

        <TextInput
          title={strings('app.how_was_your_experience')}
          placeholder={strings('app.enter_description')}
          {...descriptionProps}
          multiline
          titleTextStyle={styles.textInputTextStyle}
          hint={strings('app.give_feedback')}
          showCharCount
          required
          maxLength={4096}
        />
      </ScrollView>

      <AppButton
        title={strings('app.submit')}
        container={styles.appButtonContainer}
        onPress={submit}
      />

      <Loader type={['ADD_REVIEW', 'ADD_SERVICE_RATING']} />
    </View>
  );
};
