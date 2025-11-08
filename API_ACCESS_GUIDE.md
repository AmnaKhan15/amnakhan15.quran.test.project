# API Access Request Guide

## Understanding the Request Form

When requesting API access from Quran.Foundation, you'll see a form with three fields:

### 1. App Name (Required) ⭐
**What to enter**: A descriptive name for your application
**Example**: 
- "Quran Reader App"
- "Quran Foundation Project"
- "My Quran Application"

### 2. Email Address (Required) ⭐
**What to enter**: Your email address where the credentials will be sent
**Example**: `your.email@example.com`

### 3. Callback URL (Optional)
**What to enter**: **You can leave this blank!**

#### Why is it optional?

This project uses **OAuth2 Client Credentials Flow**, which is a **server-to-server** authentication method. This means:
- ✅ No user interaction required
- ✅ No browser redirects needed
- ✅ No callback URL needed
- ✅ Authentication happens entirely on the server

#### When would you need a Callback URL?

Callback URLs are only required for **OAuth2 Authorization Code Flow**, which involves:
- User login/authorization
- Browser redirects
- User consent screens

Since we're using Client Credentials flow (as shown in the API documentation), we don't need user interaction or redirects.

#### If you want to provide one anyway:

If the form requires a value or you want to provide one for future use:

**For Development:**
```
http://localhost:3000
```

**For Production (if you have a deployed URL):**
```
https://yourdomain.com
```

**For Production (if using Vercel/Netlify):**
```
https://your-app.vercel.app
```

## Recommended Form Submission

For this project, you can fill out the form like this:

```
App Name: Quran Foundation Project
Email Address: your.email@example.com
Callback URL: (leave blank) OR http://localhost:3000
```

## After Submission

1. ✅ Submit the form
2. ⏳ Wait for email from Quran.Foundation (usually within a few hours/days)
3. 📧 Check your email for:
   - Client ID
   - Client Secret
4. 🔐 Add credentials to `.env.local` file:
   ```env
   QURAN_CLIENT_ID=your_client_id_from_email
   QURAN_CLIENT_SECRET=your_client_secret_from_email
   ```

## Summary

**TL;DR**: The Callback URL field is **optional** and can be **left blank** for this project because we're using Client Credentials flow (server-to-server authentication), not Authorization Code flow (user login flow).

