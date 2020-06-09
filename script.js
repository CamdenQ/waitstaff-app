const STORE = {
  tipTotal: 0,
  mealCount: 0
};

function generateCustCharges(subtotal,tip,total) {
  console.log('generateCustCharges ran!');
  return `<h2>Customer Charges</h2>
          <p>Subtotal: $${subtotal}</p>
          <p>Tip: $${tip}</p>
          <hr class="line"> 
          <p>Total: $${Number(total.toFixed(2))}</p>`;
}

function generateEarningsInfo(tipPerMeal) {
  console.log('generateEarningsInfo ran!');
  return `<h2>My Earnings Info</h2>
          <p>Tip Total: $${Number(STORE.tipTotal.toFixed(2))}</p>
          <p>Meal Count: ${Number(STORE.mealCount.toFixed(2))}</p>
          <p>Average Tip Per Meal: $${tipPerMeal}</p>
          <form id="resetForm">
            <fieldset>
              <button type="submit" id="resetEverything">Reset</button>
            </fieldset>
          </form>`;
}

function calculateCharges(baseMealPrice,taxRate,tipPercent) {
  console.log('calculateCharges ran!');
  let subtotal = baseMealPrice * taxRate + baseMealPrice,
    tip = tipPercent * baseMealPrice;

  subtotal = Number(subtotal.toFixed(2));
  tip = Number(tip.toFixed(2));

  const total = subtotal + tip;

  STORE.tipTotal += Number(tip.toFixed(2));

  return [subtotal, tip, total];
}

function renderCustCharges(baseMealPrice,taxRate,tipPercent) {
  console.log('renderCustCharges ran!');
  const calculatedCarges = calculateCharges(baseMealPrice,taxRate,tipPercent),
    html = generateCustCharges(...calculatedCarges);
  $('#custCharges').html(html);
}

function calculateEarningsInfo() {
  const tipTotal = STORE.tipTotal,
    mealCount = STORE.mealCount,
    tipPerMeal = tipTotal / mealCount;
  return Number(tipPerMeal.toFixed(2));
}

function renderEarningsInfo() {
  console.log('renderEarningsInfo ran!');
  const calculatedEarnings = calculateEarningsInfo(),
    html = generateEarningsInfo(calculatedEarnings);
  $('#earningsInfo').html(html);
}

function handleSubmitMealDetails() {
  console.log('handleSubmitMealDetails ran!');
  $('#mealDetails').on('submit', event => {
    console.log('submit handler ran!');
    event.preventDefault();
    const baseMealPrice = Number($('#basePrice').val()),
      taxRate = Number($('#taxRate').val())/100,
      tipPercent = Number($('#tipPercent').val())/100;
    STORE.mealCount++;
    renderCustCharges(baseMealPrice,taxRate,tipPercent);
    renderEarningsInfo();
  });
}
function resetEverything() {
  STORE.tipTotal = 0;
  STORE.mealCount = 0;
  console.log(STORE.tipTotal);
  console.log(STORE.mealCount);
  renderCustCharges(0,0,0);
  renderEarningsInfo();
}

function handleResetEverything() {
  $('#resetForm').on('submit', resetEverything());
}

function appHandlers() {
  handleSubmitMealDetails();
  handleResetEverything();
}

$(appHandlers);

