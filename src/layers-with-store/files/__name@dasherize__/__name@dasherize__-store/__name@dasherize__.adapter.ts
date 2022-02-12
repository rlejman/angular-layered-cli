import { Injectable } from "@angular/core";
import { <%= classify(name) %>Store } from "./<%= dasherize(name) %>.store";

@Injectable()
export class <%= classify(name) %>StoreAdapter {
    constructor(private readonly <%= camelize(name) %>Store: <%= classify(name) %>Store) { }

}