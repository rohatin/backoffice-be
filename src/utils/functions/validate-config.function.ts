import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { ClassConstructor } from 'class-transformer/types/interfaces'

/**
 * Validate a given configuration object against a class with class-validator
 * decorators.
 *
 * @throws Error if the configuration object is invalid.
 *
 * @example
 * const envConfig = validateConfig(
 *   process.env,
 *   EnvironmentVariablesValidator
 * )
 */
export const validateConfig = <T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>
) => {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
