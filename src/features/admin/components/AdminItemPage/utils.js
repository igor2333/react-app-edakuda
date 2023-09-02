export const getErrors = async (data) => {
  const errors = {
    name: '',
    composition: '',
    conditions: '',
    smallPrice: '',
    mediumPrice: '',
    largePrice: '',
    image: '',
  }

  for (const [name, value] of data) {
    if (typeof value === 'string') {
      if (value.length === 0) {
        errors[name] = 'Поле не может быть пустым'
        continue
      }
    }
  }

  return errors
}

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
