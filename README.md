# Image-Processing-API

Welcome to the Image Processing API project!

## Description

This project aims to provide a simple and efficient API for image serving and rescaling tasks. Whether you need a way to get a placeholder URL for you image or a way to just by adding parameters resize it, the API got you covered.

## Features

- Image resizing: Easily resize your images to specific dimensions.
- Image serving: Request you image just by calling with the right parameters.

## Getting Started

To get started with the Image Processing API, follow these steps:

1. Clone the repository:

```
git clone https://github.com/MTelschow/Image-Processing-API.git
```

2. Install the dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

4. Access the API:

```
http://localhost:3000
```

## Usage

To use the Image Processing API, send HTTP requests to the appropriate endpoints. Here are some examples:

- Resize an image:

  ```
  GET /api/images?filename=filename&height=desiredheight&width=desired width
  ```

- Request an image:

  ```
  GET /api/images?filename=filename
  ```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## Contact

For any inquiries or questions, feel free to contact us at [mathistelschow@gmail.com]
