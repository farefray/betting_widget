import { DateTime, Interval } from 'luxon';

function Participants (data) {
  let participants = new Set();
  data.forEach(element => {
    participants.add({
      name: element.name,
      order: element.order,
      alignment: element.alignment
    });
  });
}

function Matchup (data) {
  const { league, sport } = data;
  this.isLive = data.isLive;
  this.startTime = data.startTime;
  this.league = {
    name: league.name,
    group: league.group
  };

  if (sport) {
    this.sport = {
      name: sport.name
    };
  }

  this.participants = new Participants(data.participants);
}

function Selection (data) {
  this.price = data.price;
  this.outcome = data.outcome;
  this.matchup = new Matchup(data.matchup);
}

function Record (data) {
  this.id = data.id;
  this.createdAt = data.createdAt;
  this.outcome = data.outcome;
  this.price = parseInt(data.price);
  this.settledAt = data.settledAt;
  this.stake = data.stake;
  this.toWin = data.toWin;
  this.winLoss = data.winLoss;

  let selections = new Set();
  data.selections.forEach(element => {
    selections.add(new Selection(element));
  });

  this.selections = selections;
}

Record.prototype.isInRange = function (dateRange) {
  if (!dateRange || !dateRange.start || !dateRange.end) {
    return false;
  }

  return Interval.fromDateTimes(dateRange.start, dateRange.end).contains(this.date);
}

Object.defineProperty(Record.prototype, 'date', {
  get () {
    return DateTime.fromISO(this.createdAt);
  }
});

Object.defineProperty(Record.prototype, 'shortDate', {
  get () {
    return DateTime.fromISO(this.createdAt).toFormat('DDD T:mm');
  }
});

export default Record;
