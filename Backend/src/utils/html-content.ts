export const PageNotFound = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      text-align: center;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 5rem;
      color: #dc3545;
      margin-bottom: 20px;
    }
    p {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    .emoji {
      font-size: 6rem;
      margin-bottom: 20px;
    }
    .message {
      font-size: 1.25rem;
      color: #6c757d;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">😔</div>
    <h1>404</h1>
    <p class="message">Oops! The page you’re looking for doesn’t exist.</p>
    <p class="message">It seems like you may have mistyped the address or the page may have moved.</p>
  </div>
</body>
</html>
`
