export const presentToast = (
    present: (options: any) => void,
    message: string
  ) => {
    present({
      message: message,
      duration: 150,
      position: "middle",
    });
  };
