import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface bottomNavPropsType {
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  path: string;
}
