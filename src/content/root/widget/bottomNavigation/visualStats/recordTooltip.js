const recordTooltip = function (record) {
  let tooltip = `<v-card
  class="mx-auto"
  color="#26c6da"
  dark
  max-width="400"
><div class="betcard">
    <div class="betcard-body">
        <div class="betcard-body__header">
            <div class="betcard-body__participant--league"><span>${record.selections[0].matchup.league.name}</span></div>
        </div>
        <div class="betcard-body__top">
            <div class="betcard-body__top--date"><span>${record.shortDate}</span></div>
            <div class="betcard-body__top--status"><span>${record.outcome}</span></div>
        </div>
        <div class="betcard-body__participant">
            <div>
                <div class="betcard-body__participant--record">
                <span>
                ${record.selections[0].matchup.participants[0].name}
                </span> - <span>${record.selections[0].matchup.participants[1].name}</span>
                </div>
            </div>
        </div>
        <div class="betcard-body__bottom">
            <div class="betcard-body__bottom--stake">
                <div class="betcard-body__bottom--header"><span>Stake</span></div>
                <div class="betcard-body__bottom--value"><span>${record.stake}</span></div>
            </div>
            <div class="betcard-body__bottom--odds">
                <div class="betcard-body__bottom--header"><span>Odds</span></div>
                <div class="betcard-body__bottom--value"><span>${record.odds}</span></div>
            </div>
            <div class="betcard-body__bottom--odds">
                <div class="betcard-body__netchange--header"><span>Change</span></div>
                <div class="betcard-body__netchange--value"><span>${record.winLoss}</span></div>
            </div>
        </div>
    </div>
  </div>`;
  return tooltip;
};

export default recordTooltip;
