import { <% if (onPushStrategy) { %>ChangeDetectionStrategy, <% } %>Component, <% if (destroySubject) { %>OnDestroy,<% } %> OnInit } from '@angular/core';
import { <%= classify(name) %>Facade } from './<%= dasherize(name) %>.facade';
<% if (destroySubject) { %>import { Subject } from 'rxjs';<% }
%>
@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss'],
  <% if (onPushStrategy) { %>changeDetection: ChangeDetectionStrategy.OnPush,<% } %>
  providers: [<%= classify(name) %>Facade]
})

export class <%= classify(name) %>Component implements OnInit<% if (destroySubject) { %>, OnDestroy<% } %> {
  <% if (destroySubject) { %>private readonly _destroy = new Subject<void>();
  <% } %>
  constructor(
    private readonly <%= camelize(name) %>Facade: <%= classify(name) %>Facade,
  ) { }

  ngOnInit(): void {}

<% if (destroySubject) { %>
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.unsubscribe();
  }
<% } %>
}
