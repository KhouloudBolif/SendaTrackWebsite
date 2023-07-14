import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PeagesTableComponent } from './peages-table.component';
import { PeagesTableModule } from './peages-table.module';

type ComponentWithCustomControls = PeagesTableComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Peages Table',
  component: PeagesTableComponent,
  decorators: [
    moduleMetadata({
      imports: [PeagesTableModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `PeagesTable` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const PeagesTable = Template.bind({});
PeagesTable.args = {};
