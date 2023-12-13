<a name="readme-top"></a>

# treeditor

![Static Badge](https://img.shields.io/badge/status-unstable-orange)

Graphical editor developed to create and adapt binary decision trees in
conjunction with the [treexpert][treexpert-url].

**Key Features**:

- **load** all existing trees in the treexpert database
- **create** new trees and tree kinds
- **update** existing trees, change values and/or the structure

## Getting started

These are the instructions of how the treeditor may be used with the treexpert
to build a decision tree.

### Prerequisites

- [Node.js](https://nodejs.org/about/releases) v18 (check with `node --version`)
- npm package manager (usually installed with Node.js)

[Here](https://v15.angular.io/guide/setup-local) you can find the installation
instructions to set up an Angular environment (currently version 15).

### How to install and start the treeditor

1. clone this repo `git clone https://github.com/DFKI-NI/treeditor.git`
2. move into the root of the project: `cd treeditor`
3. install all necessary packages including Angular: `npm install`
4. start development server: `ng serve`
5. make sure you also started the
   [`treexpert`][treexpert-url]
6. navigate to [`http://localhost:4200`](http://localhost:4200)

The development server will automatically reload if you change any of the
source files.

## License

Distributed under the BSD-2 License. See `LICENSE` for more information.

## Contact

Paula Kammler - [@codingpaula](https://github.com/codingpaula) -
[paula@kammler.co](mailto:paula@kammler.co)

## Förderhinweis

Gefördert im Rahmen des Forschungsprojekts "IQexpert" durch das BMEL -
Bundesministerium für Ernährung und Landwirtschaft.

FKZ: 281C202B19

Mehr Informationen hier auf der [Website des dfki][dfki-website].

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Angular Documentation

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To
use this command, you need to first add a package that implements end-to-end
testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS -->
[treexpert-url]: https://github.com/DFKI-NI/treexpert
[dfki-website]: https://www.dfki.de/web/forschung/projekte-publikationen/projekt/iqexpert
