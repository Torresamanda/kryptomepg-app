const acceptedExperienceCoverMimeTypes = ['image/jpeg', 'image/png', 'image/webp'] as const

/**
 * Simulates PUT /api/experiences/:experienceId/cover.
 * A real API will persist the file and return its public URL.
 */
export async function uploadExperienceCover(experienceId: string, file: File): Promise<string> {
  if (!experienceId) throw new Error('Experiência não encontrada.')
  if (
    !acceptedExperienceCoverMimeTypes.includes(
      file.type as (typeof acceptedExperienceCoverMimeTypes)[number],
    )
  ) {
    throw new Error('Use uma imagem JPEG, PNG ou WebP.')
  }

  return URL.createObjectURL(file)
}
