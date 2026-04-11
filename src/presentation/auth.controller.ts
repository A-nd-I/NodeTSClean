import { Request, Response } from "express";
import fs from "node:fs";

export class AuthController {
  //const url_base = './data-tmp';
  constructor() {
    "";
  }

  public saveUser = (req: Request, res: Response) => {
    const body = req.body as { password: string, user_name: string };
    console.log(body);
    const { password, user_name } = body;
    const url_base = './data-tmp';

    if (!fs.existsSync(url_base)) {
      fs.mkdir(url_base, () => {
        fs.writeFileSync(url_base + "/myfile1.txt", `${user_name} with pass ${password} `);
      });
    }

    fs.writeFileSync(url_base + "/myfile1.txt", `${user_name} with pass ${password} `);

    res.json({ response: `${user_name} with pass ${password} ` });
    return true;
  };
}
