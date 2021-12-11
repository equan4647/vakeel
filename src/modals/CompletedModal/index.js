import React, { useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { Text, ImageViewHttpRound, Loader } from '../../components';
import { IQKeyboardManager, Util } from '../../utils';
import { StarRating, TextInput, AppButton } from '../../common';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { useInputProps } from '../../utils/CustomHooks';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import { Metrics } from '../../theme';
import { useDispatch } from 'react-redux';

const UserDetail = React.memo(({ userImage, name, time }) => (
  <View style={styles.userContainer}>
    <ImageViewHttpRound url={userImage} size={Metrics.ratio(74)} />
    <Text style={styles.buyerName}>{name || ''}</Text>
    <Text style={styles.time}>{time || ''}</Text>
  </View>
));

const CompletedModal = (props, forwardedRef) => {
  //set state and ref
  const [modalInfo, setInfo] = useState({
    data: {},
    title: '',
    subTitle: '',
    requestFlag: '',
  });

  const dispatch = useDispatch(),
    modalizeRef = useRef(null);

  const defaultValues = { review: '', rating: 0 },
    formObj = useForm({ defaultValues });

  const descriptionProps = useInputProps(formObj, 'review'),
    ratingProps = useInputProps(formObj, 'rating'),
    { rating, review } = formObj.watch(['rating', 'review']);

  const isDisabled = review.trim() === '' || rating == 0;
  // hide modal function
  const hideModal = () => {
    modalizeRef.current.close();
    IQKeyboardManager.setEnable(true);
  };

  //submit
  const submit = formObj.handleSubmit(values => {
    const onComplete = () => {
        modalInfo.onComplete?.();
        hideModal();
      },
      { extraPayload, submitAction } = modalInfo;

    dispatch(submitAction?.({ ...values, ...extraPayload }, onComplete));
  });

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: data => {
      IQKeyboardManager.setEnable(false);
      setInfo(data);
      setImmediate(() => {
        modalizeRef.current.open();
      });
    },
    hide: () => {
      hideModal();
    },
  }));

  // main render
  return (
    <Modalize
      onBackButtonPress={Util.DoNothing}
      ref={modalizeRef}
      modalTopOffset={10}
      withHandle={false}
      panGestureEnabled={false}
      closeOnOverlayTap={false}
      adjustToContentHeight
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
    >
      {modalInfo.renderContent ? (
        modalInfo.renderContent()
      ) : (
        <View style={styles.modalStyle}>
          <Text style={styles.title}>{modalInfo?.title}</Text>

          {Util.isNotEmpty(modalInfo?.data) ? (
            <>
              <UserDetail {...modalInfo.data} />
              <Text style={styles.description}>
                {strings('app.how_was_your_exp', {
                  key: 'name',
                  value: modalInfo.data?.name,
                })}
              </Text>
            </>
          ) : (
            <Text style={styles.description}>
              {strings('app.how_was__exp')}
            </Text>
          )}

          <Controller
            {...ratingProps}
            render={({ onChange, value }) => (
              <StarRating
                onPress={onChange}
                rating={value}
                type={RATING_TYPE.RATING_INPUT}
                size={STAR_SIZE.XLARGE}
                style={styles.rating}
              />
            )}
          />

          <TextInput
            customTitle={strings('app.describe_your_experience')}
            title={strings('app.experince')}
            hint={strings('app.give_feedback')}
            {...descriptionProps}
            multiline
            titleTextStyle={styles.textInputTextStyle}
            showCharCount
            required
            customStyleMulti={styles.customStyleMulti}
            maxLength={4096}
          />

          <AppButton
            onPress={submit}
            title={strings('app.done')}
            container={styles.button}
            disabled={isDisabled}
          />
        </View>
      )}

      <Loader type={modalInfo.requestFlag} />
    </Modalize>
  );
};
export default React.forwardRef(CompletedModal);
