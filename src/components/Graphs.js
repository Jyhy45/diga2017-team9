import React, { Component } from 'react';
import DataGetter from '../data/getData';
const ReactHighcharts = require('react-highcharts');

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
				scenario: 11,
				indicator: [131, 123, 134, 122],
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
		console.log('Chart');
		let processedtodoTypes = [];
		const todoTypes = this.state.items[0];

		todoTypes.values.forEach(element =>
		{
			let todoIndex = processedtodoTypes.findIndex(todoType => todoType.name === element.value);
			this.state.form.indicator.forEach(indicator =>
			{
				if (element.scenarioId === this.state.form.scenario && element.indicatorId === indicator)
				{
					if (todoIndex === -1)
					{
						processedtodoTypes.push({ id: indicator, data: element.value })
					}// end if
					else
					{
						processedtodoTypes[todoIndex].y++;
					}// end else
				}// end if
			});// end forEach
		});//end forEach

		this.setState({data: processedtodoTypes});

		console.log(this.state.form);
		//console.log(processedtodoTypes);

		let final;
		if(this.state.polar)
		{
			final = processedtodoTypes;
			for(let i=0; i<processedtodoTypes.length; i++)
			{
				final[i] = processedtodoTypes[i].data;
			}// end for
			//final = processedtodoTypes;
			console.log(final)
		}// end if
		else
		{
			let dtArr = [];
			let idArr = [];
			for (let i = 0; i < processedtodoTypes.length; i++)
			{
				dtArr[i] = processedtodoTypes[i].data;
				idArr[i] = processedtodoTypes[i].id
				for (let j = i; j < processedtodoTypes.length; j++)
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
					}// end if
				}// end for
				//console.log(idArr[i] + ' : ' + dtArr[i]);
			}// end for

			final = [{}];
			let tempI = 0;
			for (let i=0; i<idArr.length; i++)
			{
				let temp = {}
				temp.name = idArr[i];
				temp.data = [];
				for (let j = 0; j < idArr.length; j++)
				{
					if (idArr[j] === temp.name)
					{
						temp.data.push(dtArr[j]);
					}//end if
				}// end for

				let bool = false;
				for(let j=0; j<final.length; j++)
				{
					if (final[j].name === temp.name)
					{
						bool = true;
					}// end if
				}// end for
				if(!bool)
				{
					final[tempI] = [];
					final[tempI] = temp;

					tempI++;
				}// end if
			}// end for

			final.colorByPoint = false;

			let height = 25;
			const numPerRow = 3;
			for(let i=0; i<final.length; i++)
			{
				if (i % numPerRow === 0 && i !== 0)
				{
					height+=50;
				}// end if
				final[i].center = [22.5 + (((100 / final.length)) * (i % numPerRow)+2) + '%', height+'%'];
				final[i].size = (100 / (final.length / numPerRow+2)) + '%';
			}// end for

			console.log(final);
		}
		const config =
		{
			chart:
			{
				polar: this.state.polar,
				type: this.state.chartType,
				height: 600,
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
				min: 0,
				max: final.length-1,
				labels:
				{
					formatter: function ()
					{
						return this.value+1;
					}
				}
			},

			yAxis:
			{
				min: 0,
				max: 1
			},
			
			tooltip:
			{
				headerFormat: '<span style="font-size:10px">Scenarios</span><table>',
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
					pointStart: 0,
					pointInterval: 1,
				},// end series
				column:
				{
					pointPadding: 0,
					borderWidth: 0,
					//groupPadding: 0
				},// end column
				pie:
				{
					allowPointSelect: true,
					dataLabels:
					{
						enabled: true,
						format: '{point.name} : {point.y}'
					},// end dataLabels
					pointPadding: 50,
					borderWidth: 0,
					groupPadding: 0,
				}// end pie
			},// end plotOptions

			series: final
		};// end config

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
			store.config.pane =
			{
				startAngle: 0,
				endAngle:360
			}
			store.config.xAxis = {
				tickInterval: 360/store.config.series.length,
				min: 0,
				max: 360,
				labels:
				{
					formatter: function ()
					{
						return this.value / store.config.series.length + 1;
					}
				}
			}
			store.config.yAxis =
			{
				min: 0
			}
			store.config.plotOptions =
			{
				series:
				{
					pointStart: 0,
					pointInterval: 45
				},
				column:
				{
					pointPadding: 0,
					groupPadding: 0
				}
			}
			store.chartType = 'column';
			store.polar = true;
			store.config.chart.type = 'column';
			store.config.chart.polar = true;
			this.setState(store);
			console.log(this.state.config);
		}
		else
		{
			let store = this.state;
			store.config.plotOptions =
			{
				series:
				{
					pointStart: 0,
					pointInterval: 1,
				},// end series
				column:
				{
					pointPadding: 0,
					borderWidth: 0,
					//groupPadding: 0
				},// end column
				pie:
				{
					allowPointSelect: true,
					dataLabels:
					{
						enabled: true,
						format: '{point.name} : {point.y}'
					},// end dataLabels
					pointPadding: 50,
					borderWidth: 0,
					groupPadding: 0,
				}// end pie
			}
			store.config.yAxis =
			{
				min: 0,
				max: 1
			}
			store.config.xAxis =
			{
				tickInterval: 1,
				min: 0,
				max: store.config.series.length - 1,
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
			store.chartType = e.target.value;
			store.polar = false;
			store.config.chart.type = e.target.value;
			store.config.chart.polar = false;
			this.setState(store);
			console.log(this.state.config);
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