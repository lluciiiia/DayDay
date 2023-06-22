import React, { useState, useRef } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonDatetime, IonButton, IonIcon, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { mic, document, images } from "ionicons/icons";

const AddPage = () => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [present] = useIonToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (content.trim() === "") {
      presentToast("Please enter your diary content");
      return;
    }

    // Add your logic to save the diary entry
    // For example, you can save the content in local storage or a database

    // Show success toast and navigate back to the home page after a short delay
    presentToast("Your diary is saved!");
    setTimeout(() => {
      history.push("/home");
    }, 1000);
  };

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "middle",
    });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedImages = Array.from(fileList);
      const imageTexts: string[] = []; 

      // Use the selectedImages array and the image processing API to extract text from images
      // Append the extracted text to the textarea
      selectedImages.forEach(async (image) => {
        const imageData = await readImageAsDataURL(image);
        const imageText = await extractTextFromImage(imageData);
        imageTexts.push(imageText);
      });

      setContent(content + imageTexts.join("\n"));
    }
  };

  const readImageAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const extractTextFromImage = async (imageData: string): Promise<string> => {
    // Use the image processing API to extract text from the image
    // Replace the following line with the actual API call or image processing code
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Extracted text from image";
  };

  const handleVoiceClick = () => {
    // Implement voice recording functionality using an API or the Web Speech API
    // Convert the recorded voice to text and insert it into the textarea
  };

  const handleDocumentClick = () => {
    // Implement document scanning functionality using an OCR API or OpenCV.js
    // Extract text from the scanned document and append it to the textarea
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Write your day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            height: 680,
            overflowY: "scroll",
            maxWidth: 370,
            margin: "0 auto",
            padding: "20px 3px"
          }}
        >
          <textarea
            value={content}
            onChange={handleContentChange}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: 10,
              borderColor: "transparent",
            }}
            placeholder="Enter your diary here"
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 10,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.5rem",
          }}
        >
          <IonButton fill="outline" id="voice" onClick={handleVoiceClick}>
            <IonIcon icon={mic} />
          </IonButton>
          <IonButton fill="outline" id="scan" onClick={handleDocumentClick}>
            <IonIcon icon={document} />
          </IonButton>
          <IonButton fill="outline" id="attachment" onClick={handleImageClick}>
            <IonIcon icon={images} />
          </IonButton>
          <IonButton
            fill="outline"
            id="save"
            style={{ width: "160px" }}
            onClick={handleSave}
          >
            Save
          </IonButton>
        </div>
        {/* Hidden file input for image selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          multiple
        />
      </IonContent>
    </>
  );
};

export default AddPage;
