import { loadTeamArray, saveTeams, teamArray } from "./teams.js";
import { loadPoiArrays, savePois, spPoiArray, wePoiArray} from "./pois.js";
import { attemptTodraftPoi, attemptToUndoPrevSelection, indexOfDraft, loadIndexOFDraft, resetDraftOrder, resetDraftPicks, isTeamDrafting, findIndexOfTeamDrafting } from "./draft-operations.js";
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
    let indexOfTeamDrafting = findIndexOfTeamDrafting(indexOfDraft);
    let team = teamArray[indexOfTeamDrafting];
    if (indexOfDraft !== 40){
        document.querySelector('.draft-message').innerText = `Pick #${indexOfDraft+1} ${team.teamName}`;
    } else{
        document.querySelector('.draft-message').innerText = 'Draft is Over';
    }
    // document.querySelector('.index').innerHTML = indexOfDraft; implement this properly 
    //where it says the team name as well as the current draft pick
}

function generateTeamHTML(){
    let teamHTML = 
    `<div class="team-container-title">Team Name</div>
    <div class="team-container-title">First Pick</div>
    <div class="team-container-title">Second Pick</div>`;
    teamArray.forEach((team,index) =>{
        let isDrafting = isTeamDrafting(index) ? 'team-drafting' : '';
        let teamName = `${team.teamName}`;
        let firstPick = team.firstPick ? `${team.firstPick}` : ' ';
        let secondPick = team.secondPick ? `${team.secondPick}` : ' ';
        teamHTML += 
        `<div class="${isDrafting}">${teamName}</div>
        <div class="${isDrafting}">${firstPick}</div>
        <div class="${isDrafting}">${secondPick}</div>`
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
    if(attemptToUndoPrevSelection()){ //only re-renders page if the undo was successful
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

