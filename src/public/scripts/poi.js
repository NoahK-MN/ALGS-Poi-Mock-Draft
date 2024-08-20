export function Poi(poiName, isDrafted = false){
    return {
        poiName,
        isDrafted
    }
}

export function selectPoi(poi){
    poi.isDrafted = true;
}

export function unselectPoi(poi){
    poi.isDrafted = false; 
}

//test for poi
// let poi = Poi('clima');
// console.log(poi);
// selectPoi(poi)
// console.log(poi)
// unselectPoi(poi);
// console.log(poi);