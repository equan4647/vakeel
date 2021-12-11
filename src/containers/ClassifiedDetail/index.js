import { useSelector, useDispatch } from 'react-redux';
import { View, Image } from 'react-native';
import React from 'react';

import {
  FavoriteButton,
  HorizontalTitle,
  AdsCarousel,
  CarouselHttp,
  HeaderRightImage,
  ContactButtonBar,
  ProductDetails,
  Swiper,
  AdAuthor,
  InlineMaps,
  ParallaxScrollView,
} from '../../common';
import {
  API_CLASSIFIED_RELATED_PRODUCTS,
  API_CLASSIFIED_REPORT_TYPE,
} from '../../config/WebService';
import { AppUtil, NavigationService, Util } from '../../utils';
import { ClassifiedUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';
import { Loader, ScrollViewApi } from '../../components';
import { Text } from '../../components';
import { AppStyles, Images } from '../../theme';
import styles from './styles';

import { classifiedSelectors, classifiedActions } from '../../ducks/classified';
import { authSelectors } from '../../ducks/auth';
import { IDENTIFIERS } from '../../config/Constants';
import { requestFlagSelectors } from '../../ducks/requestFlags';

export const ClassifiedDetail = ({ navigation, route }) => {
  // hide header
  NavigationService.hideHeader(navigation);

  // init dispatch
  const dispatch = useDispatch();

  // get classified item
  const classifiedId = route?.params?.classifiedId ?? -1;

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_CLASSIFIED_${classifiedId}`)
  );

  const classifiedItem = useSelector(
    classifiedSelectors.getClassifiedItem(classifiedId)
  );

  console.log('classifiedItem', classifiedItem);
  const userClassified = ClassifiedUtil.getUser(classifiedItem);

  // get user
  const user = useSelector(authSelectors.getUser);
  const creatorId = ClassifiedUtil.getUserId(classifiedItem);

  // set payload related products
  const payloadRelatedProducts = {
    product_id: classifiedId,
    limit: 5,
  };
  const identifierRelatedProducts = `RELATED_PRODUCTS_${classifiedId}`;

  const onPressFavorite = isFavourite =>
    Util.addClassifiedToFavorites(classifiedId, isFavourite);

  // check classified is mine
  //const isMine = false;
  const isMine = user._id === creatorId;

  // action functions
  const onShare = () => {
    ClassifiedUtil.shareClassified(classifiedId);
  };

  const onSubmitting = values => {
    const report_type = values?.type?.id ?? 0;
    const comment = values?.description ?? '';
    const product_id = classifiedId;

    const payload = { report_type, comment, product_id };
    dispatch(classifiedActions.requestReportProduct(payload));

    //console.log(values);
    //NavigationService.goBack();
  };

  const onReport = () =>
    AppUtil.doIfAuthorized(() => {
      NavigationService.navigate('Report', {
        item_id: classifiedId,
        reportTypeUrl: API_CLASSIFIED_REPORT_TYPE,
        onSubmitting,
        identifier: IDENTIFIERS.REPORT_TYPE_CLASSIFIED,
        idKey: 'id',
        titleKey: 'name',
      });
    });
  const onEdit = () => {
    ClassifiedUtil.editClassified(classifiedItem);
  };
  const onDelete = () => {
    Util.showAlertConfirm(
      strings('messages.delete_ad_title'),
      '',
      strings('app.yes'),
      () => {
        dispatch(classifiedActions.requestDeleteClassified(classifiedId));
      }
    );
  };

  // render views
  const headerRight = () => {
    const options = isMine
      ? {
          [strings('app.share')]: onShare,
          [strings('app.edit')]: onEdit,
          [strings('app.delete')]: onDelete,
        }
      : {
          [strings('app.share')]: onShare,
          [strings('app.report_this_ad')]: onReport,
        };
    const deleteIndex = isMine ? 2 : 1;
    return (
      <HeaderRightImage
        img={Images.icons.moreObaqueBG}
        activeOpacity={0.7}
        onPress={() => {
          Util.showMoreOptions(options, deleteIndex);
        }}
      />
    );
  };

  const renderSwiper = () => {
    const imagesList = ClassifiedUtil.imagesList(classifiedItem);
    return <Swiper data={imagesList} />;
  };

  const renderTitle = () => {
    return (
      <View style={styles.productTitleContainer}>
        <Text style={styles.titleTextStyle}>
          {ClassifiedUtil.title(classifiedItem)}
        </Text>
        {isMine ? null : (
          <FavoriteButton
            border
            favorite={ClassifiedUtil.isFavourite(classifiedItem)}
            {...{ onPressFavorite }}
          />
        )}
      </View>
    );
  };

  const renderPrice = () => {
    return (
      <Text style={styles.priceTextStyle}>
        {ClassifiedUtil.price(classifiedItem)}
      </Text>
    );
  };

  const renderLocation = () => {
    return (
      <View style={styles.locationContainer}>
        <Image source={Images.icons.location} style={styles.locationIcon} />
        <Text size="size_12" style={styles.location}>
          {ClassifiedUtil.address(classifiedItem)}
        </Text>
        <Text size="size_12" type="medium">
          {ClassifiedUtil.createdAtFormat(classifiedItem)}
        </Text>
      </View>
    );
  };

  const renderProductDetails = () => {
    const attributes = ClassifiedUtil.classifedAttributes(classifiedItem);
    return (
      Util.isNotEmpty(attributes) && (
        <>
          <HorizontalTitle
            title={strings('app.details')}
            bar
            barStyle={styles.barStyle}
          />

          <ProductDetails
            data={attributes}
            attributeName="title"
            attributeValue="value"
            attributeValueKey="pivot"
          />
        </>
      )
    );
  };

  const renderDescription = () => {
    return (
      <>
        <HorizontalTitle
          title={strings('app.description')}
          bar
          barStyle={styles.barStyle}
        />
        <Text style={styles.productDescriptionTextStyle}>
          {ClassifiedUtil.description(classifiedItem)}
        </Text>
      </>
    );
  };

  const renderAuthor = () => {
    const customProps = isMine
      ? { hasRightArrow: false }
      : {
          onPress: () => {
            NavigationService.navigate('ClassifiedPublisher', {
              userInfo: ClassifiedUtil.getUser(classifiedItem),
            });
          },
        };
    //isMine

    return (
      <AdAuthor
        data={ClassifiedUtil.getUser(classifiedItem)}
        {...customProps}
      />
    );
  };

  const renderMap = () => {
    return (
      <>
        <HorizontalTitle
          title={strings('app.post_location')}
          bar
          barStyle={styles.barStyle}
        />

        <InlineMaps
          latitude={ClassifiedUtil.getLat(classifiedItem)}
          longitude={ClassifiedUtil.getLong(classifiedItem)}
        />
      </>
    );
  };

  const renderRelatedProducts = () => {
    return (
      <CarouselHttp
        renderContent={() => {
          return (
            <AdsCarousel
              identifier={identifierRelatedProducts}
              headerTitle={strings('app.related_products')}
              rightTitle=""
              leftTextStyleTitle={styles.titleTextStyleCarousel}
              containerStyleTitle={{ marginTop: 0 }}
            />
          );
        }}
        url={API_CLASSIFIED_RELATED_PRODUCTS}
        payload={payloadRelatedProducts}
        identifier={identifierRelatedProducts}
        dynamicAction={classifiedActions.setClassifieds}
      />
    );
  };

  const renderContent = () => {
    return (
      <>
        <ParallaxScrollView transparentBack={false} headerRight={headerRight}>
          {renderSwiper()}
          <View style={styles.container}>
            {renderTitle()}
            {renderPrice()}
            {renderLocation()}
            {renderProductDetails()}
            {renderDescription()}
            {renderAuthor()}
            {renderMap()}
          </View>
          <View style={{ height: 29 }} />
          {renderRelatedProducts()}
          <View style={{ height: 60 }} />
        </ParallaxScrollView>
        {isMine ? null : (
          <ContactButtonBar
            onChat={() => ClassifiedUtil.chatUserClassifed(userClassified)}
            onMessage={() =>
              ClassifiedUtil.messageUserClassifed(userClassified)
            }
            onCall={() => ClassifiedUtil.callUserClassifed(userClassified)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <ScrollViewApi
        isContentOnly
        identifier={classifiedId}
        requestFlags={requestFlags}
        data={classifiedItem}
        payload={{ classifiedId }}
        contentContainerStyle={AppStyles.flex1}
        requestAction={classifiedActions.requestGetClassified}
        content={renderContent}
        // emptyView={() => <AddDelivery />}
      />
      <Loader type="DELETE_CLASSIFIED" />
    </>
  );
};

export default ClassifiedDetail;
