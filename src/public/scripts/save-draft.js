import { teamArray } from "./teams.js";
import { group1, group2 } from "./draft-page.js";


export async function saveDraftToDB(){
    let response;
    try {
        response = await fetch('http://localhost:3000/account/status');
    } catch {
        console.log('Error verifiying account status');
        return
    }
    try {
        const user = await response.json();
        const username = user.username;
        if (!username){
            alert('you must be signed in to save a draft');
            return;
        }
        await fetch('http://localhost:3000/saved-drafts', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username,
                groups: `${group1} vs ${group2}`,
                teamArray
            })  
        });
        alert('Draft Saved');
    } catch (err){
        console.log(err);
    }
}