import { Team, undraftFirstPick, undraftSecondPick } from "./team.js";
import { group1, group2 } from "./draft-page.js";
export let teamArray;

export function loadTeamArray(){
    teamArray = getTeamsFromStorage() || generateTeamArray();
}

function generateTeamArray(){
    let groups = {
        'A' : ['Falcons', 'SSG', 'E8', 'Oxygen', 'NRG', 'YUP', 'Most Hated', 'CCE UCX', 'Weave', 'KCP'],
        'B' : ['Moist', 'LG', 'TSM', 'Complexity', 'Bleed', 'EEC', 'MPIRE', 'Fluffy Aimers', 'NGNL', 'Bored'],
        'C' : ['Cloud9', 'DSG', 'Liquid', 'Furia', 'Vanity','N8V', 'Oblivion', 'Flat', 'Stallions', 'Tempr']
    };
    let newTeamArray = groups[group1].concat(groups[group2]);
    randomizeDraftOrder(newTeamArray);
    let mappedTeamArray = newTeamArray.map(teamName =>{
        return Team(teamName);
    });
    saveTeamsToStorage(mappedTeamArray);
    return mappedTeamArray;
}

function randomizeDraftOrder(newTeamArray){
    let index = newTeamArray.length;
    while (index != 0){
        let randomIndex = Math.floor(Math.random() * index);
        index --;
        [newTeamArray[index], newTeamArray[randomIndex]] = [newTeamArray[randomIndex], newTeamArray[index]]; 
    }
}

export function saveTeamsToStorage(teamArray){
    localStorage.setItem(`team-array${group1}${group2}`, JSON.stringify(teamArray));
}

export function getTeamsFromStorage(){
    return JSON.parse(localStorage.getItem(`team-array${group1}${group2}`));
}

function removeTeamsFromStorage(){
    localStorage.removeItem(`team-array${group1}${group2}`);
}

export function saveTeams(){
    saveTeamsToStorage(teamArray);
}

export function resetTeams(){
    removeTeamsFromStorage();
    loadTeamArray();
}

export function resetTeamPicks(){
    teamArray.forEach(team =>{
        undraftFirstPick(team);
        undraftSecondPick(team);
    });
    saveTeamsToStorage(teamArray);
}

export function resetTeamOrder(){
    resetTeams();
}
