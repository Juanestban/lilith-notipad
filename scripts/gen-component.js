const path = require('path');
const fs = require('fs');
const { template } = require('./template_component');

console.log('[+] command [name component] --type=[component | view]');

const [, , nameComponent, flagType] = process.argv;

/**
 *
 * @param {string} flagType
 * @returns string
 */
const getValFromFlag = (flagType = '') => {
  const [, value] = flagType.toLowerCase().split('=');
  return value;
};

const static_type_file = {
  component: 'components',
  view: 'views',
};

const path_generated = ({ folder = '', component_name = '' }) =>
  path.join(
    process.cwd(),
    'apps/notipad/src/app',
    static_type_file[getValFromFlag(flagType)],
    folder, // will be the folder component with the same name of the component
    component_name
  );

const component = path_generated({
  folder: nameComponent,
  component_name: nameComponent,
});
const css_file = `${nameComponent}.module.css`;

const folder = path_generated({ folder: nameComponent });

if (!fs.existsSync(folder)) {
  // creating folder
  fs.mkdirSync(folder);
}

// component.tsx
fs.writeFileSync(
  `${component}.tsx`,
  template({ css_file, component_name: nameComponent })
);

// index.ts
fs.writeFileSync(
  `${path_generated({ folder: nameComponent, component_name: 'index' })}.ts`,
  `export { default as ${nameComponent} } from './${nameComponent}';\nexport type { ${nameComponent}Props } from './${nameComponent}';`
);

// component.module.css
fs.writeFileSync(`${component}.module.css`, ``);
