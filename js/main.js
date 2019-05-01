// Define Web Elements
const description = document.querySelector('input[name="description"]')
const calories = document.querySelector('input[name="calories"]')
const carbs = document.querySelector('input[name="carbs"]')
const protein = document.querySelector('input[name="protein"]')

const $form = document.getElementById('form')

// Variables
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
  cleanInputs()
  console.log(list)
}

const cleanInputs = () => {
  $form.reset()
  description.focus()
}

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []
  
  for(let i=0; i<keys.length; i++) {
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }
  
  const string = attrs.join(' ')
  return string

  /* return Object.keys(obj).map((key) => `${key}="${obj[key]}"`).join(' ') */
}

const tagAttrs = obj => (content = "") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => {
  if(typeof t === 'string') {
    tagAttrs({tag: t})
  } else {
    tagAttrs(t)
  }
}

const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)
