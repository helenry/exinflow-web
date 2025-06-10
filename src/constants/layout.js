// constants/layout.js
export const NAVBAR = {
  HEIGHT_PIXEL: "72px",
  HEIGHT_PIXEL_RAW: 72,
  HEIGHT: "h-18",
  HEIGHT_RAW: 18,
  MARGIN_TOP: "mt-18",
};

export const SIDEBAR = {
  WIDTH: "w-20",
};

export const MODAL = {
  MARGIN: "m-4",
  MARGIN_PIXEL: "16px",
  MARGIN_PIXEL_RAW: 16,
  MARGIN_Y_PIXEL: "32px",
  MARGIN_Y_PIXEL_RAW: 32,

  HEIGHT: "h-[calc(100vh-104px)]" // screen height - NAVBAR.HEIGHT_PIXEL - MODAL.MARGIN_Y_PIXEL
}