import React from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';

import { TextInput, AppButton, StarRating } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { NavigationService, ValidationUtil } from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import styles from './styles';
import { IDENTIFIERS, RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import { useDispatch } from 'react-redux';
import { requestAddReview } from '../../ducks/reviews/actions';
import ReviewUtil from '../../DataUtils/ReviewUtil';
import { Loader } from '../../components';
import {
  API_UPDATE_SERVICE_REVIEW,
  API_ADD_SERVICE_REVIEW,
} from '../../config/WebService';
import { requestAddServiceRating } from '../../ducks/serviceHistory/actions';

export default ({ navigation, route }) => {
  const orderId = route.params?.orderID ?? '';
  //   const attrId = route.params?.attrID ?? '';
  const serviceId = route.params?.serviceId ?? '';
  const data = route.params?.reviewData ?? null;
  const isRated = route.params?.isRated ?? false;

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
  const dispatch = useDispatch();
  //submit
  const submit = formObj.handleSubmit(values => {
    const payload = {
      //   item_id: attrId,
      rating: values.rating,
      review: values.description,
      order_id: orderId,
      service_id: serviceId,
    };

    console.log('payload', payload);

    if (isRated) {
      payload.id = ReviewUtil.getId(data);
    }

    const url = isRated ? API_UPDATE_SERVICE_REVIEW : API_ADD_SERVICE_REVIEW;

    dispatch(
      requestAddServiceRating(payload, url, IDENTIFIERS.REVIEW_BOOKINGS)
    );
  });

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

      <Loader type="ADD_REVIEW" />
    </View>
  );
};
