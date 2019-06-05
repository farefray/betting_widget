import Providers from './Providers';
import { rejects } from 'assert';

function ProviderModel () {
  this.provider = Providers.detect(window.location.hostname);
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
  return new Promise((resolve, reject) => {
    if (!dateRange.start || !dateRange.end) {
      return reject(new Error('You need to select date range first.'));
    }

    this.provider.request(dateRange).then((bets) => {
      resolve(bets);
    });
  });
};

ProviderModel.getProvidersLinks = function () {
  return Providers.getLinks();
};

ProviderModel.isProvider = function () {
  return Providers.detect(window.location.hostname);
};

export default ProviderModel;
