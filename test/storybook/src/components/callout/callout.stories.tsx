import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda fugit quod animi, temporibus, ad molestiae asperiores mollitia aperiam quae ipsa magnam fugiat recusandae corporis accusamus veritatis debitis velit nostrum?',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'information', 'success', 'danger', 'warning'],
    },
  },
} satisfies Meta;

export default meta;
export type Story = StoryObj<typeof Callout>;

export const Primary: Story = {
  args: {
    title: 'Primary',
    variant: 'primary',
  },
};
export const Information: Story = {
  args: {
    title: 'Information',
    variant: 'information',
  },
};
export const Success: Story = {
  args: {
    title: 'Success',
    variant: 'success',
  },
};
export const Danger: Story = {
  args: {
    title: 'Danger',
    variant: 'danger',
  },
};
export const Warning: Story = {
  args: {
    title: 'Warning',
    variant: 'warning',
  },
};
