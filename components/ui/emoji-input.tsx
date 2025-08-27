'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from '@/components/ui/emoji-picker';

interface EmojiInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EmojiInput({ value, onChange, placeholder = 'Digite um emoji', className }: EmojiInputProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" type="button">
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <EmojiPicker
            onEmojiSelect={(emoji: { emoji: string }) => handleEmojiSelect(emoji.emoji)}
          >
            <EmojiPickerSearch />
            <EmojiPickerContent />
          </EmojiPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}