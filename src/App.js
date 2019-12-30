import * as React from 'react';
import logo from './logo.svg';
import './App.css';

const wdays = ['Pon','Wto','Śro','Czw','Pią','Sob','Nie'];

        function getPriceBG($price:number): string
        {
          let $bc = 'danger';
          if ($price <= 80) $bc = 'success';
          else if ($price <= 150) $bc = 'info';
          else if ($price <= 300) $bc = 'warning';
          return $bc;
        }
        

  
export class OptionSelect extends React.Component {
  render() {

        const {onSelect, selected, selectedNights, params} = this.props;
        
        
       class optionParams {
           
           constructor(params)
           {
               let arr= params.split("|")               
               this.prices = params;
               this.type   = getPriceBG(arr[3]);
               this.title  = "TBD";
               this.label  = arr[0].substr(8) + "-" + arr[1].substr(8);
               this.active = this.label === selected;
           }
           
           prices:string; 
           type:string;
           title:string;
           label:string;
           active:boolean = false;
       }      
      
      
      let opts:Array<optionParams> = params.find(o => o.nights === selectedNights).params.split("#").map(o => new optionParams(o));      
        return (
            <div>
            <img className="icon" alt="Możliwe terminy" title="Możliwe terminy" src="http://localhost/loty/static/img/dates.png"/>
            {opts.map( option => <span key={option.label} onClick={onSelect} className={"option badge badge-" + option.type + (option.active ? " selected" : "")} title={option.title}>{option.label}</span>)}
            </div>            

    );
  }
}  
  
export class NightsSelect extends React.Component {
  render() {
      
      const {opts, onSelect, selected} = this.props;
                       
    return (
            <div className='nights'>
            <button type='button' className='btn btn-warning noaction' title="Liczba noclegów"><img alt="" src='http://localhost/loty/static/img/nightNO.png'/></button>            
            {opts.map(option => <button key={option.nights} onClick={onSelect} data-params={option.params} type="button" className={"btn btn-" + option.type  + (option.nights === selected ? " selected" : "")}>{option.nights}</button>)}
            </div>
    );
  }
}





export function DepartureTimes()
{    
    return (
            <div className="times">
                <div className="depTimes Pią">
                <div className="sday Czw"><span>Czw</span> <span title="11:10 -> 12:40" className="badge badge-primary">11:10</span> <span title="13:25 -> 14:55" className="badge badge-primary">13:25</span> <span title="16:40 -> 18:10" className="badge badge-primary">16:40</span></div>
                <div className="sday Pią"><span>Pią</span> <span title="11:10 -> 12:40" className="badge badge-primary">11:10</span> <span title="13:25 -> 14:55" className="badge badge-primary">13:25</span> <span title="21:00 -> 22:30" className="badge badge-primary">21:00</span></div>
                </div>
                <div className="retTimes Nie">
                <div className="sday Sob"><span>Sob</span> <span title="12:05 -> 13:35" className="badge badge-primary">12:05</span></div>
                <div className="sday Nie"><span>Nie</span> <span title="13:15 -> 14:45" className="badge badge-primary">13:15</span></div>
                </div>
            </div>                        
            );
}

 class Calendar extends React.Component<Props>
{

    constructor(props) {
    super(props);
    this.formatCell = this.formatCell.bind(this);
   }
   
    
    padIt(s)
    {
        return (s.length === 2) ? s : "0" + s;
    }
    
    prepareList()
    {
      const {days} = this.props;
      let params = days.split(" ");

      let dBefore = params[0].split("-"), dInside = params[1].split("-"), dAfter = params[2].split("-");
      let dayTAB = [], splitTAB = [];
    
      while (dBefore[0] <= dBefore[1]) {dayTAB.push("o" + this.padIt(""+dBefore[0]));dBefore[0]++;};
      while (dInside[0] <= dInside[1]) {dayTAB.push("i" + this.padIt(""+dInside[0]));dInside[0]++;};
      while (dAfter[0]  <= dAfter[1]) {dayTAB.push("o" + this.padIt(""+dAfter[0]));dAfter[0]++;};
    
      //console.log(dayTAB);
      while(dayTAB.length)
      {
       splitTAB.push(dayTAB.slice(0,7));
       dayTAB = dayTAB.slice(7);
      }
      
      //console.log(splitTAB);
          
      return splitTAB;
    }
    
    
    formatCell(day, idx)
    {           
        let extra = (day[0] === "o") ? " outside" : "";
        return (<td  key={idx} className={"calendar-day"+extra}><div className="empty">{day.substr(1)}</div></td>);         
    }
    
