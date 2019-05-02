// Functions
const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

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
    return true
  }
}

const addItem = item => {
  const newItem = {
    description: item.get('description'),
    calories: parseInt(item.get('calories'), 10),
    carbs: parseInt(item.get('carbs'), 10),
    protein: parseInt(item.get('protein'), 10)
  }
  list.push(newItem)
  cleanInputs() // Clean form
  updateTotals()
  renderItems() // Render table rows
}

const removeItem = (index) => {
  list.splice(index, 1)
  updateTotals()
  renderItems()
}

const updateTotals = () => {
  let calories = 0, carbs = 0, protein = 0

  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })
  $totalCalories.textContent = calories
  $totalCarbs.textContent = carbs
  $totalProtein.textContent = protein

}

const cleanInputs = () => {
  $form.reset()
  description.focus()
}

const attrsToString = (obj = {}) => 
  Object.keys(obj).map((attr) => `${attr}="${obj[attr]}"`).join(' ')

const tagAttrs = obj => (content = "") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => typeof t === 'string'? tagAttrs({tag: t}) : tagAttrs(t)

const trashIcon = tag({
  tag: 'i',
  attrs: {
    class: 'fa fa-trash-alt'
  }
})('')

const renderItems = () => {
  $tableBody.innerHTML = '' // Empty
  // Create rows and columns with button remove
  list.map((item, index) => {
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        'data-item': index
      }
    })(trashIcon)
    $tableBody.innerHTML += tableRow([item.description, item.calories, item.carbs, item.protein, removeButton])
    const $removeButtons = document.querySelectorAll(`button[data-item]`)
    $removeButtons.forEach((item, index) => 
      item.addEventListener('click', () => removeItem(index), false)
    )
  })
}

const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')


// Define Web Elements
const description = document.querySelector('input[name="description"]')
const calories = document.querySelector('input[name="calories"]')
const carbs = document.querySelector('input[name="carbs"]')
const protein = document.querySelector('input[name="protein"]')

const $totalCalories = document.getElementById('totalCalories')
const $totalCarbs = document.getElementById('totalCarbs')
const $totalProtein = document.getElementById('totalProtein')

const $form = document.getElementById('form')
const $tableBody = document.querySelector('tbody')


// List

let list = []

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
  validateInputs(data)? addItem(data) : ''
})