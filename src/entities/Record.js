import { DateTime, Interval } from 'luxon';

function Participants (data) {
  let participants = [];
  data.forEach(element => {
    participants.push({
      name: element.name,
      order: element.order,
      alignment: element.alignment,
      state: element.state
    });
  });

  return participants;
}

function Matchup (data) {
  const { league, sport, participants } = data;
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

  this.participants = new Participants(participants);
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

  let selections = [];
  data.selections.forEach(element => {
    selections.push(new Selection(element));
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

Object.defineProperty(Record.prototype, 'unixDate', {
  get () {
    return DateTime.fromISO(this.createdAt).toMillis();
  }
});

Object.defineProperty(Record.prototype, 'odds', {
  get () {
    return (this.toWin / this.stake).toFixed(2);
  }
});

export default Record;