    render() 
    {    
      let dayTAB = this.prepareList();
    
      return (
            <table className="calendar-table table table-condensed table-tight">
            <thead><tr className="c-weeks">{wdays.map((wday,idx) => <th key={idx} className="c-name">{wday}</th>)}</tr></thead>
            <tbody>
            {dayTAB.map( (row,idx) => (<tr key={idx}>{row.map(this.formatCell)}</tr>))}
            </tbody></table> 
            );
    }
}


class Result extends React.Component<Props,State> {

constructor(props)
  {
      class nightParams {
          params:string;
          nights:number;
          type:string;
          active:boolean = false;
      }
      
      
      let opts:Array<nightParams> = [
                                        {nights:2, type: "success", params: "2020-03-05|2020-03-07|kayak 80,skyscanner 98,wizzair 76.8,ryanair 78|77#2020-03-06|2020-03-08|kayak 73,skyscanner 85,wizzair 90.8,ryanair 78|73#2020-03-12|2020-03-14|kayak 80,skyscanner 84,wizzair 90.8,ryanair 78|78#2020-03-13|2020-03-15|kayak 73,skyscanner 111,wizzair 90.8,ryanair 78|73#2020-03-19|2020-03-21|kayak 99,skyscanner 133,wizzair 202.8,ryanair 78|78#2020-03-20|2020-03-22|kayak 90,skyscanner 79,wizzair 202.8,ryanair 78|78#2020-03-26|2020-03-28|kayak 117,skyscanner 183,wizzair 448.2,ryanair 112|112#2020-03-27|2020-03-29|kayak 115,skyscanner 87,wizzair 216.8,ryanair 78|78"},
                                        {nights:3, type: "success", params: "2020-03-05|2020-03-08|kayak 74,skyscanner 98,wizzair 90.8,ryanair 78|74#2020-03-12|2020-03-15|kayak 74,skyscanner 103,wizzair 104.8,ryanair 78|74#2020-03-19|2020-03-22|kayak 91,skyscanner 109,wizzair 202.8,ryanair 78|78#2020-03-26|2020-03-29|kayak 108,skyscanner 134,wizzair 223.8,ryanair 95|95"}
                                     ];

      
      
      super(props);
      this.state = {selectedOption : '06-08', selectedNights: 2, nightOpts: opts};
      this.optionSelect = this.optionSelect.bind(this);
      this.nightsSelect = this.nightsSelect.bind(this);
  }
    
  optionSelect(s)
  {
      this.setState({selectedOption:s.target.innerHTML});
  }
  
  nightsSelect(s)
  {
      let selectedNights = parseInt(s.target.innerHTML,10);      
      let opts:Array<optionParams> = this.state.nightOpts.find(o => o.nights === selectedNights).params.split("#").map(o => o.split("|")).sort((l,r) => parseInt(l[3],10) - parseInt(r[3],10))[0];
      
      
      this.setState({selectedNights:selectedNights, selectedOption: opts[0].substr(8) + "-" + opts[1].substr(8)});
  }
  
  render()
  {
      const {SRC, DST, LOC} = this.props;
      
      return (
        <div className="row row-eq-height bg" data-loc={LOC} data-src={SRC} data-dst={DST}>
        <div className="l-panel col-lg-7 col-md-6">
          <div data-original={"BG/" + DST + ".jpg"} className="card h-100" style={{backgroundImage:"url(http://localhost/loty/BG/"+DST+".jpg)"}}>
            <div className="card-body"></div>
          </div>
        </div>
         <div className="r-panel noselect col-lg-5 col-md-6 show-2">
              <NightsSelect opts={this.state.nightOpts} onSelect={this.nightsSelect} selected={this.state.selectedNights}/>
         
            <div className="card h-100 days">              
              <div className="nights-2 choices">            
                <div className="hdr">Wybierz termin</div>              
                <Calendar days="25-30 01-31 01-05"/>       
                <OptionSelect onSelect={this.optionSelect} selected={this.state.selectedOption} selectedNights={this.state.selectedNights} params={this.state.nightOpts}/>
                <DepartureTimes/>
              </div>
            </div>
        </div>
        
      </div>
      );
  }

}

class App extends React.Component {
        
  render() {
                          
    return (
      <div className="App">
          
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div><br/>
        
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>
        <Result LOC="Oslo%2C+Norway" SRC="GDN" DST="OSL"/>

        </div>
    );
  }
}

export default App;
