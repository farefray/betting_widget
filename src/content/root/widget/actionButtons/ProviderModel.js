import Providers from './Providers';

function ProviderModel (hostname) {
  this.provider = Providers.detect(hostname);
  return this;
}

ProviderModel.prototype.hasProvider = function () {
  return !!this.provider;
};

export default ProviderModel;
