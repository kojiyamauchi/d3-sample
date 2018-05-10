'use strict'

// Import D3.js
import * as d3 from 'd3'

// Import Json.
import favorites from '@/json/favorites'

const introGraphs = () => {

  const setWidth = 800
  const setHeight = 600

  const setPaddings = {
    top: 40,
    bottom: 40,
    left: 100,
    right: 40
  }

  const coreFunc = data => {

    d3.select('#app')
      .append('svg')
      .classed('svg-graphs', true)

    const graphs = d3.select('.svg-graphs')
      .selectAll('rect')
      .data(data)

    const scaleX = d3.scaleBand()
      .domain(favorites.map(d => d.name))
      .range([0, setWidth - setPaddings.left - setPaddings.right])
      .padding([0.25])

    const scaleY = d3.scaleLinear()
      .domain([0, d3.max(favorites, d => d.score)])
      .range([setHeight - setPaddings.top - setPaddings.bottom, 0])
      .nice()

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    graphs
      .enter()
      .append('rect')
      .merge(graphs)
      .attr('x', (d, i) => scaleX(d.name) + setPaddings.left)
      .attr('width', scaleX.bandwidth())
      .attr('y', setHeight + setPaddings.bottom)
      .attr('height', 0)
      .attr('fill', (d, i) => `hsla(${i * 30}, 60%, 60%, 0.9)`)
      .transition()
      .duration(200)
      .delay((d, i) => i * 125)
      .ease(d3.easeCubic)
      .attr('y', (d, i) => scaleY(d.score) + setPaddings.top + setPaddings.bottom + setPaddings.bottom)
      .attr('height', d => setHeight - scaleY(d.score) - setPaddings.top - setPaddings.bottom)

    graphs
      .exit()
      .remove()

    d3.selectAll('.axis')
      .remove()

    d3.select('.svg-graphs')
      .append('g')
      .classed('axis', true)
      .attr(
        'transform',
        `translate(${[setPaddings.left, setHeight + setPaddings.bottom]})`
      )
      .call(d3.axisBottom(scaleX))

    d3.select('.svg-graphs')
      .append('g')
      .classed('axis', true)
      .attr(
        'transform',
        `translate(${[setPaddings.left, setPaddings.top * 3]})`
      )
      .call(d3.axisLeft(scaleY))
  }

  coreFunc(favorites)
}

export default introGraphs
