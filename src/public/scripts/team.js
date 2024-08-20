/**This file describes a team object which has 3 attributes
 * teamName: the name of the team which cannot be changed
 * firstPick: the name of the pick the team picked first this will intially be set to undefined when the draft starts
 * secondPick: is the same as firstPick except as the name implies it's the name of the team's second pick
 */

export function Team(teamName, teamFirstPick = null, teamSecondPick = null){
    return {
        teamName,
        firstPick: teamFirstPick,
        secondPick: teamSecondPick
    }
}

export function draftFirstPick(team, poiName){
    team.firstPick = poiName;
}

export function draftSecondPick(team, poiName){
    team.secondPick = poiName;
}

export function undraftFirstPick(team){
    team.firstPick = undefined;
}

export function undraftSecondPick(team){
    team.secondPick = undefined;
}

//tests for team1
// let team1 = Team('TSM');
// console.log(team1);
// draftFirstPick(team1, 'clima')
// console.log(team1);
// undraftFirstPick(team1)
// console.log(team1);
// draftSecondPick(team1,'hellsd')
// console.log(team1);
// draftFirstPick(team1, 'gjdssd')
// console.log(team1);
