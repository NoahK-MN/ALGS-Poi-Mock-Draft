import { draftFirstPick, draftSecondPick, undraftFirstPick, undraftSecondPick } from "./team.js";
import { selectPoi, unselectPoi } from "./poi.js";
import { resetTeamOrder, resetTeamPicks, teamArray } from "./teams.js";
import { findPoi, resetPois } from "./pois.js";
import { group1, group2 } from "./draft-page.js";
/**The poi draft is a snake draft (the team who picks first picks last, 2nd pick 2nd last etc..) 
 * Rules for Draft Selection
 * Team must pick one poi from each map 
 * A team cannot choose a poi if it was already chosen by another team 
 * If the user running the mock draft makes a mistake for a team's pick they may undo it. 
*/
export let indexOfDraft;
export function loadIndexOFDraft(){
    indexOfDraft = JSON.parse(localStorage.getItem(`index${group1}${group2}`)) || 0;
}

export function attemptTodraftPoi(poiName){
    let poi = findPoi(poiName);
    let indexOfTeamDrafting = findIndexOfTeamDrafting(indexOfDraft);
    let teamDrafting = teamArray[indexOfTeamDrafting];
    let message = checkForValidSelection(poi, teamDrafting);
    if (message){ //check for ValidSelection only returns a message if the pick was invalid. 
        return message;
    }
    draftPoi(poi, teamDrafting); 
    advanceDraftIndex();
    return null; //
}

/**This function determines if a team can draft a Poi if it can't it will return a string detailing why
 * Scenario 1: Poi was drafted by a different team (Invalid)
 * Scenario 2: Team hasn't made any draft Pick (valid)
 * Scenario 3: Team's first pick was a poi on the same map as the second (Invalid)
 * Scenario 4: The team already has 2 pois (this only happens if every team has 2 pois meaning the draft is over) (Invalid)
 * Scenario 5: the team's second pick has a different map than the first pick (valid)
 */
function checkForValidSelection(poi, team){
    if (poi.isDrafted){
        return 'That poi was already selected'
    }
    if (!team.firstPick){
        return null; 
    }
    let firstPick = findPoi(team.firstPick);
    if (firstPick.map === poi.map){
        return 'You cannot select two pois on the same map'; 
    }
    if (team.secondPick){
        return 'The Draft is Over';
    }
    return null;
}

function draftPoi(poi, team){
    selectPoi(poi);
    if (!team.firstPick){
        draftFirstPick(team, poi.poiName);
    } else {
        draftSecondPick(team, poi.poiName);
    }
}

/**if index is lte 19 that means we are in the first round of the snake draft and we treat it as normal
 * Otherwise we are in the second round of the draft and must start from the back of the array
 * In order to do this we subtract 20 from our index so that we within the arrays bounds
 * We then subtract that number from 19 to get the index we need starting at the back of the array
 * for example 20-20 = 0 --> 19- 0 = 19 meaning that the team picking @ the 20th draftIndex is the same as the
 * one at the 19th which follows our snake draft order 
 * finally if the draft is over (we reach index 40) we want to just look at the first index of the draft since
 * this will cause the our validation function will see the draft is over 
 */ 
function findIndexOfTeamDrafting(index){
    if (index <= 19) return index 
    index -= 20; 
    return (19 - index >= 0) ? (19-index) : 0;
}

function advanceDraftIndex(){
    indexOfDraft++; 
    saveDraftIndexToStorage();
}

function decreaseDraftIndex(){
    indexOfDraft--;
    saveDraftIndexToStorage();
}

function saveDraftIndexToStorage(){
    localStorage.setItem(`index${group1}${group2}`, indexOfDraft);
}

function removeDraftIndexFromStorage(){
    localStorage.removeItem(`index${group1}${group2}`);
}
export function resetDraftIndex(){
    removeDraftIndexFromStorage();
    loadIndexOFDraft();
}
/**This function attempts to undo the user's previous selection 
 * The only reason we can't undo a previous selection is if there have been no selections 
 * only we decrease the draft index to go back to the team with the previous pick and undo their previous pick
 */
export function attemptToUndoPrevSelection(){
    if(!checkForValidUndo()){
        return;
    }
    decreaseDraftIndex();
    let indexOfTeamDrafting = findIndexOfTeamDrafting(indexOfDraft);
    let teamDrafting = teamArray[indexOfTeamDrafting];
    undoPreviousSelection(teamDrafting);
    return true;
}

function undoPreviousSelection(team){
    if (team.secondPick){
        let poi = findPoi(team.secondPick);
        unselectPoi(poi);
        undraftSecondPick(team);
    } else {
        let poi = findPoi(team.firstPick);
        unselectPoi(poi);
        undraftFirstPick(team);
    }
}
function checkForValidUndo(){
    if (indexOfDraft === 0 && !teamArray[0].firstPick){ //this means we haven't had any picks in the draft
        return false;
    }
    return true;
}

export function resetDraftPicks(){
    resetTeamPicks();
    resetPois();
    resetDraftIndex();
}

export function resetDraftOrder(){
    resetTeamOrder();
    resetPois();
    resetDraftIndex();
}
export function isTeamDrafting(index){
    return index === findIndexOfTeamDrafting(indexOfDraft) && indexOfDraft < 40;
}