import { InjectionToken } from '@angular/core';
import { environment } from '../environment';
import { IEnvironment } from '../interface/ienvironment';

/**
 * Injection token. Angular uses the class name to identify a dependency for DI.
 * The environment only has a TypeScript interface (which will be gone at
 * runtime). We provide an injection token instead.
 * https://nils-mehlhorn.de/posts/angular-environment-setup-testing/
 */
export const ENV = new InjectionToken<IEnvironment>('env');

/**
 * Factory method to get the environment, since Angular won't be able to call an
 * interface's constructor.
 * https://nils-mehlhorn.de/posts/angular-environment-setup-testing/
 *
 * @returns The environment
 */
export function getEnv(): IEnvironment {
  return environment;
}
