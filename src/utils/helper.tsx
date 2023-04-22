import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";

export class SmartPointerSensor extends PointerSensor {
  static activators = [
      {
          eventName: "onPointerDown" as any,
          handler: ({ nativeEvent: event }: PointerEvent) => {
              if (
                  !event.isPrimary ||
                  event.button !== 0 ||
                  isInteractiveElement(event.target as Element)
              ) {
                  return false;
              }

              return true;
          },
      },
  ];
}

function isInteractiveElement(element: Element | null) {
  const interactiveElements = [
      "button",
      "input",
      "textarea",
      "select",
      "option",
      "div"
  ];
  if (
      element?.tagName &&
      interactiveElements.includes(element.tagName.toLowerCase())
  ) {
      console.log(element.tagName)
      return true;
  }

  return false;
}