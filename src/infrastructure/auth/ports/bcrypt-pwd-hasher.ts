import bcrypt from 'bcryptjs';

export interface PwdHasherPort {
   compare(pwd: string, hash: string): Promise<boolean>;
   hash(pwd: string): Promise<string>;
}

export class BcryptPwdHasher implements PwdHasherPort {
   async hash(pwd: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pwd, salt);
      return hash;
   }

   async compare(pwd: string, hash: string): Promise<boolean> {
      const valid = await bcrypt.compare(pwd, hash);
      return valid;
   }
}
