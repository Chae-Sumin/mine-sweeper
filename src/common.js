export function initStateArr(x,y,init) {
    let initArr = [];
    for(let i = 0; i < y; i++){
        let tempRow = [];
        for(let j = 0; j < x; j++){
            tempRow.push(init);
        }
        initArr.push(tempRow);
    }
    return initArr;
}

export function initMapArr(maxX, maxY, amount) {
    let initArr = initStateArr(maxX, maxY, 0);
    for (let i = 0; i < amount; i++) {
        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);
        while (initArr[y][x] == 'm') {
            x = Math.floor(Math.random() * maxX);
            y = Math.floor(Math.random() * maxY);
        }
        for (let a = -1; a <= 1; a++) {
            for (let b = -1; b <= 1; b++) {
                if(initArr[y+a] !== undefined && !isNaN(initArr[y+a][x+b])) {
                    initArr[y+a][x+b] += 1;
                }
            }
        }
        initArr[y][x] = 'm';
    }
    return initArr;
}

export function setState(x, y, state, setFunc, arr) {
    setFunc(arr.map((row,idx) => {
        if(idx == y) {
            row[x] = state;
        }
        return row;
    }));
};