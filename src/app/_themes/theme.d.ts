import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeText {
    link?: string;
  }

  interface PaletteOptions {
    text?: Partial<TypeText>;
  }
}
