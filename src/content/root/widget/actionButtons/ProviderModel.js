import Providers from './Providers';

function ProviderModel (hostname) {
  this.provider = Providers.detect(hostname);
  return this;
}

ProviderModel.prototype = {
  get provider () {
    return this._provider;
  },
  set provider (provider) {
    this._provider = provider
  }
}

ProviderModel.prototype.hasProvider = function () {
  return !!this.provider;
};

ProviderModel.prototype.requestBets = function (dateRange) {
  return new Promise((resolve) => {
    this.provider.request(dateRange).then((bets) => {
      resolve(bets);
    });
  });
};

ProviderModel.getProvidersLinks = function () {
  return Providers.getLinks();
};

export default ProviderModel;
