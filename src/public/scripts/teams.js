import { Team } from "./team.js";
export let teamArray;

loadTeamArray();

export function loadTeamArray(){
    teamArray = getTeamsFromStorage() || generateTeamArray();
    console.log(teamArray)
}

function generateTeamArray(){
    let groups = {
        'A' : ['Falcons', 'SSG', 'E8', 'Oxygen', 'NRG', 'YUP', 'Most Hated', 'CCE UCX', 'Weave', 'KCP'],
        'B' : ['Moist', 'LG', 'TSM', 'Complexity', 'Bleed', 'EEC', 'MPIRE', 'Fluffy Aimers', 'NGNL', 'Bored'],
        'C' : ['Cloud9', 'DSG', 'Liquid', 'Furia', 'Vanity','N8V', 'Oblivion', 'Flat', 'Stallions', 'Tempr']
    };
    const group1 = document.querySelector('.group1').innerText;
    const group2 = document.querySelector('.group2').innerText;
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

export function saveTeamsToStorage(newTeamArray){
    localStorage.setItem('team-array', JSON.stringify(newTeamArray));
}

export function getTeamsFromStorage(){
    return JSON.parse(localStorage.getItem('team-array'));
}

export function removeTeamsFromStorage(){
    localStorage.removeItem('team-array');
}

