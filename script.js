function webDesigner(pointsRing = 12, dotSize = 2, numRings = 10, spread = 40) {
  const coords = (number) => {
    const frags = 360 / number;
    return Array.from(
      { length: number + 1 },
      (_, i) => (frags / 180) * i * Math.PI
    )
  }
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const last = numRings * spread;
  const ring = coords(pointsRing);
  let s = "";

  for (let i = 1; i <= numRings; i++) {
    const r = spread * i;
    s += `<g>${ring
      .map((value, index) => {
        const x = 500 - Math.round(r * Math.cos(value));
        const y = 500 - Math.round(r * Math.sin(value));
        return `
      <circle cx="${x}" cy="${y}" r="${dotSize}" />
      ${
        index > 0
          ? `<line x1="${x}" y1="${y}" x2="${
              500 - Math.round(r * Math.cos(ring[index - 1]))
            }" y2="${
              500 - Math.round(r * Math.sin(ring[index - 1]))
            }" stroke-width="${random(25, 140)/100}" />`
          : ""
      }
      ${
        i === 1
          ? `<line x1="${x}" y1="${y}" x2="${
              500 - Math.round(last * Math.cos(value))
            }" y2="${500 - Math.round(last * Math.sin(value))
            }" stroke-width="${random(75, 150)/100}" />`
          : ""
      }
    `;
      })
      .join("")}</g>`;
  }
  return s + `<use href="#spider" x="463" y="435" width="75" height="125" />`;
}

/* Init */
const app = document.querySelector("#app");
const webdesigner = document.querySelector(".webdesigner");
app.addEventListener('input', event => {
  webdesigner.innerHTML = webDesigner(
    app.elements.pointsring.valueAsNumber,
    app.elements.dotsize.valueAsNumber,
    app.elements.numrings.valueAsNumber,
    app.elements.spread.valueAsNumber)
})
