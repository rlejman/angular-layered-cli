import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';
export interface Schema {
  name: string;
  path?: string;
  project?: string;
  onPushStrategy: boolean;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
// export function hello(_options: Schema): Rule {

//   return (tree: Tree, _context: SchematicContext) => {
//     const sourceTemplates = url('./files');

//     const sourceParametrizedTemplates = apply(sourceTemplates, [
//       template({
//         ..._options,
//         ...strings
//       })
//     ])
//     // tree.create('hello.js', `console.log("UDAŁO SIĘ ${name}!");`);
//     return mergeWith(sourceParametrizedTemplates)(tree, _context);
//   };
// }


function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function layers(_options: Schema): Rule {

  return async (tree: Tree, _context: SchematicContext) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);


    if (!_options.project && typeof workspace.extensions.defaultProject === 'string') {
      _options.project = workspace.extensions.defaultProject;
    }
    const project = (_options.project != null) ? workspace.projects.get(_options.project) : null;

    if (!project) {
      throw new SchematicsException(`Invalid project name: ${_options.project}`);
    }

    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

    if (_options.path === undefined) {
      _options.path = `${project.sourceRoot}/${projectType}`;
    }

    console.log('_options.path', _options.path);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO - dodaj ładny wyjątek jak niżej
    // const workspaceConfigBuffer = tree.read("angular.json");
    // if (!workspaceConfigBuffer) {
    //   throw new SchematicsException("Not an Angular Cli workspace");
    // }

    // const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    // const projectName = _options.project || workspaceConfig.defaultProject;
    // const project = workspaceConfig.projects[projectName];

    // const defaultProjectPath = buildDefaultPath(project);

    // const parsedPath = parseName(defaultProjectPath, _options.name);

    // const { name, path } = parsedPath;

    const sourceTemplates = url('./files');
    console.log('sourceTemplates', sourceTemplates);

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        name: _options.name
      }),
      move(normalize(_options.path))
    ])
    return chain([mergeWith(sourceParametrizedTemplates)]);
  };
}