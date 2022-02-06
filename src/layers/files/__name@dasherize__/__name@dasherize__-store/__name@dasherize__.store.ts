import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface <%= classify(name) %>State {

}

@Injectable()
export class <%= classify(name) %>Store extends ComponentStore<<%= classify(name) %>State> {
    constructor() {
        super({

        });
    }

}