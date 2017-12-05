import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemsSelector from './ItemsSelector'
import dataGetter from '../data/getData'
//import {ButtonGroup} from 'react-bootstrap'

class IndicatorChooser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regionLevel: 24,
            scenarioCollectionId: 5,
            indicatorCategories: [],
        };
    }

    componentDidMount() {
        dataGetter.getScenarioCollectionById(this.state.regionLevel, this.state.scenarioCollectionId).then(
            result => {
                result.forEach(element => {
                    this.setState({indicatorCategories: element.indicatorCategories})
                    console.log(this.state.indicatorCategories);
                });

            });
    }

    render () {
        
        return (

            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                <div className="row" >
                <div> <b>Indicators</b></div>
                {
                    this.state.indicatorCategories.map(element =>  
                        <ItemsSelector items = {element}
                                        indicatorSelected = {this.props.indicatorSelected}
                                        key = {element.id} />
                    )
                }
                </div>
            </div>
        )
    }
}

export default IndicatorChooser