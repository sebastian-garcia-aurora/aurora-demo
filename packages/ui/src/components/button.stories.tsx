import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    onClick: { action: "clicked" },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="space-y-4 p-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Variants
        </p>
        <div className="flex flex-wrap gap-2">
          <Button {...args} variant="default">Default</Button>
          <Button {...args} variant="outline">Outline</Button>
          <Button {...args} variant="secondary">Secondary</Button>
          <Button {...args} variant="ghost">Ghost</Button>
          <Button {...args} variant="destructive">Destructive</Button>
          <Button {...args} variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button {...args} size="xs">Extra Small</Button>
          <Button {...args} size="sm">Small</Button>
          <Button {...args} size="default">Default</Button>
          <Button {...args} size="lg">Large</Button>
        </div>
      </div>
    </div>
  ),
};
