import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-datepicker';

export function Agendamento() {
  const [data, setData] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DatePicker
        style={{width: 200}}
        date={data}
        format="DD-MM-YYYY"
        maxDate="31-12-9999"
        onDateChange={setData}
      />
      <Text style={{fontSize: 18}}>O horário está marcado para {data}</Text>
    </View>
  );
}

Agendamento.navigationOption = {
  title: 'Agendamento',
};
