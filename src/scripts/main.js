// The smoothing ratio
const smoothing = 0.2

const points = [
  [0, 48],
  [25, 45],
  [50, 43],
  [75, 35],
  [100, 25],
  [150, 20],
  [175, 13],
  [200, 3],
]

// Properties of a line 
// I:  - pointA (array) [x,y]: coordinates
//     - pointB (array) [x,y]: coordinates
// O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  }
}

// Position of a control point 
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse) => {

  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current

  // Properties of the opposed-line
  const o = line(p, n)

  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing

  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = current[1] + Math.sin(angle) * length
  return [x, y]
}

// Create the bezier curve command 
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a) => {

  // start control point
  const cps = controlPoint(a[i - 1], a[i - 2], point)

  // end control point
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
}

// Render the svg <path> element 
// I:  - points (array): points coordinates
//     - command (function)
//       I:  - point (array) [x,y]: current point coordinates
//           - i (integer): index of 'point' in the array 'a'
//           - a (array): complete array of points coordinates
//       O:  - (string) a svg path command
// O:  - (string): a Svg <path> element
const svgPath = (points, command) => {
  // build the d attributes by looping over the points
  const d = points.reduce((acc, point, i, a) => i === 0
    ? `M ${point[0]},${point[1]}`
    : `${acc} ${command(point, i, a)}`
  , '')
  return `<defs>
            <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="82.78%" y1="-9.49%" x2="17.22%" y2="109.49%">
            <stop offset=".13" stop-color="#6F6EFF"/>
            <stop offset=".93" stop-color="#2D29A7"/>
            </linearGradient>
            <g id="pn">
              <text class="chart__text">Пн</text>
              <text class="chart__text">10.03</text>
            </g>
          </defs>
          <path d="${d} L200,50 L0,50 z" fill="url(#g1)" stroke="none" />
          <rect x="0" y="50" width="200" height="50" fill="url(#g1)"></rect>
          <line x1="0" x2="0" y1="50" y2="0" stroke="none"></line>
          <g transform="translate(15,75)">
              <text transform="translate(3,0)" class="chart__text">Пн</text>
              <text y="6" class="chart__text">10.03</text>
            </g>
            <g transform="translate(40,75)">
              <text transform="translate(3,0)" class="chart__text">Вт</text>
              <text y="6" class="chart__text">11.03</text>
            </g>
            <g transform="translate(65,75)">
              <text transform="translate(3,0)" class="chart__text">Ср</text>
              <text y="6" class="chart__text">12.03</text>
            </g>
            <g transform="translate(90,75)">
              <text transform="translate(3,0)" class="chart__text">Чт</text>
              <text y="6" class="chart__text">13.03</text>
            </g>
            <g transform="translate(115,75)">
              <text transform="translate(3,0)" class="chart__text">Пт</text>
              <text y="6" class="chart__text">14.03</text>
            </g>
            <g transform="translate(140,75)">
              <text transform="translate(3,0)" class="chart__text">Сб</text>
              <text y="6" class="chart__text">15.03</text>
            </g>
            <g transform="translate(165,75)">
              <text transform="translate(3,0)" class="chart__text">Вс</text>
              <text y="6" class="chart__text">16.03</text>
            </g>
          `;
}

const svg = document.querySelector('.chart__svg');

svg.innerHTML = svgPath(points, bezierCommand);


document.querySelector('.tel').addEventListener('keyup', (e) => {
  const input = e.currentTarget;
  const value = input.value;
  input.value = value.replace(/[^-0-9]/gim, '').substr(0, 10);
});


document.querySelector('.inputs__file').addEventListener('input', (e) =>{
  e.preventDefault();
  const fileName = document.querySelector('.inputs__file').value.split(/(\\|\/)/g).pop();
  e.currentTarget.parentElement.querySelector('.inputs__input').innerText = fileName;
});

// window.addEventListener("DOMContentLoaded", function() {
//   [].forEach.call( document.querySelectorAll('.tel'), function(input) {
//   var keyCode;
//   function mask(event) {
//       event.keyCode && (keyCode = event.keyCode);
//       var pos = this.selectionStart;
//       if (pos < 3) event.preventDefault();
//       var matrix = "+7 (___) ___ ____",
//           i = 0,
//           def = matrix.replace(/\D/g, ""),
//           val = this.value.replace(/\D/g, ""),
//           new_value = matrix.replace(/[_\d]/g, function(a) {
//               return i < val.length ? val.charAt(i++) || def.charAt(i) : a
//           });
//       i = new_value.indexOf("_");
//       if (i != -1) {
//           i < 5 && (i = 3);
//           new_value = new_value.slice(0, i)
//       }
//       var reg = matrix.substr(0, this.value.length).replace(/_+/g,
//           function(a) {
//               return "\\d{1," + a.length + "}"
//           }).replace(/[+()]/g, "\\$&");
//       reg = new RegExp("^" + reg + "$");
//       if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
//       if (event.type == "blur" && this.value.length < 5)  this.value = ""
//   }

//   input.addEventListener("input", mask, false);
//   input.addEventListener("focus", mask, false);
//   input.addEventListener("blur", mask, false);
//   input.addEventListener("keydown", mask, false)

// });

// });