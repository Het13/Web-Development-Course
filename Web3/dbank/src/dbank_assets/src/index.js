import { dbank } from "../../declarations/dbank"

window.addEventListener("load", async () => {
  update();
})

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = document.querySelector("#submit-btn");
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-value").value.length != 0) {
    await dbank.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value, length != 0) {
    await dbank.withdraw(outputAmount);
  }

  await dbank.compound();

  update()

  document.getElementById("input-amount").value = "";
  button.removeAttribute("disabled");

})

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}