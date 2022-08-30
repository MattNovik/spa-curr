import TextField from '@mui/material/TextField';
import { useState } from 'react';

const InputNumber = ({ onChage }: any) => {
  const [value, setValue] = useState<Number>(0);

  return (
    <TextField
      id="outlined-number"
      label="Amount"
      type="number"
      value={value}
      onChange={(e) => {
        setValue(Number(e.target.value));
        onChage(Number(e.target.value));
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default InputNumber;
