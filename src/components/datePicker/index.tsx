import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { DatePickerProps } from '../../types';
import { DAYS, MONTHS } from './constants';
import {
  datePickerMachine,
  DATE_PICKER_EVENT,
  DATE_PICKER_STATE,
} from './machine';
import { isSameDay, isToday } from './utils';

const DatePicker = ({ date, onSelect }: DatePickerProps) => {
  const [state, send] = useMachine(datePickerMachine, {
    context: {
      initialDate: date,
    },
    actions: {
      triggerOnSelect: ({ selectedDate }) => {
        if (selectedDate) {
          onSelect(selectedDate);
        }
      },
    },
  });
  const { month, year, years, dates, selectedDate } = state.context;

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
            : `${years[0] + 1} - ${years[years.length - 1] - 1}`}
        </Button>
        <Button
          variant="ghost"
          onClick={() => send({ type: DATE_PICKER_EVENT.NEXT })}
        >
          {'>'}
        </Button>
      </Flex>
      {isDateView && (
        <SimpleGrid columns={7} spacing={1} mt={2} textAlign="center">
          {DAYS.map((day) => (
            <Text key={day} fontWeight="semibold">
              {day}
            </Text>
          ))}
          {dates.map((d, i) => {
            const isSelected = selectedDate && isSameDay(selectedDate, d);
            return (
              <Button
                key={i}
                variant={isSelected ? 'solid' : 'ghost'}
                size="xs"
                boxSize="32px"
                borderRadius="full"
                color={
                  isToday(d) && !isSelected
                    ? 'brand.500'
                    : d.getMonth() !== month
                    ? 'brandGray.700'
                    : undefined
                }
                colorScheme={isSelected ? 'brand' : 'gray'}
                onClick={() =>
                  send({ type: DATE_PICKER_EVENT.SELECT_DATE, date: d })
                }
              >
                {d.getDate()}
              </Button>
            );
          })}
        </SimpleGrid>
      )}
      {isMonthView && (
        <SimpleGrid columns={4} spacing={1} mt={2}>
          {MONTHS.map((m, monthIndex) => (
            <Button
              key={m}
              variant={monthIndex === month ? 'solid' : 'ghost'}
              size="sm"
              boxSize="40px"
              borderRadius="full"
              colorScheme={monthIndex === month ? 'brand' : 'gray'}
              onClick={() =>
                send({
                  type: DATE_PICKER_EVENT.SELECT_MONTH,
                  month: monthIndex,
                })
              }
            >
              {m.slice(0, 3)}
            </Button>
          ))}
        </SimpleGrid>
      )}
      {isYearView && (
        <SimpleGrid columns={4} spacing={1} mt={2}>
          {years.map((y, i) => (
            <Button
              key={month}
              variant={y === year ? 'solid' : 'ghost'}
              size="sm"
              boxSize="40px"
              borderRadius="full"
              color={
                i === 0 || i === years.length - 1 ? 'brandGray.700' : undefined
              }
              colorScheme={y === year ? 'brand' : 'gray'}
              onClick={() =>
                send({ type: DATE_PICKER_EVENT.SELECT_YEAR, year: y })
              }
            >
              {y}
            </Button>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

const DatePickerInput = ({ date, onSelect }: DatePickerProps) => {
  return (
    <Popover placement="bottom-start" offset={[0, 0]}>
      <PopoverTrigger>
        <Input />
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="auto">
          <PopoverBody>
            <DatePicker date={date} onSelect={onSelect} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { DatePicker, DatePickerInput };
