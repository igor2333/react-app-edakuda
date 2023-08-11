export const getImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)

    image.onload = (event) => {
      resolve(image)
    }

    image.onerror = (error) => {
      reject(error)
    }

    image.src = url
  })
}
