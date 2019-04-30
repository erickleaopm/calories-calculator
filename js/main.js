// Define Web Elements
const description = document.querySelector('input[name="description"]')
const calories = document.querySelector('input[name="calories"]')
const carbs = document.querySelector('input[name="carbs"]')
const protein = document.querySelector('input[name="protein"]')

const $form = document.getElementById('form')

// Event Listeners
description.addEventListener('keydown', () => {
  description.classList.remove('is-invalid')
})
calories.addEventListener('keydown', () => {
  calories.classList.remove('is-invalid')
})
carbs.addEventListener('keydown', () => {
  carbs.classList.remove('is-invalid')
})
protein.addEventListener('keydown', () => {
  protein.classList.remove('is-invalid')
})

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData($form)
  validateInputs(data)
})


// Functions
const validateInputs = (data) => {
  data.get('description') ? '' : description.classList.add('is-invalid')
  data.get('calories') ? '' : calories.classList.add('is-invalid')
  data.get('carbs') ? '' : carbs.classList.add('is-invalid')
  data.get('protein') ? '' : protein.classList.add('is-invalid')

  if(
    data.get('description') &&
    data.get('calories') &&
    data.get('carbs') &&
    data.get('protein')
  ) {
    console.log('OK!')
  }
}

const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)
