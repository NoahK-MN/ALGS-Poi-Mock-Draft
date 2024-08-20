import { loadTeamArray, saveTeams, teamArray } from "./teams.js";
import { loadPoiArrays, savePois, spPoiArray, wePoiArray} from "./pois.js";
import { attemptTodraftPoi, attemptToUndoPrevSelection, indexOfDraft, loadIndexOFDraft, resetDraftOrder, resetDraftPicks } from "./draft-operations.js";
export const group1 = document.querySelector('.group1').innerText;
export const group2 = document.querySelector('.group2').innerText;
const undoButton = document.querySelector('.undo-btn');
const resetPicksButton = document.querySelector('.reset-team-picks-btn');
const resetTeamOrderButton = document.querySelector('.reset-team-order-btn');

renderPageHTML(); 
function renderPageHTML(){
    loadPoiArrays();
    loadTeamArray();
    loadIndexOFDraft();
    generatePoiHTML();
    generateTeamHTML();
    document.querySelector('.index').innerText = indexOfDraft;
}

function generateTeamHTML(){
    let teamHTML = "";
    teamArray.forEach(team =>{
        let teamName = `${team.teamName}`;
        let firstPick = team.firstPick ? `${team.firstPick}` : 'FIRST PICK';
        let secondPick = team.secondPick ? `${team.secondPick}` : 'SECOND PICK';
        teamHTML += 
        `<div>${teamName}</div>
        <div>${firstPick}</div>
        <div>${secondPick}</div>`
    });
    document.querySelector('.team-container').innerHTML = teamHTML; 
}

function generatePoiHTML(){
    let wePoiHTML = ''; 
    let spPoiHTML = '';
    wePoiArray.forEach(poi =>{
        let isDrafted = poi.isDrafted ? 'is-drafted' : '';
        wePoiHTML += `<button class="poi-btn we-poi-btn ${isDrafted}">${poi.poiName}</button>`
    });
    spPoiArray.forEach(poi =>{
        let isDrafted = poi.isDrafted ? 'is-drafted' : '';
        spPoiHTML += `<button class="poi-btn sp-poi-btn ${isDrafted}">${poi.poiName}</button>`
    });
    document.querySelector('.we-pois-container').innerHTML = wePoiHTML;
    document.querySelector('.sp-pois-container').innerHTML = spPoiHTML; 
    let poiButtons = document.querySelectorAll('.poi-btn');
    poiButtons.forEach(button =>{
        button.addEventListener('click', () =>{
            let poiName = button.innerText;
            let message = attemptTodraftPoi(poiName);
            if(message){
                alert(`${message}`);
            }
            saveTeams();
            savePois();
            renderPageHTML();
        })
    })
}

undoButton.addEventListener('click', () =>{
    if(attemptToUndoPrevSelection()){
        saveTeams();
        savePois();
        renderPageHTML();
    }
});

resetPicksButton.addEventListener('click', () =>{
    resetDraftPicks();
    renderPageHTML();
});

resetTeamOrderButton.addEventListener('click', () =>{
    resetDraftOrder();
    renderPageHTML();
});

