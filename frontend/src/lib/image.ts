export function getOptimizedImageSrc(src: string, width: number) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName || !src.startsWith("/")) {
    return src;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_90,w_${width}${src}`;
}
