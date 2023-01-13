import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { DatePickerProps } from './types';
import { DAYS, MONTHS } from './constants';
import {
  datePickerMachine,
  DATE_PICKER_EVENT,
  DATE_PICKER_STATE,
} from './machine';
import {
  formatISODate,
  isSameDay,
  isToday,
  isValidISODateString,
} from './utils';
import { useEffect, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';
import RoundButton from './components/BrandRoundButton';

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

  useEffect(() => {
    send({ type: DATE_PICKER_EVENT.UPDATE_SELECTED_DATE, date });
  }, [date, send]);

  return (
    <Flex direction="column" width="250px" minH="296px">
      <Flex justify="space-between" align="center" gap={2}>
        <Button
          variant="ghost"
          onClick={() => send({ type: DATE_PICKER_EVENT.PREVIOUS })}
        >
          {'<'}
        </Button>
        <Button variant="ghost" flex="1" onClick={handleSwitchView}>
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
        <SimpleGrid columns={7} spacing={1} mt={4} textAlign="center">
          {DAYS.map((day) => (
            <Text key={day} fontWeight="semibold">
              {day}
            </Text>
          ))}
          {dates.map((d, i) => {
            const isSelected = !!selectedDate && isSameDay(selectedDate, d);
            return (
              <RoundButton
                key={i}
                isActive={isSelected}
                size="xs"
                boxSize="32px"
                color={
                  isToday(d) && !isSelected
                    ? 'brand.500'
                    : d.getMonth() !== month
                    ? 'brandGray.700'
                    : undefined
                }
                onClick={() =>
                  send({ type: DATE_PICKER_EVENT.SELECT_DATE, date: d })
                }
              >
                {d.getDate()}
              </RoundButton>
            );
          })}
        </SimpleGrid>
      )}
      {isMonthView && (
        <SimpleGrid columns={4} spacingX={1} spacingY={8} mt={4}>
          {MONTHS.map((m, monthIndex) => (
            <RoundButton
              key={m}
              isActive={monthIndex === month}
              onClick={() =>
                send({
                  type: DATE_PICKER_EVENT.SELECT_MONTH,
                  month: monthIndex,
                })
              }
            >
              {m.slice(0, 3)}
            </RoundButton>
          ))}
        </SimpleGrid>
      )}
      {isYearView && (
        <SimpleGrid columns={4} spacingX={1} spacingY={8} mt={4}>
          {years.map((y, i) => (
            <RoundButton
              key={y}
              isActive={y === year}
              color={
                i === 0 || i === years.length - 1 ? 'brandGray.700' : undefined
              }
              onClick={() =>
                send({ type: DATE_PICKER_EVENT.SELECT_YEAR, year: y })
              }
            >
              {y}
            </RoundButton>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

const DatePickerInput = ({ date, onSelect }: DatePickerProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [innerDate, setInnerDate] = useState(date);
  const [inputValue, setInputValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleDateInput = (dateString: string) => {
    const isValid = isValidISODateString(dateString);
    if (isValid) {
      setInnerDate(new Date(dateString));
    }
    setIsInvalid(!isValid);
  };

  return (
    <Popover
      placement="bottom-start"
      offset={[0, 0]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <InputGroup>
          <InputLeftElement
            color={isOpen ? 'blue.500' : 'inherit'}
            cursor="pointer"
            children={<CalendarIcon />}
            onClick={onToggle}
          />
          <Input
            placeholder="YYYY-MM-DD"
            value={inputValue}
            isInvalid={!!inputValue && isInvalid}
            onBlur={(e) => handleDateInput(e.target.value)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputGroup>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="auto">
          <PopoverBody>
            <DatePicker
              date={innerDate}
              onSelect={(date) => {
                onSelect(date);
                setInputValue(formatISODate(date));
                setIsInvalid(false);
                onClose();
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { DatePicker, DatePickerInput };
