/**
 * https://fr.wikipedia.org/wiki/Mensualit%C3%A9#Calcul_formel
 * interest_rate, e.g. 0.05 for 5%
 */
function compute_monthly_payments(borrowed_capital, loan_duration, interest_rate) {
  //  (92000*0.017/12)/(1-(1/(pow((1+0.017/12), 15*12))))
  var monthly_payments =
    (borrowed_capital * interest_rate / 12)
    /
    (1 - (1 / (Math.pow((1 + (interest_rate / 12)), loan_duration * 12))));
  var monthly_payments_rounded = parseFloat(monthly_payments.toFixed(2));
  return monthly_payments_rounded;
}

/**
 * Computes the rounded cost of the loan.
 */
function compute_loan_cost(borrowed_capital, loan_duration, monthly_payments) {
  var loan_cost = (loan_duration * monthly_payments * 12) - borrowed_capital;
  var loan_cost_rounded = parseInt(loan_cost.toFixed(0), 10);
  return loan_cost_rounded;
}

function update_result(monthly_payments, loan_cost) {
  var monthly_payments_string = monthly_payments.toLocaleString() + "&euro;";
  var loan_cost_string = loan_cost.toLocaleString() + "&euro;";
  $("#monthly-payments").html(monthly_payments_string);
  $("#loan-cost").html(loan_cost_string);
}

function on_form_updated() {
  var borrowed_capital = parseInt($("#borrowed-capital").val(), 10);
  var loan_duration = parseInt($("#loan-duration").val(), 10);
  var interest_rate_percent = parseFloat($("#interest-rate").val(), 10);
  var interest_rate = (interest_rate_percent / 100);
  var monthly_payments = compute_monthly_payments(
    borrowed_capital,
    loan_duration,
    interest_rate
  );
  var loan_cost = compute_loan_cost(borrowed_capital, loan_duration, monthly_payments);
  update_result(monthly_payments, loan_cost);
}

function bind_events() {
  $( "#calculator_form input" ).change(function() {
    on_form_updated();
  });
}

/**
 * Adds default input values.
 * Let JavaScript picks up the correct floating point separator '.' or ','
 * depending on browser locale settings.
 */
function load_input_defaults()
{
  $("#borrowed-capital").val(100000);
  $("#loan-duration").val(15);
  // picks-up the correct separator '.' or ',' depending on browser locale settings
  $("#interest-rate").val(2.5);
}

$(function() {
  bind_events();
  load_input_defaults();
  // forces the first computation with default values
  on_form_updated();
});
