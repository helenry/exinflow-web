// constants/options/colors.js
export const COLOR_OPTIONS = [
  // --- Sunset Horizon Palette ---
  // Warm, graduating colors capturing the essence of a sunset sky.
  { RAW: "FF6B6B", BG: "bg-[#FF6B6B]", name: "Sunset Red" },
  { RAW: "FFA07A", BG: "bg-[#FFA07A]", name: "Light Salmon" },
  { RAW: "FFD700", BG: "bg-[#FFD700]", name: "Golden Yellow" },
  { RAW: "FF8C00", BG: "bg-[#FF8C00]", name: "Dark Orange" },
  { RAW: "B22222", BG: "bg-[#B22222]", name: "Firebrick" },
  { RAW: "4B0082", BG: "bg-[#4B0082]", name: "Indigo Violet" },
  { RAW: "800080", BG: "bg-[#800080]", name: "Purple" },
  { RAW: "F4A460", BG: "bg-[#F4A460]", name: "Sandy Brown" },

  // --- Ocean Depths Palette ---
  // Cool blues, greens, and teals inspired by the varying depths of the ocean.
  { RAW: "ADD8E6", BG: "bg-[#ADD8E6]", name: "Light Blue" },
  { RAW: "87CEEB", BG: "bg-[#87CEEB]", name: "Sky Blue" },
  { RAW: "4682B4", BG: "bg-[#4682B4]", name: "Steel Blue" },
  { RAW: "1E90FF", BG: "bg-[#1E90FF]", name: "Dodger Blue" },
  { RAW: "000080", BG: "bg-[#000080]", name: "Navy Blue" },
  { RAW: "008080", BG: "bg-[#008080]", name: "Teal" },
  { RAW: "20B2AA", BG: "bg-[#20B2AA]", name: "Light Sea Green" },
  { RAW: "006400", BG: "bg-[#006400]", name: "Dark Green" },

  // --- Forest Canopy Palette ---
  // Earthy greens, browns, and natural tones reminiscent of a dense forest.
  { RAW: "32CD32", BG: "bg-[#32CD32]", name: "Lime Green" },
  { RAW: "228B22", BG: "bg-[#228B22]", name: "Forest Green" },
  { RAW: "006400", BG: "bg-[#006400]", name: "Dark Green" }, // Duplicate, but fits context
  { RAW: "8B4513", BG: "bg-[#8B4513]", name: "Saddle Brown" },
  { RAW: "A0522D", BG: "bg-[#A0522D]", name: "Sienna" },
  { RAW: "6B8E23", BG: "bg-[#6B8E23]", name: "Olive Drab" },
  { RAW: "556B2F", BG: "bg-[#556B2F]", name: "Dark Olive Green" },
  { RAW: "708090", BG: "bg-[#708090]", name: "Slate Gray" },

  // --- Desert Sands Palette ---
  // Warm, muted yellows, oranges, and browns reflecting a desert landscape.
  { RAW: "F4A460", BG: "bg-[#F4A460]", name: "Sandy Brown" }, // Duplicate, but fits context
  { RAW: "D2B48C", BG: "bg-[#D2B48C]", name: "Tan" },
  { RAW: "CD853F", BG: "bg-[#CD853F]", name: "Peru" },
  { RAW: "B8860B", BG: "bg-[#B8860B]", name: "Dark Goldenrod" },
  { RAW: "DAA520", BG: "bg-[#DAA520]", name: "Goldenrod" },
  { RAW: "DEB887", BG: "bg-[#DEB887]", name: "Burly Wood" },
  { RAW: "BC8F8F", BG: "bg-[#BC8F8F]", name: "Rosy Brown" },
  { RAW: "A52A2A", BG: "bg-[#A52A2A]", name: "Brown" },

  // --- Mountain Peaks Palette ---
  // Cool blues, grays, and crisp whites representing snowy peaks and clear skies.
  { RAW: "B0C4DE", BG: "bg-[#B0C4DE]", name: "Light Steel Blue" },
  { RAW: "778899", BG: "bg-[#778899]", name: "Light Slate Gray" },
  { RAW: "708090", BG: "bg-[#708090]", name: "Slate Gray" }, // Duplicate, but fits context
  { RAW: "6A5ACD", BG: "bg-[#6A5ACD]", name: "Slate Blue" },
  { RAW: "F8F8FF", BG: "bg-[#F8F8FF]", name: "Ghost White" },
  { RAW: "F5F5F5", BG: "bg-[#F5F5F5]", name: "White Smoke" },
  { RAW: "DCDCDC", BG: "bg-[#DCDCDC]", name: "Gainsboro" },
  { RAW: "C0C0C0", BG: "bg-[#C0C0C0]", name: "Silver" },

  // --- Vibrant Fruit Palette ---
  // Bright, saturated colors inspired by juicy fruits.
  { RAW: "FF0000", BG: "bg-[#FF0000]", name: "Pure Red" },
  { RAW: "FF4500", BG: "bg-[#FF4500]", name: "Orange Red" },
  { RAW: "FFD700", BG: "bg-[#FFD700]", name: "Gold" },
  { RAW: "7CFC00", BG: "bg-[#7CFC00]", name: "Lawn Green" },
  { RAW: "00FF00", BG: "bg-[#00FF00]", name: "Lime" },
  { RAW: "00BFFF", BG: "bg-[#00BFFF]", name: "Deep Sky Blue" },
  { RAW: "FF1493", BG: "bg-[#FF1493]", name: "Deep Pink" },
  { RAW: "9400D3", BG: "bg-[#9400D3]", name: "Dark Violet" },

  // --- Pastel Dreams Palette ---
  // Soft, muted, and airy colors creating a gentle and calming aesthetic.
  { RAW: "FADADD", BG: "bg-[#FADADD]", name: "Light Pink" },
  { RAW: "FFF0F5", BG: "bg-[#FFF0F5]", name: "Lavender Blush" },
  { RAW: "E6E6FA", BG: "bg-[#E6E6FA]", name: "Lavender" },
  { RAW: "B0E0E6", BG: "bg-[#B0E0E6]", name: "Powder Blue" },
  { RAW: "ADD8E6", BG: "bg-[#ADD8E6]", name: "Light Blue" }, // Duplicate, but fits context
  { RAW: "C1FFC1", BG: "bg-[#C1FFC1]", name: "Pale Green" },
  { RAW: "F5DEB3", BG: "bg-[#F5DEB3]", name: "Wheat" },
  { RAW: "FFE4E1", BG: "bg-[#FFE4E1]", name: "Misty Rose" },

  // --- Jewel Tones Palette ---
  // Rich, saturated, and deep colors reminiscent of precious gemstones.
  { RAW: "8B0000", BG: "bg-[#8B0000]", name: "Dark Red" },
  { RAW: "800080", BG: "bg-[#800080]", name: "Purple" }, // Duplicate, but fits context
  { RAW: "4B0082", BG: "bg-[#4B0082]", name: "Indigo" }, // Duplicate, but fits context
  { RAW: "008080", BG: "bg-[#008080]", name: "Teal" }, // Duplicate, but fits context
  { RAW: "228B22", BG: "bg-[#228B22]", name: "Forest Green" }, // Duplicate, but fits context
  { RAW: "DAA520", BG: "bg-[#DAA520]", name: "Goldenrod" }, // Duplicate, but fits context
  { RAW: "D8BFD8", BG: "bg-[#D8BFD8]", name: "Thistle" },
  { RAW: "CD5C5C", BG: "bg-[#CD5C5C]", name: "Indian Red" },

  // --- Monochromatic Blues Palette ---
  // A gradient of blue shades, from light sky to deep navy.
  { RAW: "F0F8FF", BG: "bg-[#F0F8FF]", name: "Alice Blue" },
  { RAW: "E0FFFF", BG: "bg-[#E0FFFF]", name: "Light Cyan" },
  { RAW: "AFEEEE", BG: "bg-[#AFEEEE]", name: "Pale Turquoise" },
  { RAW: "87CEEB", BG: "bg-[#87CEEB]", name: "Sky Blue" }, // Duplicate, but fits context
  { RAW: "6A5ACD", BG: "bg-[#6A5ACD]", name: "Slate Blue" }, // Duplicate, but fits context
  { RAW: "4169E1", BG: "bg-[#4169E1]", name: "Royal Blue" },
  { RAW: "0000CD", BG: "bg-[#0000CD]", name: "Medium Blue" },
  { RAW: "00008B", BG: "bg-[#00008B]", name: "Dark Blue" },

  // --- Retro Vibes Palette ---
  // Muted yet distinct colors reminiscent of 70s and 80s aesthetics.
  { RAW: "FF8C69", BG: "bg-[#FF8C69]", name: "Salmon Pink" },
  { RAW: "FFDAB9", BG: "bg-[#FFDAB9]", name: "Peach Puff" },
  { RAW: "DB7093", BG: "bg-[#DB7093]", name: "Pale Violet Red" },
  { RAW: "C6E2EE", BG: "bg-[#C6E2EE]", name: "Light Blue Grey" },
  { RAW: "7B68EE", BG: "bg-[#7B68EE]", name: "Medium Slate Blue" },
  { RAW: "ADFF2F", BG: "bg-[#ADFF2F]", name: "Green Yellow" },
  { RAW: "FF6347", BG: "bg-[#FF6347]", name: "Tomato" },
  { RAW: "F0E68C", BG: "bg-[#F0E68C]", name: "Khaki" },

  // --- Urban Chic Palette ---
  // Modern, sophisticated grays, blacks, and subtle, muted accent colors.
  { RAW: "36454F", BG: "bg-[#36454F]", name: "Charcoal" },
  { RAW: "2F4F4F", BG: "bg-[#2F4F4F]", name: "Dark Slate Gray" },
  { RAW: "708090", BG: "bg-[#708090]", name: "Slate Gray" }, // Duplicate, but fits context
  { RAW: "A9A9A9", BG: "bg-[#A9A9A9]", name: "Dark Gray" },
  { RAW: "D3D3D3", BG: "bg-[#D3D3D3]", name: "Light Gray" },
  { RAW: "F5F5F5", BG: "bg-[#F5F5F5]", name: "White Smoke" }, // Duplicate, but fits context
  { RAW: "800000", BG: "bg-[#800000]", name: "Maroon" },
  { RAW: "40E0D0", BG: "bg-[#40E0D0]", name: "Turquoise" },

  // --- Spring Blossom Palette ---
  // Fresh, light greens, soft pinks, and delicate purples of blooming nature.
  { RAW: "98FB98", BG: "bg-[#98FB98]", name: "Pale Green" },
  { RAW: "F08080", BG: "bg-[#F08080]", name: "Light Coral" },
  { RAW: "FFB6C1", BG: "bg-[#FFB6C1]", name: "Light Pink" },
  { RAW: "EE82EE", BG: "bg-[#EE82EE]", name: "Violet" },
  { RAW: "DA70D6", BG: "bg-[#DA70D6]", name: "Orchid" },
  { RAW: "BA55D3", BG: "bg-[#BA55D3]", name: "Medium Orchid" },
  { RAW: "9370DB", BG: "bg-[#9370DB]", name: "Medium Purple" },
  { RAW: "8A2BE2", BG: "bg-[#8A2BE2]", name: "Blue Violet" },

  // --- Autumn Harvest Palette ---
  // Warm, rustic colors of fall foliage and harvest crops.
  { RAW: "B8860B", BG: "bg-[#B8860B]", name: "Dark Goldenrod" }, // Duplicate, but fits context
  { RAW: "D2691E", BG: "bg-[#D2691E]", name: "Chocolate" },
  { RAW: "CD5C5C", BG: "bg-[#CD5C5C]", name: "Indian Red" }, // Duplicate, but fits context
  { RAW: "DC143C", BG: "bg-[#DC143C]", name: "Crimson" },
  { RAW: "A0522D", BG: "bg-[#A0522D]", name: "Sienna" }, // Duplicate, but fits context
  { RAW: "BC8F8F", BG: "bg-[#BC8F8F]", name: "Rosy Brown" }, // Duplicate, but fits context
  { RAW: "8B4513", BG: "bg-[#8B4513]", name: "Saddle Brown" }, // Duplicate, but fits context
  { RAW: "CC9966", BG: "bg-[#CC9966]", name: "Burnt Orange" },

  // --- Cool Breeze Palette ---
  // Fresh, light, and airy blues and greens, evoking a calm, cool feeling.
  { RAW: "E0FFFF", BG: "bg-[#E0FFFF]", name: "Light Cyan" }, // Duplicate, but fits context
  { RAW: "AFEEEE", BG: "bg-[#AFEEEE]", name: "Pale Turquoise" }, // Duplicate, but fits context
  { RAW: "7FFFD4", BG: "bg-[#7FFFD4]", name: "Aquamarine" },
  { RAW: "66CDAA", BG: "bg-[#66CDAA]", name: "Medium Aquamarine" },
  { RAW: "40E0D0", BG: "bg-[#40E0D0]", name: "Turquoise" }, // Duplicate, but fits context
  { RAW: "00CED1", BG: "bg-[#00CED1]", name: "Dark Turquoise" },
  { RAW: "5F9EA0", BG: "bg-[#5F9EA0]", name: "Cadet Blue" },
  { RAW: "B0E0E6", BG: "bg-[#B0E0E6]", name: "Powder Blue" }, // Duplicate, but fits context

  // --- Warm Earth Palette ---
  // Deep, grounding tones inspired by natural minerals and soil.
  { RAW: "800000", BG: "bg-[#800000]", name: "Maroon" }, // Duplicate, but fits context
  { RAW: "8B0000", BG: "bg-[#8B0000]", name: "Dark Red" }, // Duplicate, but fits context
  { RAW: "A52A2A", BG: "bg-[#A52A2A]", name: "Brown" }, // Duplicate, but fits context
  { RAW: "D2691E", BG: "bg-[#D2691E]", name: "Chocolate" }, // Duplicate, but fits context
  { RAW: "F4A460", BG: "bg-[#F4A460]", name: "Sandy Brown" }, // Duplicate, but fits context
  { RAW: "D2B48C", BG: "bg-[#D2B48C]", name: "Tan" }, // Duplicate, but fits context
  { RAW: "696969", BG: "bg-[#696969]", name: "Dim Gray" },
  { RAW: "808080", BG: "bg-[#808080]", name: "Gray" },

  // --- Electric Pop Palette ---
  // Bold, neon-inspired colors for a high-energy, modern feel.
  { RAW: "FF00FF", BG: "bg-[#FF00FF]", name: "Magenta" },
  { RAW: "00FFFF", BG: "bg-[#00FFFF]", name: "Cyan" },
  { RAW: "FFFF00", BG: "bg-[#FFFF00]", name: "Yellow" },
  { RAW: "00FF7F", BG: "bg-[#00FF7F]", name: "Spring Green" },
  { RAW: "FFD700", BG: "bg-[#FFD700]", name: "Gold" }, // Duplicate, but fits context
  { RAW: "FF4500", BG: "bg-[#FF4500]", name: "Orange Red" }, // Duplicate, but fits context
  { RAW: "8A2BE2", BG: "bg-[#8A2BE2]", name: "Blue Violet" }, // Duplicate, but fits context
  { RAW: "DC143C", BG: "bg-[#DC143C]", name: "Crimson" }, // Duplicate, but fits context

  // --- Deep Night Palette ---
  // Dark, sophisticated colors with subtle hints of deep jewel tones.
  { RAW: "191970", BG: "bg-[#191970]", name: "Midnight Blue" },
  { RAW: "2F4F4F", BG: "bg-[#2F4F4F]", name: "Dark Slate Gray" }, // Duplicate, but fits context
  { RAW: "2C3E50", BG: "bg-[#2C3E50]", name: "Wet Asphalt" }, // Custom
  { RAW: "34495E", BG: "bg-[#34495E]", name: "Midnight Blue (Darker)" }, // Custom
  { RAW: "483D8B", BG: "bg-[#483D8B]", name: "Dark Slate Blue" },
  { RAW: "6A5ACD", BG: "bg-[#6A5ACD]", name: "Slate Blue" }, // Duplicate, but fits context
  { RAW: "4B0082", BG: "bg-[#4B0082]", name: "Indigo" }, // Duplicate, but fits context
  { RAW: "800080", BG: "bg-[#800080]", name: "Purple" }, // Duplicate, but fits context
];

