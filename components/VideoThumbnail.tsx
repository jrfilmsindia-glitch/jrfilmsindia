import Image from 'next/image'

interface Props {
  src?: string | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  category?: string
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  films:              'from-purple-900 via-indigo-900 to-black',
  series:             'from-blue-900 via-purple-900 to-black',
  shorts:             'from-pink-900 via-rose-900 to-black',
  songs:              'from-yellow-900 via-orange-900 to-black',
  'behind the scenes':'from-green-900 via-teal-900 to-black',
}

const CATEGORY_ICONS: Record<string, string> = {
  films:              '🎬',
  series:             '📺',
  shorts:             '📱',
  songs:              '🎵',
  'behind the scenes':'🎥',
}

export default function VideoThumbnail({ src, alt, fill, width, height, sizes, className, category }: Props) {
  const gradient = CATEGORY_GRADIENTS[category || ''] || 'from-purple-900 via-gray-900 to-black'
  const icon     = CATEGORY_ICONS[category || '']   || '🎬'

  const placeholder = (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2 p-3`}>
      <span className="text-2xl">{icon}</span>
      <p className="text-white/70 text-[10px] font-medium text-center leading-tight line-clamp-2 max-w-[90%]">{alt}</p>
    </div>
  )

  if (!src) {
    if (fill) return <div className="absolute inset-0">{placeholder}</div>
    return (
      <div style={{ width, height }} className={`relative overflow-hidden ${className || ''}`}>
        {placeholder}
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className || 'object-cover'}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 300}
      height={height || 170}
      sizes={sizes}
      className={className || 'object-cover'}
    />
  )
}
