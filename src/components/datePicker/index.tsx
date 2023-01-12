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
  const { month, year, years, dates } = state.context;

  const isDateView = state.matches(DATE_PICKER_STATE.DATE_VIEW);
  const isMonthView = state.matches(DATE_PICKER_STATE.MONTH_VIEW);
  const isYearView = state.matches(DATE_PICKER_STATE.YEAR_VIEW);

  const handleSwitchView = () => {
    if (isDateView) {
      send({ type: DATE_PICKER_EVENT.SWITCH_MONTH_VIEW });
    }
    if (isMonthView) {
      send({ type: DATE_PICKER_EVENT.SWITCH_YEAR_VIEW });
    }
  };

  return (
    <Flex direction="column" width="250px">
      <Flex justify="space-between" align="center" gap={2}>
        <Button
          variant="ghost"
          onClick={() => send({ type: DATE_PICKER_EVENT.PREVIOUS })}
        >
          {'<'}
        </Button>
        <Button flex="1" onClick={handleSwitchView}>
          {isDateView
            ? `${MONTHS[month]} ${year}`
            : isMonthView
            ? year
            : `${years[0]} - ${years[years.length - 1]}`}
        </Button>
        <Button
          variant="ghost"
          onClick={() => send({ type: DATE_PICKER_EVENT.NEXT })}
        >
          {'>'}
        </Button>
      </Flex>
      {isDateView && (
        <SimpleGrid columns={7} spacing={1} mt={2}>
          {DAYS.map((day) => (
            <Text key={day} fontWeight="semibold">
              {day}
            </Text>
          ))}
          {dates.map((date, i) => (
            <Button
              key={i}
              variant="ghost"
              size="xs"
              boxSize="32px"
              borderRadius="full"
            >
              {date}
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
      {isYearView && (
        <SimpleGrid columns={4} spacing={1} mt={2}>
          {years.map((year) => (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              boxSize="40px"
              borderRadius="full"
              onClick={() =>
                send({ type: DATE_PICKER_EVENT.SELECT_YEAR, year })
              }
            >
              {year}
            </Button>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};
export default DatePicker;
