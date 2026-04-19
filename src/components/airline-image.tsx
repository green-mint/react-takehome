import React from 'react';
import Image, { ImageProps } from 'next/image';

type Props = {
  code: string;
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'quality'>;

export default function AirlineImage({ code, ...props }: Props) {
  return (
    <Image
      src={`https://assets.flybasis.com/airlines/k/128x128/${code}.png`}
      alt={code}
      width={128}
      height={128}
      quality={100}
      {...props}
    />
  );
}
