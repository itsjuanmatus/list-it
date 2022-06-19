import { IconProps } from '../../types/UI/Icon';
import ChevronDown from './ChevronDown';
import Heart from './Heart';
import VerifiedTag from './VerifiedTag';
import User from './User';
import Settings from './Settings';
import Help from './Help';

const icons: { [key: string]: React.FC<IconProps> } = {
  'chevron-down': ChevronDown,
  heart: Heart,
  'verified-tag': VerifiedTag,
  user: User,
  settings: Settings,
  help: Help,
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
