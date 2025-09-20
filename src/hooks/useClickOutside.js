// hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

/**
 * A custom React hook that triggers a callback function when a click occurs outside of the referenced component.
 * This is commonly used for closing modals, dropdowns, or popovers when a user clicks elsewhere on the page.
 * * @param {function} callback The function to be executed when a click outside the referenced element is detected.
 * @returns {object} A mutable ref object that should be attached to the DOM element you want to monitor.
 */
const useClickOutside = (callback) => {
  // Create a ref to hold the DOM element that we want to detect clicks outside of.
  const ref = useRef(null);

  // useEffect is used to add and remove the event listener to the document.
  useEffect(() => {
    /**
     * The event handler function that checks if the click happened outside the referenced element.
     * @param {MouseEvent} event The click event object.
     */
    const handleClickOutside = (event) => {
      // Check if the ref has a current value (meaning the component is mounted) AND
      // if the clicked target is NOT contained within the referenced element.
      if (ref.current && !ref.current.contains(event.target)) {
        // If the click is outside, call the provided callback function.
        callback();
      }
    };

    // Add a 'mousedown' event listener to the entire document.
    document.addEventListener('mousedown', handleClickOutside);

    // This return function is the cleanup mechanism for the effect.
    // It runs when the component unmounts or before the effect re-runs.
    return () => {
      // Remove the 'mousedown' event listener to prevent memory leaks.
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]); // The effect re-runs if the callback function changes.

  // Return the ref object so the component can attach it to a DOM element.
  return ref;
};

export default useClickOutside;