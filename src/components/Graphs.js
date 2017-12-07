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
			chartType: 'column',
			polar: true,
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

	chart(scId, inId)
	{
		console.log(this.state.items[0]);
		let processedTodoTypes = [];
		const TodoTypes = this.state.items[0];

		TodoTypes.values.forEach(element => {
			let todoIndex = processedTodoTypes.findIndex(todoType => todoType.name === element.value);
			inId.forEach(indicator => {
				if (element.scenarioId === scId && element.indicatorId === indicator) {
					if (todoIndex === -1) {
						processedTodoTypes.push({id: indicator, data: element.value})
						//let temp = [];
						//temp[0] = processedTodoTypes[indicator];
						//temp.push(element.value);
						//processedTodoTypes[indicator] = element.value;
					}
					else {
						processedTodoTypes[todoIndex].y++;
					}
				}

			})
		});

		console.log(processedTodoTypes);

		let dtArr = [];
		let idArr = [];
		for(let i=0; i<processedTodoTypes.length; i++)
		{
			//idArr[i] = processedTodoTypes[i].id;
			for(let j=0; j<idArr.length; j++)
			{
				if (processedTodoTypes[j].id === idArr[i])
				{
					//dtArr[idArr[i]] = processedTodoTypes[j].data;
				}
			}
			//console.log(processedTodoTypes[i].id + ": "+ processedTodoTypes[i].data);
			//obj[i].push("" + processedTodoTypes[i].id + "", processedTodoTypes[i].data)
			dtArr[i] = processedTodoTypes[i].data;
			idArr[i] = processedTodoTypes[i].id
		}//end for

		for (let i = 0; i < idArr.length; i++)
		{
			for (let j = i; j < idArr.length; j++)
			{
				if(idArr[i] < idArr[j])
				{
					//Sort Id
					let temp = idArr[j];
					idArr[j] = idArr[i];
					idArr[i] = temp;
					//Sort Data
					temp = dtArr[j];
					dtArr[j] = dtArr[i];
					dtArr[i] = temp;
				}
			}
			console.log(idArr[i]+" : "+ dtArr[i]);
		}

		let final = [{}];
		let tempI = 0;
		for (let i=0; i<idArr.length; i++)
		{
			let temp = {}
			temp.name = idArr[i];
			temp.data = [];
			temp.type= this.state.chartType;
			for (let j = 0; j < idArr.length; j++)
			{
				if (idArr[j] === temp.name)
				{
					temp.data.push(dtArr[j]);
				}//end if
			}

			let bool = false;
			for(let j=0; j<final.length; j++)
			{
				if (final[j].name === temp.name)
				{
					bool = true;
				}
			}
			if(!bool)
			{
				final[tempI] = [];
				final[tempI] = temp;
				tempI++;
			}
		}
		console.log(final);

		const config = {
			chart: {
				polar: this.state.polar,
				type: this.state.type,
				height: 500,
				width: 850,
				marginTop: 80,
				spacingLeft: 20,
			},

			title: {
				text: '<b>' + TodoTypes.name + '</b> : ' + TodoTypes.description
			},

			pane: {
				startAngle: 0,
				endAngle: 360
			},

			xAxis: {
				tickInterval: 360 / final.length,
				min: 0,
				max: 360,
				labels: {
					formatter: function () {
						//return this.value;
					}
				}
			},

			yAxis: {
				min: 0,
				//max: 1
			},
			
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},

			plotOptions: {
				series: {
					pointStart: 0,
					pointInterval: 360 / final.length
				},
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					//groupPadding: 0
				}
			},

			series: final/*[{
				type: this.state.chartType,
				name: this.state.chartType,
				colorByPoint: true,
				data: final,
				pointPlacement: 'between'
			}, {
				type: 'line',
				name: 'Line',
				data: processedTodoTypes
			}, {
				type: 'area',
				name: 'Area',
				data: processedTodoTypes
			}]*/
		};

		//console.log(config);

		return (
			<div>
				<ReactHighcharts config={config} />
			</div>
		)
	}

	changeState(event, polar, type)
	{
		this.setState({polar: polar, chartType: type})
	}

	render() {
		if (this.state.showNewItemInputs)
		{
			return (
				<div>
					<div>{this.chart(11, [131, 123, 134, 122])/* JSON.stringify(this.state.items[0]) */}</div >
					<div>
						<button onClick={(e) => this.changeState(e, true, 'column')} value="Polar">Polar</button>
						<button onClick={(e) => this.changeState(e, false, 'column')} value="Column">Column</button>
						<button onClick={(e) => this.changeState(e, false, 'pie')} value="Pie">Pie</button>
					</div>
				</div>
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