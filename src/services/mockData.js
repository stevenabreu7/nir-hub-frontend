// Mock data for development to avoid CORS issues
export const mockModels = [
  {
    model_id: "1",
    model_name: "LIF Neuron Model",
    description: "A Leaky Integrate-and-Fire neuron model implemented for SNN applications",
    nir_version: "0.1.0",
    framework_origin: "SNNTorch",
    owner: "user123",
    tags: ["neuron", "LIF", "spiking"],
    compatible_platforms: ["PyTorch", "Norse", "Sinabs"]
  },
  {
    model_id: "2",
    model_name: "CNN MNIST Classifier",
    description: "Convolutional neural network converted to spiking neural network for MNIST classification",
    nir_version: "0.1.0",
    framework_origin: "Sinabs",
    owner: "researcher456",
    tags: ["CNN", "MNIST", "classification"],
    compatible_platforms: ["PyTorch", "Sinabs", "Lava"]
  },
  {
    model_id: "3",
    model_name: "Braille Decoder RNN",
    description: "Recurrent neural network for Braille character recognition",
    nir_version: "0.1.0",
    framework_origin: "Norse",
    owner: "user123",
    tags: ["RNN", "Braille", "decoding"],
    compatible_platforms: ["PyTorch", "Norse"]
  },
  {
    model_id: "4",
    model_name: "Lorentz Attractor",
    description: "Implementation of the Lorentz dynamical system with spiking neurons",
    nir_version: "0.1.0",
    framework_origin: "Nengo",
    owner: "scientist789",
    tags: ["dynamical-system", "demonstration"],
    compatible_platforms: ["Nengo", "Lava"]
  },
  {
    model_id: "5",
    model_name: "Visual Cortex V1 Model",
    description: "Simplified model of the primary visual cortex with Gabor filters and LIF neurons",
    nir_version: "0.1.0",
    framework_origin: "PyTorch",
    owner: "neurolab",
    tags: ["visual", "cortex", "gabor", "biology-inspired"],
    compatible_platforms: ["PyTorch", "Lava", "Loihi"]
  }
];