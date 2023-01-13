import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      px={6}
      py={4}
      w="full"
      bgColor="brand.500"
      textAlign={['center', 'center', 'left']}
    >
      <Heading size="md" color="white">
        Date Picker
      </Heading>
    </Box>
  );
};
export default Header;
