import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-20 w-20 items-center justify-center bg-black"
      onPress={props.onPress}
    >
      <Text className="text-center text-3xl text-white">{title}</Text>
    </TouchableOpacity>
  );
}
