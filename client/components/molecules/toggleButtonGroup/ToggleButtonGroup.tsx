import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toggleButtonGroupPropsType } from './toggleButtonGroupType';
export default function ToggleButtons({
  alignment,
  handleAlignment,
  toggleValues,
}: toggleButtonGroupPropsType) {
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {toggleValues?.map((toggle) => (
        <ToggleButton value={toggle.value} aria-label={toggle.label}>
          {toggle.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
