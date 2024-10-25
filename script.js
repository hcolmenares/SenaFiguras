const btn2D = document.getElementById('2d-btn');
const btn3D = document.getElementById('3d-btn');
const figureSelect = document.getElementById('figure-select');
const inputsContainer = document.getElementById('inputs-container');
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result');

const figures2D = {
  circle: ['Radio'],
  square: ['Lado'],
  rectangle: ['Base', 'Altura'],
  triangle: ['Base', 'Altura'],
  pentagon: ['Lado'],
  hexagon: ['Lado']
};

const figures3D = {
  sphere: ['Radio'],
  cube: ['Lado'],
  cylinder: ['Radio', 'Altura'],
  pyramid: ['Base', 'Altura'],
  cone: ['Radio', 'Altura'],
  rectangularPrism: ['Largo', 'Ancho', 'Altura']
};

let is2DSelected = true;
updateFigureOptions();

btn2D.addEventListener('click', () => {
  is2DSelected = true;
  btn2D.classList.add('active');
  btn3D.classList.remove('active');
  updateFigureOptions();
});

btn3D.addEventListener('click', () => {
  is2DSelected = false;
  btn3D.classList.add('active');
  btn2D.classList.remove('active');
  updateFigureOptions();
});

function updateFigureOptions() {
  const options = is2DSelected ? figures2D : figures3D;
  figureSelect.innerHTML = '';
  Object.keys(options).forEach(figure => {
    const option = document.createElement('option');
    option.value = figure;
    option.textContent = figure.charAt(0).toUpperCase() + figure.slice(1);
    figureSelect.appendChild(option);
  });
  updateInputs();
}

figureSelect.addEventListener('change', updateInputs);

function updateInputs() {
  inputsContainer.innerHTML = '';
  const figure = figureSelect.value;
  const parameters = is2DSelected ? figures2D[figure] : figures3D[figure];
  parameters.forEach(param => {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `${param} (${param === 'Radio' || param === 'Lado' ? 'cm' : 'cm²'})`;
    input.classList.add('input-field');
    input.required = true;
    inputsContainer.appendChild(input);
  });
}

calculateBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.input-field');
  const values = Array.from(inputs).map(input => parseFloat(input.value));
  const figure = figureSelect.value;

  let result;
  if (is2DSelected) {
    switch (figure) {
      case 'circle':
        result = Math.PI * Math.pow(values[0], 2);
        break;
      case 'square':
        result = Math.pow(values[0], 2);
        break;
      case 'rectangle':
        result = values[0] * values[1];
        break;
      case 'triangle':
        result = (values[0] * values[1]) / 2;
        break;
      case 'pentagon':
        result = (5 / 4) * Math.pow(values[0], 2) * (1 / Math.tan(Math.PI / 5));
        break;
      case 'hexagon':
        result = (3 * Math.sqrt(3) / 2) * Math.pow(values[0], 2);
        break;
    }
  } else {
    switch (figure) {
      case 'sphere':
        result = (4 / 3) * Math.PI * Math.pow(values[0], 3);
        break;
      case 'cube':
        result = Math.pow(values[0], 3);
        break;
      case 'cylinder':
        result = Math.PI * Math.pow(values[0], 2) * values[1];
        break;
      case 'pyramid':
        result = (values[0] * values[1]) / 3;
        break;
      case 'cone':
        result = (Math.PI * Math.pow(values[0], 2) * values[1]) / 3;
        break;
      case 'rectangularPrism':
        result = values[0] * values[1] * values[2];
        break;
    }
  }

  const type = is2DSelected ? 'área' : 'volumen';
  resultContainer.textContent = `El ${type} de la figura ${figure} es ${result.toFixed(2)} ${is2DSelected ? 'cm²' : 'cm³'}.`;
});
