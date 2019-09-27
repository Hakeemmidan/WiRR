import React from 'react';
import '../../stylesheets/donut_chart.css';
import * as d3 from 'd3';

// Inspired by : https://www.d3-graph-gallery.com/graph/donut_basic.html
              // https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
class DonutGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: { a: 10, b: 9, c: 14, d: 7, e: 12, f: 5, g: 19, h: 5, i: 10 },
            margin: 40,
            width: 600,
            height: 450
        }

        this.drawChart = this.drawChart.bind(this)
    }

    componentDidMount() {
        this.drawChart()
    }

    drawChart() {
        const radius = Math.min(this.state.width, this.state.height) / 2 - this.state.margin

        let svg = d3.select("#author_contribution_percentage_per_article")
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)
            .append("g")
            .attr("transform", "translate(" + this.state.width / 2 + "," + this.state.height / 2 + ")");

        let color = d3.scaleOrdinal()
            .domain(this.state.data)
            .range(["violet", "indigo", "skyblue", "blue", "green", "lightgreen", "yellow", "orange", "red", "lightred"])

        let pie = d3.pie()
            .value(function (d) { return d.value })
        let data_ready = pie(d3.entries(this.state.data))

        // Add div to body but isn't visible 
        // this will be the box that appears next to mouse
        // on hover
        var div = d3.select("body").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        const path = svg
            .selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(100)
                .outerRadius(radius)
            )
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .attr('opacity', 0.7)

            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '0.5')
                div.transition()
                    .duration(50)
                    .style('opacity', 1)

                // vvv This shows value of arc on mouseover
                div.html(`${d.value}%`)
                    .style('left', (d3.event.pageX + 10) + "px")
                    .style('top', (d3.event.pageY - 15) + "px")
            })

            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1')
                div.transition()
                    .duration(50)
                    .style('opacity', 0)
            })

        // Legend styling inspired by : https://medium.com/@kj_schmidt/making-an-animated-donut-chart-with-d3-js-17751fde4679
        // vvvvvvvvvvvvv
        let legendRectSize = 15;
        let legendSpacing = 5;

        let legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'circle-legend')
            .attr('transform', function (d, i) {
                let height = legendRectSize + legendSpacing;
                let offset = height * color.domain().length / 2;
                let horz = 15 * legendRectSize - 13;
                let vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('circle') //keys
            .style('fill', color)
            .style('stroke', color)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', '.5rem');
        legend.append('text') //labels
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .style('fill', 'black')
            .text(function (d) {
                return d;
            })
        // ^^^^^^^^^^^
    }

    render() {
        return (
            <div>
                <div id="author_contribution_percentage_per_article">
                </div>
            </div>
        )
    }
}