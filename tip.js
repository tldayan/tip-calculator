
"use strict"

  document.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT') {
      event.preventDefault();
    }
  });


let billFeild = document.querySelector(`.bill_amount_feild`)
let billFeildNotice = document.querySelector(`.bill_string_notice`)
let personFeild = document.querySelector(`.number_of_people_feild`)
let personFeildNotice = document.querySelector(`.person_string_notice`)
let tipAmountElement = document.querySelector(`.tip_amount`)
let totalAmountElement = document.querySelector(`.total_amount`)
let customPercentFeild = document.querySelector(`.custom_tip_feild`)
let resetButton = document.querySelector(`.reset_btn`)
let tips = document.querySelectorAll(`.tip`) 
let totalAmount = null
let tipAmount = null
let selectedButton = null
let tipPercent = null


tips.forEach(tip => {
    tip.onclick = function() {

      if (tip.classList.contains(`custom_tip_feild`)) {
        
        tip.addEventListener("input", function(){

          tipPercent = tip.value / 100
          calculateTipAmount()

        })

      }

      tipPercent = tip.innerHTML.split("%")[0] / 100
      
      calculateTipAmount()
        if(selectedButton) {
            selectedButton.classList.remove(`selected`)
        }

        tip.classList.add(`selected`)

        selectedButton = tip

    }

})


function calculateTotalAmount() {
  if (billFeild.value && personFeild.value) {
    totalAmount = billFeild.value / personFeild.value
    totalAmountElement.innerHTML = `$${totalAmount.toFixed(2)}`
  }
}

function calculateTipAmount() {

  tipAmount = totalAmount * tipPercent

  tipAmountElement.innerHTML = `$${tipAmount.toFixed(2)}`

}

billFeild.addEventListener("input", function() {

  if (isNaN(parseInt(billFeild.value)) && billFeild.value !== ``) {
    billFeildNotice.classList.add(`alert`)
    billFeild.classList.add(`wiggle`);
    billFeild.value = ``;
  
    setTimeout(() => {
      billFeild.classList.remove(`wiggle`);
      billFeildNotice.classList.remove(`alert`)
    }, 500);
  }
  


  calculateTotalAmount()
  calculateTipAmount()
})

personFeild.addEventListener("input", function() {

  if (isNaN(parseInt(personFeild.value)) && personFeild.value !== ``) {
    personFeildNotice.classList.add(`alert`)
    personFeild.classList.add(`wiggle`);
    personFeild.value = ``;


    setTimeout(() => {
      personFeild.classList.remove(`wiggle`);
      personFeildNotice.classList.remove(`alert`)
    }, 500);
  }

  calculateTotalAmount()
  calculateTipAmount()
})


customPercentFeild.addEventListener("input", function(){

  if (isNaN(parseInt(customPercentFeild.value))) {
    customPercentFeild.value = ``
    customPercentFeild.classList.add(`wiggle`)


    setTimeout(() => {
      customPercentFeild.classList.remove(`wiggle`);
    }, 500);

  }

})


resetButton.onclick = function() {
  selectedButton.classList.remove(`selected`)
  tipAmount = null
  totalAmount = null
  totalAmountElement.innerHTML = `$0.00`
  tipAmountElement.innerHTML = `$0.00`
  billFeild.value = ``
  personFeild.value = ``
  customPercentFeild.value = ``
}











