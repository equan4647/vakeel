import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { View } from 'react-native';

import {
  FavoriteButton,
  ProductDetails,
  Swiper,
  BuyingCarousel,
  AdAuthor,
  InlineMaps,
  AttributesProductBuying,
  ParallaxScrollView,
  BottomButtonWithChat,
  PackageDetails,
  BuyingActionButton,
  CarouselHttp,
  Separator,
} from '../../common';
import { TitlePriceRating, Title, RatingList, QuantityBar } from './components';
import { API_MARKETPLACE_RELATED_PRODUCTS } from '../../config/WebService';
import { useProductCartHandle } from '../../utils/CustomHooks';
import { AppUtil, NavigationService, Util } from '../../utils';
import { CAROUSEL } from '../../config/Constants';

import { ProductUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';
import styles from './styles';

import { productSelectors, productActions } from '../../ducks/products';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { AppStyles, Metrics } from '../../theme';
import { ScrollViewApi } from '../../components';
//import { getProductItem } from '../../ducks/products/selectors';

export default ({ navigation, route }) => {
  const selectedAttr = route.params?.selectedAttr;

  // hide header
  NavigationService.hideHeader(navigation);

  // get product data
  const _id = route.params?.item ?? '';
  const data = useSelector(productSelectors.getProductItem(_id));

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_PRODUCT_${_id}`)
  );

  // set payload related products
  const payloadRelatedProducts = {
    item_id: data?._id ?? 0,
    category_id: data?.category_id ?? 0,
    limit: CAROUSEL.ITEM_LIMIT,
  };
  const identifierRelatedProducts = `RELATED_PRODUCTS_${payloadRelatedProducts.item_id}`;

  // get attribute data
  const firstProductAttributeId =
    data?.product_attributes?.[0].product_attribute_id;

  const productAttributesInfo = React.useMemo(() => {
    return ProductUtil.attributesInfo(data);
  }, [data.product_attributes]);

  // set default attribute
  const [attributeSelectd, setAttributeSelected] = React.useState(
    productAttributesInfo.productAttributesObject[
      selectedAttr || firstProductAttributeId
    ]
  );

  React.useEffect(() => {
    // if (Util.isEmpty(attributeSelectd)) {

    // }
    setAttributeSelected(
      productAttributesInfo.productAttributesObject[
        selectedAttr || firstProductAttributeId
      ]
    );
  }, [data]);

  // get cart attributes
  const { countInCart, updateCart } = useProductCartHandle(
    _id,
    attributeSelectd?.product_attribute_id ?? 0
  );
  const inStockQuantity = ProductUtil.getStockQuantityByAttr(attributeSelectd);
  const inStock = Number(inStockQuantity) > 0;
  const [count, setCount] = useState(1);

  const isDiscounted = ProductUtil.isDiscounted(data);
  // ProductUtil.getDiscountedPriceFromAttrObject(
  //   attributeSelectd
  // );

  // on press favourite
  const onPressFavorite = isFav => Util.AddProductToFavorites(_id, isFav);

  // set new cart object
  const setNewAttributeObject = newAttribute => {
    const newCount = ProductUtil.getNewProductCountAttribute(
      newAttribute,
      count
    );
    setAttributeSelected(newAttribute);
    setCount(newCount);
  };

  // on press add to cart
  const onPressAddToCart = () => {
    AppUtil.doIfAuthorized(() => {
      if (inStockQuantity >= Number(countInCart) + Number(count)) {
        const newCount = countInCart + count;
        updateCart(newCount, () => {
          setCount(1);
        });
      } else {
        Util.showMessage(strings('app.quantity_exceed_cart_message'));
      }
    });
  };

  // on press chat
  const onPressChat = () => ProductUtil.onChat(ProductUtil.getVendor(data));

  // render header right
  const headerRight = () => (
    <FavoriteButton
      circle
      favorite={ProductUtil.isFavourite(data)}
      {...{ onPressFavorite }}
    />
  );

  const renderContent = () => (
    <ParallaxScrollView
      headerTitle={ProductUtil.getProductTitle(data)}
      contentContainerStyle={styles.content}
      {...{ headerRight }}
    >
      <Swiper data={ProductUtil.getCoverImageCollection(data)} />

      <View style={styles.container}>
        <TitlePriceRating
          price={ProductUtil.getPriceFromAttrObject(attributeSelectd, true)}
          discountedPrice={
            isDiscounted &&
            ProductUtil.getDiscountedPriceFromAttrObject(attributeSelectd, true)
          }
          {...{ data, isDiscounted }}
        />

        <AttributesProductBuying
          {...{
            productAttributesInfo,
            attributeSelectd,
            setAttributeSelected: setNewAttributeObject,
          }}
        />

        <QuantityBar
          {...{
            attributeSelectd,
            count,
            setCount,
            countInCart,
            inStockQuantity,
            inStock,
          }}
        />

        {/* details======== */}
        {Util.isNotEmpty(ProductUtil.getProperties(data)) && (
          <>
            <Title title={strings('app.details')} />

            <ProductDetails data={ProductUtil.getProperties(data)} />

            <View style={styles.separator10} />
          </>
        )}

        {/* description======== */}
        <PackageDetails
          title={strings('app.description')}
          hasBar
          details={ProductUtil.getProductDescription(data)}
          style={styles.packageDetails}
        />

        <AdAuthor
          title={strings('app.boomin_user')}
          data={ProductUtil.getVendor(data)}
          {...data.seller}
          onPress={() =>
            NavigationService.navigate('Publisher', {
              vendor: ProductUtil.getVendor(data),
            })
          }
        />

        {/* location======== */}
        <Title title={strings('app.product_available_at')} />
        <InlineMaps
          latitude={ProductUtil.getLatitude(data)}
          longitude={ProductUtil.getLongitude(data)}
        />
        <View style={{ height: Metrics.baseMargin }} />

        {/* rating======== */}
        <RatingList {...{ _id }} />

        {/* related_ads======== */}
      </View>

      <CarouselHttp
        renderContent={() => [
          <Separator style={styles.carousalSeparator} />,
          <BuyingCarousel
            identifier={identifierRelatedProducts}
            headerTitle={strings('app.related_products')}
            rightTitle=""
            titleTextStyle={styles.titleTextStyleCarousel}
          />,
        ]}
        url={API_MARKETPLACE_RELATED_PRODUCTS}
        payload={payloadRelatedProducts}
        identifier={identifierRelatedProducts}
        dynamicAction={productActions.setProducts}
      />
    </ParallaxScrollView>
  );

  // main render

  return (
    <>
      <ScrollViewApi
        {...{ requestFlags, data }}
        identifier={_id}
        payload={{ id: _id }}
        checkDataEmpty
        contentContainerStyle={AppStyles.flex1}
        requestAction={productActions.requestGetProduct}
        content={renderContent}
        isContentOnly
      />

      <BuyingActionButton containerStyle={styles.actionButton} />

      <BottomButtonWithChat
        title={strings('app.add_to_cart')}
        onPress={onPressAddToCart}
        onChat={onPressChat}
        appButtonDisabled={!inStock}
      />
    </>
  );
};
