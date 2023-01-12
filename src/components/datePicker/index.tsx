import { Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { DatePickerProps } from '../../types';
import { DAYS, MONTHS } from './constants';
import {
  datePickerMachine,
  DATE_PICKER_EVENT,
  DATE_PICKER_STATE,
} from './machine';

const DatePicker = ({ date, onSelect }: DatePickerProps) => {
  const [state, send] = useMachine(datePickerMachine, {
    context: {
      selectedDate: date,
    },
  });
  const { month, year } = state.context;

  const isDateView = state.matches(DATE_PICKER_STATE.DATE_VIEW);
  const isMonthView = state.matches(DATE_PICKER_STATE.MONTH_VIEW);

  return (
    <Flex direction="column" width="250px">
      <Flex justify="space-between" align="center" gap={2}>
        <Button variant="ghost">{'<'}</Button>
        <Button
          flex="1"
          onClick={() => send({ type: DATE_PICKER_EVENT.SWITCH_MONTH_VIEW })}
        >
          {isDateView ? `${MONTHS[month]} ${year}` : year}
        </Button>
        <Button variant="ghost">{'>'}</Button>
      </Flex>
      {isDateView && (
        <SimpleGrid columns={7} spacing={1} mt={2}>
          {DAYS.map((day) => (
            <Text key={day} fontWeight="semibold">
              {day}
            </Text>
          ))}
          {Array(42)
            .fill(0)
            .map((_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="xs"
                boxSize="32px"
                borderRadius="full"
              >
                {i}
              </Button>
            ))}
        </SimpleGrid>
      )}
      {isMonthView && (
        <SimpleGrid columns={4} spacing={1} mt={2}>
          {MONTHS.map((month, index) => (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              boxSize="40px"
              borderRadius="full"
              onClick={() =>
                send({ type: DATE_PICKER_EVENT.SELECT_MONTH, month: index })
              }
            >
              {month.slice(0, 3)}
            </Button>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};
export default DatePicker;
