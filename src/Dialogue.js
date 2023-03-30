import { Game } from "./Constants.js";

export class Prompt {
    constructor(text, speaker, choices) {
        this.text = text;
        this.choices = choices;
        this.speaker = speaker;
    }

    draw() {
        for (let choice of this.choices) {
            choice.addToHTML();
        }
        Game.UI.showTextBox();
        Game.UI.setDialogueText(this.text);
        Game.UI.setNPCName(this.speaker);
    }
}

export class Choice {
    constructor(text, next, callback) {
        this.next = next;
        this.text = text;
        this.callback = callback;
    }

    resolve() {
        if (this.next) {
            Game.Dialogue.setDialogueIndex(this.next);
        }
        if (this.callback) {
            this.callback();
        }
        return;
    }

    addToHTML() {
        let btn = document.createElement("div");
        btn.classList.add("button-div");
        btn.choice = this;
        btn.innerHTML = this.text;

        btn.addEventListener('click', () => {
            btn.choice.resolve();
            // game.audio.snipFX.play();
        })
        Game.UI.btnWrapper.appendChild(btn);
    }
}

Game.Dialogue = {
    script: {
        0: new Prompt("It's time to wake up, captain.", "Autopilot",
            [new Choice("Guh. Go away.", "1",)])
    }
}
Game.Dialogue.currentDialogue = "0";
Game.Dialogue.dialogueActive = false;

Game.Dialogue.setDialogueIndex = function (s) {
    Game.Dialogue.currentDialogue = s || "0";
    Game.UI.setDialogueText(Game.Dialogue.script[Game.Dialogue.currentDialogue].text);
    Game.UI.setNPCName(Game.Dialogue.script[Game.Dialogue.currentDialogue].speaker);
}