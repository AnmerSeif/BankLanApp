import React from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import 'whatwg-fetch';
import {Router} from 'react-router';
import {SoknadRegistreringForm} from './SoknadRegistreringForm.jsx';

export class SoknadRegistrering extends React.Component {
    constructor(props, context)
    {
        super(props, context);

        this.context = context;

        this.state = {
            soknad : {
                belop : this.props.location.query.belop,
                antall_ar: this.props.location.query.antall_ar,
                kostnader: this.props.location.query.kostnader_per_ar,
                kunde: {
                    personnummer : '',
                    tlf: '',
                    epost: '',
                }
            },
            loading: false,
            feil: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.registrer = this.registrer.bind(this);
    }

    onInputChange(event){
        var nokkel = event.target.name;
        var verdi = event.target.value;
        this.valider_felt(nokkel,verdi)
        this.state.soknad.kunde[nokkel] = verdi;
        return this.setState({kunde: this.state.soknad.kunde, feil: this.state.feil});
    }

    valider_felt(nokkel,verdi){
        var ok = true;
        if(nokkel === 'personnummer')
        {
            var regex = /^\d{11}$/;
            if(!regex.test(verdi)) 
            {
                this.state.feil.personnummer = 'Personnummer skal være 11 siffer!';
                ok = false;
            }
            else
                this.state.feil.personnummer = '';
        }
        else if(nokkel === 'tlf')
        {
            var regex = /^\d{8}$/;
            if(!regex.test(verdi)) 
            {
                this.state.feil.tlf = 'Telefon skal være 8 siffer!';
                ok = false;
            }
            else
                this.state.feil.tlf = '';
        }
        else if(nokkel === 'epost')
        {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regex.test(verdi)) 
            {
                this.state.feil.epost = 'Epost er feil!';
                ok = false;
            }
            else
                this.state.feil.epost = '';
        }
        else{
            return false;
        }
        
        return ok;
    }

    valider_alle_felter()
    {
        var ok = true;
        for(var nokkel in this.state.soknad.kunde)
        {
            if(!this.valider_felt(nokkel,this.state.soknad.kunde[nokkel])) ok = false;
        }
        return ok;
    }

    post_soknad_til_server()
    {
        fetch('http://localhost:9967/api/BankLan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.soknad)
        }).then(function(response){
            return response.json();
        }).then(function(j){
            if(j){
                this.context.router.push('/soknader');
            }
        }.bind(this));
    }

    registrer(e)
    {
        e.preventDefault();
        if(!this.valider_alle_felter()) 
        {
            return this.setState({feil: this.state.feil});
        }
        this.setState({loading: true});
        this.post_soknad_til_server();
    }

    renderLoading()
    {
        return <h3>Vennligst Vent!</h3>
    }

    render(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="panel-title">Registrer søknad</div>
                </div>
                    
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="lan-felt">
                                <div className="lan-felt-tittel">
                                    Beløp
                                </div>
                                <div className="lan-felt-verdi">
                                    {this.state.soknad.belop} Kr
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="lan-felt">
                                <div className="lan-felt-tittel">
                                    Antall år
                                </div>
                                <div className="lan-felt-verdi">
                                    {this.state.soknad.antall_ar} År
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="lan-felt">
                                <div className="lan-felt-tittel">
                                    Kostnader
                                </div>
                                <div className="lan-felt-verdi">
                                    {this.state.soknad.kostnader} Kr per måndte
                                </div>
                            </div>
                        </div>
                    </div>
                    <SoknadRegistreringForm 
                        kunde={this.state.soknad.kunde}
                        onInputChange={this.onInputChange}
                        feil={this.state.feil} />
                </div>

                <div className="panel-footer">
                    <div className="row">
                        <div className="col-sm-2 col-sm-offset-10">
                            {this.state.loading ?
                            this.renderLoading()
                          : <button onClick={this.registrer} className="btn btn-success btn-block" type="submit"> Registrer </button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

SoknadRegistrering.contextTypes = {
    router: React.PropTypes.object.isRequired
};