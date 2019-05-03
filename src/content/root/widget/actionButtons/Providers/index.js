const supportedProviders = [
  {
    hostname: 'future.pinnacle.com'
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
