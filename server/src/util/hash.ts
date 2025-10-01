import argon2 from 'argon2';

/**
 * Hash a plain password with Argon2
 */
export const hash = (plainPassword: string): Promise<string> => argon2.hash(plainPassword);

/**
 * Compare a plain password with a hashed password
 */

export const compare = (plainPassword: string, hashedPassword: string): Promise<boolean> =>
    argon2.verify(hashedPassword, plainPassword);
