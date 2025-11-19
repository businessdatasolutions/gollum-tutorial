<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1zhLWIMiRKFDY9XVQRpofbOjXZAVS_aoz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This app is configured for deployment to GitHub Pages from the `docs` folder.

**Setup Option 1: Deploy from docs folder (recommended)**

1. Build the app: `npm run build`
2. Commit the `docs` folder to your repository
3. In your GitHub repository, go to **Settings** > **Pages**
4. Under "Build and deployment", select **Source**: "Deploy from a branch"
5. Select branch: `main` and folder: `/docs`
6. Click **Save**

**Setup Option 2: Automatic deployment with GitHub Actions**

1. In your GitHub repository, go to **Settings** > **Pages**
2. Under "Build and deployment", select **Source**: "GitHub Actions"
3. Push your code to the `main` branch
4. The GitHub Actions workflow will automatically build and deploy your app

**Manual Build:**

To build the app locally for production:
```bash
npm run build
```

The built files will be in the `docs` directory.

**Preview Build:**

To preview the production build locally:
```bash
npm run preview
```
