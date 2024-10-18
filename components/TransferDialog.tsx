import * as React from 'react';
import { ScrollView, View } from 'react-native';

import CalculatorViewModel from '@/screens/Calculator/ViewModel';

import Button from '@/components/Button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as ShadcnDialog,
} from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';

import { main } from '@/stores/main';
import { toast } from 'sonner-native';

interface TransferDialogProps {
  id: string | number;
}

export default function TransferDialog({ id }: TransferDialogProps) {
  function transferResult(to: CalculatorViewModel) {
    const from = main.calculators.find((calc) => calc.model.id == id);

    if (from) to.model.input = from.model.input;

    toast.success(`Result transferred to ${to.model.name} successfully`);
  }

  return (
    <ShadcnDialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="success">
          <Text>Transfer result</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-5/6 w-screen">
        <DialogHeader>
          <DialogTitle>Transfer result</DialogTitle>
          <DialogDescription>
            <ScrollView>
              {main.calculators
                .filter((calc) => calc.model.id != id)
                .map((item) => (
                  <View key={item.model.id}>
                    <Button size="lg" onPress={() => transferResult(item)}>
                      {item.model.name}
                    </Button>
                  </View>
                ))}
            </ScrollView>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="destructive">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
}
