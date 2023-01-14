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
  useDisclosure,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { DatePickerInputProps, DatePickerProps } from './types';
import { MONTHS } from './constants';
import {
  datePickerMachine,
  DATE_PICKER_EVENT,
  DATE_PICKER_STATE,
} from './machine';
import { formatISODate, isValidISODateString } from './utils';
import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';
import DateView from './components/DateView';
import MonthView from './components/MonthView';
import YearView from './components/YearView';

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
    <Flex direction="column" width="250px" minH="296px" bgColor="white">
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
        <DateView
          dates={dates}
          selectedDate={selectedDate}
          currentMonth={month}
          onSelect={(date) =>
            send({ type: DATE_PICKER_EVENT.SELECT_DATE, date })
          }
        />
      )}
      {isMonthView && (
        <MonthView
          selectedMonth={month}
          onSelect={(month) =>
            send({
              type: DATE_PICKER_EVENT.SELECT_MONTH,
              month,
            })
          }
        />
      )}
      {isYearView && (
        <YearView
          years={years}
          selectedYear={year}
          onSelect={(year) =>
            send({ type: DATE_PICKER_EVENT.SELECT_YEAR, year })
          }
        />
      )}
    </Flex>
  );
};

const DatePickerInput = ({
  date,
  onSelect,
  renderInput,
  ...props
}: DatePickerInputProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [innerDate, setInnerDate] = useState(date);
  const [inputValue, setInputValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const validateDateInput = (dateString: string) => {
    const isValid = isValidISODateString(dateString);
    if (isValid) {
      setInnerDate(new Date(dateString));
    }
    setIsInvalid(!isValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <Popover
      placement="bottom-start"
      offset={[0, 0]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        {renderInput ? (
          renderInput({ value: inputValue, onChange: handleInputChange })
        ) : (
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
              onBlur={(e) => validateDateInput(e.target.value)}
              onChange={handleInputChange}
            />
          </InputGroup>
        )}
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
              {...props}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export { DatePicker, DatePickerInput };