// export const COLOR_OPTIONS = [
//   {
//     RAW: "FF3B30",
//     BG: "bg-[#FF3B30]"
//   }, // Vibrant Red
//   {
//     RAW: "FF9500",
//     BG: "bg-[#FF9500]"
//   }, // Bright Orange
//   {
//     RAW: "FFCC00",
//     BG: "bg-[#FFCC00]"
//   }, // Gold Yellow
//   {
//     RAW: "34C759",
//     BG: "bg-[#34C759]"
//   }, // System Green
//   {
//     RAW: "007AFF",
//     BG: "bg-[#007AFF]"
//   }, // System Blue
//   {
//     RAW: "5856D6",
//     BG: "bg-[#5856D6]"
//   }, // Indigo
//   {
//     RAW: "AF52DE",
//     BG: "bg-[#AF52DE]"
//   }, // Purple
//   {
//     RAW: "FF2D55",
//     BG: "bg-[#FF2D55]"
//   }, // Rose Red
//   {
//     RAW: "5AC8FA",
//     BG: "bg-[#5AC8FA]"
//   }, // Light Blue
//   {
//     RAW: "64D2FF",
//     BG: "bg-[#64D2FF]"
//   }, // Sky Blue
//   {
//     RAW: "FF495C",
//     BG: "bg-[#FF495C]"
//   }, // Coral
//   {
//     RAW: "FF6B5E",
//     BG: "bg-[#FF6B5E]"
//   }, // Salmon
//   {
//     RAW: "FF9F0A",
//     BG: "bg-[#FF9F0A]"
//   }, // Tangerine
//   {
//     RAW: "FFD60A",
//     BG: "bg-[#FFD60A]"
//   }, // Canary Yellow
//   {
//     RAW: "2CD9FF",
//     BG: "bg-[#2CD9FF]"
//   }, // Turquoise
//   {
//     RAW: "2AEEF0",
//     BG: "bg-[#2AEEF0]"
//   }, // Aqua
//   {
//     RAW: "66CC66",
//     BG: "bg-[#66CC66]"
//   }, // Forest Green
//   {
//     RAW: "BF5AF2",
//     BG: "bg-[#BF5AF2]"
//   }, // Lavender
//   {
//     RAW: "FF69B4",
//     BG: "bg-[#FF69B4]"
//   }, // Hot Pink
//   {
//     RAW: "FFCDD2",
//     BG: "bg-[#FFCDD2]"
//   }, // Light Red
//   {
//     RAW: "A5D6A7",
//     BG: "bg-[#A5D6A7]"
//   }, // Light Green
//   {
//     RAW: "90CAF9",
//     BG: "bg-[#90CAF9]"
//   }, // Light Blue Pastel
//   {
//     RAW: "BBDEFB",
//     BG: "bg-[#BBDEFB]"
//   }, // Pale Blue
//   {
//     RAW: "F8BBD0",
//     BG: "bg-[#F8BBD0]"
//   }, // Pink Pastel
//   {
//     RAW: "C5CAE9",
//     BG: "bg-[#C5CAE9]"
//   }, // Light Indigo
//   {
//     RAW: "D1C4E9",
//     BG: "bg-[#D1C4E9]"
//   }, // Light Purple
//   {
//     RAW: "B39DDB",
//     BG: "bg-[#B39DDB]"
//   }, // Medium Purple
//   {
//     RAW: "FFECB3",
//     BG: "bg-[#FFECB3]"
//   }, // Light Orange
//   {
//     RAW: "FFE0B2",
//     BG: "bg-[#FFE0B2]"
//   }, // Peach
//   {
//     RAW: "C8E6C9",
//     BG: "bg-[#C8E6C9]"
//   }, // Mint Green
//   {
//     RAW: "DCEDC8",
//     BG: "bg-[#DCEDC8]"
//   }, // Lime Green Pastel
//   {
//     RAW: "F0F4C3",
//     BG: "bg-[#F0F4C3]"
//   }, // Pale Yellow
//   {
//     RAW: "FFF9C4",
//     BG: "bg-[#FFF9C4]"
//   }, // Cream
//   {
//     RAW: "E0F7FA",
//     BG: "bg-[#E0F7FA]"
//   }, // Light Cyan
//   {
//     RAW: "B2EBF2",
//     BG: "bg-[#B2EBF2]"
//   }, // Aqua Blue
//   {
//     RAW: "80DEEA",
//     BG: "bg-[#80DEEA]"
//   }, // Turquoise Blue
//   {
//     RAW: "FFEBEE",
//     BG: "bg-[#FFEBEE]"
//   }, // Very Light Red
//   {
//     RAW: "E1BEE7",
//     BG: "bg-[#E1BEE7]"
//   }, // Light Magenta
//   {
//     RAW: "D7CCC8",
//     BG: "bg-[#D7CCC8]"
//   }, // Light Brown
//   {
//     RAW: "CFD8DC",
//     BG: "bg-[#CFD8DC]"
//   }, // Blue Grey
//   {
//     RAW: "ECEFF1",
//     BG: "bg-[#ECEFF1]"
//   }, // Light Grey
//   {
//     RAW: "B0BEC5",
//     BG: "bg-[#B0BEC5]"
//   }, // Medium Grey
//   {
//     RAW: "78909C",
//     BG: "bg-[#78909C]"
//   }, // Dark Blue Grey
//   {
//     RAW: "455A64",
//     BG: "bg-[#455A64]"
//   }, // Very Dark Blue Grey
//   {
//     RAW: "607D8B",
//     BG: "bg-[#607D8B]"
//   }, // Slate Grey
//   {
//     RAW: "795548",
//     BG: "bg-[#795548]"
//   }, // Brown
//   {
//     RAW: "A1887F",
//     BG: "bg-[#A1887F]"
//   }, // Light Brown
//   {
//     RAW: "FF8A65",
//     BG: "bg-[#FF8A65]"
//   }, // Deep Orange Pastel
//   {
//     RAW: "FFAB91",
//     BG: "bg-[#FFAB91]"
//   }, // Light Deep Orange
//   {
//     RAW: "FFCCBC",
//     BG: "bg-[#FFCCBC]"
//   }, // Very Light Deep Orange
//   {
//     RAW: "DCE775",
//     BG: "bg-[#DCE775]"
//   }, // Yellow Green
//   {
//     RAW: "F4FF81",
//     BG: "bg-[#F4FF81]"
//   }, // Bright Yellow Green
//   {
//     RAW: "C5E1A5",
//     BG: "bg-[#C5E1A5]"
//   }, // Soft Green
//   {
//     RAW: "AED581",
//     BG: "bg-[#AED581]"
//   }, // Medium Green
//   {
//     RAW: "8BC34A",
//     BG: "bg-[#8BC34A]"
//   }, // Olive Green
//   {
//     RAW: "CDDC39",
//     BG: "bg-[#CDDC39]"
//   }, // Lime Green
//   {
//     RAW: "FFEB3B",
//     BG: "bg-[#FFEB3B]"
//   }, // Yellow
//   {
//     RAW: "FFC107",
//     BG: "bg-[#FFC107]"
//   }, // Amber
//   {
//     RAW: "FF9800",
//     BG: "bg-[#FF9800]"
//   }, // Orange
//   {
//     RAW: "FB8C00",
//     BG: "bg-[#FB8C00]"
//   }, // Dark Orange
//   {
//     RAW: "EF6C00",
//     BG: "bg-[#EF6C00]"
//   }, // Deep Orange
//   {
//     RAW: "F44336",
//     BG: "bg-[#F44336]"
//   }, // Red
//   {
//     RAW: "E53935",
//     BG: "bg-[#E53935]"
//   }, // Dark Red
//   {
//     RAW: "D32F2F",
//     BG: "bg-[#D32F2F]"
//   }, // Strong Red
//   {
//     RAW: "C62828",
//     BG: "bg-[#C62828]"
//   }, // Very Strong Red
//   {
//     RAW: "B71C1C",
//     BG: "bg-[#B71C1C]"
//   }, // Deep Red
//   {
//     RAW: "E91E63",
//     BG: "bg-[#E91E63]"
//   }, // Pink
//   {
//     RAW: "D81B60",
//     BG: "bg-[#D81B60]"
//   }, // Dark Pink
//   {
//     RAW: "C2185B",
//     BG: "bg-[#C2185B]"
//   }, // Strong Pink
//   {
//     RAW: "AD1457",
//     BG: "bg-[#AD1457]"
//   }, // Deep Pink
//   {
//     RAW: "880E4F",
//     BG: "bg-[#880E4F]"
//   }, // Very Deep Pink
//   {
//     RAW: "9C27B0",
//     BG: "bg-[#9C27B0]"
//   }, // Purple
//   {
//     RAW: "8E24AA",
//     BG: "bg-[#8E24AA]"
//   }, // Dark Purple
//   {
//     RAW: "7B1FA2",
//     BG: "bg-[#7B1FA2]"
//   }, // Strong Purple
//   {
//     RAW: "6A1B9A",
//     BG: "bg-[#6A1B9A]"
//   }, // Deep Purple
//   {
//     RAW: "4A148C",
//     BG: "bg-[#4A148C]"
//   }, // Very Deep Purple
//   {
//     RAW: "673AB7",
//     BG: "bg-[#673AB7]"
//   }, // Deep Indigo
//   {
//     RAW: "5E35B1",
//     BG: "bg-[#5E35B1]"
//   }, // Dark Deep Indigo
//   {
//     RAW: "512DA8",
//     BG: "bg-[#512DA8]"
//   }, // Strong Deep Indigo
//   {
//     RAW: "4527A0",
//     BG: "bg-[#4527A0]"
//   }, // Very Strong Deep Indigo
//   {
//     RAW: "311B92",
//     BG: "bg-[#311B92]"
//   }, // Darkest Deep Indigo
//   {
//     RAW: "3F51B5",
//     BG: "bg-[#3F51B5]"
//   }, // Indigo
//   {
//     RAW: "3949AB",
//     BG: "bg-[#3949AB]"
//   }, // Dark Indigo
//   {
//     RAW: "303F9F",
//     BG: "bg-[#303F9F]"
//   }, // Strong Indigo
//   {
//     RAW: "283593",
//     BG: "bg-[#283593]"
//   }, // Very Strong Indigo
//   {
//     RAW: "1A237E",
//     BG: "bg-[#1A237E]"
//   }, // Deepest Indigo
//   {
//     RAW: "2196F3",
//     BG: "bg-[#2196F3]"
//   }, // Blue
//   {
//     RAW: "1976D2",
//     BG: "bg-[#1976D2]"
//   }, // Dark Blue
//   {
//     RAW: "1565C0",
//     BG: "bg-[#1565C0]"
//   }, // Strong Blue
//   {
//     RAW: "1565C0",
//     BG: "bg-[#1565C0]"
//   }, // Very Strong Blue
//   {
//     RAW: "0D47A1",
//     BG: "bg-[#0D47A1]"
//   }, // Deep Blue
//   {
//     RAW: "03A9F4",
//     BG: "bg-[#03A9F4]"
//   }, // Light Blue
//   {
//     RAW: "039BE5",
//     BG: "bg-[#039BE5]"
//   }, // Dark Light Blue
//   {
//     RAW: "0288D1",
//     BG: "bg-[#0288D1]"
//   }, // Strong Light Blue
//   {
//     RAW: "0277BD",
//     BG: "bg-[#0277BD]"
//   }, // Very Strong Light Blue
//   {
//     RAW: "01579B",
//     BG: "bg-[#01579B]"
//   }, // Deep Light Blue
//   {
//     RAW: "00BCD4",
//     BG: "bg-[#00BCD4]"
//   }, // Cyan
//   {
//     RAW: "00ACC1",
//     BG: "bg-[#00ACC1]"
//   }, // Dark Cyan
//   {
//     RAW: "0097A7",
//     BG: "bg-[#0097A7]"
//   }, // Strong Cyan
//   {
//     RAW: "00838F",
//     BG: "bg-[#00838F]"
//   }, // Deep Cyan
//   {
//     RAW: "006064",
//     BG: "bg-[#006064]"
//   }, // Very Deep Cyan
//   {
//     RAW: "009688",
//     BG: "bg-[#009688]"
//   }, // Teal
//   {
//     RAW: "00897B",
//     BG: "bg-[#00897B]"
//   }, // Dark Teal
//   {
//     RAW: "00796B",
//     BG: "bg-[#00796B]"
//   }, // Strong Teal
//   {
//     RAW: "00695C",
//     BG: "bg-[#00695C]"
//   }, // Deep Teal
//   {
//     RAW: "004D40",
//     BG: "bg-[#004D40]"
//   }, // Very Deep Teal
//   {
//     RAW: "4CAF50",
//     BG: "bg-[#4CAF50]"
//   }, // Green
//   {
//     RAW: "43A047",
//     BG: "bg-[#43A047]"
//   }, // Dark Green
//   {
//     RAW: "388E3C",
//     BG: "bg-[#388E3C]"
//   }, // Strong Green
//   {
//     RAW: "2E7D32",
//     BG: "bg-[#2E7D32]"
//   }, // Deep Green
//   {
//     RAW: "1B5E20",
//     BG: "bg-[#1B5E20]"
//   }, // Very Deep Green
//   {
//     RAW: "8BC34A",
//     BG: "bg-[#8BC34A]"
//   }, // Light Green
//   {
//     RAW: "7CB342",
//     BG: "bg-[#7CB342]"
//   }, // Dark Light Green
//   {
//     RAW: "689F38",
//     BG: "bg-[#689F38]"
//   }, // Strong Light Green
//   {
//     RAW: "558B2F",
//     BG: "bg-[#558B2F]"
//   }, // Deep Light Green
//   {
//     RAW: "33691E",
//     BG: "bg-[#33691E]"
//   }, // Very Deep Light Green
//   {
//     RAW: "CDDC39",
//     BG: "bg-[#CDDC39]"
//   }, // Lime
//   {
//     RAW: "C0CA33",
//     BG: "bg-[#C0CA33]"
//   }, // Dark Lime
//   {
//     RAW: "AFB42B",
//     BG: "bg-[#AFB42B]"
//   }, // Strong Lime
//   {
//     RAW: "9E9D24",
//     BG: "bg-[#9E9D24]"
//   }, // Deep Lime
//   {
//     RAW: "827717",
//     BG: "bg-[#827717]"
//   }, // Very Deep Lime
//   {
//     RAW: "FFEB3B",
//     BG: "bg-[#FFEB3B]"
//   }, // Yellow
//   {
//     RAW: "FDD835",
//     BG: "bg-[#FDD835]"
//   }, // Dark Yellow
//   {
//     RAW: "FBC02D",
//     BG: "bg-[#FBC02D]"
//   }, // Strong Yellow
//   {
//     RAW: "F9A825",
//     BG: "bg-[#F9A825]"
//   }, // Deep Yellow
//   {
//     RAW: "F57F17",
//     BG: "bg-[#F57F17]"
//   }, // Very Deep Yellow
//   {
//     RAW: "FFC107",
//     BG: "bg-[#FFC107]"
//   }, // Amber
//   {
//     RAW: "FFB300",
//     BG: "bg-[#FFB300]"
//   }, // Dark Amber
//   {
//     RAW: "FFA000",
//     BG: "bg-[#FFA000]"
//   }, // Strong Amber
//   {
//     RAW: "FF8F00",
//     BG: "bg-[#FF8F00]"
//   }, // Deep Amber
//   {
//     RAW: "FF6F00",
//     BG: "bg-[#FF6F00]"
//   }, // Very Deep Amber
//   {
//     RAW: "FF9800",
//     BG: "bg-[#FF9800]"
//   }, // Orange
//   {
//     RAW: "FB8C00",
//     BG: "bg-[#FB8C00]"
//   }, // Dark Orange
//   {
//     RAW: "F57C00",
//     BG: "bg-[#F57C00]"
//   }, // Strong Orange
//   {
//     RAW: "EF6C00",
//     BG: "bg-[#EF6C00]"
//   }, // Deep Orange
//   {
//     RAW: "E65100",
//     BG: "bg-[#E65100]"
//   }, // Very Deep Orange
//   {
//     RAW: "FF5722",
//     BG: "bg-[#FF5722]"
//   }, // Deep Orange
//   {
//     RAW: "F4511E",
//     BG: "bg-[#F4511E]"
//   }, // Dark Deep Orange
//   {
//     RAW: "E64A19",
//     BG: "bg-[#E64A19]"
//   }, // Strong Deep Orange
//   {
//     RAW: "D84315",
//     BG: "bg-[#D84315]"
//   }, // Very Strong Deep Orange
//   {
//     RAW: "BF360C",
//     BG: "bg-[#BF360C]"
//   }, // Deepest Deep Orange
//   {
//     RAW: "795548",
//     BG: "bg-[#795548]"
//   }, // Brown
//   {
//     RAW: "6D4C41",
//     BG: "bg-[#6D4C41]"
//   }, // Dark Brown
//   {
//     RAW: "5D4037",
//     BG: "bg-[#5D4037]"
//   }, // Strong Brown
//   {
//     RAW: "4E342E",
//     BG: "bg-[#4E342E]"
//   }, // Deep Brown
//   {
//     RAW: "3E2723",
//     BG: "bg-[#3E2723]"
//   }, // Very Deep Brown
//   {
//     RAW: "9E9E9E",
//     BG: "bg-[#9E9E9E]"
//   }, // Grey
//   {
//     RAW: "757575",
//     BG: "bg-[#757575]"
//   }, // Dark Grey
//   {
//     RAW: "616161",
//     BG: "bg-[#616161]"
//   }, // Strong Grey
//   {
//     RAW: "424242",
//     BG: "bg-[#424242]"
//   }, // Deep Grey
//   {
//     RAW: "212121",
//     BG: "bg-[#212121]"
//   }, // Very Deep Grey
//   {
//     RAW: "607D8B",
//     BG: "bg-[#607D8B]"
//   }, // Blue Grey
//   {
//     RAW: "546E7A",
//     BG: "bg-[#546E7A]"
//   }, // Dark Blue Grey
//   {
//     RAW: "455A64",
//     BG: "bg-[#455A64]"
//   }, // Strong Blue Grey
//   {
//     RAW: "37474F",
//     BG: "bg-[#37474F]"
//   }, // Deep Blue Grey
//   {
//     RAW: "263238",
//     BG: "bg-[#263238]"
//   }, // Very Deep Blue Grey
//   {
//     RAW: "000000",
//     BG: "bg-[#000000]"
//   }, // Black
//   {
//     RAW: "FFFFFF",
//     BG: "bg-[#FFFFFF]"
//   }  // White
// ];