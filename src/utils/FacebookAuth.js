import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

class FacebookAuth {
  getInfoFromToken = (token, onSuccess) => {
    const parameters = {
      fields: { string: 'id, picture, first_name, last_name, email' },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters },
      (err, result) => {
        if (err) {
          console.log('login info err', err);
        } else {
          onSuccess?.(result);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  login(onSuccess) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            this.getInfoFromToken(data.accessToken, onSuccess);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      }
    );
  }
}

export default new FacebookAuth();
