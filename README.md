
![Screenshot 2025-04-21 122458](https://github.com/user-attachments/assets/5f1242c2-ec53-4030-a7eb-3a12a892422e)

# FilthCheck

FilthCheck is a simple API for detecting Not Safe For Work (NSFW) Nudity image content. It utilizes ONNX models to analyze images for nudity and classifies them as either Safe or Not Safe For Work (NSFW).

## Features
- Detects NSFW content in images
- Lightweight and easy to use API
- Fast inference using ONNX Runtime Node
- Uses Supabase for database and authentication
- Built with Next.js, Node.js, Express.js, and TypeScript

## Tech Stack
- **Next.js** - Serverless Web app to manage API
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST APIs
- **TypeScript** - Type-safe JavaScript
- **Supabase** - Database and authentication
- **ONNX Runtime Node** - Pre-trained deep learning models for image classification


## API Endpoints

### Detect NSFW Content

**POST** `/api/detect/image`

#### Request
```json
{
  "imageURL": "https://example.com/image.jpg"
}
```

#### Response
```json
{
  "status": 200,
  "data": [
    {
      "label": "nsfw",
      "score": 0.7899982333183289
    },
    {
      "label": "sfw",
      "score": 0.21000179648399353
    }
  ]
}
```




