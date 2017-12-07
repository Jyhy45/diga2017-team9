import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemsSelector from './ItemsSelector'
import dataGetter from '../data/getData'
//import {ButtonGroup} from 'react-bootstrap'

class IndicatorChooser extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        
        return (

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div className="row" >
                <div> <b>Indicators</b></div>
                {this.props.scenarioCollection!=null
                    && this.props.scenarioCollection[0]!=null
                    && this.props.scenarioCollection[0].indicatorCategories!=null
                    && this.props.scenarioCollection[0].indicatorCategories.map(element =>  
                        <ItemsSelector aSignleIndicatorCategory = {element}
                                        setIndicatorsSelected = {this.props.setIndicatorsSelected}
                                        key = {element.id}
                                        id = {element.id}
                                        ></ItemsSelector>
                    )
                }
                </div>
            </div>
        )
    }
}

export default IndicatorChooser