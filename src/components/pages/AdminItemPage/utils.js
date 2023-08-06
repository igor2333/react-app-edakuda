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

export const getErrors = async (data) => {
  const errors = {
    name: '',
    country: '',
    conditions: '',
    documents: '',
    composition: '',
    image: '',
    recommendations: '',
    manufacturer: '',
    smallSize: '',
    smallSizePrice: '',
    mediumSize: '',
    mediumSizePrice: '',
    largeSize: '',
    largeSizePrice: '',
  }

  for (const [name, value] of data) {
    if (name === 'image') {
      if (value.length === 0) {
        errors[name] = 'Добавьте изображение'
        continue
      }
    }
    if (typeof value === 'string') {
      if (value.length === 0) {
        errors[name] = 'Это поле не может быть пустым'
        continue
      }
    }
  }

  return errors
}
