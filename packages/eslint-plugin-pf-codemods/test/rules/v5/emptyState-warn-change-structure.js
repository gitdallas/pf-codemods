const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-warn-change-structure");

ruleTester.run("emptyState-warn-change-structure", rule, {
  valid: [
    {
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
    },
    {
      code: `import { EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
      <>
        <EmptyState>
          <EmptyStateBody>
            Some other content.
          </EmptyStateBody>
        </EmptyState>
        <Title>No need for EmptyStateHeader</Title>
      </>`,
    },
    {
      code: `import { EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
      <>
        <EmptyState>
          <EmptyStateBody>
            <Title>Should not import EmptyStateHeader, because this Title is not on the top level of EmptyState</Title>
          </EmptyStateBody>
        </EmptyState>
      </>`,
    },
    {
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
    },
    {
      // No @patternfly/react-core import
      code: `<EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyState>`,
    },
  ],
  invalid: [
    {
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyState>`,
      output: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon,  } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
      errors: [
        {
          message: `add missing imports EmptyStateHeader, EmptyStateFooter from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `We've added an EmptyStateHeader sub-component which should be used instead of passing Title and EmptyStateIcon directly as children to EmptyState.`,
          type: "JSXElement",
        },
        {
          message: `We've added the EmptyStateFooter sub-component, which should be added to wrap content after EmptyStateBody.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, Title } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; 
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h5" size="4xl">
          Empty state
        </Title>
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyState>`,
      output: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon,  } from '@patternfly/react-core/dist/esm/components/EmptyState/index.js'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
      errors: [
        {
          message: `add missing imports EmptyStateHeader, EmptyStateFooter from @patternfly/react-core/dist/esm/components/EmptyState/index.js`,
          type: "ImportDeclaration",
        },
        {
          message: `We've added an EmptyStateHeader sub-component which should be used instead of passing Title and EmptyStateIcon directly as children to EmptyState.`,
          type: "JSXElement",
        },
        {
          message: `We've added the EmptyStateFooter sub-component, which should be added to wrap content after EmptyStateBody.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // EmptyStateHeader and EmptyStateFooter imports are added in the second rule run
      code: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
      output: `import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateIcon, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core'; 
      <EmptyState>
        <EmptyStateHeader titleText="Empty state" icon={<EmptyStateIcon icon={CubesIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          Some other content.
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary">Primary action</Button>
        </EmptyStateActions>
        <EmptyStateActions>
          <Button variant="link">Multiple</Button>
          <Button variant="link">Action Buttons</Button>
          <Button variant="link">Here</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>`,
      errors: [
        {
          message: `add missing imports EmptyStateHeader, EmptyStateFooter from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
