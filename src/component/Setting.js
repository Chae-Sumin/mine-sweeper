import './Setting.css';
import React, { useEffect, useState } from 'react';

export default function Setting({diff, setDiff, children}) {
    let [row, setRow] = useState(diff[0]);
    let [col, setCol] = useState(diff[1]);
    let [amt, setAmt] = useState(diff[2]);
    useEffect(() => {
        setDiff([parseInt(row), parseInt(col), parseInt(amt)]);
    },[row, col, amt])
    const onChange = (e) => {
        switch (e.target.name) {
            case 'row':
                setRow(e.target.value);
                break;
            case 'col':
                setCol(e.target.value);
                break;
            case 'amt':
                setAmt(e.target.value);
                break;
            default:
                break;
        }
    }
    return (
        <div className="setting">
            <div className="diffForm">
                <div>
                    <label htmlFor="row">가로 개수(9~100)</label>
                    <input name="row" type="number" min="9" max="100" value={row} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="col">세로 개수(9~100)</label>
                    <input name="col" type="number" min="9" max="100" value={col} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="amt">지뢰 개수({'1~' + (row*col < 400 ? parseInt(row*col / 4) : 100)})</label>
                    <input name="amt" type="number" min="1" max={row*col < 400 ? row*col / 4 : 100} value={amt} onChange={onChange} />
                </div>
                {children}
            </div>
        </div>
    )
}