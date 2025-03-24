
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Calendar as CalendarIcon } from 'lucide-react';
import { UiElementsProps } from './types';

const UIElements = ({
  isMenuOpen,
  setIsMenuOpen,
  isAlertOpen,
  setIsAlertOpen,
  isPopoverOpen,
  setIsPopoverOpen,
  isDialogOpen,
  setIsDialogOpen,
  sliderValue,
  setSliderValue,
  date,
  setDate,
  commandValue,
  setCommandValue,
  items,
  setIsCommandOpen
}: UiElementsProps) => {
  return (
    <div className="space-y-4">
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Dropdown Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>View profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Alert Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <p>
            This is a popover. You can put anything you want in here. Popovers are
            great for displaying additional information or actions.
          </p>
        </PopoverContent>
      </Popover>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="shadcn" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@shadcn" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        <Label htmlFor="slider">Slider</Label>
        <Slider
          defaultValue={[sliderValue]}
          max={100}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}
        />
        <p>Value: {sliderValue}</p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-[300px] justify-start text-left font-normal" +
              (date ? " text-foreground" : " text-muted-foreground")
            }
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? date?.toLocaleDateString() : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Command className="rounded-md border">
        <CommandInput placeholder="Type a command or search..." value={commandValue} onValueChange={setCommandValue} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {items
              .filter((item) =>
                item.title.toLowerCase().includes(commandValue.toLowerCase())
              )
              .map((item) => (
                <CommandItem key={item.id} onSelect={() => {
                  setCommandValue(item.title)
                  setIsCommandOpen(false)
                }}>
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default UIElements;
