// @flow
import { FlatList, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { LIMIT } from '../../config/WebService';
import { Util, DataHandler } from '../../utils';
import { AppStyles, Metrics } from '../../theme';
import {
  LoaderViewApi,
  BottomLoaderViewApi,
  BottomErrorViewApi,
  ErrorViewApi,
  EmptyViewApi,
} from '..';

export default class FlatListApi extends React.PureComponent {
  static propTypes = {
    requestAction: PropTypes.func.isRequired,
    requestFlags: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    payload: PropTypes.object,
    pageKey: PropTypes.string,
    limit: PropTypes.number,
    loaderView: PropTypes.func,
    errorView: PropTypes.func,
    bottomLoaderView: PropTypes.func,
    bottomErrorView: PropTypes.func,
    ListFooterComponent: PropTypes.func,
    emptyView: PropTypes.func,
    identifier: PropTypes.any,
    sendRequestOnMount: PropTypes.bool,
    showOnly: PropTypes.bool,
    showScrollIndicator: PropTypes.bool,
    url: PropTypes.object,
    contentContainerStyle: ViewPropTypes.style,
    listStyle: ViewPropTypes.style,
    filters: PropTypes.object,
    disableLoadMore: PropTypes.bool,
  };

  static defaultProps = {
    limit: LIMIT,
    loaderView: undefined,
    errorView: undefined,
    bottomLoaderView: undefined,
    bottomErrorView: undefined,
    identifier: undefined,
    sendRequestOnMount: true,
    showOnly: false,
    pageKey: '',
    showScrollIndicator: false,
    payload: {},
    url: undefined,
    emptyView: undefined,
    contentContainerStyle: {},
    listStyle: {},
    filters: {},
    disableLoadMore: false,
  };

  componentDidMount() {
    if (this.props.sendRequestOnMount) {
      this._sendRequestFirstTime();
    }
  }

  componentDidUpdate(prevProps) {
    const { requestFlags, data, filters, payload } = this.props;
    const { failure, errorMessage, loading } = requestFlags;

    // set boolean for first time refresh so do not add view at bottom
    if (!failure && !loading && data.length > 0) {
      this.isFirstTimeRefreshed = true;
    }

    if (failure && data.length > 0) {
      Util.showMessage(errorMessage);
    }

    if (
      Util.compareDeep(prevProps.filters, filters) ||
      Util.compareDeep(prevProps.payload, payload)
    ) {
      //this.totalRecords = 0;
      this._sendRequest(true, false, 1, true);
    }
  }

  isFirstTimeRefreshed = false;
  //totalRecords = 0;
  nextPage = 1;

  _sendRequest = (
    reset = false,
    isPullToRefresh = false,
    nextPage = 1,
    isResetData = false
  ) => {
    const {
      requestAction,
      limit,
      payload,
      identifier,
      showOnly,
      url,
      filters,
    } = this.props;

    if (showOnly) {
      return;
    }
    const requestPayload = { ...payload, ...filters, limit, perPage: limit };

    if (nextPage !== 0) {
      requestPayload.page = nextPage;
    }

    const { dispatch } = DataHandler.getStore();

    if (identifier && url) {
      dispatch(
        requestAction(
          requestPayload,
          reset,
          isPullToRefresh,
          identifier,
          url,
          isResetData
        )
      );
    } else if (identifier) {
      dispatch(
        requestAction(
          requestPayload,
          reset,
          isPullToRefresh,
          identifier,
          isResetData
        )
      );
    } else if (url) {
      dispatch(
        requestAction(requestPayload, reset, isPullToRefresh, url, isResetData)
      );
    } else {
      dispatch(
        requestAction(requestPayload, reset, isPullToRefresh, isResetData)
      );
    }
  };

  _onEndReached = () => {
    const { requestFlags, data, disableLoadMore, limit } = this.props;
    const {
      totalRecords,
      loading,
      lastRecordsLength,
      errorMessage,
    } = requestFlags;
    const dataLength = data.length;

    const recordsFinished = lastRecordsLength < limit;

    const sendRequestOnEnd =
      !loading &&
      !errorMessage &&
      dataLength < totalRecords &&
      this.isFirstTimeRefreshed &&
      disableLoadMore === false &&
      recordsFinished === false;

    if (sendRequestOnEnd) {
      this._sendRequestLoadMore();
    }
  };

  _sendRequestFirstTime = () => {
    this._sendRequest(true);
  };

  _sendRequestLoadMore = () => {
    this._sendRequest(false, false, this.nextPage);
  };

  _onRefresh = () => {
    this._sendRequest(true, true);
  };

  renderApiFooter = () => {
    const { data, requestFlags } = this.props;
    const { loading, isPullToRefresh, failure, reset } = requestFlags;

    const totalRecords = requestFlags.totalRecords || 0;

    /*
    if (requestFlags.totalRecords) {
      this.totalRecords = requestFlags.totalRecords;
    }
    */

    if (requestFlags.nextPage) {
      this.nextPage = requestFlags.nextPage;
    }

    const showBottomLoader =
      loading &&
      !isPullToRefresh &&
      !reset &&
      data.length > 0 &&
      this.isFirstTimeRefreshed;
    const showBottomError =
      !loading &&
      !isPullToRefresh &&
      !reset &&
      data.length > 0 &&
      data.length < totalRecords &&
      failure &&
      this.isFirstTimeRefreshed;

    if (showBottomLoader) {
      return this._renderBottomLoader();
    }
    if (showBottomError) {
      return this._renderBottomError();
    }

    return null;
  };

  _renderListFooterComponent = () => {
    return [this.props.ListFooterComponent?.(), this.renderApiFooter()];
  };

  _renderBottomError = () => {
    const { bottomErrorView, requestFlags } = this.props;
    const { errorMessage } = requestFlags;

    if (bottomErrorView) {
      return bottomErrorView(errorMessage, this._sendRequestLoadMore);
    }

    return (
      <BottomErrorViewApi
        errorMessage={errorMessage}
        onPressRetry={this._sendRequestLoadMore}
      />
    );
  };

  _renderBottomLoader = () => {
    const { bottomLoaderView } = this.props;

    if (bottomLoaderView) {
      return bottomLoaderView();
    }

    return <BottomLoaderViewApi />;
  };

  _renderLoaderView = () => {
    const { loaderView } = this.props;

    if (loaderView) {
      return loaderView();
    }

    return <LoaderViewApi />;
  };

  _renderErrorView = () => {
    const { errorView, requestFlags } = this.props;
    const { errorMessage } = requestFlags;

    if (errorView) {
      return errorView(errorMessage, this._sendRequestFirstTime);
    }

    return (
      <ErrorViewApi
        errorMessage={errorMessage}
        onPressRetry={this._sendRequestFirstTime}
      />
    );
  };

  _renderEmptyView = () => {
    const { emptyView } = this.props;
    if (emptyView) {
      return emptyView();
    }

    return <EmptyViewApi />;
  };

  _renderFlatListComponents() {
    const {
      requestAction,
      requestFlags,
      payload,
      pageKey,
      limit,
      data,
      loaderViewApi,
      showOnly,
      emptyView,
      bottomLoaderView,
      bottomErrorView,
      identifier,
      sendRequestOnMount,
      forwardedRef,
      contentContainerStyle,
      listStyle,
      showScrollIndicator,
      ListFooterComponent,
      filters,
      ...rest
    } = this.props;

    const { loading, failure, isPullToRefresh } = requestFlags;

    const showLoading = loading && !isPullToRefresh && data.length === 0;
    const showError = failure && data.length === 0;
    // const showList = data.length > 0;
    // const listEmpty =
    //   data.length === 0 && loading === false && failure === false;

    if (showLoading) {
      return this._renderLoaderView();
    }

    if (showError) {
      return this._renderErrorView();
    }

    // if (listEmpty) {
    //   return emptyView();
    // }

    // if (showList || listEmpty) {
    return (
      <FlatList
        style={[AppStyles.flex, listStyle]}
        data={data}
        ref={forwardedRef}
        renderItem={this._renderItem}
        onEndReached={this._onEndReached}
        ListFooterComponent={this._renderListFooterComponent}
        refreshing={isPullToRefresh || false}
        onRefresh={this._onRefresh}
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.1}
        extraData={loading}
        ListEmptyComponent={this._renderEmptyView}
        contentContainerStyle={
          !data.length
            ? [AppStyles.flex]
            : [styles.contentContainerStyle, contentContainerStyle]
        }
        showsVerticalScrollIndicator={showScrollIndicator}
        showsHorizontalScrollIndicator={showScrollIndicator}
        {...rest}
      />
    );
    // }
    // return null;
  }

  render() {
    return <React.Fragment>{this._renderFlatListComponents()}</React.Fragment>;
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(28),
  },
});
