import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
    size: 'md',
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Text to display on the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
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

export const Dark: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
};

export const Mobile1: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
