"use client";

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
import { CircleHelp, SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import NumberInput from "./ui/number-input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";

const Settings = () => {
  const [desiredTheme, setDesiredTheme] = React.useState("");
  const [sleepPrevention, setSleepPrevention] = React.useState(false);
  const [hideCursor, setHideCursor] = React.useState(true);
  const [wakeLock, setWakeLock] = React.useState(false);
  const [tax, setTax] = React.useState(1.5);
  const [yellowThreshold, setYellowThreshold] = React.useState(2.5);
  const [redThreshold, setRedThreshold] = React.useState(3);
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

    const toParseSleep = localStorage.getItem("sleepPrevention");
    let localSleepPrevention = undefined;
    if (toParseSleep) {
      localSleepPrevention = JSON.parse(toParseSleep);
    }

    console.log(localSleepPrevention);

    if (localSleepPrevention === undefined) {
      localStorage.setItem("sleepPrevention", "false");
      localSleepPrevention = false;
    }

    setSleepPrevention(localSleepPrevention);

    const toParseCursor = localStorage.getItem("hideCursor");
    let localHideCursor = undefined;
    if (toParseCursor) {
      localHideCursor = JSON.parse(toParseCursor);
    }

    console.log("localHideCursor", localHideCursor);

    if (localHideCursor === undefined) {
      localStorage.setItem("hideCursor", "true");
      localHideCursor = true;
    }

    setHideCursor(localHideCursor);

    let localTax = localStorage.getItem("electricityTax");

    if (localTax !== undefined) {
      setTax(Number(localTax));
    }

    let localRedTreshold = localStorage.getItem("redThreshold");
    if (localRedTreshold !== undefined) {
      setRedThreshold(Number(localRedTreshold));
    } else {
      localStorage.setItem("redThreshold", "0");
    }

    let localYellowThreshold = localStorage.getItem("yellowThreshold");
    if (localYellowThreshold !== undefined) {
      setYellowThreshold(Number(localYellowThreshold));
    } else {
      localStorage.setItem("yellowThreshold", "0");
    }
  }, []);

  React.useEffect(() => {
    if (desiredTheme) {
      localStorage.setItem("theme", desiredTheme);
    }
  }, [desiredTheme]);

  React.useEffect(() => {
    localStorage.setItem("sleepPrevention", JSON.stringify(sleepPrevention));
  }, [sleepPrevention]);

  React.useEffect(() => {
    localStorage.setItem("hideCursor", JSON.stringify(hideCursor));
  }, [hideCursor]);

  const handleTaxChange = (e: number) => {
    localStorage.setItem("electricityTax", e.toString());
    setTax(e);
  };

  React.useEffect(() => {
    localStorage.setItem("yellowThreshold", yellowThreshold.toString());
    localStorage.setItem("redThreshold", redThreshold.toString());
  }, [redThreshold, yellowThreshold]);

  return (
    <Drawer shouldScaleBackground>
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
            <div className="flex gap-1 items-center">
              <p>Show last updated</p>
              <HoverCard openDelay={0}>
                <HoverCardTrigger>
                  <CircleHelp size={16} />
                </HoverCardTrigger>
                <HoverCardContent>
                  Shows a text explaining when the data was last updated
                </HoverCardContent>
              </HoverCard>
            </div>
            <Switch
              checked={sleepPrevention}
              onClick={() => setSleepPrevention(!sleepPrevention)}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Hide cursor</p>
            <Switch
              checked={hideCursor}
              onCheckedChange={(e) => setHideCursor(e)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>Taxes</p>
              <Badge variant="secondary">Experimental</Badge>
            </div>
            <NumberInput
              value={tax}
              onChange={(e) => handleTaxChange(e)}
              step={0.1}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>Yellow threshold</p>
            </div>
            <NumberInput
              value={yellowThreshold}
              onChange={(e) => setYellowThreshold(e)}
              step={0.1}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>Red threshold</p>
            </div>
            <NumberInput
              value={redThreshold}
              onChange={(e) => setRedThreshold(e)}
              step={0.1}
            />
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
