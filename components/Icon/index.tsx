import { IconProps } from '../../types/UI/Icon';
import ChevronDown from './ChevronDown';
import Heart from './Heart';
import VerifiedTag from './VerifiedTag';

const icons: { [key: string]: React.FC<IconProps> } = {
  'chevron-down': ChevronDown,
  heart: Heart,
  'verified-tag': VerifiedTag,
};

const Icon = ({ name, size, color, style, active, className }: IconProps) => {
  const IconComponent = icons[name];
  if (IconComponent)
    return (
      <IconComponent {...{ size, color, style, active, className, name }} />
    );
  else throw new Error('Icon name not found.');
};

export default Icon;
