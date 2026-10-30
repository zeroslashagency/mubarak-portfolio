# Animation Components Guide

This guide explains how to use the interactive animation components in your project.

## Overview

We've created two reusable animation components:

1. **AnimatedBox** - A specialized component for creating 3D boxes with mouse-tracking effects
2. **AnimatedContainer** - A versatile component that can be used to animate any content with various effects

Both components use Framer Motion to provide fluid, interactive animations that respond to user interactions.

## AnimatedContainer

The most versatile animation component. It can be used to wrap any content and add various animations.

### Basic Usage

```tsx
import AnimatedContainer from '@/components/AnimatedContainer';

// Basic example
<AnimatedContainer className="p-6 rounded-xl border">
  <h2>My Content</h2>
  <p>This content will animate when it appears and when hovered.</p>
</AnimatedContainer>

// With custom animation settings
<AnimatedContainer 
  className="p-6 rounded-xl border"
  enterAnimation="slide-up"
  glowColor="rgba(59, 130, 246, 0.4)"
  rotateAmount={2}
  delay={0.2}
>
  <h2>Custom Animation</h2>
  <p>This has custom animation settings.</p>
</AnimatedContainer>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | "" | CSS classes applied to the container |
| `wrapperClassName` | string | "" | Classes applied to the outer wrapper |
| `animateOnHover` | boolean | true | Whether to animate on hover |
| `animateOnLoad` | boolean | true | Whether to animate when component mounts |
| `glowEffect` | boolean | true | Whether to show glow effect on hover |
| `rotateEffect` | boolean | true | Whether to rotate on hover |
| `enterAnimation` | string | "slide-up" | Animation type on appear ("fade", "slide-up", "slide-down", "slide-left", "slide-right", "zoom", "none") |
| `delay` | number | 0 | Delay before animation starts (in seconds) |
| `duration` | number | 0.5 | Duration of animation (in seconds) |
| `rotateAmount` | number | 2 | Amount of rotation on hover (degrees) |
| `hoverScale` | number | 1.02 | Scale factor on hover (1 = no scale) |
| `glowColor` | string | "rgba(244, 162, 97, 0.4)" | Color of glow effect |
| `glowIntensity` | number | 10 | Intensity of glow effect |

## AnimatedBox

A specialized component for creating interactive boxes with 3D effects.

### Basic Usage

```tsx
import AnimatedBox from '@/components/animated-box';

<AnimatedBox className="p-6">
  <h2>3D Box</h2>
  <p>This box has 3D rotation and glow effects on hover.</p>
</AnimatedBox>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | "" | CSS classes applied to the container |
| `borderColor` | string | "rgba(224, 122, 95, 0.2)" | Color of the border |
| `hoverScale` | number | 1.02 | Scale factor on hover |
| `rotateAmount` | number | 2 | Amount of rotation on hover |
| `glowColor` | string | "rgba(244, 162, 97, 0.4)" | Color of glow effect |
| `glowIntensity` | number | 10 | Intensity of glow effect |

## Examples

### Adding Mouse-tracking Card to Contact Form

```tsx
import AnimatedContainer from '@/components/AnimatedContainer';

// In your form component
<AnimatedContainer 
  className="p-8 rounded-xl border border-[#E07A5F]/20 bg-background/50 backdrop-blur-sm"
  rotateAmount={1.5}
  glowColor="rgba(224, 122, 95, 0.3)"
>
  <form>
    {/* Your form content here */}
  </form>
</AnimatedContainer>
```

### Creating Interactive Buttons

```tsx
<AnimatedContainer 
  className="inline-block"
  enterAnimation="slide-up"
  rotateAmount={1}
  hoverScale={1.05}
>
  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
    Hover Me
  </button>
</AnimatedContainer>
```

### Creating Cards with Different Entrance Animations

```tsx
<div className="grid grid-cols-3 gap-4">
  {['fade', 'slide-up', 'zoom'].map((animation, index) => (
    <AnimatedContainer 
      key={animation}
      className="p-6 border rounded-xl"
      enterAnimation={animation as any}
      delay={index * 0.1}
    >
      <h3>{animation} animation</h3>
      <p>This card uses the {animation} entrance animation.</p>
    </AnimatedContainer>
  ))}
</div>
```

## Tips for Best Results

1. **Add proper padding** inside the containers for best visual effect
2. **Use subtle values** for rotation (1-3) and hover scale (1.01-1.05) for professional look
3. **Match glow colors** to your brand or the element's existing colors
4. **Use staggered delays** when animating multiple items for a better visual flow
5. **Add `overflow-hidden`** to the parent container if you have layout issues
6. **Use `relative`** positioning for elements that need to be on top of the glow effect

## Customizing for Dark Mode

The components automatically work with both light and dark modes, but you may want to adjust the glow colors for dark mode:

```tsx
<AnimatedContainer 
  className="p-6 rounded-xl border"
  glowColor={isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.1)"}
  glowIntensity={isDarkMode ? 15 : 10}
>
  <h3>Dark Mode Compatible</h3>
</AnimatedContainer>
``` 