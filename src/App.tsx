import { useState } from 'react';
import './App.css';
import DatePicker from './components/datePicker';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="App">
      <DatePicker
        date={date}
        onSelect={(date) => {
          console.log(date);
          setDate(date);
        }}
      />
    </div>
  );
}

export default App;
