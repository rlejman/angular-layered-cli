import { Injectable } from '@angular/core';
import { <%= classify(name) %>StoreAdapter } from './<%= dasherize(name) %>-store/<%= dasherize(name) %>.adapter';

@Injectable()
export class <%= classify(name) %>Facade {

    constructor(
        private readonly <%= camelize(name) %>StoreAdapter: <%= classify(name) %>StoreAdapter
    ) { }

}
