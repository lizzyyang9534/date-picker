import { SimpleGrid, Text } from '@chakra-ui/react';
import { DAYS } from '../constants';
import { isSameDay, isToday } from '../utils';
import RoundButton from './RoundButton';

type DateViewProps = {
  dates: Date[];
  selectedDate: Date | null;
  currentMonth: number;
  onSelect: (date: Date) => void;
};
const DateView = ({
  dates,
  selectedDate,
  currentMonth,
  onSelect,
}: DateViewProps) => {
  return (
    <SimpleGrid columns={7} spacing={1} mt={4} textAlign="center">
      {DAYS.map((day) => (
        <Text key={day} fontWeight="semibold">
          {day}
        </Text>
      ))}
      {dates.map((date, i) => {
        const isSelected = !!selectedDate && isSameDay(selectedDate, date);
        return (
          <RoundButton
            key={i}
            isActive={isSelected}
            size="xs"
            boxSize="32px"
            color={
              isToday(date) && !isSelected
                ? 'brand.500'
                : date.getMonth() !== currentMonth
                ? 'brandGray.700'
                : undefined
            }
            onClick={() => onSelect(date)}
          >
            {date.getDate()}
          </RoundButton>
        );
      })}
    </SimpleGrid>
  );
};
export default DateView;
