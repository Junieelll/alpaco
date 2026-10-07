import { useState, useRef, useEffect } from "react";

export default function MediaImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-forest text-xs text-white/60 ${className}`}
        aria-label={alt}
      >
        <span className="p-2 text-center font-medium">[IMAGE PLACEHOLDER]</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      {...props}
    />
  );
}
