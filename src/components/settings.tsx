import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [desiredTheme, setDesiredTheme] = React.useState("");
  const [sleepPrevention, setSleepPrevention] = React.useState(false);
  const { setTheme } = useTheme();

  const getTheme = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 18 || currentHour < 6) {
      // After 6 PM or before 6 AM
      setTheme("dark");
    } else {
      // Between 6 AM and 6 PM
      setTheme("light");
    }
  };

  React.useEffect(() => {
    let localTheme = localStorage.getItem("theme");

    if (!localTheme) {
      localStorage.setItem("theme", "dynamic");
      localTheme = "dynamic";
    }

    setDesiredTheme(localTheme);

    let localSleepPrevention = Boolean(localStorage.getItem("sleepPrevention"));

    if (!localSleepPrevention) {
      localStorage.setItem("sleepPrevention", "false");
      localSleepPrevention = false;
    }

    setSleepPrevention(localSleepPrevention);
  }, []);

  React.useEffect(() => {
    if (desiredTheme) {
      localStorage.setItem("theme", desiredTheme);
    }
  }, [desiredTheme]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <SettingsIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col justify-center text-center">
          <DrawerTitle className="text-center">Settings</DrawerTitle>
          <DrawerDescription className="text-center">
            Setup basic functions
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col min-w-[30rem] m-auto px-5 py-5 gap-5">
          <div className="flex justify-between items-center">
            <p className="w-full">Dark mode</p>
            <Tabs defaultValue="dynamic" className="w-max" value={desiredTheme}>
              <TabsList>
                <TabsTrigger
                  value="dynamic"
                  onClick={() => setDesiredTheme("dynamic")}
                >
                  Dynamic
                </TabsTrigger>
                <TabsTrigger
                  value="light"
                  onClick={() => setDesiredTheme("light")}
                >
                  Light
                </TabsTrigger>
                <TabsTrigger
                  value="dark"
                  onClick={() => setDesiredTheme("dark")}
                >
                  Dark
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex justify-between items-center">
            <p>Sleep prevention</p>
            <Switch value={sleepPrevention} onClick={() => setSleepPrevention(!sleepPrevention)}/>
          </div>
        </div>
        <DrawerFooter className="flex flex-row justify-center">
          <Button onClick={() => location.reload()}>Save and reload</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
