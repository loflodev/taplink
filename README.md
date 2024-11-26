# Taplink

A modern profile link management application built with React, Firebase, and TypeScript.

## Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   npm run setup
   ```
   This will create a `.env` file from `.env.example`. Update the values in `.env` with your Firebase configuration.

4. Get Firebase Configuration:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Click on the gear icon (⚙️) next to "Project Overview"
   - Click "Project settings"
   - Scroll down to "Your apps" section
   - Copy the configuration values to your `.env` file

## Development

Start the development server:
```bash
npm run dev
```

## Security Notes

- Never commit the `.env` file to version control
- Keep your Firebase configuration private
- Use environment variables for all sensitive information
- The `.env.example` file should not contain actual configuration values