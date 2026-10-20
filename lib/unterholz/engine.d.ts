export type Unterholz = { relayout: () => void; destroy: () => void; ready?: boolean };
export function erzeugeUnterholz(canvas: HTMLCanvasElement): Unterholz;
