import React, { Component } from 'react';
import DataGetter from '../data/getData';
const ReactHighcharts = require('react-highcharts')
require('highcharts-more')(ReactHighcharts.Highcharts);

class Graphs extends Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			view: "todos",
			showNewItemInputs: false,
			chartType: 'column',
			polar: false,
			items: [],
			data: [],
			form: {
				scenario: [10, 11],
				indicator: [131, 123, 133, 125, 120],
				timePeriod: 23,
			},
			config: {chart: {polar: false}, series: [0]}, 
		};// end this.state

		this.changeHandler = this.changeHandler.bind(this);
		this.chart = this.chart.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
    		//this.toggleIsDone = this.toggleIsDone.bind(this);
	}// end constructor


	componentDidMount() {
		DataGetter.getScenarioCollectionById(24, 6).then(results =>
		{
			this.setState({ items: results, showNewItemInputs: true });
		});// end then
	}// end componentDidMount()

	chart(e)
	{
		let processedtodoTypes = [];
		const todoTypes = this.state.items[0];

		console.log(todoTypes);

		todoTypes.values.forEach(element =>
		{
			let todoIndex = processedtodoTypes.findIndex(todoType => todoType.name === element.value);
			this.state.form.indicator.forEach(indicator =>
			{
				this.state.form.scenario.forEach(scenario =>
				{
					if (element.scenarioId === scenario && element.indicatorId === indicator && element.timePeriodId === this.state.form.timePeriod )
					{
						if (todoIndex === -1)
						{
							processedtodoTypes.push({ inId: indicator, scId: scenario, data: element.value })
						}// end if
						else
						{
							processedtodoTypes[todoIndex].y++;
						}// end else
					}// end if
				});
			});// end forEach
		});//end forEach
		console.log(processedtodoTypes)

		this.setState({data: processedtodoTypes});

		let final = [{}];
		let dtArr = [];
		let inArr = [];
		let scArr = [];
		let swaps;
		for(let i=0; i< processedtodoTypes.length; i++)
		{
			dtArr[i] = processedtodoTypes[i].data;
			inArr[i] = processedtodoTypes[i].inId;
			scArr[i] = processedtodoTypes[i].scId;
		}
		for (let i = 0; i < processedtodoTypes.length; i++)
		{
			swaps = 0;
			for (let j = 0; j < processedtodoTypes.length-i; j++)
			{
				if (inArr[j] > inArr[j+1])
				{
					//Sort Indicator
					let temp = inArr[j];
					inArr[j] = inArr[j+1];
					inArr[j+1] = temp;
					//Sort scenario
					temp = scArr[j];
					scArr[j] = scArr[j + 1];
					scArr[j + 1] = temp;
					//Sort Data
					temp = dtArr[j];
					dtArr[j] = dtArr[j + 1];
					dtArr[j + 1] = temp;
					swaps++;
				}// end if
			}// end for
			if(swaps === 0)
			{
				break;	
			}// end if
		}// end for

		let tempI = 0;
		//console.log(dtArr.length)
		for (let i = 0; i < dtArr.length; i++)
		{
			let temp = {}
			temp.name = scArr[i];
			temp.indicator = [];
			temp.data = [];
			for (let j = 0; j < inArr.length; j++)
			{
				if(scArr[j] === temp.name)
				{
					temp.indicator.push(inArr[j]);
					temp.data.push(dtArr[j]);
				}// end if
			}// end for

			let bool2 = false;
			for (let j = 0; j < final.length; j++)
			{
				if (final[j].name === temp.name)
				{
					bool2 = true;
				}// end if
			}// end for
			if(!bool2)
			{
				final[tempI] = [];
				final[tempI] = temp;

				tempI++;
			}// end if
		}// end for

		final.type = 'column';
		final.pointPlacement = 'between';
		final.colorByPoint = false;

		let pieHeight = 50;
		const numPerRow = 3;
		for (let i = 0; i < final.length; i++)
		{
			if (i % numPerRow === 0 && i !== 0)
			{
				pieHeight += 175;
			}// end if
			final[i].center = [22.5 + (25 * (i % numPerRow)) + '%', pieHeight];
			//console.log(final[i].center);
			final[i].size = (125 / (numPerRow + 2))*5;
		}// end for

		
	/*
		let tick = 0;
		if(this.state.form.scenario.lenght > this.state.form.indicator.lenght)
		{
			tickmulti = this.state.form.scenario.lenght/this.state.form.indicator.lenght
		}
		else if(this.state.form.indicator.lenght > this.state.form.scenario.lenght)
		{
			tickmulti = this.state.form.indicator.lenght/this.state.form.scenario.lenght
		}
		else
		{
			tickmulti = 1
		}
	*/

		console.log(final);
		const config =
		{
			chart:
			{
				polar: this.state.polar,
				type: this.state.chartType,
				height: 500 + pieHeight,
				marginRight: 0,
				marginLeft: 0,
				spacingRight: 0,
				spacingLeft: 0,
			},

			title:
			{
				text: '<b>' + todoTypes.name + '</b> : ' + todoTypes.description
			},

			pane:
			{
				startAngle: 0,
				endAngle: 360
			},

			xAxis:
			{
				tickInterval: 1,
				categories: final[0].indicator
			},

			yAxis:
			{
				min: 0,
				max: 1
			},
			
			tooltip:
			{
				headerFormat: '<span style="font-size:10px"></span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},

			plotOptions:
			{
				series:
				{
					showInLegend: false,
					allowPointSelect: true,
					pointStart: 0,
					pointInterval: 1,
				},// end series
				column:
				{
					showInLegend: false,
					allowPointSelect: true,
					pointPadding: 0,
					borderWidth: 0,
					//groupPadding: 0
				},// end column
				pie:
				{
					allowPointSelect: true,
					dataLabels:
					{
						enabled: false,
					},// end dataLabels
					pointPadding: 50,
					borderWidth: 0,
					groupPadding: 0,
				}// end pie
			},// end plotOptions

			series: final
		};// end config

		if(this.state.polar)
		{
			config.pane =
			{
				startAngle: 0,
				endAngle: 360
			}
			config.xAxis =
			{
				tickInterval: 360 / (this.state.form.indicator.length),
				min: 0,
				max: 360,
				labels:
				{
					formatter: function () {
						return this.value;
					}
				}
			}
			config.plotOptions =
			{
				series:
				{
					allowPointSelect: true,
					pointStart: 0,
					pointInterval: 360 / (this.state.form.indicator.length),
				},
				column:
				{
					pointPadding: 0,
					groupPadding: 0
				}
			}
		}

		//console.log(config);

		let store = this.state;
		store.config = config;
		this.setState(store);
	}// end chart()
	/*
	changeState(e, polar, type)
	{
		let store = this.state;
		store.config.chart.polar = polar;
		store.config.chart.type = type;
		store.polar = polar;
		store.chartType = type;
		this.setState(store);
	}// end changeStare()
	*/
	handleOptionChange(e)
	{
		if(e.target.value === 'polar')
		{
			let store = this.state;
			store.chartType = 'column';
			store.polar = true;
			store.config.pane =
			{
				startAngle: 0,
				endAngle: 360
			}
			store.config.xAxis =
			{
				tickInterval: 360 / (store.form.indicator.length) ,
				min: 0,
				max: 360,
				labels:
				{
					formatter: function () {
						return this.value;
					}
				}
			}
			store.config.plotOptions =
			{
				series:
				{
					allowPointSelect: true,
					pointStart: 0,
					pointInterval: 360 / (store.form.indicator.length),
				},
				column:
				{
					allowPointSelect: true,
					pointPadding: 0,
					groupPadding: 0
				}
			}
			store.config.chart.type = 'column';
			store.config.chart.polar = true;
			this.setState(store);
			//console.log(this.state.config);
			//console.log(store.config)
		}
		else
		{
			let store = this.state;
			store.chartType = e.target.value;
			store.polar = false;
			store.config.plotOptions =
			{
				series:
				{
					allowPointSelect: true,
					pointStart: 0,
					pointInterval: 1,
				},// end series
				column:
				{
					allowPointSelect: true,
					pointPadding: 0,
					borderWidth: 0,
					//groupPadding: 0
				},// end column
				pie:
				{
					allowPointSelect: true,
					dataLabels:
					{
						enabled: false,
					},// end dataLabels
					pointPadding: 50,
					borderWidth: 0,
					groupPadding: 0,
				}// end pie
			}
			store.config.xAxis =
			{
				tickInterval: 1,
				min: 0,
				max: (store.form.indicator.length)-1,
				labels:
				{
					formatter: function () {
						return this.value + 1;
					}
				}
			}
			store.config.pane =
			{
				startAngle: 0,
				endAngle: 360
			}
			store.config.chart.type = e.target.value;
			store.config.chart.polar = false;
			this.setState(store);
			//console.log(this.state.config);
			//console.log(store.config)
		}
	}

	changeHandler(e) {
		let store = this.state;
		if (e.target.name === 'indicator')
		{
			let arr = (e.target.value).split(",");
			for(let i = 0; i < arr.length; i++)
			{
				//if()
				arr[i] = parseInt(arr[i], 10);
			}// end for
			//console.log(arr);
			//store.form[e.target.name] = arr;
		}// end if
		else
		{
			//store.form[e.target.name] = parseInt(e.target.value, 10);
		}// end else
		this.setState(store);
	}

	render()
	{
		if (this.state.showNewItemInputs)
		{
			const { form } = this.state;
			if (this.state.config === { chart: { polar: false } })
			{
				this.chart(null)
			}
			return (
				<div className="container">
					<div>
						<ReactHighcharts config={this.state.config} />{/*this.chart(this.state.form.scenario, this.state.form.indicator) JSON.stringify(this.state.items[0]) */}
					</div >
					<div>
						<form>
							<table className="container">
								<tbody className="container">
									{/*
									<tr>
										<td>
											<label htmlFor="scenario" >Scenario</label>
										</td>
										<td>
											<input type="text" name="scenario" value={form.scenario} onChange={e => this.changeHandler(e)} placeholder="Scenario ID here" />
										</td>
									</tr>
									<tr>
										<td>
											<label htmlFor="indicator" >Indicator</label>
										</td>
										<td>
											<input type="text" name="indicator" value={form.indicator} onChange={e => this.changeHandler(e)} placeholder="Indicator ID here" />
										</td>
									</tr>
									*/}
									<tr>
										<td colSpan="2">
											{
												//onClick={(e) => this.changeState(e, false, 'column')}
											}
											<label><input type="radio" value="polar" checked={this.state.config.chart.polar === true && this.state.chartType === 'column'} onChange={this.handleOptionChange}/>Polar</label>
											<label><input type="radio" value="column" checked={this.state.config.chart.polar === false && this.state.chartType === 'column'} onChange={this.handleOptionChange}/>Column</label>
											<label><input type="radio" value="pie" checked={this.state.config.chart.polar === false && this.state.chartType === 'pie'} onChange={this.handleOptionChange}/> Pie</label>
										</td>
									</tr>
								</tbody>
							</table>
						</form>
						<button onClick={(e) => this.chart(e)} value="submit">Submit</button>
					</div>
				</div>
			);// end render
		}//end if
		else
		{
			return (<div>Retrieving Data</div>);
		}// end else
	}// end render
}// end Graphs

export default Graphs