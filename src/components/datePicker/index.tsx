import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { DatePickerProps } from '../../types';
import { DAYS } from './constants';

const DatePicker = ({ date, onSelect }: DatePickerProps) => {
  return (
    <Flex direction="column" width="250px">
      <Flex justifyContent="space-between" alignItems="center">
        <Button variant="ghost">{'<'}</Button>
        <Button>Month</Button>
        <Button variant="ghost">{'>'}</Button>
      </Flex>
      <SimpleGrid columns={7} spacing={1} mt={2}>
        {DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {Array(42)
          .fill(10)
          .map((day) => (
            <Button
              key={day}
              variant="ghost"
              size="xs"
              boxSize="32px"
              borderRadius="full"
            >
              {day}
            </Button>
          ))}
      </SimpleGrid>
    </Flex>
  );
};
export default DatePicker;
