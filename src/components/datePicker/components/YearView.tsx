import { SimpleGrid } from '@chakra-ui/react';
import RoundButton from './RoundButton';

type YearViewProps = {
  years: number[];
  selectedYear: number;
  onSelect: (year: number) => void;
};
const YearView = ({ years, selectedYear, onSelect }: YearViewProps) => {
  return (
    <SimpleGrid columns={4} spacingX={1} spacingY={8} mt={4}>
      {years.map((year, i) => (
        <RoundButton
          key={year}
          isActive={year === selectedYear}
          color={
            i === 0 || i === years.length - 1 ? 'brandGray.700' : undefined
          }
          onClick={() => onSelect(year)}
        >
          {year}
        </RoundButton>
      ))}
    </SimpleGrid>
  );
};
export default YearView;
