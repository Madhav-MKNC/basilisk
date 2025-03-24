
import React from 'react';
import IconButton, { IconButtonProps } from './IconButton';

interface IconGridProps {
  children: React.ReactNode;
  className?: string;
  handleIconButtonClick?: (icon: string) => void;
}

const IconGrid: React.FC<IconGridProps> = ({ 
  children, 
  className = '',
  handleIconButtonClick
}) => {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<IconButtonProps>(child) && child.props && 'label' in child.props) {
          // Pass the handleIconButtonClick prop to the child component
          return React.cloneElement(child, {
            key: index,
            onClick: () => handleIconButtonClick && handleIconButtonClick(child.props.label || `icon-${index}`)
          });
        }
        return child;
      })}
    </div>
  );
};

export const IconGridItem: React.FC<IconButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  active = false,
  className = ''
}) => {
  return (
    <IconButton
      icon={icon}
      label={label}
      onClick={onClick}
      active={active}
      className={className}
    />
  );
};

// This wrapper creates the grid of icons for tools and actions
export const createIconGrid = (icons: { icon: React.ReactNode; label: string }[], onIconClick?: (label: string) => void) => {
  return (
    <IconGrid handleIconButtonClick={onIconClick}>
      {icons.map((iconItem, idx) => (
        <IconButton 
          key={idx} 
          icon={iconItem.icon} 
          label={iconItem.label}
          onClick={() => onIconClick && onIconClick(iconItem.label)}
        />
      ))}
    </IconGrid>
  );
};

export default IconGrid;
