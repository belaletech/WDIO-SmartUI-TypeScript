export const waitForElement = async (selector: string) => {
    await new Promise(resolve => setTimeout(resolve, 5000));
  };
  