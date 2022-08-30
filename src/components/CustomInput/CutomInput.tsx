import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';

const CustomInput = ({ base, listCurrency, id, onChange }: any) => {
  const [value, setValue] = useState(base);
  const [sybmolObj, setSymbolObject] = useState();
  const [symbol, setSymbol] = useState<String>('Add your currency');

  useEffect(() => {
    setValue(base);
    fetch('https://api.exchangerate.host/symbols')
      .then((res) => res.json())
      .then((data) => {
        let descriptions: any = {};

        for (let i in data.symbols) {
          descriptions[data.symbols[i].code] = data.symbols[i].description;
        }
        setSymbolObject(descriptions);
      });
  }, [base]);

  useEffect(() => {
    if (sybmolObj !== undefined) {
      setSymbol(sybmolObj[value.label]);
    }
  }, [value]);
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue === null) {
          onChange('');
        } else {
          onChange(newValue.label);
        }
      }}
      value={value}
      disablePortal
      id={id}
      options={listCurrency}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={symbol} />}
    />
  );
};

export default CustomInput;
