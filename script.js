const STORE = {
  tipTotal: 0,
  mealCount: 0
}

function generateCustCharges(subtotal,tip,total) {
  console.log('generateCustCharges ran!');
  return `<h2>Customer Charges</h2>
          <p>Subtotal: ${subtotal}</p>
          <p>Tip: ${tip}</p>
          <br>
          <p>Total: ${total}</p>`;
}

function generateEarningsInfo(tipPerMeal) {
  console.log('generateEarningsInfo ran!');
  return `<h2>My Earnings Info</h2>
          <p>Tip Total: ${STORE.tipTotal}</p>
          <p>Meal Count: ${STORE.mealCount}</p>
          <p>Average Tip Per Meal: ${tipPerMeal}</p>
          <button type="button" id="resetEverything">Reset</button>`;
}

function calculateCharges(baseMealPrice,taxRate,tipPercent) {
  console.log('calculateCharges ran!');
  const subtotal = baseMealPrice * taxRate + baseMealPrice,
    tip = tipPercent * baseMealPrice,
    total = subtotal + tip;
    STORE.tipTotal += tip;
  return [subtotal, tip, total];
}

function renderCustCharges(baseMealPrice,taxRate,tipPercent) {
  console.log('renderCustCharges ran!');
  const html = generateCustCharges(...calculateCharges(baseMealPrice,taxRate,tipPercent));
  $('#custCharges').html(html);
}

function renderEarningsInfo() {
  console.log('renderEarningsInfo ran!');
  const tipTotal = STORE.tipTotal,
    mealCount = STORE.mealCount,
    tipPerMeal = tipTotal / mealCount,
    html = generateEarningsInfo(tipTotal,mealCount,tipPerMeal);
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

function handleResetEverything() {
  $('#resetEverything').on('click', event => {
    event.preventDefault();
    STORE.tipTotal = 0;
    STORE.mealCount = 0;
    renderCustCharges(0,0,0);
    renderEarningsInfo();
  });
}

function appHandlers() {
  handleSubmitMealDetails();
  handleResetEverything();
}

$(appHandlers);

