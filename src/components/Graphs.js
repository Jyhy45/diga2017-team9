import React, { Component } from 'react';
import DataGetter from '../data/getData';
const ReactHighcharts = require('react-highcharts');

class Graphs extends Component {
	constructor(props)
	{
		super(props);

		this.state = {
			view: "todos",
			showNewItemInputs: false,
			items: []
		};

		//this.toggleNewItemInputs = this.toggleNewItemInputs.bind(this);
		//this.addNewItem = this.addNewItem.bind(this);
    //this.toggleIsDone = this.toggleIsDone.bind(this);
	}

	componentDidMount() {
		DataGetter.getScenarioCollectionById(24, 6).then(results => {
			this.setState({ items: results, showNewItemInputs: true });
		});
	}

	chart(id)
	{
		let processedTodoTypes = [];
		let TodoTypes = this.state.items[0]

		TodoTypes.values.forEach(element => {
			let todoIndex = processedTodoTypes.findIndex(todoType => todoType.name === element.value);
			if (element.scenarioId === id) {
				if (todoIndex === -1) {
					processedTodoTypes.push(element.value)
				}
				else {
					processedTodoTypes[todoIndex].y++;
				}
			}
		});

		console.log(processedTodoTypes)

		const config = {
			chart: {
				polar: true
			},

			title: {
				text: '<b>' + TodoTypes.name + '</b> : ' + TodoTypes.description
			},

			pane: {
				startAngle: 0,
				endAngle: 360
			},

			xAxis: {
				tickInterval: (360 / processedTodoTypes.length),
				min: 0,
				max: 360 - 360 / processedTodoTypes.length,
				labels: {
					formatter: function () {
						return this.value/10;
					}
				}
			},

			yAxis: {
				min: 0,
			},

			plotOptions: {
				series: {
					pointStart: 0,
					pointInterval: 360 / processedTodoTypes.length
				},
				column: {
					pointPadding: 0,
					groupPadding: 0
				}
			},

			series: [{
				type: 'column',
				name: 'Column',
				colorByPoint: true,
				data: processedTodoTypes,
				pointPlacement: 'between'
			}, {
				type: 'line',
				name: 'Line',
				colorByPoint: true,
				data: processedTodoTypes
			}, {
				type: 'area',
				name: 'Area',
				data: processedTodoTypes
			}]
		};

		return (
			<div>
				<ReactHighcharts config={config}></ReactHighcharts>
			</div>
		)
	}

	render() {
		if (this.state.showNewItemInputs)
		{
			return(
				<div>{this.chart(13)/*JSON.stringify(this.state.items[0])*/}</div>
			);
		}
		else{
			return (<div>Retrieving Data</div>);
		}
		/*
		{
		    name: 'IE',
		    y: 56.33
		}
		*/
		/*
		let processedTodoTypes = [];
		this.props.items.forEach(element => {
			let todoIndex = processedTodoTypes.findIndex(todoType => todoType.name === element.type);
			if (todoIndex === -1) {
				processedTodoTypes.push({
					name: element.type,
					y: 1
				});
			}
			else {
				processedTodoTypes[todoIndex].y++;
			}
		});

		const config = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Browser market shares January, 2015 to May, 2015'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: 'black'
						}
					}
				}
			},
			series: [{
				name: 'Brands',
				colorByPoint: true,
				data: processedTodoTypes
			}]
		};
		return (
			<div>
				<ReactHighcharts config={config}></ReactHighcharts>
			</div>
		)
		*/
	}
	
}

export default Graphs