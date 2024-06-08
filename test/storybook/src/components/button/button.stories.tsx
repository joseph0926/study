import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
    size: 'md',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const SM: Story = {
  args: {
    size: 'sm',
  },
};
export const MD: Story = {
  args: {
    size: 'md',
  },
};
export const LG: Story = {
  args: {
    size: 'lg',
  },
};
