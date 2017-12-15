import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ItemsSelector from './ItemsSelector'

class IndicatorChooser extends Component {
    render () {
        return (
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div className="row" >
                <div> <b>Indicators</b></div>
                {this.props.scenarioCollection!=null
                    && this.props.scenarioCollection[0]!=null
                    && this.props.scenarioCollection[0].indicatorCategories!=null
                    && this.props.scenarioCollection[0].indicatorCategories.map(element =>  
                        <ItemsSelector aSignleIndicatorCategory = { element }
                                        setIndicatorsSelected = { this.props.setIndicatorsSelected }
                                        selectedIndicators = { this.props.selectedIndicators }
                                        setIndicatorDefaults = { this.props.setIndicatorDefaults }
                                        key = {element.id}
                                        id = {element.id}
                                        ></ItemsSelector>
                    )}
                </div>
            </div>
        )
    }
}

export default IndicatorChooser