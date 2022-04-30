const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  var choice;
  const amount = document.getElementById("amount").value;
  const choiceArray = document.getElementsByName("installment");
  for (let i = 0; i < choiceArray.length; i++) {
    if (choiceArray[i].checked) {
      choice = choiceArray[i].value;
      break;
    }
  }
  const { time, installmentAmount } = formulatePayment(choice, amount);
  //   console.log(time, installmentAmount);

  const result = document.getElementById("result");
  result.innerHTML = `<div>
  <h4>Installment Detail</h4>
  User choosed ${choice} installment method for  $${amount}.
  </div>`;
  result.innerHTML += `<div>In sum, user will be paid $${installmentAmount} for ${time} ${
    choice === "weekly" ? "weeks" : "months"
  }.</div>`;
  form.reset();
});

const formulatePayment = (choice, amount) => {
  //console.log
  console.log(`User choosed ${choice} installment method for amount ${amount}`);

  //initial payment amount during signin
  const initialPayment = ((10 / 100) * amount).toFixed();
  console.log("inital payment:", initialPayment);

  //remaining amount after payment of sigin amount
  const remainingTotal = amount - initialPayment;
  console.log("remaining amount:", remainingTotal);

  if (choice == "weekly") {
    let weeklyAmountPayment = 0;
    let weekly = 0;

    do {
      weeklyAmountPayment = weeklyAmountPayment + 50;
      let weeks = remainingTotal / weeklyAmountPayment;
      if (weeks % 50 !== 0) {
        weekly = Math.ceil(weeks);
      }
    } while (weekly > 156);

    //output console.log
    console.log(`You will be paid ${weeklyAmountPayment} for ${weekly} weeks.`);
    return { time: weekly, installmentAmount: weeklyAmountPayment };
  } else if (choice == "monthly") {
    let monthlyAmountPayment = 0;
    let monthly = 0;
    do {
      monthlyAmountPayment = monthlyAmountPayment + 100;
      let months = remainingTotal / monthlyAmountPayment;
      if (months % 100 !== 0) {
        monthly = Math.ceil(months);
      }
    } while (monthly > 36);

    console.log(
      `You will be paid ${monthlyAmountPayment} for ${monthly} months.`
    );
    return { time: monthly, installmentAmount: monthlyAmountPayment };
  } else {
    return null;
  }
};
