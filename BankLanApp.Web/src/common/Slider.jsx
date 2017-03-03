import React from 'react';

export class Slider extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                    <input id={this.props.id}
                        name={this.props.id}
                        type="range"
                        className="form-control"
                        placeholder={this.props.placeholder}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        aria-describedby="basic-addon1"
                        value={this.props.value}
                        onChange={this.props.onSliderChange} 
                        />
                <div className="text-danger">{this.props.feil}</div>
                </div>  
        );
    }
}