import { JwtPayload } from 'jsonwebtoken';
import { RolesEnum } from '../enum/roles.enum';

export interface ApiJwtPayload extends JwtPayload {
  id?: string;
  name?: string;
  number?: number;
  role?: RolesEnum;
}
