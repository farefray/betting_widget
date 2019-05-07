import Bin from '@modules/Bin';
import Record from '@entities/Record.js';

const LocalBetStorage = function () {
  return this;
};

LocalBetStorage.set = function (data) {
  const betsBin = new Bin('LocalBetStorage');
  betsBin.set(data);
}

LocalBetStorage.get = function () {
  return new Promise((resolve, reject) => {
    new Bin('LocalBetStorage').get().then((bets) => {
      if (bets && bets.length) {
        let records = [];
        bets.forEach(element => {
          records.push(new Record(element));
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
