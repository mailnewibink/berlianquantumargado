/**
 * Central registry for static image paths served from `public/images/`.
 * Content files should reference these keys (via `ImageKey`) rather than
 * hardcoding URL strings.
 */
export const images = {
  heroBackground: 'https://res.cloudinary.com/dvy4znkvy/image/upload/v1786703403/ChatGPT_Image_Aug_14_2026_05_21_33_PM_bctfgy.png',
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
