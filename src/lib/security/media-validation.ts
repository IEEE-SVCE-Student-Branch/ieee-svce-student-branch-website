/**
 * IEEE SVCE Digital Institution — Media Upload Validation
 *
 * Validates uploaded files BEFORE they reach storage.
 * This is the security boundary — no file passes to storage
 * without going through these checks.
 *
 * Phase 1: validation only. Storage integration is deferred.
 */

/** Maximum file size in bytes (20MB as per DEC-09 recommendation) */
export const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * Allowed file types mapped to their magic byte signatures.
 * We validate by magic bytes, NOT by file extension, to prevent
 * extension spoofing attacks.
 */
const ALLOWED_TYPES: Record<string, { mimeType: string; magic: number[][] }> = {
  jpeg: {
    mimeType: "image/jpeg",
    magic: [[0xff, 0xd8, 0xff]],
  },
  png: {
    mimeType: "image/png",
    magic: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  },
  gif: {
    mimeType: "image/gif",
    magic: [
      [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
      [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
    ],
  },
  webp: {
    mimeType: "image/webp",
    // RIFF....WEBP
    magic: [[0x52, 0x49, 0x46, 0x46]],
  },
  pdf: {
    mimeType: "application/pdf",
    magic: [[0x25, 0x50, 0x44, 0x46]], // %PDF
  },
};

export interface MediaValidationResult {
  valid: boolean;
  error?: string;
  detectedType?: string;
  mimeType?: string;
}

/**
 * Validate a file's type by checking magic bytes.
 *
 * @param buffer - The first N bytes of the file (at least 8 bytes)
 * @param fileSize - Total file size in bytes
 * @param originalFilename - The original filename (for logging, not trusted)
 */
export function validateMedia(
  buffer: Uint8Array,
  fileSize: number,
  originalFilename: string
): MediaValidationResult {
  // Size check
  if (fileSize > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  if (fileSize === 0) {
    return { valid: false, error: "File is empty" };
  }

  // Magic byte check
  for (const [typeName, typeInfo] of Object.entries(ALLOWED_TYPES)) {
    for (const magic of typeInfo.magic) {
      if (buffer.length >= magic.length) {
        const matches = magic.every((byte, i) => buffer[i] === byte);
        if (matches) {
          return {
            valid: true,
            detectedType: typeName,
            mimeType: typeInfo.mimeType,
          };
        }
      }
    }
  }

  // SVG is intentionally NOT allowed — SVGs can contain embedded JavaScript.
  // If SVG support is needed in the future, it must be converted to raster
  // server-side before serving.

  return {
    valid: false,
    error: `File type not allowed. Detected from: ${originalFilename}. Allowed: JPEG, PNG, GIF, WebP, PDF`,
  };
}

/**
 * Generate a safe, server-side filename.
 * Never trust client-provided filenames.
 */
export function generateSafeFilename(detectedType: string, prefix = "upload"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = detectedType === "jpeg" ? "jpg" : detectedType;
  return `${prefix}_${timestamp}_${random}.${ext}`;
}
