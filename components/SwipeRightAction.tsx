import { Trash2 } from 'lucide-react-native';

import { Button } from './ui/button';

export default function SwipeRightAction() {
  return (
    <Button
      variant="destructive"
      className="!h-full w-11/12 items-end justify-center rounded-3xl"
    >
      <Trash2 size={24} color="white" />
    </Button>
  );
}
