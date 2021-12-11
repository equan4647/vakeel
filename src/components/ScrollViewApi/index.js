// @flow
import { ScrollView, RefreshControl, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { LoaderViewApi, ErrorViewApi, EmptyViewApi } from '..';
import { AppStyles, Colors } from '../../theme';
import { Util, DataHandler } from '../../utils';

export default class ScrollViewApi extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    customStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    requestAction: PropTypes.func.isRequired,
    requestFlags: PropTypes.object.isRequired,
    data: PropTypes.any,
    payload: PropTypes.object,
    content: PropTypes.func.isRequired,
    emptyView: PropTypes.func,
    isRefreshControlEnable: PropTypes.bool,
    loaderView: PropTypes.func,
    errorView: PropTypes.func,
    dynamicAction: PropTypes.any,
    url: PropTypes.any,
    isContentOnly: PropTypes.bool,
    customPullToRefresh: PropTypes.bool,
    checkDataEmpty: PropTypes.bool,
    emptyMessage: PropTypes.string,
  };

  static defaultProps = {
    customStyle: {},
    loaderView: undefined,
    errorView: undefined,
    emptyView: undefined,
    isRefreshControlEnable: true,
    url: undefined,
    isContentOnly: false,
    dynamicAction: undefined,
    customPullToRefresh: false,
    contentContainerStyle: {},
    checkDataEmpty: false,
    payload: {},
    emptyMessage: '',
  };

  isFirstTimeRefreshed = false;

  //state = { payload: this.props.payload };

  componentDidMount() {
    const { checkDataEmpty, data } = this.props;
    if (checkDataEmpty && Util.isNotEmpty(data)) {
    } else {
      this.sendRequestFirstTime();
    }
  }

  componentDidUpdate(prevProps) {
    const { requestFlags, payload } = this.props;
    const { failure, loading } = requestFlags;

    // set boolean for first time refresh so do not add view at bottom
    if (!failure && !loading) {
      this.isFirstTimeRefreshed = true;
    }

    if (failure) {
      // alert
    }
    if (Util.compareDeep(prevProps.payload, payload)) {
      this.sendRequest(false, true);
    }
  }

  /*
  setPayLoadAndSendRequest = payload => {
    this.isFirstTimeRefreshed = true;
    this.state.payload = payload;
    this.sendRequest(false, true);
  };
  */

  sendRequest = (isPullToRefresh = false, isResetData = false) => {
    //const { payload } = this.state;
    const {
      requestAction,
      url,
      identifier,
      dynamicAction,
      payload,
    } = this.props;

    const { dispatch } = DataHandler.getStore();
    if (url && identifier && dynamicAction) {
      dispatch(
        requestAction(
          payload,
          isPullToRefresh,
          url,
          identifier,
          dynamicAction,
          isResetData
        )
      );
    } else if (url && identifier) {
      dispatch(
        requestAction(payload, isPullToRefresh, url, identifier, isResetData)
      );
    } else if (identifier) {
      dispatch(
        requestAction(payload, isPullToRefresh, identifier, isResetData)
      );
    } else {
      dispatch(requestAction(payload, isPullToRefresh, isResetData));
    }
  };

  sendRequestFirstTime = () => {
    this.sendRequest(false, true);
  };

  onRefresh = () => {
    this.sendRequest(true);
  };

  renderLoaderView = () => {
    const { loaderView, customStyle } = this.props;

    if (loaderView) {
      return loaderView();
    }

    return <LoaderViewApi style={customStyle} />;
  };

  renderErrorView = () => {
    const { errorView, requestFlags, customStyle } = this.props;
    const { errorMessage } = requestFlags;

    if (errorView) {
      return errorView(errorMessage, this.sendRequestFirstTime);
    }

    return (
      <ErrorViewApi
        errorMessage={errorMessage}
        onPressRetry={this.sendRequestFirstTime}
        style={customStyle}
      />
    );
  };

  renderEmptyView = () => {
    const { emptyView, customStyle, emptyMessage } = this.props;
    if (emptyView) {
      return emptyView();
    }

    return <EmptyViewApi style={customStyle} emptyMessage={emptyMessage} />;
  };

  render() {
    const {
      requestFlags,
      data,
      content,
      isRefreshControlEnable,
      style,
      isContentOnly,
      customStyle,
      contentContainerStyle,
    } = this.props;
    const { loading, failure, isPullToRefresh } = requestFlags;

    const objectIsEmpty = Util.isEmpty(data);
    const showLoading = loading && objectIsEmpty;
    const showError = failure && objectIsEmpty;
    const showContent = !objectIsEmpty;
    //const dataEmpty = this.isFirstTimeRefreshed && objectIsEmpty;
    const dataEmpty = objectIsEmpty;

    //return this.renderEmptyView();
    //return this.renderErrorView();
    //return this.renderLoaderView();

    if (showLoading) {
      return this.renderLoaderView();
    }

    if (showError) {
      return this.renderErrorView();
    }

    if (dataEmpty) {
      return this.renderEmptyView();
    }

    if (showContent) {
      if (isContentOnly) {
        return (
          <View style={[AppStyles.flex, style, customStyle]}>
            {content(data)}
          </View>
        );
      }
      const refreshControl = isRefreshControlEnable ? (
        <RefreshControl
          refreshing={isPullToRefresh}
          onRefresh={this.onRefresh}
          tintColor={Colors.primary}
          colors={[Colors.primary]}
        />
      ) : null;
      return (
        <ScrollView
          style={[AppStyles.flex, style, customStyle]}
          refreshControl={refreshControl}
          contentContainerStyle={contentContainerStyle}
        >
          {content(data)}
        </ScrollView>
      );
    }
    return null;
  }
}
