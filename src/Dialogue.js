Game.Dialogue = {}
Game.Dialogue.currentDialogue = "0000";
Game.Dialogue.dialogueActive = false;

Game.Dialogue.setDialogueIndex = function(s) {
    Game.Dialogue.currentDialogue = s || "0000";
}