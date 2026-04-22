import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'avatar',
  initials,
  size = 40,
  className,
  style,
}) => {
  const finalStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    fontWeight: 'bold',
    fontSize: size / 2,
    color: '#fff',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div style={finalStyle} className={className}>
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials || <span>?</span>
      )}
    </div>
  );
};
