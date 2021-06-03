import { Project, ProjectStatus } from "../models/project";

/**
 * Listener
 */
type Listener<T> = (projects: T[]) => void;

/**
 * Singleton che rappresenta lo stato dell'applicativo
 */
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

/**
 * Singleton che rappresenta lo stato dell'applicativo
 */
export class ProjectState extends State<Project> {
    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!ProjectState.instance) {
            ProjectState.instance = new ProjectState();
        }

        return ProjectState.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);

        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
