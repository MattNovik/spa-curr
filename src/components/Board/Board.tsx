import styled from 'styled-components';
import CustomInput from '../CustomInput/CutomInput';
import InputNumber from '../InputNumber/InputNumber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  column-gap: 20px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ResultName = styled.h3`
  margin: 0;
`;

const Board = () => {
  const [baseCurrency, setBaseCurrency] = useState<String | null>(null);
  const [listCurrency, setListCurrency] = useState<Array<Object> | null>([]);
  const [from, setFrom] = useState<String>('');
  const [to, setTo] = useState<String>('');
  const [currency, setCurrency] = useState<Number>(1);
  const [amount, setAmount] = useState<Number>(0);
  const [result, setResult] = useState<String>('');

  const updateForm = (value: string) => {
    setFrom(value);
  };

  const updateTo = (value: string) => {
    setTo(value);
  };

  const updateAmount = (value: number) => {
    setAmount(value);
  };

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest')
      .then((res) => res.json())
      .then((data) => {
        let createObj: Array<Object> = [];

        for (let i in data.rates) {
          createObj.push({ label: i, value: data.rates[i] });
        }
        setBaseCurrency(data.base);
        setFrom(data.base);
        setListCurrency(createObj);
      });
  }, []);

  const fetchCurrency = (from: String, to: String) => {
    fetch(
      `${'https://api.exchangerate.host/convert?from=' + from + '&to=' + to}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrency(data.result);
      });
  };

  useEffect(() => {
    fetchCurrency(from, to);
  }, [from, to, amount]);

  useEffect(() => {
    setResult((Number(amount) * Number(currency)).toLocaleString());
  }, [amount, currency]);

  return (
    <Wrapper>
      <InputNumber onChage={updateAmount} />
      <CustomInput
        base={baseCurrency}
        listCurrency={listCurrency}
        id="startInput"
        onChange={updateForm}
      />
      <ArrowForwardIcon />
      <CustomInput
        base="Add your currency"
        listCurrency={listCurrency}
        id="endInput"
        onChange={updateTo}
      />
      <Result>
        <ResultName>Result</ResultName>
        {result}
      </Result>
    </Wrapper>
  );
};

export default Board;
