# Quran Foundation Project

A modern, full-stack Quran reading application built with Next.js, TypeScript, and the Quran.Foundation API. This project demonstrates technical skills in building scalable web applications with proper authentication, API integration, and user experience design.

## 🚀 Features

- **Chapter Browsing**: Browse all 114 chapters of the Quran with beautiful card-based UI
- **Verse Reading**: Read verses with Arabic text and translations
- **Search Functionality**: Search across verses with real-time results
- **Responsive Design**: Fully responsive design that works on all devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **OAuth2 Integration**: Secure token management with automatic refresh
- **Type Safety**: Full TypeScript implementation for better code quality

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: Quran.Foundation OAuth2 API

## 📋 Prerequisites

Before you begin, ensure you have:

1. Node.js 18+ installed
2. npm or yarn package manager
3. Quran.Foundation API credentials (Client ID and Client Secret)
   - Request access at: https://api-docs.quran.foundation/docs/quickstart/

## 🔧 Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd Quran-Foundation-Project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your credentials:
   ```env
   QURAN_CLIENT_ID=your_client_id_here
   QURAN_CLIENT_SECRET=your_client_secret_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Quran-Foundation-Project/
├── app/
│   ├── api/              # API routes (Next.js API handlers)
│   │   ├── chapters/     # Chapter endpoints
│   │   └── search/       # Search endpoint
│   ├── chapters/         # Chapter detail pages
│   ├── search/           # Search page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── Header.tsx        # Navigation header
│   ├── ChapterCard.tsx   # Chapter display card
│   ├── VerseCard.tsx     # Verse display card
│   └── LoadingSpinner.tsx
├── lib/
│   └── quran-api.ts      # API utility functions
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies
```

## 🔑 API Integration

This project uses the Quran.Foundation API with OAuth2 authentication:

1. **Authentication Flow**: 
   - Client Credentials flow for server-side token management
   - Automatic token caching and refresh
   - Tokens are stored securely on the server

2. **API Endpoints Used**:
   - `GET /chapters` - List all chapters
   - `GET /chapters/{id}/verses` - Get verses for a chapter
   - `GET /verses/search` - Search verses

3. **Security**:
   - Credentials are stored in environment variables
   - API calls are made server-side through Next.js API routes
   - Client never sees authentication tokens

## 🎨 Design Decisions

1. **Server-Side API Routes**: All API calls go through Next.js API routes to keep credentials secure
2. **Token Caching**: Access tokens are cached to reduce API calls and improve performance
3. **Component-Based Architecture**: Reusable components for maintainability
4. **TypeScript**: Full type safety for better developer experience and fewer bugs
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **Error Handling**: Comprehensive error handling with user-friendly messages
7. **Loading States**: Proper loading indicators for better UX

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `QURAN_CLIENT_ID`
   - `QURAN_CLIENT_SECRET`
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Your own server

Make sure to set the environment variables in your deployment platform.

## 📝 Development Notes

### Adding New Features

1. **New API Endpoint**: Add the function in `lib/quran-api.ts`
2. **New API Route**: Create a route in `app/api/`
3. **New Page**: Create a page in `app/`
4. **New Component**: Add to `components/`

### Environment Variables

- `QURAN_CLIENT_ID`: Your Quran.Foundation Client ID
- `QURAN_CLIENT_SECRET`: Your Quran.Foundation Client Secret
- `QURAN_API_AUTH_URL`: OAuth2 token endpoint (optional, defaults to prelive)
- `QURAN_API_BASE_URL`: API base URL (optional, defaults to prelive)

## 🐛 Troubleshooting

### "Failed to authenticate" error
- Check that your `.env.local` file exists and contains valid credentials
- Verify your Client ID and Client Secret are correct
- Ensure you're using the correct environment (prelive vs production)

### "Failed to fetch chapters" error
- Check your internet connection
- Verify API credentials are correct
- Check browser console and server logs for detailed error messages

### Build errors
- Make sure all dependencies are installed: `npm install`
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📄 License

This project is created for the Quran.Foundation Full-Stack Engineer position application.

## 👤 Author

Created as part of the Quran.Foundation job application process.

## 🙏 Acknowledgments

- Quran.Foundation for providing the API
- The open-source community for amazing tools and libraries

---

**Note**: This project demonstrates technical skills including:
- Full-stack development with Next.js
- OAuth2 authentication implementation
- API integration and error handling
- Modern React patterns and TypeScript
- Responsive UI/UX design
- Code organization and maintainability

