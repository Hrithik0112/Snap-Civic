import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import { uploadToCloudinary } from "@/services/imageUpload";

type LocationData = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};
export default function CreateIssueScreen() {
  const width = Dimensions.get("window").width;
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<LocationData>({
    address: "",
    coordinates: null,
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const pickImage = async () => {
    try {
      // Request permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 10,
      });

      if (!result.canceled) {
        setIsLoading(true);
        setUploadProgress(new Array(result.assets.length).fill(0));

        // Upload images one by one
        const uploadedUrls = await Promise.all(
          result.assets.map(async (asset, index) => {
            try {
              const response = await uploadToCloudinary(
                asset.uri,
                (progress: number) => {
                  setUploadProgress((prev) => {
                    const newProgress = [...prev];
                    newProgress[index] = progress;
                    return newProgress;
                  });
                }
              );
              return response.secure_url;
            } catch (error) {
              console.error(`Error uploading image ${index + 1}:`, error);
              return null;
            }
          })
        );

        // Filter out failed uploads and update state
        const successfulUploads = uploadedUrls.filter(
          (url): url is string => url !== null
        );
        setImages((prev) => [...prev, ...successfulUploads]);
      }
    } catch (error) {
      console.error("Error picking/uploading images:", error);
      Alert.alert("Error", "Failed to upload images. Please try again.");
    } finally {
      setIsLoading(false);
      setUploadProgress([]);
    }
  };

  const closeModal = () => setSelectedImageIndex(-1);

  console.log("images from create", images);
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });

      if (address[0]) {
        const {
          street,
          streetNumber,
          district,
          city,
          subregion,
          region,
          country,
          postalCode,
        } = address[0];

        const formattedAddress = [
          streetNumber,
          street,
          district,
          city,
          subregion,
          region,
          country,
          postalCode,
        ]
          .filter(Boolean) // Remove null/undefined values
          .join(", ")
          .replace(/,\s*,/g, ",") // Clean up multiple commas
          .replace(/,\s*$/, ""); // Remove trailing comma

        const locationData = {
          address: formattedAddress,
          coordinates: {
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          },
        };

        setLocation(locationData);
        console.log("Location Data:", locationData);
      }
    } catch (error) {
      alert("Error getting location");
    }
  };

  const categories = [
    "Handlebar",
    "QR code",
    "Tube",
    "Brakes",
    "Throttle",
    "Light",
    "Battery",
    "Kickstand",
    "Deck",
    "Wheels",
    "Display",
    "Tire",
    "Bell",
    "Doesn't start",
    "Other",
  ];

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.insideContainer}>
          <Text style={styles.title}>Create Issue</Text>

          {/* Image Upload Section */}
          <Pressable style={styles.imageUpload} onPress={pickImage}>
            {images.length > 0 ? (
              <ScrollView horizontal style={{ width: "100%" }}>
                {images.slice(0, 2).map((uri, index) => (
                  <Pressable
                    key={index}
                    style={{ margin: 5 }}
                    onPress={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      source={{ uri }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 8,
                        marginRight: 0,
                      }}
                      resizeMode="cover"
                    />
                    {index === 1 && images.length > 2 && (
                      <View style={styles.imageOverlay}>
                        <Text style={styles.overlayText}>
                          +{images.length - 2}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome name="camera" size={40} color="#666" />
                <Text>Upload Images</Text>
              </View>
            )}
          </Pressable>

          {/* Location Section */}
          <View style={styles.locationContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder="Location"
              value={location.address}
              onChangeText={(text) =>
                setLocation({ ...location, address: text })
              }
            />
            <Pressable onPress={getCurrentLocation} style={styles.locationIcon}>
              <FontAwesome name="location-arrow" size={20} color="#666" />
            </Pressable>
          </View>

          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter issue title"
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the issue in detail"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Select all issues that apply</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategories.includes(cat) && styles.categorySelected,
                  ]}
                  onPress={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat)
                        ? prev.filter((c) => c !== cat)
                        : [...prev, cat]
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategories.includes(cat) &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            style={[styles.button]}
            onPress={() => {
              // Handle submission
              console.log({ images, location, title, description, category });
            }}
          >
            <Text style={styles.buttonText}>Submit Issue</Text>
          </Pressable>
        </View>

        {/* Image Viewer Modal */}
        <Modal
          isVisible={selectedImageIndex !== -1}
          onBackButtonPress={closeModal}
          onBackdropPress={closeModal}
          style={{ margin: 0 }}
          backdropOpacity={0.5}
        >
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={closeModal}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome name="close" size={30} color="white" />
            </Pressable>

            <ScrollView
              horizontal
              pagingEnabled
              style={{ width: "100%", backgroundColor: "black" }}
              contentContainerStyle={{ width: width * images.length }}
              showsHorizontalScrollIndicator={false}
            >
              {images?.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  insideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  imageUpload: {
    width: "100%",
    height: 160,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  locationContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  locationIcon: {
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  descriptionInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 20,
  },
  modalImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  overlayText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  categorySelected: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  categoryTextSelected: {
    color: "white",
  },
});
