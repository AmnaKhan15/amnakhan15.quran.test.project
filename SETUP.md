# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Request API Access

1. Visit: https://api-docs.quran.foundation/docs/quickstart/
2. Fill out the "Request API Access" form:
   - **App Name**: Enter your application name (e.g., "Quran Reader App")
   - **Email Address**: Your email where credentials will be sent
   - **Callback URL**: **You can leave this blank** (it's optional)
     - This project uses OAuth2 Client Credentials flow (server-to-server), which doesn't require a callback URL
     - Callback URLs are only needed for Authorization Code flow (user login redirects)
     - If you want to provide one anyway, use: `http://localhost:3000` (for development)

3. Submit the form and wait for your credentials via email

## Step 3: Configure Environment Variables

**✅ If you've received your credentials**, see `CREDENTIALS_SETUP.md` for detailed instructions.

**Quick setup**: Create a `.env.local` file in the root directory with your **Pre-Production** credentials:

```env
# Pre-Production (Test) - Use for development
QURAN_CLIENT_ID=your_pre_production_client_id
QURAN_CLIENT_SECRET=your_pre_production_client_secret
```

**Note**: 
- Use **Pre-Production** credentials for development/testing
- Use **Production** credentials only when deploying to production
- See `CREDENTIALS_SETUP.md` for complete setup instructions

## Step 4: Run Development Server

```bash
npm run dev
```

## Step 5: Open in Browser

Navigate to: http://localhost:3000

## Troubleshooting

### "Cannot find module 'next/server'"
- Run `npm install` to install all dependencies

### "Failed to authenticate"
- Check that `.env.local` exists and contains valid credentials
- Verify your Client ID and Client Secret are correct

### Build Errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npm run build` to test the build

## Project Structure

- `app/` - Next.js pages and API routes
- `components/` - React components
- `lib/` - Utility functions and API client
- `.env.local` - Your API credentials (not in git)

## Next Steps

1. Read `README.md` for full documentation
2. Read `PROJECT_APPROACH.md` for technical details
3. Start developing!

