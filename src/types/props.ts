interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface TabProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  isActive: boolean;
  onClick: (e: MouseEvent, id: string) => void;
}

export interface TabImageProps {
  id: string;
  src: string;
  title: string;
}
