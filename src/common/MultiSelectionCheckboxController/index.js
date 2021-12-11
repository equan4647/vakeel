import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React from 'react';

import { MultiSelectionCheckbox } from '../../common';

const MultiSelectionCheckboxController = props => {
  // get value from props
  const {
    title,
    data,
    defaultValue,
    idKey,
    titleKey,
    componentProps,
    ...rest
  } = props;

  return (
    <Controller
      render={({ onChange, value }) => (
        <MultiSelectionCheckbox
          {...{ title, data, value, ...componentProps }}
          onSelectionChange={onChange}
        />
      )}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

MultiSelectionCheckboxController.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  defaultValue: PropTypes.array,
  idKey: PropTypes.string,
  titleKey: PropTypes.string,
  componentProps: PropTypes.object,
};
MultiSelectionCheckboxController.defaultProps = {
  title: '',
  data: [],
  defaultValue: [],
  idKey: 'id',
  titleKey: 'title',
};

export default MultiSelectionCheckboxController;
