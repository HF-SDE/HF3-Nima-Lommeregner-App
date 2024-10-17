import { useCallback } from 'react';
import { View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import SwipeRightAction from '@/components/SwipeRightAction';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

import { main } from '@/stores/main';

interface MainProps {
  navigation: any;
}

export default observer(({ navigation }: MainProps) => {
  useFocusEffect(
    useCallback(() => {
      main.update();
    }, []),
  );

  return (
    <SafeAreaView>
      <View className="flex h-full w-full items-center justify-end gap-10 p-3">
        <FlatList
          className="w-full"
          data={main.calculators}
          keyExtractor={({ model }) => model.id}
          renderItem={({ item: calc }) => (
            <Swipeable
              renderRightActions={SwipeRightAction}
              onSwipeableOpen={() => main.removeCalculator(calc.model.id)}
            >
              <Button
                key={calc.model.id}
                className="h-16 w-full rounded-3xl"
                onPress={() => {
                  navigation.navigate(calc.model.id);
                }}
              >
                <View className="flex w-full flex-row items-center justify-between p-2 pr-7">
                  <Input
                    onChangeText={(value) =>
                      main.renameCalculator(calc.model.id, value)
                    }
                    className="rounded-xl bg-accent !text-3xl"
                    autoCorrect={false}
                  >
                    {calc.model.name}
                  </Input>

                  {calc.model.input != '0' && (
                    <Text className="!text-base !text-muted">
                      {calc.model.input}
                    </Text>
                  )}
                </View>
              </Button>
            </Swipeable>
          )}
          contentContainerStyle={{
            gap: 10,
          }}
        />

        <Button
          size="lg"
          onPress={() => main.addCalculator()}
          className="w-full rounded-3xl"
          variant="success"
        >
          New calculator
        </Button>
      </View>
    </SafeAreaView>
  );
});
