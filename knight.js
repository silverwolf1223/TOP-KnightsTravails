let knightMovement = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
traveled = [];

function knightMoves(startCoords, endCoords){
    let q = [new coordObj(startCoords)];

    traveled.push(startCoords);

    let output;

    while(q.length > 0){
        currentMoves = findMoves(q[0])
        
        currentMoves.forEach((coord) => {
            if(arrayEquals(coord.coord, endCoords)) {
                output = coord.prev;
                output.push(coord.coord);
                q = [];
                currentMoves = [];
            }else{
                q.push(coord);
            }
        })
        q.splice(0,1);
    }

    console.log("You made it in " + (output.length - 1) + " moves! Here's your path:")
    output.forEach((move) => {
        console.log(move)
    })
}

function findMoves(coords){
    let coordVals = coords.coord;
    let moveArr = [];

    knightMovement.forEach((movement) => {
        let skip = false;
        let move = [coordVals[0] + movement[0], coordVals[1] + movement[1]];
        if(move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8){
            traveled.forEach((travelCoord) => {
                if(arrayEquals(move, travelCoord)){
                    skip = true;
                }
            })
            if(!skip){
                let newCoord = new coordObj(move, [...coords.prev, coordVals]);
                moveArr.push(newCoord);

                traveled.push(move);
            }
        }
    })

    return moveArr;
}

const coordObj = function(coord, prev = []){
    this.coord = coord;
    this.prev = prev;
}

function arrayEquals(arr1, arr2){
    if(arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
    return false;
}

knightMoves([0, 0],[3, 3])

