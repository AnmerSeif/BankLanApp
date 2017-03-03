import React from 'react';

export class TextInput extends React.Component
{
    constructor(props)
    {
        super(props);
        if(this.props.glyphicon)
        {
            this.state ={glyphicon: "glyphicon glyphicon-" + this.props.glyphicon};
        }
        else{
            this.state = {addon_text: this.props.addon_text};
        }
    }
    render(){
        return (
            <div className={this.props.formClass || "form-group"}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="input-group">
                    <div className={this.props.inputGroupAddonClass || "input-group-addon"}>
                        <span className={this.state.glyphicon} aria-hidden="true">{this.state.addon_text}</span>
                    </div>
                    <input id={this.props.id}
                           name={this.props.id}
                           type="text"
                           className={this.props.inputClass|| "form-control"}
                           placeholder={this.props.placeholder}
                           aria-describedby="basic-addon1"
                           value={this.props.value}
                           onChange={this.props.onInputChange} 
                           disabled={this.props.disabled}
                           />
                </div>
                <div className="text-danger">{this.props.feil}</div>
            </div>  
        );
    }
}