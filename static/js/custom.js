/**
 * https://fr.wikipedia.org/wiki/Mensualit%C3%A9#Calcul_formel
 * interest_rate, e.g. 0.05 for 5%
 */
function compute_monthly_payments(borrowed_capital, loan_duration, interest_rate) {
  //  (92000*0.017/12)/(1-(1/(pow((1+0.017/12), 15*12))))
  monthly_payments =
    (borrowed_capital * interest_rate / 12)
    /
    (1 - (1 / (Math.pow((1 + (interest_rate / 12)), loan_duration * 12))));
  return monthly_payments;
}

function compute_loan_cost(borrowed_capital, loan_duration, monthly_payments) {
  var loan_cost = (loan_duration * monthly_payments * 12) - borrowed_capital;
  return loan_cost;
}

function update_result(monthly_payments, loan_cost) {
  var monthly_payments_rounded = monthly_payments.toFixed(2);
  var loan_cost_rounded = loan_cost.toFixed(0);
  $("#monthly-payments").html(monthly_payments_rounded + "&euro;");
  $("#loan-cost").html(loan_cost_rounded + "&euro;");
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


$(function() {
  bind_events();
});
