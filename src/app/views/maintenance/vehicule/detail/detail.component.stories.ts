import { Meta, StoryObj } from '@storybook/angular';

import { DetailComponent } from './detail.component';

type ComponentWithCustomControls = DetailComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Detail',
  component: DetailComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Detail` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Detail: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
