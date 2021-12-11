import React, { useState } from 'react';

import { Editor } from '../../components';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';

const TopicEditor = ({ navigation }) => {
  const [value, setValue] = useState('');
  const onValueChanged = text => setValue(text);

  const onSubmit = () => {
    NavigationService.reset('TopicSuccess');
  };

  const submitButtonProps = {
    disabled: value === '',
  };

  NavigationService.setRightHeader(
    navigation,
    strings('app.topic_content'),
    strings('app.submit'),
    onSubmit,
    submitButtonProps,
    [value]
  );

  return <Editor {...{ onValueChanged, value }} />;
};

export default TopicEditor;
