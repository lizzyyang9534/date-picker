import { Box, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';
import { DatePicker, DatePickerInput } from './components/datePicker';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <Flex gap={20} py={10} justify="center">
      <Box>
        <Heading size="lg" mb={8}>
          Pure Date Picker
        </Heading>
        <DatePicker
          date={date}
          onSelect={(date) => {
            console.log('selected date:', date);
            setDate(date);
          }}
        />
      </Box>

      <Box>
        <Heading size="lg" mb={8}>
          Date Picker Input
        </Heading>
        <DatePickerInput
          date={date}
          onSelect={(date) => {
            console.log('selected date:', date);
            setDate(date);
          }}
        />
      </Box>
    </Flex>
  );
}

export default App;
