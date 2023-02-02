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
      sx={{ marginTop: 1, marginBottom: 1 }}
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {toggleValues?.map((toggle) => (
        <ToggleButton
          className="h-[55.97px]"
          value={toggle.value}
          key={toggle.value}
          aria-label={toggle.label}
        >
          {toggle.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
