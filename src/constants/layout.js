// constants/layout.js
export const NAVBAR = {
  HEIGHT_PIXEL: "80px",
  HEIGHT_PIXEL_RAW: 80,
  HEIGHT: "h-20",
  HEIGHT_RAW: 20,
  MARGIN_TOP: "mt-20",
};

export const SIDEBAR = {
  WIDTH: "w-20",
  WIDTH_RAW: 20
};

export const MODAL = {
  MARGIN: "ml-2 mr-4 mb-4",
  MARGIN_PIXEL: "16px",
  MARGIN_PIXEL_RAW: 16,
  MARGIN_Y_PIXEL: "32px",
  MARGIN_Y_PIXEL_RAW: 32,

  HEIGHT: "h-[calc(100vh-80px-16px)]" // screen height - NAVBAR.HEIGHT_PIXEL - MODAL.MARGIN_PIXEL
}