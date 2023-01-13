import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { DatePicker, DatePickerInput } from './components/datePicker';
import Header from './components/Header';

function App() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  return (
    <Box minH="100vh" bgColor="brandGray.500">
      <Header />
      <Flex
        gap={[10, 10, 20]}
        p={[6, 6, 10]}
        pt={[6, 6, 12, 20]}
        direction={['column', 'column', 'row']}
        justify="center"
      >
        <Box p={[4, 4, 6, 10]} bgColor="white" borderRadius="md">
          <Heading size={['md', 'md', 'lg']} mb={[4, 4, 8]}>
            Pure Date Picker
          </Heading>
          <DatePicker
            date={date1}
            onSelect={(date) => {
              console.log('selected date:', date);
              setDate1(date);
            }}
          />
        </Box>

        <Box p={[4, 4, 6, 10]} bgColor="white" borderRadius="md">
          <Heading size={['md', 'md', 'lg']} mb={[4, 4, 8]}>
            Date Picker Input
          </Heading>
          <DatePickerInput
            date={date2}
            onSelect={(date) => {
              console.log('selected date:', date);
              setDate2(date);
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
