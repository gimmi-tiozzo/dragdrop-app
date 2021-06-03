import Cmp from "./base-component";
import { Validatable as Val, validate } from "../util/validation";
import { AutoBind as Ab } from "../decorators/autobind";
import { ProjectState } from "../state/project-state";

/**
 * Classe per la gestione della creazione di un progetto
 */
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");

        this.titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
        this.descriptionInputElement = <HTMLTextAreaElement>this.element.querySelector("#description");
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector("#people");

        //applica il contenuto del frammento all'elemento host
        this.configure();
        this.renderContent();
    }

    /**
     * Raccogli i valori degli input
     * @returns tupla con i valori raccolti
     */
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Val = { value: enteredTitle, required: true };
        const descriptionValidatable: Val = { value: enteredDescription, required: true, minLength: 5 };
        const peopleValidatable: Val = { value: +enteredPeople, required: true, min: 1, max: 5 };

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Valori di input non corretti!!!");
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    /**
     * Evento click submit per creazione Progetto
     * @param event Parametri evento
     */
    @Ab
    private submitHandler(event: Event): void {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            ProjectState.getInstance().addProject(...userInput);
            this.clearInput();
        }
    }

    private clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    /**
     * Associa la funziona handler al submit del form dei progetti
     */
    configure(): void {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}
}
