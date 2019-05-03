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
  this.startTime = new Date(data.startTime);
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
  this.createdAt = new Date(data.createdAt);
  this.outcome = data.outcome;
  this.price = parseInt(data.price);
  this.settledAt = new Date(data.settledAt);
  this.stake = data.stake;
  this.toWin = data.toWin;
  this.winLoss = data.winLoss;

  let selections = new Set();
  data.selections.forEach(element => {
    selections.add(new Selection(element));
  });

  this.selections = selections;
}

export default Record;
