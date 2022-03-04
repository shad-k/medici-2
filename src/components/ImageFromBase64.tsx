import React from 'react'

interface ImageFromBase64Props {
  src: string
  [index: string]: unknown
}

const ImageFromBase64: React.FC<ImageFromBase64Props> = ({
  src,
  ...restProps
}) => {
  try {
    const metadata = JSON.parse(
      atob(src.replace('data:application/json;base64,', ''))
    )

    return <img src={(metadata as any).image} {...restProps} />
  } catch (error) {
    return null
  }
}

export default ImageFromBase64
