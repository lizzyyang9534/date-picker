import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { DatePicker, DatePickerInput } from './components/datePicker';

function App() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  return (
    <Flex
      gap={20}
      p={10}
      pt={[6, 6, 12, 20]}
      direction={['column', 'column', 'row']}
      justify="center"
    >
      <Box>
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

      <Box>
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
  );
}

export default App;
