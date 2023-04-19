const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/numberInput-remove-allowEmptyInput');

ruleTester.run("numberInput-remove-allowEmptyInput", rule, {
  valid: [
    {
      code: `import { NumberInput } from '@patternfly/react-core'; <NumberInput />`,
    },
    {
      code: `import { NumberInput } from '@patternfly/react-core/dist/esm/components/NumberInput/index.js'; <NumberInput />`,
    },
    {
      // No @patternfly/react-core import
      code: `<NumberInput allowEmptyInput />`,
    }
  ],
  invalid: [
    {
      code:   `import { NumberInput } from '@patternfly/react-core'; <NumberInput allowEmptyInput />`,
      output: `import { NumberInput } from '@patternfly/react-core'; <NumberInput  />`,
      errors: [{
        message: `allowEmptyInput prop has been removed for NumberInput, allowing empty input is now the default behavior.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { NumberInput } from '@patternfly/react-core/dist/esm/components/NumberInput/index.js'; <NumberInput allowEmptyInput />`,
      output: `import { NumberInput } from '@patternfly/react-core/dist/esm/components/NumberInput/index.js'; <NumberInput  />`,
      errors: [{
        message: `allowEmptyInput prop has been removed for NumberInput, allowing empty input is now the default behavior.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
