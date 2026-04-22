// shared/ui/more-button/MoreButton.tsx

import React, { CSSProperties, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface MoreButtonAction {
  label: string;
  onClick: () => void;
  styles?: CSSProperties;
}

interface MoreButtonProps {
  actions: MoreButtonAction[];
  classNameButton?: string;
}

const MoreButton: React.FC<MoreButtonProps> = ({
  actions,
  classNameButton,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: MoreButtonAction) => {
    action.onClick();
    handleClose();
  };

  return (
    <>
      <IconButton className={classNameButton ?? ''} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {actions.map((action, index) => (
          <MenuItem
            style={action.styles}
            key={index}
            onClick={() => handleActionClick(action)}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { MoreButton };
