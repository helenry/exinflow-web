// /hooks/usePopover.js
import { useState, useRef, useCallback, useEffect } from "react";

/**
 * A custom React hook for managing the state and behavior of a popover component.
 * It provides the logic for opening, closing, and positioning a popover relative to a trigger element.
 * * @returns {object} An object containing state, refs, and functions to control a popover.
 * - activePopover: The key of the currently open popover, or null if none are open.
 * - popoverPosition: The CSS position (top, left, etc.) for the popover element.
 * - buttonRefs: A mutable ref object to store references to the popover's trigger buttons.
 * - openPopover: A function to explicitly open a popover by key and trigger element.
 * - closePopover: A function to close any currently open popover.
 * - togglePopover: A function to open a popover if it's closed, or close it if it's open.
 */
export function usePopover() {
  // State to track which popover is currently active.
  // We use a key (like a string ID) to identify it.
  const [activePopover, setActivePopover] = useState(null);

  // State to hold the popover's position, initially at the top.
  const [popoverPosition, setPopoverPosition] = useState({ top: 0 });

  // A ref to store references to the trigger buttons for each popover.
  // This allows us to access the DOM element of the button later for positioning.
  const buttonRefs = useRef({});

  /**
   * Opens a specific popover.
   * @param {string} key - A unique identifier for the popover.
   * @param {HTMLElement} buttonElement - The DOM element of the button that triggered the popover.
   */
  const openPopover = useCallback((key, buttonElement) => {
    // If no button element is provided, we can't position the popover, so we exit.
    if (!buttonElement) return;

    // Get the position and dimensions of the button element.
    const rect = buttonElement.getBoundingClientRect();

    // Set the popover's top position to match the top of the button.
    // This is a simple positioning method; more complex ones could use `rect.left` as well.
    setPopoverPosition({ top: rect.top });

    // Set the active popover to the provided key, making it visible.
    setActivePopover(key);
  }, []); // Dependencies are empty because these setters are stable.

  /**
   * Closes the currently active popover by setting the key to null.
   */
  const closePopover = useCallback(() => {
    setActivePopover(null);
  }, []); // No dependencies.

  /**
   * Toggles the state of a popover (opens it if closed, closes it if open).
   * @param {string} key - A unique identifier for the popover.
   * @param {HTMLElement} buttonElement - The DOM element of the trigger button.
   */
  const togglePopover = useCallback(
    (key, buttonElement) => {
      if (activePopover === key) {
        // The popover is already open, so close it.
        closePopover();
      } else {
        // A different popover is open or none are open, so open this one.
        openPopover(key, buttonElement);
      }
    },
    [activePopover, openPopover, closePopover],
  ); // Dependencies ensure the function updates when state changes.

  // Effect to handle closing the popover when the user clicks outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if a popover is open AND the click target is not inside a popover
      // AND the click target is not a popover trigger button.
      if (
        activePopover &&
        !event.target.closest("[data-popover]") &&
        !event.target.closest("[data-popover-trigger]")
      ) {
        closePopover();
      }
    };

    // Add the event listener when the component mounts or the `activePopover` state changes.
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts.
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePopover, closePopover]); // Re-run effect only when these values change.

  // Return the necessary state and functions for the component to use.
  return {
    activePopover,
    popoverPosition,
    buttonRefs,
    openPopover,
    closePopover,
    togglePopover,
  };
}
