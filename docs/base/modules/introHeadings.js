'use strict'

// Import D3.js
import * as d3 from 'd3'

const introHeadings = () => {

  d3.select('#app')
    .append('svg')
    .classed('svg-heading', true)

  const letters = `D3.js Sample Practice.`

  const addTxt = d3.select('.svg-heading')

  addTxt
    .append('text')
    .attr('x', 100)
    .attr('y', 100)
    .attr('textLength', 750)
    .classed('heading01', true)
    .classed('drawing', true)
    .text(letters)

}

export default introHeadings