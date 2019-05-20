const recordTooltip = function (record) {
  let tooltip = `<div class="betcard">
    <div class="betcard-body">
        <div class="betcard-body__status">
            <div class="betcard-body__status--header"><span>Accepted</span></div>
            <div class="betcard-body__status--value"><span>${record.shortDate}</span></div>
        </div>
        <div class="betcard-body__participant">
            <div class="betcard-body__participant--event"><span>${record.selections[0].matchup.league.name}</span></div>
            <div>
                <div class="betcard-body__participant--record">
                  ${record.selections[0].matchup.participants[0].name} - ${record.selections[0].matchup.participants[1].name}
                </div>
            </div>
        </div>
        <div class="betcard-body__stake">
            <div>
                <div class="betcard-body__status--header"><span>Stake</span></div>
                <div class="betcard-body__status--value"><span>${record.stake}</span></div>
            </div>
        </div>
        <div class="betcard-body__odds">
            <div>
                <div class="betcard-body__status--header"><span>Odds</span></div>
                <div class="betcard-body__status--value"><span>${record.odds}</span></div>
            </div>
        </div>
        <div class="betcard-body__netchange">
            <div>
                <div class="betcard-body__netchange--header"><span>Net change</span></div>
                <div class="betcard-body__netchange--value"><span>${record.winLoss}</span></div>
            </div>
        </div>
    </div>
  </div>`;
  return tooltip;
}

export default recordTooltip;
