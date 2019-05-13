import Bin from '@modules/Bin';
import Record from '@entities/Record.js';

const LocalBetStorage = function () {
  return this;
};

LocalBetStorage.set = function (data) {
  const betsBin = new Bin('LocalBetStorage');
  betsBin.set(data);
}

LocalBetStorage.get = function (dateRange) {
  return new Promise((resolve, reject) => {
    new Bin('LocalBetStorage').get().then((bets) => {
      if (bets && bets.length) {
        let records = [];
        bets.forEach(element => {
          const record = new Record(element);
          if (!dateRange || record.isInRange(dateRange)) {
            records.push(record);
          }
        });

        records = records.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });

        return resolve(records)
      }

      reject(new Error('No records stored yet. Please, load records from bets provider.'));
    });
  });
}

export default LocalBetStorage;
