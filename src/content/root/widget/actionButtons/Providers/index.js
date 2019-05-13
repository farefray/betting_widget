
const supportedProviders = [
  {
    hostname: 'future.pinnacle.com',
    request: function (dateRange) {
      return new Promise((resolve, reject) => {
        // Grab tokens from local storage to use with our requests
        let pinnacleUserAuth = localStorage['Main:User'];
        if (!pinnacleUserAuth) {
          return reject(new Error('Session is invalid or has expired'));
        };

        pinnacleUserAuth = JSON.parse(pinnacleUserAuth);
        const startDate = dateRange.start.toISODate();
        const endDate = dateRange.end.toISODate();
        fetch(
          `https://api.arcadia.pinnacle.com/0.1/bets?status=settled&startDate=${startDate}&endDate=${endDate}`,
          {
            credentials: 'omit',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'x-api-key': 'CmX2KcMrXuFmNg6YFbmTxE0y9CIrOi0R', // TODO get from somewhere
              'x-device-uuid': pinnacleUserAuth.uuid,
              'x-session': pinnacleUserAuth.token
            },
            referrer: 'https://future.pinnacle.com/en/account/bets/history/',
            referrerPolicy: 'no-referrer-when-downgrade',
            body: null,
            method: 'GET',
            mode: 'cors'
          }
        )
          .then((response) => {
            return response.json()
          })
          .then((responseJSON) => {
            const NO_AUTH_CODE = 401;
            if (responseJSON.status && responseJSON.status === NO_AUTH_CODE) {
              return reject(responseJSON.detail);
            }

            return resolve(responseJSON);
          })
      });
    }
  }
]

let Providers = {};
Providers.detect = function (hostname) {
  let detectedProvider = null;
  supportedProviders.some(function (provider) {
    if (provider.hostname === hostname) {
      detectedProvider = provider;
      return true;
    }

    return false;
  });

  return detectedProvider;
}

export default Providers;
