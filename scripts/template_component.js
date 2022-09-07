/* eslint-disable camelcase */

const template = ({ css_file, component_name }) =>
  `import { FC } from 'react';
import cn from 'classnames';

import s from './${css_file}';

interface ${component_name}Props {
  //  ...
}

const ${component_name}: FC<${component_name}Props> = (props) => {
  const classes = cn(s.test);

  return (
    <h1 className={classes}>Hello I'm a component called ${component_name}</h1>
  )
}

export default ${component_name}
export type { ${component_name}Props }
`;

module.exports = { template };
