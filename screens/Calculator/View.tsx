import { useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';

import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';

import ViewModel from './ViewModel';

export default observer(() => {
  const [viewModel] = useState(() => new ViewModel());

  return (
    <SafeAreaView>
      <View>
        <Text>{viewModel.input}</Text>
        <FlatList
          data={Array(9)
            .fill(0)
            .map((_, i) => i + 1)}
          renderItem={({ item }) => (
            <Button
              title={item.toString()}
              onPress={() => {
                viewModel.appendInput(item.toString());
              }}
            />
          )}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
});
