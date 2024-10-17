import { ButtonProps, Button as ShadcnButton } from './ui/button';
import { Text } from './ui/text';

interface ButtonTextProps extends ButtonProps {
  children?: string | number | React.ReactNode;
}

export default function Button({ children, ...props }: ButtonTextProps) {
  return (
    <ShadcnButton
      variant="secondary"
      size="xl"
      className="m-1 !rounded-full"
      {...props}
    >
      {typeof children == 'object' ? children : <Text>{children}</Text>}
    </ShadcnButton>
  );
}
