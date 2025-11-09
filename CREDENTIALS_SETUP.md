# Credentials Setup Guide

## ✅ You've Received Your API Credentials!

You now have both **Pre-Production (Test)** and **Production (Live)** credentials.

## 🔧 Step 1: Create `.env.local` File

Create a file named `.env.local` in the root directory of your project.

## 📝 Step 2: Add Your Credentials

### For Development/Testing (Recommended to start):

Use the **Pre-Production** credentials:

```env
# Pre-Production (Test) Credentials
QURAN_CLIENT_ID=
QURAN_CLIENT_SECRET=

# Optional: Override URLs (defaults to prelive)
# QURAN_API_AUTH_URL=https://prelive-oauth2.quran.foundation/oauth2/token
# QURAN_API_BASE_URL=https://apis-prelive.quran.foundation/content/api/v4
```

### For Production (When deploying):

When you're ready to deploy to production, update `.env.local` with:

```env
# Production (Live) Credentials
QURAN_CLIENT_ID=
QURAN_CLIENT_SECRET=

# Production URLs
QURAN_API_AUTH_URL=https://oauth2.quran.foundation/oauth2/token
QURAN_API_BASE_URL=https://apis.quran.foundation/content/api/v4
```

## ⚠️ Important Notes

1. **Start with Pre-Production**: Use pre-production credentials for development and testing
2. **Limited Data**: Pre-production has limited data but all features are enabled for testing
3. **Never Commit**: The `.env.local` file is already in `.gitignore` - never commit your credentials!
4. **Environment-Specific**: Don't mix tokens between environments (prelive vs production)

## 🚀 Step 3: Test Your Setup

1. Make sure `.env.local` is in the root directory
2. Run the development server:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000
4. You should see all 114 chapters!

## 📋 Credentials Summary

### Pre-Production (Test) - Use for Development
- **Client ID**: ``
- **Client Secret**: `
- **Auth Endpoint**: `https://prelive-oauth2.quran.foundation`
- **API Base URL**: `https://apis-prelive.quran.foundation/content/api/v4`
- **Note**: Limited data, but all features enabled for testing

### Production (Live) - Use for Deployment
- **Client ID**: ``
- **Client Secret**: ``
- **Auth Endpoint**: `https://oauth2.quran.foundation`
- **API Base URL**: `https://apis.quran.foundation/content/api/v4`

## 🔒 Security Reminder

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Never share your credentials publicly
- ✅ Use pre-production for development
- ✅ Switch to production only when deploying

## 🎉 You're All Set!

Once you've created `.env.local` with your credentials, you can start using the application!

