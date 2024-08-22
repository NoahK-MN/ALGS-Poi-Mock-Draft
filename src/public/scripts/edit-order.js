import { findIndexOfTeam, swapIndexOfTeams } from "./teams.js";

export function attemptToSwapTeam(button){
    let currentButton = document.querySelector('.team-selected');
    if (!currentButton){ //this is our first button we press and we mark it as such
        button.classList.add('team-selected');
        return false;
    }
    currentButton.classList.remove('team-selected');
    swapOrder(currentButton, button);
    return true;
}

export function swapOrder(button1, button2){
    const teamName1 = button1.innerText;
    const teamName2 = button2.innerText;
    const index1 = findIndexOfTeam(teamName1);
    const index2 = findIndexOfTeam(teamName2);
    swapIndexOfTeams(index1, index2);
}