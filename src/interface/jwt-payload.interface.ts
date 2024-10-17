import { JwtPayload } from 'jsonwebtoken';

export interface ApiJwtPayload extends JwtPayload {
  id?: string;
  name?: string;
}
