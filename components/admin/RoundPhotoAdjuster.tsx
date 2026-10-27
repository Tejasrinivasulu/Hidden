"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Props = {
  src: string;
  size?: number;
  onApply: (croppedDataUrl: string) => void;
  onCancel?: () => void;
};

export default function RoundPhotoAdjuster({
  src,
  size = 220,
  onApply,
  onCancel,
}: Props) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const [natural, setNatural] = useState({ w: 1, h: 1 });

  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [src]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    });
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const applyCrop = () => {
    const canvas = document.createElement("canvas");
    const out = 400;
    canvas.width = out;
    canvas.height = out;
    const ctx = canvas.getContext("2d");
    if (!ctx || !imgRef.current) return;

    ctx.beginPath();
    ctx.arc(out / 2, out / 2, out / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const img = imgRef.current;
    const base = Math.max(size / natural.w, size / natural.h);
    const drawW = natural.w * base * scale;
    const drawH = natural.h * base * scale;
    const scaleFactor = out / size;
    const dx = (size / 2 + offset.x - drawW / 2) * scaleFactor;
    const dy = (size / 2 + offset.y - drawH / 2) * scaleFactor;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, out, out);
    ctx.drawImage(img, dx, dy, drawW * scaleFactor, drawH * scaleFactor);

    onApply(canvas.toDataURL("image/png"));
  };

  return (
    <div className="admin-photo-adjust">
      <p className="admin-muted text-sm mb-2">
        Drag to move · use slider to zoom · then Apply
      </p>
      <div
        className="admin-photo-stage"
        style={{ width: size, height: size }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="Adjust"
          className="admin-photo-stage-img"
          draggable={false}
          onLoad={(e) => {
            const el = e.currentTarget;
            setNatural({
              w: el.naturalWidth || 1,
              h: el.naturalHeight || 1,
            });
          }}
          style={{
            width: Math.max(size / natural.w, size / natural.h) * natural.w * scale,
            height: Math.max(size / natural.w, size / natural.h) * natural.h * scale,
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          }}
        />
      </div>
      <label className="admin-photo-zoom">
        <span className="admin-muted text-xs">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
        />
      </label>
      <div className="flex flex-wrap gap-2 mt-2">
        <button type="button" className="admin-btn admin-btn-primary" onClick={applyCrop}>
          Apply round photo
        </button>
        {onCancel ? (
          <button type="button" className="admin-btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
}
