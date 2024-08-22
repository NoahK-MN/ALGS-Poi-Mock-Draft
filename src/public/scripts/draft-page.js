import { loadTeamArray, saveTeams, teamArray } from "./teams.js";
import { loadPoiArrays, savePois, spPoiArray, wePoiArray} from "./pois.js";
import { attemptTodraftPoi, attemptToUndoPrevSelection, indexOfDraft, loadIndexOFDraft, resetDraftOrder, resetDraftPicks, isTeamDrafting, findIndexOfTeamDrafting } from "./draft-operations.js";
import { saveDraftToDB } from "./save-draft.js";
import { attemptToSwapTeam } from "./edit-order.js";
export const group1 = document.querySelector('.group1').innerText;
export const group2 = document.querySelector('.group2').innerText;
const undoButton = document.querySelector('.undo-btn');
const resetPicksButton = document.querySelector('.reset-team-picks-btn');
const resetTeamOrderButton = document.querySelector('.reset-team-order-btn');
const saveDraftButton = document.querySelector('.save-draft-btn');
const editDraftButton = document.querySelector('.edit-team-order-btn');
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
    let editing = editDraftButton.classList.contains('is-editing') ? 'team-btn' : '';
    let teamHTML = 
    `<div class="team-container-title">Pick</div>
    <div class="team-container-title">Team Name</div>
    <div class="team-container-title">First Pick</div>
    <div class="team-container-title">Second Pick</div>`;
    teamArray.forEach((team,index) =>{
        let isDrafting = isTeamDrafting(index) ? 'team-drafting' : '';
        let teamName = `${team.teamName}`;
        let firstPick = team.firstPick ? `${team.firstPick}` : ' ';
        let secondPick = team.secondPick ? `${team.secondPick}` : ' ';
        teamHTML += 
        `<div class="draft-position">${index+1}</div>
        <div class="${isDrafting} team-name ${editing}">${teamName}</div>
        <div class="${isDrafting}">${firstPick}</div>
        <div class="${isDrafting}">${secondPick}</div>`
    });
    document.querySelector('.team-container').innerHTML = teamHTML; 
    if (editDraftButton.classList.contains('is-editing')){
        generateTeamButtonEventListeners();
    }
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
            if (editDraftButton.classList.contains('is-editing')){
                alert('You must stop editing before you can start drafting');
                return;
            }
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

saveDraftButton.addEventListener('click', ()=>{
    if (indexOfDraft === 40){
        saveDraftToDB();
    }
    else {
        alert('You must finish a draft before you can save it');
    }
});

editDraftButton.addEventListener('click', ()=>{
    if (indexOfDraft !== 0){
        alert(`You Can't edit the order of draft that has already started`);
        return;
    }
    if (!editDraftButton.classList.contains('is-editing')){
        editDraftButton.classList.add('is-editing');
        generateTeamHTML();
    }
    else{
        editDraftButton.classList.remove('is-editing');
        generateTeamHTML();
    }
});

function generateTeamButtonEventListeners(){
    let teamButtons = document.querySelectorAll('.team-btn');
        teamButtons.forEach(button =>{
            button.addEventListener('click', ()=>{
                console.log(button.innerText);
                if (attemptToSwapTeam(button)){
                    generateTeamHTML();
                }
            });
        });
}