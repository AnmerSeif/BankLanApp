import React from 'react';
import {TextInput} from '../../common/TextInput.jsx';

export class SoknadRegistreringForm extends React.Component
{
    render()
    {
        return(
            <form>
                <TextInput 
                    value={this.props.kunde.personnummer}
                    id={'personnummer'}
                    label={'Personnummer'}
                    glyphicon={'user'}
                    feil={this.props.feil.personnummer}
                    onInputChange={this.props.onInputChange} />
                <TextInput 
                    value={this.props.kunde.tlf}
                    id={'tlf'}
                    label={'Telefon'}
                    glyphicon={'phone'}
                    feil={this.props.feil.tlf}
                    onInputChange={this.props.onInputChange} />
                <TextInput 
                    value={this.props.kunde.epost}
                    id={'epost'}
                    label={'Epost'}
                    glyphicon={'envelope'}
                    feil={this.props.feil.epost}
                    onInputChange={this.props.onInputChange} />
            </form>
        );
    }
}