# Contributing to MenuSnap

Thank you for considering contributing to MenuSnap! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check the existing issues to avoid duplicates
2. Collect relevant information (OS, device, app version)
3. Create a clear, reproducible test case

When filing a bug report, include:
- **Description**: Clear summary of the issue
- **Steps to Reproduce**: Numbered list of steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Device, OS version, app version

### Suggesting Features

Feature requests are welcome! Please:
1. Check existing feature requests first
2. Provide a clear use case
3. Explain why this feature benefits users
4. Consider implementation complexity

### Pull Requests

#### Before Submitting

1. **Fork the repository** and create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Make your changes** following our code standards

4. **Test your changes** thoroughly
   - Test on iOS and Android
   - Verify on multiple screen sizes
   - Check error handling

5. **Commit your changes** with clear messages
   ```bash
   git commit -m "feat: add restaurant filtering by cuisine"
   ```

#### Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add offline mode for camera capture
fix: resolve image upload timeout issue
docs: update installation instructions
refactor: simplify restaurant search logic
```

#### Pull Request Process

1. Update README.md or docs if needed
2. Ensure all tests pass
3. Update CHANGELOG.md with your changes
4. Submit PR with clear description
5. Link related issues using keywords (Fixes #123)

**PR Description Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

## Development Guidelines

### Code Style

**TypeScript**
- Use TypeScript strict mode
- Define explicit types for function parameters and returns
- Prefer interfaces over types for object shapes
- Use `const` for immutable values

**React Native**
- Use functional components with hooks
- Implement proper error boundaries
- Use StyleSheet.create for styles
- Follow React Native best practices

**Formatting**
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline

### Project Structure

Place new files in appropriate directories:
```
app/           - New screens/routes
components/    - Reusable UI components
providers/     - Global state providers
services/      - External API integrations
types/         - TypeScript type definitions
utils/         - Helper functions
mocks/         - Sample/test data
constants/     - App-wide constants
```

### State Management

- Use React Context for global state
- Use useState for local component state
- Use React Query for server state (when applicable)
- Avoid prop drilling - lift state appropriately

### Styling

- Use the app color scheme (white + dark blue)
- Maintain consistent spacing (8px base unit)
- Follow mobile-first design principles
- Test on various screen sizes
- Use SafeAreaView for proper insets

### Performance

- Optimize image sizes before upload
- Use React.memo for expensive components
- Implement proper list virtualization
- Avoid unnecessary re-renders
- Profile performance for bottlenecks

### Testing

- Write unit tests for utility functions
- Test component rendering and interactions
- Verify edge cases and error states
- Test on both iOS and Android platforms

### Documentation

- Add JSDoc comments for complex functions
- Update README for new features
- Document API changes
- Add inline comments for complex logic

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: File a GitHub Issue
- **Security**: Email security@menusnap.com (do not file public issues)

## Recognition

Contributors will be:
- Listed in CHANGELOG.md for their contributions
- Credited in release notes
- Recognized in the project README

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

Thank you for contributing to MenuSnap! 🎉
