# Skin Disease Detector — Expo React Native App

A React Native mobile app (built with Expo) that uses your phone camera to detect skin conditions and recommends cure products. It connects to a FastAPI backend running on Google Colab via ngrok.

## How the App Works

1. User opens the app → takes a photo using the phone camera
2. Photo is sent (as base64) to a FastAPI server running on Google Colab
3. The server runs the trained ResNet50V2 model and returns predictions
4. App shows the top predicted skin condition + confidence + recommended cure products

## Required Resources

| Resource | Link |
|---|---|
| Trained Model (.keras) | Download from Drive |
| PFC-Updated (cure product images) | Download from Drive |
| API Server Notebook | `makeapiusingcluade.ipynb` (run on Google Colab) |

---

## Part 1 — Start the API Server (Google Colab)

The app requires a running FastAPI server. Complete this before launching the app.

### Step 1 — Save the model to your Google Drive

Download the model from the link above and place it in your Drive at:

```
My Drive/skin_disease_resnet50v2.keras
```

### Step 2 — Open the notebook in Google Colab

Go to [colab.research.google.com](https://colab.research.google.com), upload or open `makeapiusingcluade.ipynb`.

Set the runtime to GPU: **Runtime → Change runtime type → T4 GPU → Save**.

### Step 3 — Mount Drive and copy the model

Run the first cell:

```python
from google.colab import drive
drive.mount('/content/drive')
import shutil
shutil.copy("/content/drive/MyDrive/skin_disease_resnet50v2.keras", "/content/skin_disease_resnet50v2.keras")
```

### Step 4 — Set your ngrok auth token

Get a free token from [dashboard.ngrok.com](https://dashboard.ngrok.com) → Auth → Your Authtoken.

In the notebook, find and replace:

```python
NGROK_AUTH_TOKEN = "YOUR_NGROK_TOKEN_HERE"
```

### Step 5 — Run all cells

The last cell will print something like:

```
Public API URL: https://xxxx-xx-xx.ngrok-free.app
Predict route : https://xxxx-xx-xx.ngrok-free.app/predict?use_tta=false
```

Copy the **Public API URL** — you need it in Part 2.

> **Keep this Colab tab open and running while using the app.** The server stops when the session ends.

---

## Part 2 — Set Up the Expo App (via Expo Snack)

Expo Snack is a browser-based tool — no installation needed. Run the app directly at [snack.expo.dev](https://snack.expo.dev) and preview it on your phone using the Expo Go app.

### What You Need Before Starting

- A phone with the **Expo Go** app installed (Android / iOS)
- The API server running on Google Colab (from Part 1 — you need the ngrok URL)
- The **PFC-Updated** folder downloaded from Google Drive

### Step 1 — Open the project in Snack

Go to [snack.expo.dev](https://snack.expo.dev) and click **"Import from GitHub"** (top-right area).

Paste your GitHub repo URL and click Import. Snack will load all your files automatically.

> If you don't want to use GitHub, you can manually recreate the project: click **"+"** on the left file panel → create `App.js`, `index.js`, `app.json`, `package.json` → paste the contents of each file from your repo one by one.

### Step 2 — Upload the PFC-Updated images

This is the most important step. Snack cannot read from Google Drive, so you must upload the product images directly into Snack.

1. Download the entire **PFC-Updated** folder from Google Drive
2. In Snack, click the folder icon or the **"+"** button → select **"Upload files"**
3. Navigate inside `PFC-Updated/` on your computer, open each disease subfolder one by one, and upload all images into matching paths inside Snack

The final file structure inside Snack must look like this:

```
assets/
└── PFC-Updated/
    ├── Acne/
    │   ├── acsolve_topical_lotion.webp
    │   ├── adapco_cream.webp
    │   └── ... (all images)
    ├── Blackheads/
    │   └── ... (all images)
    ├── Dark-Spots/
    ├── Dry-Skin/
    ├── Englarged-Pores/     ← keep this exact spelling (with the typo)
    ├── Eyebags/
    ├── Normal Skin/         ← note the space, not a dash
    ├── Oily-Skin/
    ├── Skin-Redness/
    ├── Whiteheads/
    └── Wrinkles/
```

> **File names must match exactly** what is written in `App.js`. For example, `acsolve_topical_lotion.webp` must be named exactly that — no spaces, no capital letters changed. If even one file is missing or renamed, Snack will show an error.

> **Snack has a file size limit (~50MB total).** If all images together exceed this, Snack will refuse to save. In that case, reduce images per disease folder or compress them.

### Step 3 — Update the API URL

In the Snack editor, open `App.js`. Near the top, find:

```javascript
const API_URL = 'https://greeter-darling-prowess.ngrok-free.dev/predict_base64';
```

Replace it with the ngrok URL you got from running the Colab notebook:

```javascript
const API_URL = 'https://YOUR-NEW-NGROK-URL.ngrok-free.app/predict_base64';
```

### Step 4 — Set the dependencies

In Snack, click the settings/dependencies icon on the left panel (looks like `{ }` or a box icon). Make sure these packages are listed:

```
expo-camera         ~17.0.10
react-native-svg    15.12.1
```

Snack usually picks these up from `package.json` automatically when you import from GitHub. If not, add them manually in the dependencies panel.

### Step 5 — Save the Snack

Press **Ctrl+S** (or **Cmd+S** on Mac), or click the Save button at the top.

Snack will bundle the project. Wait for it to finish — you will see a QR code on the right side.

### Step 6 — Open on your phone

- **Android:** Open Expo Go → tap **Scan QR Code** → scan the QR code shown in Snack
- **iPhone:** Open the Camera app → point at the QR code → tap the Expo Go banner that appears

The app will load on your phone within a few seconds.

---

## Every Time You Restart Colab (Important)

The ngrok URL changes every time you restart the Colab notebook. Each time that happens:

1. Copy the new ngrok URL from Colab
2. Open your Snack project
3. Update `API_URL` in `App.js`
4. Press Save in Snack
5. The Expo Go app on your phone will auto-reload with the new URL

---

## Troubleshooting

**"Something went wrong" or red error screen on phone**
Most likely a missing image file in `assets/PFC-Updated/`. Check that every filename in `App.js` exists in Snack with the exact same name and path.

**QR code not working**
Make sure your phone and computer are on the same Wi-Fi network. If still not working, log into the same Expo account on both Snack (browser) and Expo Go (phone) — the project will appear under "Recently opened".

**Snack won't save / "Project too large"**
The images are over Snack's size limit. Compress the `.webp` and `.jpg` files (use [squoosh.app](https://squoosh.app) to reduce file size) and re-upload.

**"Network request failed" when analyzing**
The Colab server is not running, or the ngrok URL in `API_URL` is outdated. Restart the Colab notebook and update the URL in `App.js`.

**Dependencies not found**
In Snack's dependencies panel, manually search for and add `expo-camera` and `react-native-svg`.
