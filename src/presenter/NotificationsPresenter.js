import _ from 'lodash';

class NotificationPresenter {
  getID(data) {
    return !_.isEmpty(data) && data.id ? data.id : '';
  }
  getBody(data) {
    return !_.isEmpty(data) && data.body ? data.body : '';
  }
  getTime(data) {
    return !_.isEmpty(data) && data.createdAt ? data.createdAt : Date.now();
  }
  getIdentifier(data) {
    return !_.isEmpty(data) && data.target_identifier
      ? data.target_identifier
      : '';
  }
  getActorImage(data) {
    return !_.isEmpty(data) && data.actor?.attachment?.url
      ? {uri: data.actor.attachment.url}
      : '';
  }
  getReferenceID(data) {
    return !_.isEmpty(data) && data.reference_id ? data.reference_id : '';
  }
  getIsRead(data) {
    return !_.isEmpty(data) && data.read == 1 ? true : false;
  }
}

export default new NotificationPresenter();
