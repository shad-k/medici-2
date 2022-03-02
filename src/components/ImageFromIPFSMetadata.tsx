import React from 'react'

interface Props {
  src: string
  [index: string]: unknown
}
const ImageFromIPFSMetadata: React.FC<Props> = ({ src, ...restProps }) => {
  const [imageSrc, setImageSrc] = React.useState<string>()

  React.useEffect(() => {
    ;(async () => {
      const metadata = await fetch(
        src.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
      )
        .then((res) => res.json())
        .then((res) => res)
      setImageSrc(
        metadata.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
      )
    })()
  }, [src])

  if (imageSrc) {
    return <img src={imageSrc} {...restProps} />
  }

  return <img src={'https://placeholder.pics/svg/120x150'} {...restProps} />
}

export default ImageFromIPFSMetadata
