import React, { useState } from 'react'
import axios from 'axios';
import './Converter.css'

function Converter() {
  
  const [fromcurr,setFromcurr]=useState('');
  const [tocurr,setTocurr]=useState('');
  const [amount,setAmount]=useState('');
  const[notfound,setNotfound]=useState(false);
  const [currfrom,setCurrfrom]=useState('');
  const [currto,setCurrto]=useState('');
  const [currratefrom,setCurrratefrom]=useState('');
  const [currrateto,setCurrrateto]=useState('');
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(false);
  const [err,seterr]=useState(false);

function reset(){
    setAmount('');
    setFromcurr('');
    setTocurr('');
    setCurrrateto('');
    setCurrratefrom('');
    setLoading(false);
    setNotfound(false);
    setCurrfrom('');
    setCurrto('');
    setResult(false)
    seterr(false);
}

  async function convert(){
    seterr(false)
    if(fromcurr=='' || tocurr=='' || amount=='')
    {
        alert('fill all inputs')
        return;
    }
    setLoading(true);

    await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromcurr}`)
     .then((response) =>{
        setResult(true)
        console.log(response.data.rates[tocurr]);
        setCurrratefrom(1);
        setCurrrateto(response.data.rates[tocurr]);
        setCurrfrom(amount);
        setCurrto((response.data.rates[tocurr]*amount).toFixed(3));
        if(currto=='NaN')
        {
        setResult(false);
        seterr(true);
        }
        


    })
     .catch((error) => seterr(true) )
     .finally(()=>setLoading(false));
  }
  useState(()=>{
        console.log(currfrom);
  })

  
  return (
    <div className='container'>
            <h1>CURRENCY CONVERTER</h1>
        <div className="amount">
            <label htmlFor="">Enter the Amount</label>
            <input type="text" onChange={(e)=>setAmount(e.target.value)}  value={amount} required/>

        </div>

        { !notfound &&
            <>
                <div className="from-currency">
                    <label htmlFor="">From Currency</label>
                    <select name="" id="" onChange={(e)=>setFromcurr(e.target.value)} required value={fromcurr}>
                        <option value=""></option>
                        <option value="INR">INR-Indian Rupee</option>
                        <option value="USD">USD-American Dollar</option>
                        <option value="AUD">AUD-Australian Dollar</option>
                        <option value="KRW">KRW-South korean Won</option>
                        <option value="JPY">JPY-Japanese Yen</option>
                        <option value="MXN">MXN-Mexican Peso</option>
                        <option value="GBP">GBP-UK Pond</option>
                        <option value="EUR">EUR-EURO</option>
                        <option value="SGD">SGD-Singapore Dollar</option>
                        <option value="MYR">MYR-Malasian Ringgit</option>
                        <option value="CNY">CNY-Chinese Yuan</option>
                        <option value="IDR">IDR-Indonesian Rupiah</option>
                        <option value="RUB">RUB-Russian Ruble</option>
                        <option value="BDT">BDT-Bangladeshi Taka</option>
                        <option value="BRL">BRL-Brazillian Real</option>
                        <option value="CAD">CAD-Canadian Dollar</option>
                    </select>
                </div>
                <div className="to-currency">
                    <label htmlFor="">To Currency</label>
                    <select name="" id="" onChange={(e)=>setTocurr(e.target.value)} required value={tocurr}>
                    <option value=""></option>
                        <option value="INR">INR-Indian Rupee</option>
                        <option value="USD">USD-American Dollar</option>
                        <option value="AUD">AUD-Australian Dollar</option>
                        <option value="KRW">KRW-South korean Won</option>
                        <option value="JPY">JPY-Japanese Yen</option>
                        <option value="MXN">MXN-Mexican Peso</option>
                        <option value="GBP">GBP-UK Pond</option>
                        <option value="EUR">EUR-EURO</option>
                        <option value="SGD">SGD-Singapore Dollar</option>
                        <option value="MYR">MYR-Malasian Ringgit</option>
                        <option value="CNY">CNY-Chinese Yuan</option>
                        <option value="IDR">IDR-Indonesian Rupiah</option>
                        <option value="RUB">RUB-Russian Ruble</option>
                        <option value="BDT">BDT-Bangladeshi Taka</option>
                        <option value="BRL">BRL-Brazillian Real</option>
                        <option value="CAD">CAD-Canadian Dollar</option>
                    </select>
                </div>
            </>
        }      

        { notfound &&
            <>
                <div className='from-currency'>
                    <label htmlFor="">Enter From Currency</label>
                    <input type="text" value={fromcurr} onChange={(e)=>setFromcurr(e.target.value)} placeholder='Eg:India or INR' required/>
                </div> 
            
                <div className='to-currency'>
                    <label htmlFor="">Enter To Currency</label>
                    <input type="text" value={tocurr} onChange={(e)=>setTocurr(e.target.value)} placeholder='Eg:India or INR' required/>
                </div>
            </>
        }

        <div className="buttons">
            <button className='reset' onClick={reset}>Reset</button>
            <button className='convert' onClick={convert}>Convert</button>
            <button className='notfound1' onClick={()=>setNotfound(!notfound)}> {notfound?'Revert':'Currency NotFound'}</button>
        </div>

        {loading &&  <p>Please wait...</p>}
        {!loading && err && <h4 className='err'>Invalid Input </h4>}
        {!loading && result && <div className="result">
            <div className='rate'>
                <h3>Currency Rate</h3>
                <h4>{currratefrom} {fromcurr} = {currrateto} {tocurr} </h4>
            </div>
            <div  className='res'>
                <h3>Conversion Amount</h3>
                <h4>{currfrom} {fromcurr} = {currto} {tocurr} </h4>

            </div>
        </div>}
      
    </div>
  )
}

export default Converter
