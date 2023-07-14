import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { GestioncarburantTableComponent } from './gestioncarburant-table.component';
import { GestioncarburantTableModule } from './gestioncarburant-table.module';

type ComponentWithCustomControls = GestioncarburantTableComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Gestioncarburant Table',
  component: GestioncarburantTableComponent,
  decorators: [
    moduleMetadata({
      imports: [GestioncarburantTableModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `GestioncarburantTable` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const GestioncarburantTable = Template.bind({});
GestioncarburantTable.args = {};
