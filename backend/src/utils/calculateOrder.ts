export const calculateNewOrder = (
    beforeOrder: number | null,
    afterOrder: number | null
  ) => {
    if (beforeOrder === null) {
      return afterOrder !== null ? afterOrder / 2 : 1; // If no before task, halve the afterOrder or default to 1
    }
    if (afterOrder === null) {
      return beforeOrder + 1; // If no after task, increment beforeOrder
    }
    return (beforeOrder + afterOrder) / 2; // Average of beforeOrder and afterOrder
  };