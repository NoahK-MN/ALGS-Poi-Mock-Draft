import { Poi } from "./poi.js";
import { group1, group2 } from "./draft-page.js";
export let wePoiArray, spPoiArray;

export function loadPoiArrays(){
    //since both poi arrays are set, saved, and removed at the same time this tenanary operation is checking
    // if local storage has the we-poi-array if it doesnt then we generate both arrays otherwise we get the arrays from local storage
    [wePoiArray, spPoiArray] = getPoisFromStorage()[0] != null ? getPoisFromStorage() : generatePoiArrays();
}

export function generatePoiArrays(){
    const newWePoiArray = ['Skyhook East', 'Skyhook West', 'Countdown', 'Lava Fissure',
        'Landslide', 'Mirage A Trois', 'Staging', 'Thermal Station', 'Harvester',
        'The Tree', 'Siphon West', 'Siphon East', 'Launch Site', 'The Dome', 'Stacks',
        'Big Maude', 'The Geyser', 'Fragment', 'Monument', 'Survey Camp', 'The Epicenter',
        'Climatizer West', 'Climatizer East', 'Overlook'];
    const newSpPoiArray = ['Checkpoint North', 'Checkpoint South', 'Trident',
        'North Pad', 'Downed Beast', 'The Mill', 'Cenote Cave', 'Barometer South',
        'Barometer North', 'Ceto Station', 'Cascade Falls', 'Command Center', 'The Wall', 'Zeus Station',
        'Lightning Rod', 'Cliff Slide', 'Storm Catcher', 'Prowler\'s Nest', 
        'Launch Pad', 'Devastated Coast', 'Echo HQ', 'Coastal Camp', 'The Pylon', 'Jurassic', 'Lift'];
    
    const mappedWeArray = newWePoiArray.map(poiName => { //map the arrays so our poi arrays for each map contain Poi objects
        return Poi(poiName, 'we');
    });
    const mappedSpArray = newSpPoiArray.map(poiName => {
        return Poi(poiName, 'sp');
    });
    savePoisToStorage(mappedWeArray, mappedSpArray);
    return[mappedWeArray, mappedSpArray];
}

function savePoisToStorage(weArray, spArray){
    localStorage.setItem(`we-poi-array${group1}${group2}`, JSON.stringify(weArray));
    localStorage.setItem(`sp-poi-array${group1}${group2}`, JSON.stringify(spArray));
}

function getPoisFromStorage(){
    return [JSON.parse(localStorage.getItem(`we-poi-array${group1}${group2}`)), JSON.parse(localStorage.getItem(`sp-poi-array${group1}${group2}`))];
}

function removePoisFromStorage(){
    localStorage.removeItem(`we-poi-array${group1}${group2}`);
    localStorage.removeItem(`sp-poi-array${group1}${group2}`);
}

export function savePois(){
    savePoisToStorage(wePoiArray, spPoiArray);
}
export function resetPois(){
    removePoisFromStorage();
    loadPoiArrays();
}

export function findPoi(poiName){ //finds our poi from one of the two arrays
    return wePoiArray.find(poi => poi.poiName === poiName) || spPoiArray.find(poi => poi.poiName === poiName); 
}
