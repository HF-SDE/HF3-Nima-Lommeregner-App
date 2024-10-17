import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { Delete, Undo } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';

import Button from '@/components/Button';
import { Text } from '@/components/ui/text';

import CalculatorViewModel from './ViewModel';

interface CalculatorProps {
  route: any;
}

export default observer(({ route }: CalculatorProps) => {
  const { viewModel } = route.params as { viewModel: CalculatorViewModel };

  const whiteButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, '(', 0, ')'];
  const operators = ['/', '*', '-', '+'];

  return (
    <SafeAreaView>
      <View className="flex h-full items-center justify-center">
        <TouchableOpacity
          className="absolute top-10 h-16 w-10/12 justify-end rounded-lg bg-secondary px-2"
          onPress={() => viewModel.copy()}
        >
          <Text className="ml-auto text-5xl">{viewModel.input}</Text>
        </TouchableOpacity>

        {viewModel.evaluate() != '' && (
          <View className="absolute top-32">
            <Text>
              {viewModel.input} = {viewModel.evaluate()}
            </Text>
          </View>
        )}

        <View className="mt-auto flex flex-row">
          <View>
            <FlatList
              data={whiteButtons}
              numColumns={3}
              renderItem={({ item }) => (
                <Button
                  onPress={() => {
                    viewModel.appendInput(item);
                  }}
                >
                  {item}
                </Button>
              )}
            />

            <View className="flex flex-row">
              <Button
                onPress={() => viewModel.delete()}
                onLongPress={() => viewModel.clear()}
              >
                <Delete size="35" color="white" />
              </Button>
              <Button onPress={() => viewModel.undo()}>
                <Undo size="35" color="white" />
              </Button>
              <Button onPress={() => viewModel.appendInput('.')}>.</Button>
            </View>
          </View>

          <View>
            {operators.map((operator) => (
              <Button
                key={operator}
                variant="warning"
                onPress={() => viewModel.appendInput(operator, true)}
              >
                {operator}
              </Button>
            ))}

            <Button variant="warning" onPress={() => viewModel.finalEvaluate()}>
              =
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
});
