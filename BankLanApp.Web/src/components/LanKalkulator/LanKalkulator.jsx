import React from 'react';
import {Router} from 'react-router';
import {LanKalkulatorForm} from './LanKalkulatorForm.jsx';

export class LanKalkulator extends React.Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            lan : {
                belop : 100000,
                antall_ar: 3,
                kostnader_per_ar: 3175 
            },
            feil: {}
        }

        this.context = context;
        this.onInputChange = this.onInputChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.regn = this.regn.bind(this);
    }

    valider_felt(nokkel,verdi){
        this.state.feil = {};
        var ok = true;
        if(nokkel === 'belop')
        {
            var regex = /^\d*$/;
            if(!regex.test(verdi)) 
            {
                this.state.feil.belop = 'Kun tall er tillatt!';
                ok = false;
            }
            if(parseInt(verdi) > 5000000)
            {
                this.state.feil.belop = 'Kan ikke søke en lån sum som er høyere enn 5 000 000';
                ok = false;
            }
        }
        else if(nokkel === 'antall_ar')
        {
            var regex = /^\d*$/;
            if(!regex.test(verdi)) 
            {
                this.state.feil.antall_ar = 'Kun tall er tillatt!';
                ok = false;
            }
            if(parseInt(verdi) > 30)
            {
                this.state.feil.antall_ar = 'Kan ikke sette nedbatlings tid til lengre enn 30 år';
                ok = false;
            }
        }
        else
            return false;
        
        return ok;
    }


    onInputChange(event){
        var nokkel = event.target.name;
        var verdi = event.target.value;
        if(!this.valider_felt(nokkel,verdi)) 
            return this.setState({feil: this.state.feil});

        this.state.lan[nokkel] = verdi;
        this.regn();
        return this.setState({lan: this.state.lan});
    }
    
    onSliderChange(event){
        var nokkel = event.target.name;
        var verdi = event.target.value;
        this.state.feil[nokkel] = "";
        this.state.lan[nokkel] = verdi;
        this.regn();
        return this.setState({lan: this.state.lan, feil: this.state.feil});
    }

    valider_alle_felter()
    {
        this.state.feil = {};
        var belop_felt = this.state.lan.belop;
        var antall_ar_felt = this.state.lan.antall_ar;
        var ok = true;

        if(belop_felt.length < 1)
        {
            this.state.feil.belop = 'Du må oppgi beløp!';
            ok = false;
        }
        else if(parseInt(belop_felt) < 10000)
        {
            this.state.feil.belop = 'Kan ikke søke en lån sum som er lavere enn 10000';
            ok = false;
        }
        if(antall_ar_felt.length < 1)
        {
            this.state.feil.antall_ar = 'Du må oppgi antall år!';
            ok = false;
        }
        else if(parseInt(antall_ar_felt) < 3)
        {
            this.state.feil.antall_ar = 'Kan ikke sette nedbatlings tid som er lavere enn 3 år';
            ok = false;
        }

        return ok;
    }

    regn() 
    {
        if(!this.valider_alle_felter()) 
            return this.setState({feil: this.state.feil});
        var r = 0.07;
        var G = parseInt(this.state.lan.belop);
        var n = parseInt(this.state.lan.antall_ar);
        var Y = (r*G)/(1-Math.pow(1+r,-n));
        Y = Y/12;
        Y = Math.floor(Y);
        this.state.lan.kostnader_per_ar = Y;
        return this.setState({lan: this.state.lan});
    }

    gaVidere(e)
    {
        e.preventDefault();
        if(!this.valider_alle_felter()) 
            return this.setState({feil: this.state.feil});
        this.regn();
        this.context.router.push({pathname: '/sokandRegistrering', query: this.state.lan });
    }


    render(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="panel-title">Låne kalkulator</div>
                </div>
                    
                <div className="panel-body">
                    <LanKalkulatorForm 
                        lan={this.state.lan}
                        onInputChange={this.onInputChange}
                        onSliderChange={this.onSliderChange}
                        feil={this.state.feil} />
                </div>

                <div className="panel-footer">
                    <div className="row">
                        <div className="col-sm-offset-10 col-sm-2">
                            <button onClick={this.gaVidere.bind(this)} className="btn btn-success btn-block">Gå Videre<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

LanKalkulator.contextTypes = {
    router: React.PropTypes.object.isRequired
};