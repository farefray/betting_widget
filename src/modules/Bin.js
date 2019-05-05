/**
 * Create the storage constructor
 * @param {String}  id      The storage ID
 */
const Bin = function (id) {
  if (!id) {
    throw new Error('Please provide an ID for your Bin.');
  }

  this.id = id;
  return this;
};

/**
 * Save data to storage with a timestamp
 * @param {Object|Array|String|Number} data The data to save
 */
Bin.prototype.set = function (data) {
  chrome.storage.local.set({
    [this.id]: JSON.stringify(data)
  }, () => {
    console.log('Value is set to ' + this.id + ':' + JSON.stringify(data));
  });
}

/**
 * Get data from storage
 * @param {Object|Array|String|Number}  fallback A fallback value to return if no data is found [optional]
 * @return {Object|Array|String|Number}          The saved data
 */
Bin.prototype.get = function (fallback) {
  return new Promise((resolve) => {
    console.log('Requesting bin ID: ' + this.id);
    chrome.storage.local.get(this.id, (data) => {
      console.log('Value currently is:');
      console.log(data);
      data = (data && data[this.id]) || null;
      if (!data) {
        return resolve(fallback || {});
      }

      return resolve(JSON.parse(data));
    });
  });
};

export default Bin;
