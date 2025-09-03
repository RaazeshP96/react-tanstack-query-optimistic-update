# Testing with Vitest

This project uses Vitest for testing with React Testing Library for component testing.

## Available Scripts

- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI (requires @vitest/ui package)
- `npm run test:coverage` - Run tests with coverage report

## Test Setup

The testing environment is configured in `src/test/setup.tsx` and includes:

- React Testing Library setup
- Jest DOM matchers
- React Query test utilities
- Custom `renderWithClient` function for components that use React Query

## Writing Tests

### Basic Component Test

```tsx
import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithClient } from '../test/setup'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', async () => {
    renderWithClient(<MyComponent />)
    
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument()
    })
  })
})
```

### Testing with React Query

Use the `renderWithClient` function instead of the standard `render` function:

```tsx
// ✅ Correct - for components with React Query
renderWithClient(<ComponentWithQuery />)

// ❌ Incorrect - will cause errors
render(<ComponentWithQuery />)
```

### Mocking APIs

```tsx
import * as api from '../api/myApi'

vi.mock('../api/myApi', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'test' })),
  updateData: vi.fn(() => Promise.resolve({ success: true })),
}))
```

## Test File Structure

Tests should be placed in `__tests__` folders next to the components they test:

```
src/
  components/
    MyComponent.tsx
    __tests__/
      MyComponent.test.tsx
```

## Running Tests

1. **Watch Mode**: `npm test` - runs tests and watches for changes
2. **Single Run**: `npm run test:run` - runs tests once and exits
3. **Coverage**: `npm run test:coverage` - runs tests and generates coverage report

## Coverage

Coverage reports are generated using v8 and include:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Coverage reports are output to the console and can be configured to generate HTML reports.
