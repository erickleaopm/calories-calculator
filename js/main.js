// Functions
const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const validateInputs = (data) => {
  properties.map(property => 
    data.get(property.name) ? '' : property.classList.add('is-invalid')
  )

  return properties.every(property => data.get(property.name))

}

const addItem = item => {
  const newItem = {
    description: item.get('description'),
    quantity: parseInt(item.get('quantity'), 10),
    calories: parseInt(item.get('quantity'), 10) * parseInt(item.get('calories'), 10),
    carbs: parseInt(item.get('quantity'), 10) * parseInt(item.get('carbs'), 10),
    protein: parseInt(item.get('quantity'), 10) * parseInt(item.get('protein'), 10),
    unitCalories: parseInt(item.get('calories'), 10),
    unitCarbs: parseInt(item.get('carbs'), 10),
    unitProtein: parseInt(item.get('protein'), 10)
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
    $tableBody.innerHTML += tableRow([item.description, item.quantity, item.unitCalories, item.calories, item.unitCarbs, item.carbs, item.unitProtein, item.protein, removeButton])
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
const quantity = document.querySelector('input[name="quantity"]')
const calories = document.querySelector('input[name="calories"]')
const carbs = document.querySelector('input[name="carbs"]')
const protein = document.querySelector('input[name="protein"]')

const $totalCalories = document.getElementById('totalCalories')
const $totalCarbs = document.getElementById('totalCarbs')
const $totalProtein = document.getElementById('totalProtein')

const $form = document.getElementById('form')
const $tableBody = document.querySelector('tbody')


// Variables

let list = []
let properties = [description, quantity, calories, carbs, protein]

// Event Listeners
properties.forEach(property => {
  property.addEventListener('keydown', () => {
    property.classList.remove('is-invalid')
  })
})

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData($form)
  validateInputs(data)? addItem(data) : ''
})