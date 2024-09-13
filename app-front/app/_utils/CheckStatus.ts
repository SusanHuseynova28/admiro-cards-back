export const CheckStatus = (status: string) => {
    switch (status) {
      case "doing":
        return "bg-red-200 text-red-600";
      case "done":
        return "bg-green-200 text-green-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };
  