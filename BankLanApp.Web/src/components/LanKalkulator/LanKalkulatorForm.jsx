import React from 'react';
import {Slider} from '../../common/Slider.jsx';
import {TextInput} from '../../common/TextInput.jsx';

export class LanKalkulatorForm extends React.Component
{
    render()
    {
        return(
            <form>
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <TextInput value={this.props.lan.belop}
                                   id={'belop'}
                                   label={'Beløp'}
                                   feil={this.props.feil.belop}
                                   formClass={'slider-verdi-container'}
                                   inputGroupAddonClass={'hide'}
                                   inputClass={'slider-verdi'}
                                   onInputChange={this.props.onInputChange} />
                        <Slider value={this.props.lan.belop}
                                   id={'belop'}
                                   label={'Beløp'}
                                   addon_text={'Kr'}
                                   min={10000}
                                   max={5000000}
                                   step={100}
                                   enhet={'Kr'}
                                   onSliderChange={this.props.onSliderChange} />
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <hr />
                        <TextInput value={this.props.lan.antall_ar}
                                   id={'antall_ar'}
                                   label={'Antall år'}
                                   feil={this.props.feil.antall_ar}
                                   formClass={'slider-verdi-container'}
                                   inputGroupAddonClass={'hide'}
                                   inputClass={'slider-verdi'}
                                   onInputChange={this.props.onInputChange} />
                        <Slider value={this.props.lan.antall_ar}
                                   id={'antall_ar'}
                                   label={'Antall år'}
                                   addon_text={'År'}
                                   min={3}
                                   max={30}
                                   step={1}
                                   enhet={'År'}
                                   onSliderChange={this.props.onSliderChange} />
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <hr />
                        <div id="kostnader"> 
                            <p>Kostnader per måned</p>
                            {this.props.lan.kostnader_per_ar}  Kr/Mnd
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}