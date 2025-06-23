# AIZOKU Release Process

This document describes the automated release process for AIZOKU.

## Automated Release Workflow

The project uses GitHub Actions to automatically create releases when code is pushed to the `main` branch.

### What happens on push to main:

1. **Release Creation**: A new release is created with the tag format `aizoku_v{version}` where `{version}` is taken from `package.json`
2. **Multi-platform Builds**: The app is built for multiple platforms:
   - **Web Build**: Next.js standalone build (`.tar.gz`)
   - **Linux**: AppImage and .deb packages
   - **Windows**: NSIS installer (.exe)
   - **macOS**: DMG package
3. **Asset Upload**: All built packages are automatically attached to the release

### Release Naming Convention

- **Tag Format**: `aizoku_v{version}` (e.g., `aizoku_v0.1.0`)
- **Release Name**: `AIZOKU {version}` (e.g., `AIZOKU 0.1.0`)

## Manual Release Process

If you need to create a release manually:

1. Update the version in `package.json`
2. Commit and push to main
3. The GitHub Action will automatically trigger

## Local Development and Testing

### Development Mode
```bash
# Start Next.js dev server
npm run dev

# Run Electron in development mode (connects to localhost:3000)
npm run electron:dev
```

### Production Testing
```bash
# Build and test production Electron app locally
npm run electron:prod
```

### Building for Distribution
```bash
# Build for all platforms
npm run build:electron

# Build for specific platforms
npm run build:electron:linux
npm run build:electron:windows
npm run build:electron:mac
```

## Project Structure

- `main.js` - Electron main process
- `.next/` - Next.js build output
- `release/` - Electron-builder output directory
- `.github/workflows/release.yml` - GitHub Actions workflow

## Configuration Files

- `package.json` - Contains electron-builder configuration and build scripts
- `next.config.ts` - Next.js configuration (set to standalone mode)
- `main.js` - Electron main process with development/production logic

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are properly installed
2. **Electron app doesn't start**: Verify that the Next.js build completed successfully
3. **Release assets missing**: Check the GitHub Actions logs for build errors

### Debugging

- Check GitHub Actions logs in the "Actions" tab of the repository
- Test builds locally using the manual build commands
- Verify that `package.json` version is updated before pushing to main

## Requirements

- Node.js 20+
- npm or yarn
- For local builds: Platform-specific build tools (e.g., Windows SDK for Windows builds)
