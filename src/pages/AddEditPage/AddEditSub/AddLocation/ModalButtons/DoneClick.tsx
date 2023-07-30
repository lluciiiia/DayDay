import React from "react";

import { useIonToast, IonButtons, IonButton } from "@ionic/react";

interface DoneClickProps {
  setShowModal: (show: boolean) => void;
}

const DoneClick: React.FC<DoneClickProps> = ({ setShowModal }) => {
  const [present] = useIonToast();

  const handleDoneClick = async () => {};

  // Render nothing since this is not a component that returns JSX
  return (
    <IonButtons slot="end">
      <IonButton onClick={handleDoneClick}>Done</IonButton>
    </IonButtons>
  );
};

export default DoneClick;
