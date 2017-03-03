import React from 'react';

export class Soknader extends React.Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            soknader: [],
            loading: true,
            sokTekst: ''
        };

        this.hentAlleSoknader = this.hentAlleSoknader.bind(this);
        this.onInputChange= this.onInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.sok = this.sok.bind(this);
    }

    componentDidMount() {
        this.hentAlleSoknader();
    }

    hentAlleSoknader()
    {
        fetch('http://localhost:9967/api/BankLan',
            {
                method: 'GET'
            })
          .then(function(response) {
              return response.json()
          }).then(function(json) {
              this.setState({
                  soknader: json,
                  loading: false,
                  error: null
              });
          }.bind(this)).catch(function(err) {
              this.setState({
                  loading: false,
                  error: err
              });
          }.bind(this));
    }

    onInputChange(event)
    {
        event.preventDefault();
        this.state.sokTekst = event.target.value;
        return this.setState({sokTekst: this.state.sokTekst});
    }

    onKeyPress(event)
    {
        if(event.charCode === 13) this.sok();
    }

    sok()
    {
        var personnummer = this.state.sokTekst;
        if(personnummer.length === 0) return this.hentAlleSoknader();
        fetch('http://localhost:9967/api/BankLan/Get?personnummer='+personnummer)
        .then(function(response) {
            return response.json()
        }.bind(this)).then(function(json) {
            this.setState({
                soknader: json,
                error: null
            });
        }.bind(this)).catch(function(err) {
            this.setState({
                error: err
            });
        }.bind(this));
    }

    renderLoading()
    {
        return <h1>Laster inn...</h1>
    }

    renderSoknader()
    {
        return (
            
            <div id="soknader-panel" className="panel panel-primary">
                <div className="panel-heading">
                    <div className="panel-title">Alle søknader</div>
                </div>
                <div>
                    <div id="sok-toolbar">
                        <div className="row">
                            <div className="col-sm-10">
                                <input className="form-control" name="sokTekst" value={this.state.sokTekst} placeholder="Personnummer" onChange={this.onInputChange} onKeyPress={this.onKeyPress} />
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-success btn-block" onClick={this.sok}><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Søk</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Beløp</th>
                            <th>Antall år</th>
                            <th>Konstander per måndte</th>
                            <th>Personnummer</th>
                            <th>Tlf</th>
                            <th>Epost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.soknader.map(function(v,k){
                            return (
                            <tr key={k}>
                                <td>{v.belop}</td>
                                <td>{v.antall_ar}</td>
                                <td>{v.kostnader}</td>
                                <td>{v.kunde.personnummer}</td>
                                <td>{v.kunde.tlf}</td>
                                <td>{v.kunde.epost}</td>
                            </tr>
                            );                        
                        })}
                    </tbody>
                </table>
                </div>

                <div className="panel-footer">
                </div>
            </div>
        );
                }
    
    render(){
        return(
          <div>
                {this.state.loading ?
                this.renderLoading()
              : this.renderSoknader()}
          </div>
        );
    }
}