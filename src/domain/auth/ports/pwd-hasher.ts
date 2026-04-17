export abstract class PwdHasherPort {
   abstract hash(pwd: string): Promise<string>;
   abstract compare(pwd: string, hash: string): Promise<boolean>;
}
