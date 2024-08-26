import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Selector, ISelector } from '@/lib/components/SelectSketch/Selector'

const meta = {
  title: 'Components/SelectSketch/Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    data: {
      identify: 1,
      name: 'Primary',
      course: {
        walk: {
          duration: [1, 0]
        },
        cycle: {
          duration: [0, 30]
        }
      },
      length: 10
    },
  },
};
