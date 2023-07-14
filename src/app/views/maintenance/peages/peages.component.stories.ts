import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { PeagesComponent } from './peages.component';
import { PeagesModule } from './peages.module';

type ComponentWithCustomControls = PeagesComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Peages',
  component: PeagesComponent,
  decorators: [
    moduleMetadata({
      imports: [PeagesModule],
    }),
  ],
  parameters: {
    docs: { description: { component: `Peages` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

const Template: Story<ComponentWithCustomControls> = (
  args: ComponentWithCustomControls
) => ({ props: args });

export const Peages = Template.bind({});
Peages.args = {};
