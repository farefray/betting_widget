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

export default ProviderModel;
