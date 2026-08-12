/**
 * Central registry for static image paths served from `public/images/`.
 * Content files should reference these keys (via `ImageKey`) rather than
 * hardcoding URL strings.
 */
export const images = {
  heroBackground: '/images/hero_background.png',
  hospitalConstruction: '/images/hospital_construction.png',
  radiationShielding: '/images/radiation_shielding.png',
  medicalEquipment: '/images/medical_equipment.png',
  scrubSink: '/images/scrub_sink.png',
  passBox: '/images/pass_box.png',
} as const;

export type ImageKey = keyof typeof images;

/**
 * Resolves a content `imageKey` to its public URL path.
 */
export function getImagePath(key: ImageKey): string {
  return images[key];
}
