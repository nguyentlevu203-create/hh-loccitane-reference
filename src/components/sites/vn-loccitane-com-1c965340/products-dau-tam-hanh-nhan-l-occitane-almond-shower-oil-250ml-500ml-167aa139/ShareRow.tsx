"use client";

import {
  FacebookIcon,
  MessengerIcon,
} from "@/components/sites/vn-loccitane-com-1c965340/shared/icons";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.2l-5.6-6.8L4 22H0.9l8.1-9.3L0 2h7.4l5.1 6.2zm-1.3 18h2L6.5 4H4.4z" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.85 6.36 9.31-.09-.79-.16-2.01.03-2.87.18-.78 1.16-4.94 1.16-4.94s-.3-.6-.3-1.48c0-1.39.8-2.43 1.8-2.43.85 0 1.26.64 1.26 1.4 0 .85-.55 2.13-.83 3.31-.24 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.87 3.15-4.58 0-2.4-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.75 2.28.08.1.09.19.07.29-.08.32-.25 1-.28 1.14-.05.19-.15.23-.35.14-1.3-.6-2.1-2.49-2.1-4.01 0-3.26 2.37-6.26 6.83-6.26 3.59 0 6.38 2.56 6.38 5.97 0 3.56-2.25 6.43-5.37 6.43-1.05 0-2.04-.55-2.37-1.19l-.65 2.45c-.23.9-.86 2.03-1.28 2.72.96.3 1.98.46 3.03.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1 1" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-2 2a5 5 0 0 0 7.07 7.07l1-1" />
    </svg>
  );
}

export function ShareRow({ url }: { url: string }) {
  const encoded = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-foreground">Chia sẻ:</span>
      <div className="flex items-center gap-2 text-foreground">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chia sẻ Facebook"
        >
          <FacebookIcon className="size-4" />
        </a>
        <a href="https://m.me/193955090673746" aria-label="Chia sẻ Messenger">
          <MessengerIcon className="size-5" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chia sẻ Twitter"
        >
          <TwitterIcon className="size-4" />
        </a>
        <a
          href={`https://pinterest.com/pin/create/link/?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chia sẻ Pinterest"
        >
          <PinterestIcon className="size-4" />
        </a>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(url)}
          aria-label="Sao chép liên kết"
        >
          <LinkIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
