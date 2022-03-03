import React from 'react'

interface Props {
  src: string
  [index: string]: unknown
}
const ImageFromIPFSMetadata: React.FC<Props> = ({ src, ...restProps }) => {
  const [imageSrc, setImageSrc] = React.useState<string>()

  React.useEffect(() => {
    ;(async () => {
      try {
        const metadata = await fetch(
          src
            .replace('/ipfs/', '')
            .replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
            .replace(' ', '')
        )
          .then((res) => res.json())
          .then((res) => res)
        setImageSrc(
          metadata.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
        )
      } catch (error) {
        console.log(
          'Failed for',
          src,
          'Request url:',
          src
            .replace('/ipfs/', '')
            .replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
            .replace(' ', '')
        )
      }
    })()
  }, [src])

  if (imageSrc) {
    return <img src={imageSrc} {...restProps} />
  }

  return <img src={'https://placeholder.pics/svg/120x150'} {...restProps} />
}

export default ImageFromIPFSMetadata
