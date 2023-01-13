import { Button, ButtonProps } from '@chakra-ui/react';

type RoundButtonProps = {
  isActive: boolean;
  children: React.ReactNode;
} & ButtonProps;

const RoundButton = ({ isActive, children, ...props }: RoundButtonProps) => {
  return (
    <Button
      size="sm"
      variant={isActive ? 'solid' : 'ghost'}
      mx="auto"
      boxSize="40px"
      borderRadius="full"
      colorScheme={isActive ? 'brand' : 'gray'}
      {...props}
    >
      {children}
    </Button>
  );
};
export default RoundButton;
