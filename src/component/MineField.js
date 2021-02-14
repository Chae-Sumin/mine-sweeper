import './MineField.css';
import React, { useEffect, useState } from 'react'
import { initMapArr, initStateArr, setState } from '../common.js';
import { Link } from 'react-router-dom';

export default function MineField(props) {
    const {location : loc, history : his} = props;
    const {diff, cursor, func} = loc.state;
    const [x, y, amount] = diff;
    console.log((x*y < 400 ? x*y / 4 : 100));
    console.log(props);
    if(!(amount > 0 && amount < (x*y < 400 ? x*y / 4 : 100))
    || !(x > 8 && x < 101) 
    || !(y > 8 && y < 101)){
        his.push('/');
    }
    // 최초 값 설정
    const [stateArr, setStateArr] = useState(initStateArr(x, y, 'cover'));
    const [mapArr] = useState(initMapArr(x, y, amount));
    const [result, setResult] = useState('');
    const [now, setNow] = useState([x*y, 0, 0]);
    useEffect(() => {
        let cover = 0;
        let mine = 0;
        let mark = 0;
        stateArr.forEach((row) => {
            row.forEach((col) => {
                switch (col) {
                    case 'cover':
                        cover++;
                        break;
                    case 'm':
                    case 'flag':
                        mine++
                        break;
                    case 'mark':
                        mark++;
                        break;
                    default:
                        break;
                }
            });
        });
        setNow([cover,mine,mark]);
        if(result !== 'burst' && cover +  mine == amount) win();
    },[stateArr])
    //, 'open', setStateArr, stateArr
    const openFunc = (x, y, isRecurse = false) => {
        if(mapArr[y] == undefined) return false;
        if(stateArr[y][x] !== 'cover') return false;
        switch (mapArr[y][x]) {
            case undefined: break;
            case 'm':
                if(!isRecurse) {
                    burst();
                    setStateArr(mapArr);
                }
                break;
            case 0:
                setState(x, y, mapArr[y][x], setStateArr, stateArr);
                for (let a = -1; a <= 1; a++) {
                    for (let b = -1; b <= 1; b++) {
                        openFunc(x+a, y+b, true);
                    }
                }
                break;
            default:
                setState(x, y, mapArr[y][x], setStateArr, stateArr);
                break;
        }
    }
    const onClick = (x, y, state, e) => {
        e.preventDefault();
        if(stateArr[y][x] !== 'cover' && stateArr[y][x] !== 'flag' && stateArr[y][x] !== 'mark') return false;
        switch (state) {
            case 'open':
                openFunc(x, y);
                break;
            default:
                setState(x, y, state, setStateArr, stateArr);
                break;
        }
    }
    const rightClick = (x, y, e) => {
        e.preventDefault();
        switch (stateArr[y][x]) {
            case 'cover':
                setState(x, y, 'flag', setStateArr, stateArr);
                break;
            case 'flag':
                setState(x, y, 'mark', setStateArr, stateArr);
                break;
            case 'mark':
                setState(x, y, 'cover', setStateArr, stateArr);
                break;
            default:
                break;
        }
    }
    const burst = () => {
        setResult('burst');
        console.log('burst');
    }
    const win = () => {
        setResult('win');
        console.log('win');
    }
    const renderMine = stateArr.map((rowState,ridx) => (
        <div className={'row-' + ridx} key={ridx}>
            {rowState.map((state,cidx)=>(
                <div className={'col-' + cidx} key={ridx + '-' + cidx}>
                    <button type="button" onClick={(e)=>onClick(cidx, ridx, cursor, e)} onContextMenu={(e)=>{rightClick(cidx, ridx, e)}} data-value={state}>
                        <span>{stateArr[ridx][cidx]}</span>
                    </button>
                </div>
            ))}
        </div>
    ));

    return (
        <div className="mine-field" data-cursor={cursor} data-size={x > 60 ? 'xl' : x > 40 ? 'l' : x > 20 ? 'm' : 's'}>
            {renderMine}
            <div className={"result " + result}>
                <div>
                    <span>{result == 'burst' ? 'You Burst' : 'You Win!'}</span>
                    <span>
                        <button type="button" onClick={()=> window.location.reload()}>{result == 'burst' ? 'Retry' : 'new game'}</button>
                        <Link to="/"><button type="button">Go Home</button></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}